import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../services/produit';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-produit',
  imports: [FormsModule],
  templateUrl: './add-produit.html',
})
export class AddProduit implements OnInit {

  newProduit = new Produit();
  categories!: Categorie[];

  newIdCat!: number;
  newCategorie!: Categorie;

  constructor(private produitService: ProduitService, private router: Router) { };
  ngOnInit(): void {
    this.produitService.listeCategories().
      subscribe(cats => {

        this.categories = cats._embedded.categories;
      }
      );
  }


  addProduit() {
    this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit)
      .subscribe(prod => {
        this.router.navigate(['produits']);
      });
  }

}

