import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../services/api";
import { Pokemon, PokemonBasic } from "../types";

interface SessionContextType {
  pokemons: Pokemon[];

  selectedPokemon: Pokemon | null;
  filteredPokemons: Pokemon[];
  offset: number;
  fetchPokemons: UseMutationResult<any, unknown, void, unknown>;
  filterPokemons: (search: string) => void;
  loadMore: () => void;
  openLightbox: (photo: Pokemon) => void;
  closeLightbox: () => void;
  isSearching: boolean
}

const limit = 20;

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [allPokemons, setAllPokemons] = useState<PokemonBasic[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const imageCache = new Map<string, string>();

  const fetchPokemons = useMutation({
    mutationFn: async () => API.GET_ITEMS(limit, offset.toString(), ''),
    onSuccess: (data) => {
      if (data) {
        setPokemons((prevPokemons) => [...prevPokemons, ...data]);
        setFilteredPokemons((prevPokemons) => [...prevPokemons, ...data]);
        setOffset((prev) => prev + limit)
      }
    }
  })

  const fetchAllPokemon = useMutation({
    mutationFn: async () => API.GET_ALL_ITEMS(''),
    onSuccess: (data) => {
      if (data) {
        setAllPokemons(data);
      }
    }
  })

  const getFilteredPokemons = async (url: string): Promise<string | undefined> => {
    const res = await API.GET_FILTERED_POKEMONS(url)
    return res;
  };

  const filterPokemons = async (search: string) => {
    setIsSearching(true);
    if (search === "") {
      setIsSearching(false);
      setFilteredPokemons(pokemons);
      return;
    }
    const filteredList = allPokemons.filter((poke) => poke.name.includes(search));
    const pokemonWithImages = await fetchPokemonImages(filteredList);
    setFilteredPokemons(pokemonWithImages);
    setIsSearching(false);
  };

  const fetchPokemonImages = async (list: PokemonBasic[]) => {
    const res = list.map(async (poke) => {
      if (imageCache.has(poke.name)) {
        return { name: poke.name, image: imageCache.get(poke.name)! };
      }
      const image = await getFilteredPokemons(poke.url);

      if (typeof image === 'string') {
        imageCache.set(poke.name, image);
      }
      return { name: poke.name, image };

    })
    const resolvedPokemons = await Promise.all(res)
    return resolvedPokemons;
  };

  const loadMore = () => {
    fetchPokemons.mutate();
  };

  const openLightbox = (photo: Pokemon) => {
    setSelectedPokemon(photo);
  };

  const closeLightbox = () => {
    setSelectedPokemon(null);
  };

  useEffect(() => {
    fetchPokemons.mutate();
  }, []);

  useEffect(() => {
    fetchAllPokemon.mutate();
  }, []);

  return (
    <SessionContext.Provider value={{
      closeLightbox,
      fetchPokemons,
      filterPokemons,
      loadMore,
      openLightbox,
      pokemons,
      selectedPokemon,
      filteredPokemons,
      isSearching,
      offset,
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
