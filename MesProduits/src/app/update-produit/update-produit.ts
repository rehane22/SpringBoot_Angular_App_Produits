import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit';
import { Produit } from '../model/produit.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categorie } from '../model/categorie.model';


@Component({
  selector: 'app-update-produit',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-produit.html',
  styles: ``
})
export class UpdateProduit implements OnInit {
  currentProduit = new Produit();
  categories!: Categorie[];
  updatedCatId!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService) { }

  /*  ngOnInit() {
     //  this.categories = this.produitService.listeCategories();
     this.currentProduit = this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']);
     this.updatedCatId = this.currentProduit.categorie.idCat;
   } */

  ngOnInit(): void {
    this.produitService.listeCategories().
      subscribe(cats => {
        console.log(cats);
        this.categories = cats._embedded.categories;
      }
      );
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).
      subscribe(prod => {
        this.currentProduit = prod;
        this.updatedCatId = this.currentProduit.categorie.idCat!;
      });
  }
  /*  updateProduit() { //console.log(this.currentProduit);
     //this.currentProduit.categorie = this.produitService.consulterCategorie(this.updatedCatId);
     this.produitService.updateProduit(this.currentProduit);
     this.router.navigate(['produits']);
   } */

  /* updateProduit() {
    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
      this.router.navigate(['produits']);
    }
    );
  } */
  updateProduit() {
    this.currentProduit.categorie = this.categories.
      find(cat => cat.idCat == this.updatedCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
      this.router.navigate(['produits']);
    }
    );
  }
}
