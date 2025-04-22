import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { PokemonData } from '../models/pokemonData'


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl:string = ""
  private pokeData:PokemonData | any

  constructor(private http:HttpClient) {
    this.baseUrl = environment.pokeApi
  }

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this
              .http
              .get<any>(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemon(pokemonName:string):Observable<PokemonData>{
    this.pokeData = this
                    .http
                    .get<PokemonData>
                    (`${this.baseUrl}/${pokemonName}`)
    return this.pokeData
  }
}

