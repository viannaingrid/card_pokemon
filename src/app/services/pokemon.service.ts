import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl:string = ""

  constructor(private http:HttpClient) {
    this.baseUrl = environment.pokeApi
  }

  getPokemon(pokemonName:string){
    this.http.get(`${this.baseUrl}${pokemonName}`)
  }
}
