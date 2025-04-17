import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  name:string = "Charizard"
  attributesTypes:string[] = ['Fire', 'Rock']

  constructor(
    private service:PokemonService
  ){}

  ngOnInit():void{
    this.service.getPokemon("Nome")
  }
}
