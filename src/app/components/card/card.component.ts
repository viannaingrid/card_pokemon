import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemonData';
import { PokemonService } from 'src/app/services/pokemon.service';
import { InfoPokemons } from '../../models/pokemonData';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  public pokemon:PokemonData | any= {
    id: 0,
    name:'',
    sprites:{
      front_default:''
    },
    types:[]
  }

  InfoPokemons: InfoPokemons |any [] = []
  PokemonData: PokemonData[] = []

  constructor(
    private service:PokemonService
  ){}

  ngOnInit():void{
    this.defaultPokemon(10)
  }

  getPokemon(searchName:any ){
    this.service.getPokemon(searchName).subscribe({
      next:(res: any) => {

        this.pokemon.push = {
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


  defaultPokemon(limit: number): void {
    this.service.defaultPokemon(limit).subscribe({
      next: (res: any) => {
        res.results.forEach((result: any) => {
          this.getPokemon(result.name);
        });
      }
    });
  }
}
