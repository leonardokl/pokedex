import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import Pokemons from "../components/pokemons";
import styles from "./index.module.scss";

const buttonText = {
  loading: "Loading...",
  error: "Try again",
  resolved: "Load more",
};

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
          <Pokemons data={pokemons} />
          {status === "error" && <div role="alert">An error ocurred</div>}
          {(next || status !== "resolved") && (
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
                {buttonText[status]}
              </button>
            </VisibilitySensor>
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
