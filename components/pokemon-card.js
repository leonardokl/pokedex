import VisuallyHidden from "@reach/visually-hidden";
import styles from "./pokemon-card.module.scss";
import PokemonHeader from "./pokemon-header";
import PokemonTypes from "./pokemon-types";

export default function PokemonCard({ data, ...props }) {
  return (
    <li key={data.name} className={styles.wrapper} {...props}>
      <PokemonHeader data={data} />
      <div className={styles.image}>
        <img src={data.image.small} alt={data.name} />
      </div>
      <PokemonTypes data={data.types} size="small" />
      <VisuallyHidden>
        <button onClick={props.onClick}>{`See ${data.name} details`}</button>
      </VisuallyHidden>
    </li>
  );
}
