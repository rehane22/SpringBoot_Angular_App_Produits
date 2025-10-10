import { Component } from '@angular/core';
import { Produit } from '../model/produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../services/produit';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-produits',
  imports: [CommonModule, RouterLink],
  templateUrl: './produits.html',
})
export class Produits {
  //sans le constructor on peut mettre le ! ->  produits!: string[];
  produits!: Produit[];
  constructor(private produitService: ProduitService, public authService: AuthService) {
    // this.produits = this.produitService.listeProduits();
  }
  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits() {
    this.produitService.listeProduit().subscribe(prods => {
      this.produits = prods;
    });
  }
  supprimerProduit(p: Produit) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        this.chargerProduits();
      });
  }
}
