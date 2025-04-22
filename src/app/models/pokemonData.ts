export type PokemonData = {
  name:string
  id:number
  sprites: {
    front_default: string
  }
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }[]
  abilities:{
    ability:{
      name:string
    }
  }[]
  moves: {
    move: {
      name: string,
      url: string
    },
    version_group_details: {
      level_learned_at: number,
      move_learn_method: {
        name: string,
        url: string
      },
      version_group: {
        name: string,
        url: string
      }
    }[]
  }[]


}