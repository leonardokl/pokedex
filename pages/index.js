import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import { getId } from "../utils";
import styles from "./index.module.css";

export default function Home() {
  const [next, setNext] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState("loading");
  const isLoading = status === "loading";
  async function fetchPokemons() {
    setStatus("loading");

    try {
      const { data } = await axios.get(next || "/api/pokemons");

      setNext(data.next);
      setPokemons(pokemons.concat(data.results));
      setStatus("resolved");
    } catch (ex) {
      console.error(ex);
      setStatus("error");
    }
  }
  function handleVisibilityChange(isVisible) {
    if (isVisible && status === "resolved") {
      fetchPokemons();
    }
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <html lang="en">
      <div className={styles.container}>
        <Head>
          <title>Pokedex</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <h1>Pokedex</h1>
        </header>
        <main>
          <ul className={styles.cards}>
            {pokemons.map((pokemon) => (
              <li
                key={pokemon.name}
                className={styles.card}
                style={{ backgroundColor: pokemon.types[0].color }}
              >
                <div style={{ display: "flex" }}>
                  <h2
                    style={{
                      flex: 1,
                      marginRight: "1rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {pokemon.name}
                  </h2>
                  <span>{`#${getId(pokemon.id)}`}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: 215,
                  }}
                >
                  <img src={pokemon.image} alt={pokemon.name}></img>
                </div>
              </li>
            ))}
          </ul>
          {(next || isLoading) && (
            <div>
              <VisibilitySensor
                key={status}
                partialVisibility
                onChange={handleVisibilityChange}
              >
                <button
                  className={styles.button}
                  onClick={fetchPokemons}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load more"}
                </button>
              </VisibilitySensor>
            </div>
          )}
        </main>

        <footer>
          <div>
            Made by{" "}
            <a
              href="https://github.com/leonardokl"
              target="_blank"
              rel="noopener noreferrer"
            >
              @leonardokl
            </a>
          </div>
        </footer>
      </div>
    </html>
  );
}
