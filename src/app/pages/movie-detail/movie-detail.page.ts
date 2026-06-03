import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // 🔥 Importado o Router
import { TmdbService } from '../../services/tmdb';
import { SHARED_IMPORTS } from '../../shared.import';
import { MovieSynopsisPipe } from '../../pipes/movie-synopsis-pipe';
import { addIcons } from 'ionicons';
import { heart, heartOutline, star, logoYoutube } from 'ionicons/icons';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [...SHARED_IMPORTS, MovieSynopsisPipe],
})
export class MovieDetailPage implements OnInit {

  movie: any = null;
  cast: any[] = [];
  trailer: any = null;
  isLoading = true;
  isFavorite = false;
  isTvShow = false; // 🔥 Flag para identificar se é série

  constructor(
    private route: ActivatedRoute,
    private router: Router, // 🔥 Injetado o Router
    private tmdb: TmdbService
  ) {
    addIcons({ heart, heartOutline, star, logoYoutube });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // 🔥 Verifica se é série olhando para a URL do navegador
    this.isTvShow = this.router.url.includes('/tv/');

    if (id) this.loadMedia(+id);
  }

  loadMedia(id: number) {
    this.isLoading = true;

    // 🔥 Busca do endpoint correto baseado no tipo de mídia
    const request$ = this.isTvShow ? this.tmdb.getTvShow(id) : this.tmdb.getMovie(id);

    request$.subscribe({
      next: (data: any) => {
        this.movie = data;
        this.cast = data.credits?.cast?.slice(0, 8) || [];
        this.trailer = data.videos?.results?.find(
          (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getPoster(path: string) {
    return this.tmdb.getImageUrl(path, 'w500');
  }

  getBackdrop(path: string) {
    return this.tmdb.getImageUrl(path, 'w1280');
  }

  getRuntime(): string {
    if (this.isTvShow) {
      if (!this.movie?.number_of_seasons) return '';
      const temporadas = this.movie.number_of_seasons;
      return `${temporadas} ${temporadas === 1 ? 'Temporada' : 'Temporadas'}`;
    } else {
      if (!this.movie?.runtime) return '';
      const h = Math.floor(this.movie.runtime / 60);
      const m = this.movie.runtime % 60;
      return `${h}h ${m}m`;
    }
  }

  openTrailer() {
    if (this.trailer) {
      window.open(`https://youtube.com/watch?v=${this.trailer.key}`, '_blank');
    }
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
