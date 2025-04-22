import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemonData';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  pokemon:PokemonData = {
    id: 0,
    name:'',
    sprites:{
      front_default:''
    },
    types:[],
    abilities:[],
    moves:[]
  }

  constructor(
    private service:PokemonService
  ){}

  ngOnInit():void{
    this.getPokemon('pikachu')
  }

  getPokemon(searchName:string){
    this.service.getPokemon(searchName).subscribe({
      next:(res) => {

        this.pokemon = {
          id:        res.id,
          name:      res.name,
          sprites:   res.sprites,
          types:     res.types,
          abilities: res.abilities,
          moves:     res.moves
        }
        console.log(res)
        console.log(this.pokemon)
      },
      error: (err) => console.log('not found')
    })
  }
}
