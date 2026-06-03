import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../../services/tmdb';
import { SHARED_IMPORTS } from '../../shared.import';
import { HoverZoom } from '../../directives/hover-zoom';
import { addIcons } from 'ionicons';
import { star, arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  standalone: true,
  imports: [...SHARED_IMPORTS, HoverZoom] // 🔥 Atualizado para herdar os cards e diretivas do app
})
export class ExplorarPage implements OnInit {

  public itens: any[] = [];
  public paginaAtual = 1;
  public categoriaId = '';
  public tituloCategoria = '';
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdb: TmdbService
  ) {
    addIcons({ star, arrowBack });
  }

  ngOnInit() {
    // 📡 Captura o parâmetro ':categoria' definido na rota do app.routes.ts
    this.categoriaId = this.route.snapshot.paramMap.get('categoria') || '';
    
    // Define o título bonitinho que vai aparecer na Navbar da tela
    this.definirTitulo();
    
    // Dispara a primeira carga de dados (página 1)
    this.carregarDados();
  }

  definirTitulo() {
    const titulos: { [key: string]: string } = {
      'trending': 'Em Alta na Semana',
      'populares': 'Os Mais Populares',
      'series': 'Séries de TV em Destaque',
      'acao': 'Adrenalina Pura: Ação'
    };
    this.tituloCategoria = titulos[this.categoriaId] || 'Explorar Catálogo';
  }

  carregarDados() {
    this.isLoading = true;
    let request$;

    // 🔀 Switch inteligente para decidir qual método do Service chamar
    switch (this.categoriaId) {
      case 'trending':
        request$ = this.tmdb.getTrending(this.paginaAtual);
        break;
      case 'populares':
        request$ = this.tmdb.getPopular(this.paginaAtual);
        break;
      case 'series':
        request$ = this.tmdb.getPopularSeries(this.paginaAtual);
        break;
      case 'acao':
        request$ = this.tmdb.getMoviesByGenre(28, this.paginaAtual); // Gênero 28 = Ação
        break;
      default:
        request$ = this.tmdb.getPopular(this.paginaAtual);
    }

    request$.subscribe({
      next: (data: any) => {
        // 🔥 MAGIA DA PAGINAÇÃO: O operador spread (...) junta os novos itens
        // aos que já estavam na tela, criando a lista infinita!
        this.itens = [...this.itens, ...(data.results || [])];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // 🔄 Função acionada pelo botão do fim da página
  carregarMais() {
    this.paginaAtual++; // Avança para a próxima página da API (2, 3, 4...)
    this.carregarDados();
  }

  getPoster(path: string) {
    return this.tmdb.getImageUrl(path, 'w500');
  }

  // 🎬 Redireciona corretamente dependendo se é filme ou série
  verDetalhes(item: any) {
    // Se a categoria for 'series', sabemos que é 'tv'. Se for 'trending', usamos o media_type da API. Caso contrário, é 'movie'
    let type = 'movie';
    if (this.categoriaId === 'series') type = 'tv';
    else if (item.media_type) type = item.media_type;

    this.router.navigate([`/${type}`, item.id]);
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}