import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'buscar',
    loadComponent: () => import('./pages/buscar/buscar.page').then(m => m.BuscarPage),
  },
  
  // 🎬 Rota existente para os Filmes
  {
    path: 'movie/:id',
    loadComponent: () => import('./pages/movie-detail/movie-detail.page').then(m => m.MovieDetailPage),
  },

  // 📺 🔥 NOVA ROTA: Adicione essa linha para o Angular aceitar os cliques em Séries de TV!
  {
    path: 'tv/:id',
    loadComponent: () => import('./pages/movie-detail/movie-detail.page').then(m => m.MovieDetailPage),
  },
  {
    path: 'sobre',
    loadComponent: () =>
      import('./pages/sobre/sobre.page').then((m) => m.SobrePage),
  },
  {
  path: 'explorar/:categoria',
  loadComponent: () => import('./pages/explorar/explorar.page').then(m => m.ExplorarPage)
  },  {
    path: 'explorar',
    loadComponent: () => import('./pages/explorar/explorar.page').then( m => m.ExplorarPage)
  }

];