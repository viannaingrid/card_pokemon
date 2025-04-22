import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemonData';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  pokemon:PokemonData | any = {
    id: 0,
    name:'',
    sprites:{
      front_default:''
    },
    types:[]
  }

  offset: number = 0;
  limit: number = 10;
  maxRecords: number = 151;

  constructor(
    private service:PokemonService
  ){}

  ngOnInit():void{
    // this.getPokemon('pikachu')
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.service.getPokemonList(this.offset, this.limit).subscribe({
      next: (res) => {
        const requests = res.results.map((p: any) =>
          this.service.getPokemon(p.name).toPromise()
        );

        Promise.all(requests).then((results: PokemonData[]) => {
          this.pokemon = [...this.pokemon, ...results];
        });
      },
      error: () => console.log('Erro ao carregar a lista de pokémons')
    });
  }

  loadMore(): void {
    this.offset += this.limit;

    if (this.offset >= this.maxRecords) {
      const newLimit = this.maxRecords - this.offset;
      if (newLimit > 0) {
        this.limit = newLimit;
        this.loadPokemons();
      }
    } else {
      this.loadPokemons();
    }
  }

  getPokemon(searchName:string){
    this.service.getPokemon(searchName).subscribe({
      next:(res) => {

        this.pokemon = {
          id:        res.id,
          name:      res.name,
          sprites:   res.sprites,
          types:     res.types
        }
        console.log(res)
        console.log(this.pokemon)
      },
      error: (err) => console.log('not found')
    })
  }
}
