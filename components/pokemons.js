import { useState } from "react";
import PokemonCard from "./pokemon-card";
import PokemonDialog from "./pokemon-dialog";
import styles from "./pokemons.module.scss";

export default function Pokemons({ data }) {
  const [selectedPokemon, setSelectedPokemon] = useState();
  function handleDialogClose() {
    setSelectedPokemon(null);
  }

  if (!data.length) {
    return null;
  }

  return (
    <>
      <ul data-testid="pokemons-list" className={styles.cards}>
        {data.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            data={pokemon}
            onClick={() => setSelectedPokemon(pokemon)}
          />
        ))}
      </ul>
      <PokemonDialog data={selectedPokemon} onClose={handleDialogClose} />
    </>
  );
}
