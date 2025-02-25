import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

const Navbar = ({ filterPokemons }: { filterPokemons: (search: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white p-4 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Pokemons</h1>

        {/* Botón de menú hamburguesa en móviles */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menú en pantallas grandes */}
        <div className="hidden md:flex items-center space-x-4 w-1/3">
          <input
            type="text"
            placeholder="Buscar foto"
            className="w-full p-2 border rounded-lg"
            onChange={(e) => filterPokemons(e.target.value)}
          />
          <LogoutButton />
        </div>
      </div>

      {/* Menú desplegable en móviles */}
      {isOpen && (
        <div className="mt-4 flex flex-col items-center space-y-4 md:hidden">
          <input
            type="text"
            placeholder="Buscar foto"
            className="w-full p-2 border rounded-lg"
            onChange={(e) => filterPokemons(e.target.value)}
          />
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default Navbar;
