import React from "react";
import ConditionGuard from "../components/ConditionGuard";
import Navbar from "../components/Navbar";
import loadingUrl from '../assets/loading.svg'
import { useSession } from "../context/SessionContext";
import LightBox from "../components/LightBox";

const HomePage: React.FC = () => {
  const { closeLightbox, filteredPokemons, filterPokemons, fetchPokemons, loadMore, openLightbox, pokemons, selectedPokemon, isSearching } = useSession()

  if (fetchPokemons.status === 'pending' && pokemons.length === 0) {
    return <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10"><img src={loadingUrl} alt="Loading" /></div>
    </div>
  }

  return (
    <div className="container mx-auto p-4">
      <Navbar filterPokemons={filterPokemons} />
      <ConditionGuard condition={filteredPokemons.length > 0 && !isSearching}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-24">
          {filteredPokemons.map((photo, index) => (
            <div
              key={photo.name + index}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer items-center justify-center flex flex-col"
              onClick={() => openLightbox(photo)}
            >
              <img
                src={photo.image}
                alt={photo.name}
                className="w-20 h-20 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  Pokemon: {photo.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ConditionGuard>
      <ConditionGuard condition={isSearching}>
        <div className="flex justify-center items-center h-screen">
          <div className="w-10 h-10"><img src={loadingUrl} alt="Loading" /></div>
        </div>
      </ConditionGuard>
      <ConditionGuard condition={filteredPokemons.length > 0}>
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={fetchPokemons.status === 'pending'}
          >
            {fetchPokemons.status === 'pending' ? "Cargando..." : "Cargar más"}
          </button>
        </div>
      </ConditionGuard>
      <ConditionGuard condition={selectedPokemon !== null}>
        <LightBox closeLightbox={closeLightbox} selectedPokemon={selectedPokemon} />
      </ConditionGuard>
    </div>
  );
};

export default HomePage;