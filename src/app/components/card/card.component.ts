import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemonData';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  public pokemon:PokemonData = {
    id: 0,
    name:'',
    sprites:{
      front_default:''
    },
    types:[]
  }

  constructor(
    public service:PokemonService
  ){}

  ngOnInit():void{
    this.getPokemon('bulbasaur')
  }

  getPokemon(searchName:string ){
    this.service.getPokemon(searchName).subscribe({
      next:(res: any) => {

        this.pokemon = {
          id:        res.id,
          name:      res.name,
          sprites:   res.sprites,
          types:     res.types
        }
        console.log(res)
        console.log(this.pokemon)
      }
    })

  test1(limit: number){
    this.service.defaultPokemon(limit).subscribe({
      next:(res: any) => {

        this.pokemon = {
          id:        res.id,
          name:      res.name,
          sprites:   res.sprites,
          types:     res.types
        }
        console.log(res)
        console.log(this.pokemon)
      }
    })


  }
}
}