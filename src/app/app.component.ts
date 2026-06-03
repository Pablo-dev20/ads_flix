import { Component } from "@angular/core";
import { HoverZoom } from './directives/hover-zoom';
import { RouterLink, RouterLinkActive } from "@angular/router";
import {
	IonApp,
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
	IonMenuToggle,
	IonNote,
	IonRouterLink,
	IonRouterOutlet,
	IonSplitPane,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import {
	bookmarkOutline,
	bookmarkSharp,
	homeOutline,
	homeSharp,
	searchOutline,
	searchSharp,
	informationOutline,
	informationSharp,
} from "ionicons/icons";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
	imports: [
		RouterLink,
		RouterLinkActive,
		IonApp,
		IonSplitPane,
		IonMenu,
		IonContent,
		IonList,
		IonListHeader,
		IonNote,
		IonMenuToggle,
		IonItem,
		IonIcon,
		IonLabel,
		IonRouterLink,
		IonRouterOutlet,
		IonContent,
		IonMenu,
		HoverZoom,
	],
})
export class AppComponent {
	public appPages = [
		{ title: "Home", url: "/home", icon: "home" },
		{ title: "Buscar", url: "/buscar", icon: "search" },
		{ title: "Sobre Nós", url: "/sobre", icon: "information" },
	];

	constructor() {
		addIcons({ homeOutline, homeSharp, bookmarkOutline, bookmarkSharp, searchOutline, searchSharp, informationOutline, informationSharp });
	}
}
