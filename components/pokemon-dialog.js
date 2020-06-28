import { Dialog } from "@reach/dialog";
import { FiX } from "react-icons/fi";
import List from "./list";
import Measure from "./measure";
import styles from "./pokemon-dialog.module.scss";
import PokemonHeader from "./pokemon-header";
import PokemonTypes from "./pokmon-types";

export default function PokemonDialog({ data, onClose }) {
  return (
    <Dialog
      isOpen={!!data}
      onDismiss={onClose}
      className={styles.wrapper}
      aria-label={data && data.name}
    >
      <button
        className={styles.closeButton}
        aria-label="Close"
        onClick={onClose}
      >
        <FiX />
      </button>

      {data && (
        <>
          <PokemonHeader data={data} />
          <div className={styles.image}>
            <img src={data.image.big} alt={data.name}></img>
          </div>
          <PokemonTypes data={data.types} />
          <div className={styles.measures}>
            <Measure label="Height" value={`${data.height}m`} />
            <Measure label="Weight" value={`${data.weight}kg`} />
          </div>
          <List label="Abilities" value={data.abilities} />
          <List label="Forms" value={data.forms} />
        </>
      )}
    </Dialog>
  );
}
