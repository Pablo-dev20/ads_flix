import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbService } from '../../services/tmdb';
import { SHARED_IMPORTS } from '../../shared.import';
import { addIcons } from 'ionicons';
import { star, search, play } from 'ionicons/icons'; // Adicionado o ícone 'play'
import { HoverZoom } from '../../directives/hover-zoom';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [...SHARED_IMPORTS, HoverZoom]
})
export class HomeComponent implements OnInit {

  public filmesEmAlta: any[] = [];
  public filmesPopulares: any[] = [];
  public seriesPopulares: any[] = []; 
  public filmesAcao: any[] = [];       
  public isLoading = true;

  constructor(
    private tmdb: TmdbService,
    private router: Router
  ) {
    addIcons({ star, search, play });
  }

  ngOnInit() {
    this.loadCatalogo();
  }

  loadCatalogo() {
    this.isLoading = true;

    // 1. Em Alta
    this.tmdb.getTrending().subscribe({
      next: (data: any) => { 
        this.filmesEmAlta = data.results || []; 
        this.checarCarregamento(); 
      },
      error: () => this.isLoading = false
    });

    // 2. Populares
    this.tmdb.getPopular().subscribe({
      next: (data: any) => { 
        this.filmesPopulares = data.results || []; 
        this.checarCarregamento(); 
      },
      error: () => this.isLoading = false
    });

    // 3. Séries Populares
    this.tmdb.getPopularSeries().subscribe({
      next: (data: any) => { 
        this.seriesPopulares = data.results || []; 
        this.checarCarregamento(); 
      },
      error: () => this.isLoading = false
    });

    // 4. Filmes de Ação
    this.tmdb.getMoviesByGenre(28).subscribe({
      next: (data: any) => { 
        this.filmesAcao = data.results || []; 
        this.checarCarregamento(); 
      },
      error: () => this.isLoading = false
    });
  }

  checarCarregamento() {
    if (
      this.filmesEmAlta.length > 0 && 
      this.filmesPopulares.length > 0 && 
      this.seriesPopulares.length > 0 && 
      this.filmesAcao.length > 0
    ) {
      this.isLoading = false;
    }
  }

  aoBuscar(event: any) {
    const valor = event.target.value;
    if (valor && valor.trim() !== '') {
      this.router.navigate(['/buscar'], { queryParams: { q: valor.trim() } });
    }
  }

  verMais(categoria: string) {
  // Navega para uma página de listagem completa passando qual categoria o usuário quer ver
  this.router.navigate(['/explorar', categoria]);
}

  getPoster(path: string) {
    return this.tmdb.getImageUrl(path, 'w500');
  }

  getOriginalPoster(path: string) {
    return this.tmdb.getImageUrl(path, 'original');
  }

  verDetalhes(id: number, type: 'movie' | 'tv' = 'movie') {
  this.router.navigate([`/${type}`, id]);
}
}