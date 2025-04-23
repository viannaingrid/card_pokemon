import { InfoPokemons } from './../../models/pokemonData';
import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemonData';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  public infoPokemons:InfoPokemons = {
    id: 0,
    sprites:{
      front_default:''
    },
    types:[]
  }

  pokemons:PokemonData[] = [

  ]

  maxRecords = 151
  public limit:number = 10
  public offset:number = 0

  constructor(
    public service:PokemonService
  ){}

  ngOnInit():void{
    this.defaultPokemon(0)

  }

  getPokemon(searchName:string ){
    this.service.getPokemon(searchName).subscribe({
      next:(res: any) => {

        this.infoPokemons = {
          id:        res.id,
          sprites:   res.sprites,
          types:     res.types
        }
        console.log(res)
        console.log(this.infoPokemons)
      }
    })
  }

  defaultPokemon(limit: number){
    this.service.defaultPokemon(limit).subscribe({
      next:(res: any) => {
        this.pokemons = res.results
        console.log(res)
      }
    })



  }
}
