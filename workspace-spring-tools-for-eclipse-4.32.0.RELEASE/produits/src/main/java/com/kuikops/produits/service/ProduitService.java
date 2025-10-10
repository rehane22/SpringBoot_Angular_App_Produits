package com.kuikops.produits.service;

import java.util.List;

import com.kuikops.produits.dto.ProduitDTO;
import com.kuikops.produits.entities.Categorie;
import com.kuikops.produits.entities.Produit;

public interface ProduitService {
	Produit saveProduit(Produit p);
	Produit getProduit(Long id);
	List<Produit> getAllProduits();
	Produit updateProduit(Produit p);
	void deleteProduit(Produit p);
	void deleteProduitById(Long id);
	List<Produit> findByNomProduit(String nom);
	List<Produit> findByNomProduitContains(String nom);
	List<Produit> findByNomPrix (String nom, Double prix);
	List<Produit> findByCategorie (Categorie categorie);
	List<Produit> findByCategorieIdCat(Long id);
	List<Produit> findByOrderByNomProduitAsc();
	List<Produit> trierProduitsNomsPrix();
    ProduitDTO convertEntityToDto (Produit produit);

/*    ProduitDTO saveProduit(Produit p);
    ProduitDTO getProduit(Long id);
    List<ProduitDTO> getAllProduits();*/
}
