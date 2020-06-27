import { getId } from "../utils";
import styles from "./pokemons.module.scss";

export default function Pokemons({ data }) {
  if (!data.length) {
    return null;
  }

  return (
    <ul className={styles.cards}>
      {data.map((pokemon) => (
        <li key={pokemon.name} className={styles.card}>
          <div className={styles.header}>
            <h2>{pokemon.name}</h2>
            <span>{`#${getId(pokemon.id)}`}</span>
          </div>
          <div className={styles.image}>
            <img src={pokemon.image} alt={pokemon.name}></img>
          </div>
          <div>
            <ul className={styles.types}>
              {pokemon.types.map((type) => (
                <li style={{ backgroundColor: type.color }}>{type.name}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
