import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit';
import { Categorie } from '../model/categorie.model';
import { CommonModule } from '@angular/common';
import { UpdateCategorie } from '../update-categorie/update-categorie';

@Component({
  selector: 'app-liste-categories',
  imports: [CommonModule, UpdateCategorie],
  templateUrl: './liste-categories.html',
  styles: ``
})
export class ListeCategories implements OnInit {
  categories!: Categorie[];
  updatedCat: Categorie = { "idCat": null, "nomCat": "" };
  ajout: boolean = true;
  constructor(private produitService: ProduitService) { }
  ngOnInit(): void {
    this.produitService.listeCategories().
      subscribe(cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      });
  }
  chargerCategories() {
    this.produitService.listeCategories().
      subscribe(cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      });
  }
  categorieUpdated(cat: Categorie) {
    console.log("Cat updated event", cat);
    this.produitService.ajouterCategorie(cat).
      subscribe(() => this.chargerCategories());
  }

  updateCat(cat: Categorie) {
    this.updatedCat = cat;
    this.ajout = false;
  }
}