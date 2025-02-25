export interface Pokemon {
  name: string;
  image: string | undefined;
}

export interface PokemonBasic {
  name: string;
  url: string;
}

export interface Token {
  token: string
  saveToken: (value: string) => void
  removeToken: () => void
}