import { Component, OnInit } from '@angular/core'; // <-- Importado o OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router'; // <-- Importado o ActivatedRoute
import { TmdbService } from '../../services/tmdb';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonSpinner, IonItem, IonLabel,
  IonChip, IonIcon, IonButtons, IonMenuButton
} from '@ionic/angular/standalone'; // <-- Removido o IonImg daqui
import { addIcons } from 'ionicons';
import { timeOutline, closeCircle } from 'ionicons/icons';
import { HoverZoom } from '../../directives/hover-zoom';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonSpinner, IonItem, IonLabel,
    IonChip, IonIcon, IonButtons, IonMenuButton,
    CommonModule, FormsModule, RouterLink, HoverZoom // <-- Removido o IonImg daqui
  ]
})
export class BuscarPage implements OnInit { // <-- Agora implementa OnInit
  public resultados: any[] = [];
  public carregando: boolean = false;
  public pesquisado: boolean = false;
  public buscasRecentes: string[] = [];
  public termoInicial: string = ''; // <-- Nova variável para segurar o texto da Home

  constructor(
    private tmdb: TmdbService,
    private route: ActivatedRoute // <-- Injetado o leitor de rotas aqui
  ) {
    addIcons({ timeOutline, closeCircle });
    this.carregarRecentes();
  }

  ngOnInit() {
    // Escuta a URL para ver se veio algum termo de busca da Home
    this.route.queryParams.subscribe(params => {
      const q = params['q'];
      if (q && q.trim() !== '') {
        this.termoInicial = q.trim();
        this.buscarPorTermo(this.termoInicial); // Executa a busca direto
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
}
