import VisuallyHidden from "@reach/visually-hidden";
import { useState } from "react";
import PokemonDialog from "./pokemon-dialog";
import PokemonHeader from "./pokemon-header";
import styles from "./pokemons.module.scss";
import PokemonTypes from "./pokmon-types";

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
      <ul className={styles.cards}>
        {data.map((pokemon) => (
          <li
            key={pokemon.name}
            className={styles.card}
            onClick={() => setSelectedPokemon(pokemon)}
          >
            <PokemonHeader data={pokemon} />
            <div className={styles.image}>
              <img src={pokemon.image.small} alt={pokemon.name}></img>
            </div>
            <PokemonTypes data={pokemon.types} size="small" />
            <VisuallyHidden>
              <button
                onClick={() => setSelectedPokemon(pokemon)}
              >{`See ${pokemon.name} details`}</button>
            </VisuallyHidden>
          </li>
        ))}
      </ul>
      <PokemonDialog data={selectedPokemon} onClose={handleDialogClose} />
    </>
  );
}
