import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategorieWrapper } from '../model/categorieWrapped.model';
import { AuthService } from './auth';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProduitService {
  //categories: Categorie[];
  produits!: Produit[]; //un tableau de Produit
  produit!: Produit;
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  //toutes les api Rest retourne des Observables
  /*  PLUS BESOIN DE
      let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt }) 
    CAR JAI INTERCEPTOR */
  listeProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.apiURL + "/all",);
  }

  ajouterProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Produit>(environment.apiURL + "/addprod", prod, { headers: httpHeaders });
  }
  supprimerProduit(id: number) {
    const url =
      `${environment.apiURL}/delprod/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }
  consulterProduit(id: number): Observable<Produit> {
    const url =
      `${environment.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Produit>(url, { headers: httpHeaders });
  }

  updateProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Produit>(environment.apiURL + "/updateprod", prod, { headers: httpHeaders });
  }

  listeCategories(): Observable<CategorieWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<CategorieWrapper>(environment.apiURLCat, { headers: httpHeaders }
    );
  }
  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url =
      `${environment.apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }
  rechercherParNom(nom: string): Observable<Produit[]> {
    const url =
      `${environment.apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }
  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(environment.apiURLCat, cat, httpOptions);
  }

}