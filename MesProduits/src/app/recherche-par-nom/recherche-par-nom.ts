import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProduitService } from '../services/produit';
import { Produit } from '../model/produit.model';
import { SearchFilterPipe } from '../search-filter-pipe';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {

  nomProduit!: string;
  produits!: Produit[];
  searchTerm!: string;
  allProduits!: Produit[];

  constructor(private produitService: ProduitService) { }


  /*  ngOnInit(): void {
     this.produitService.listeProduit().subscribe(prods => {
       console.log(prods);
       this.allProduits = prods;
     });
   } */
  
  //pour tester avec le pipe searchFilterPipie
  ngOnInit(): void {
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  }

  //filtrer sans appuyer sur recherche
  onKeyUp(filterText: string) {
    this.produits = this.allProduits.filter(item =>
      item.nomProduit.toLowerCase().includes(filterText));
  }
  rechercherProds() {
    if (this.nomProduit)
      //ou bien (this.nomProduit!=="")
      this.produitService
        .rechercherParNom(this.nomProduit)
        .subscribe((prods) => {
          console.log(prods);
          this.produits = prods;
        });
    else
      this.produitService.listeProduit().subscribe((prods) => {
        console.log(prods);
        this.produits = prods;
      });
  }

}
