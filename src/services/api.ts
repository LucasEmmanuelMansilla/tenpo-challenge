import axios from 'axios';
import { config } from '../config/config';
import { Pokemon } from '../types';

axios.defaults.baseURL = config.baseUrl;
axios.defaults.timeout = config.timeout;

export function setClientToken(token: string) {
  axios.defaults.headers.common = {Authorization: 'Bearer ' + token};
}

export const API = {
  GET_ITEMS: async (limit: number, offset: string, token: string) => {
    try  {
      const res = await axios.get(`/v2/pokemon?limit=${limit}&offset=${offset}}` ,{
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });
      const newPokemons: Pokemon[] = await Promise.all(
        res.data.results.map(async (poke: { name: string; url: string }) => {
          const details = await axios.get<{ sprites: { front_default: string } }>(poke.url);
          return {
            name: poke.name,
            image: details.data.sprites.front_default,
          };
        })
      );
      return newPokemons;
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  },
  GET_ALL_ITEMS: async (token: string) => {
    try  {
      const res = await axios.get(`/v2/pokemon?limit=2000` ,{
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });
      return res.data.results;
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  },
  GET_FILTERED_POKEMONS: async (url: string) => {
    try  {
      const details = await axios.get<{ sprites: { front_default: string } }>(url);
      const image = details.data.sprites.front_default;
      return image;
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  },
}