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


  pokemonData: PokemonData[] = []
  offsetCount: number = 3

  constructor(
    private service:PokemonService
  ){}

  ngOnInit():void{
    this.defaultPokemon(10,0)
  }

searchPokemon(searchName: string){
  this.pokemonData =[]
  this.getPokemon(searchName)
}

  loadMore(limit: number){
    this.offsetCount += limit
    this.service.defaultPokemon(limit, this.offsetCount).subscribe({
      next:(res: any) => {
        res.results.forEach((result: any) => {
          this.getPokemon(result.name)
          this.pokemonData.sort((a, b) => a.id - b.id);

        });
      }
    })
  }

  getPokemon(searchName:any ){
    this.service.getPokemon(searchName).subscribe({
      next:(res: any) => {

        this.pokemonData.sort((a, b) => a.id - b.id);
        this.pokemonData.push(
          res
        )

      }
    })
  }


  defaultPokemon(limit: number, offset: number): void {
    this.service.defaultPokemon(limit, offset).subscribe({
      next: (res: any) => {
        this.pokemonData.sort((a, b) => a.id - b.id);
        res.results.forEach((result: any) => {
          this.getPokemon(result.name);
        });
      }
    });
  }
}
