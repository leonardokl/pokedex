import { Dialog } from "@reach/dialog";
import Head from "next/head";
import { FiX } from "react-icons/fi";
import { TITLE } from "../constants";
import List from "./list";
import Measure from "./measure";
import styles from "./pokemon-dialog.module.scss";
import PokemonHeader from "./pokemon-header";
import PokemonTypes from "./pokemon-types";

function CloseButton(props) {
  return (
    <button
      data-testid="pokemon-dialog-close-btn"
      className={styles.closeButton}
      aria-label="Close"
      {...props}
    >
      <FiX />
    </button>
  );
}

export default function PokemonDialog({ data, onClose }) {
  return (
    <Dialog
      isOpen={!!data}
      onDismiss={onClose}
      className={styles.wrapper}
      aria-label={(data && data.name) || "Pokemon details"}
      data-testid="pokemon-dialog"
    >
      <CloseButton onClick={onClose} />
      {data && (
        <>
          <Head>
            <title>
              {data.name} - {TITLE}
            </title>
          </Head>
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
