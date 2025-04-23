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
  maxRecords = 151
  public limit:number = 10
  public offset:number = 0

  constructor(
    public service:PokemonService
  ){}

  ngOnInit():void{
    this.getPokemon(`?${this.offset}?&{this.limit}`)
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


    const maxRecords = 151
    const limit = 10
    let offset = 0;

    // Elementos do DOM
const pokemonsList = document.getElementById('pokemonsList') as HTMLUListElement
const loadMoreButton = document.getElementById('loadMore') as HTMLButtonElement

// Função que carrega os Pokémon
async function loadPokemonItems(offset: number, limit: number): Promise<void> {
  try {

    const newHtml = pokemon.map((pokemon: any) => `
      <li class="pokemon ${pokemon.types.join(' ')}">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type: string) => `<li class="type">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>
      </li>
    `).join('')

    pokemonsList.innerHTML += newHtml
  } catch (error) {
    console.error('Erro ao carregar Pokémon:', error)
  }
}

// Event listener do botão
loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordNextPage = this.offset + this.limit

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItems(this.offset, newLimit)
    loadMoreButton.parentElement?.removeChild(loadMoreButton)
  } else {
    loadPokemonItems(offset, limit)
  }
})

// Carrega os primeiros pokémons ao iniciar
loadPokemonItems(offset, limit)


  }
}
