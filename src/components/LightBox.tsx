import { Pokemon } from '../types'

export default function LightBox({ selectedPokemon, closeLightbox }: { selectedPokemon: Pokemon | null, closeLightbox: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-transparency bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={closeLightbox}
    >
      <div className="relative p-8 bg-white items-center justify-center flex flex-col">
        <img
          src={selectedPokemon?.image}
          alt={selectedPokemon?.name}
          className="max-w-full max-h-full"
        />
        <p className="text-black text-center mt-2">
          Pokemon: {selectedPokemon?.name}
        </p>
      </div>
    </div>
  )
}
