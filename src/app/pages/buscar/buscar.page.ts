import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router'; // 🔥 Adicionado o Router aqui
import { TmdbService } from '../../services/tmdb';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonSpinner, IonItem, IonLabel,
  IonChip, IonIcon, IonButtons, IonMenuButton, IonButton } from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { timeOutline, closeCircle, arrowBack, alertCircleOutline, searchOutline } from 'ionicons/icons'; // 🔥 Adicionados ícones de estado vazio
import { HoverZoom } from '../../directives/hover-zoom';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: true,
  imports: [IonButton, 
    IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonSpinner, IonItem, IonLabel,
    IonChip, IonIcon, IonButtons, IonMenuButton,
    CommonModule, FormsModule, RouterLink, HoverZoom 
  ]
})
export class BuscarPage implements OnInit { 
  public resultados: any[] = [];
  public carregando: boolean = false;
  public pesquisado: boolean = false;
  public buscasRecentes: string[] = [];
  public termoInicial: string = ''; 

  constructor(
    private tmdb: TmdbService,
    private route: ActivatedRoute,
    private router: Router // 🔥 Injetado o roteador aqui
  ) {
    // 🔥 Registrados os novos ícones para evitar que fiquem invisíveis na tela
    addIcons({ arrowBack, timeOutline, closeCircle, alertCircleOutline, searchOutline });
    this.carregarRecentes();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const q = params['q'];
      if (q && q.trim() !== '') {
        this.termoInicial = q.trim();
        this.buscarPorTermo(this.termoInicial); 
      }
    });
  }

  carregarRecentes() {
    const salvo = localStorage.getItem('buscasRecentes');
    this.buscasRecentes = salvo ? JSON.parse(salvo) : [];
  }

  salvarRecente(termo: string) {
    this.buscasRecentes = this.buscasRecentes.filter(b => b !== termo);
    this.buscasRecentes.unshift(termo);
    this.buscasRecentes = this.buscasRecentes.slice(0, 5);
    localStorage.setItem('buscasRecentes', JSON.stringify(this.buscasRecentes));
  }

  removerRecente(termo: string) {
    this.buscasRecentes = this.buscasRecentes.filter(b => b !== termo);
    localStorage.setItem('buscasRecentes', JSON.stringify(this.buscasRecentes));
  }

  buscarPorTermo(termo: string) {
    this.pesquisado = true;
    this.carregando = true;
    this.salvarRecente(termo);

    this.tmdb.search(termo).subscribe({
      next: (data: any) => {
        this.resultados = data.results || [];
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      }
    });
  }

  buscarFilme(event: any) {
    const valor = event.target.value;

    if (!valor || valor.trim() === '') {
      this.resultados = [];
      this.pesquisado = false;
      return;
    }

    this.buscarPorTermo(valor.trim());
  }

  getPoster(path: string) {
    return this.tmdb.getImageUrl(path, 'w200');
  }

  // 🔥 NOVA FUNÇÃO HÍBRIDA: Decide dinamicamente o tipo de rota para evitar erros 404
  verDetalhes(item: any) {
    let type = 'movie';

    if (item.media_type) {
      type = item.media_type; // Se a API do TMDB já responder o tipo, usa ele
    } else if (item.first_air_date || item.name) {
      type = 'tv'; // Se tiver propriedades exclusivas de séries, assume 'tv'
    }

    this.router.navigate([`/${type}`, item.id]);
  }
}