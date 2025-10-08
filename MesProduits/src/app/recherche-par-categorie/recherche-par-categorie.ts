import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { CommonModule } from '@angular/common';
import { Categorie } from '../model/categorie.model';
import { ProduitService } from '../services/produit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherche-par-categorie',
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-categorie.html',
  styles: ``
})
export class RechercheParCategorie implements OnInit {

  IdCategorie!: number;
  produits!: Produit[];
  categories!: Categorie[];

  

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.listeCategories().
      subscribe(cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      });
  }

  onChange() {
    this.produitService.rechercherParCategorie(this.IdCategorie).
      subscribe(prods => { this.produits = prods });
  }

}
