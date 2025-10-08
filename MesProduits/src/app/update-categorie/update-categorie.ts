import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-categorie',
  imports: [FormsModule],
  templateUrl: './update-categorie.html',
  styles: ``
})
export class UpdateCategorie implements OnInit {

  //recevoir une categorie 
  @Input()
  categorie!: Categorie;

  // donner une categorie , 
  @Output()
  categorieUpdated = new EventEmitter<Categorie>();

  @Input()
  ajout!:boolean;
  
  constructor() {

  }
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ", this.categorie);
  }

  //l'event est emis 
  saveCategorie() {
    this.categorieUpdated.emit(this.categorie);
  }

}