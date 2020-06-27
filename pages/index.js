import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import { getId } from "../utils";

export default function Home() {
  const [next, setNext] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState("loading");
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
      <div className="container">
        <Head>
          <title>Pokedex</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <h1>Pokedex</h1>
        </header>
        <main>
          <ul className="cards">
            {pokemons.map((pokemon) => (
              <li
                key={pokemon.name}
                className="cards__item"
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
          {next && (
            <div>
              <VisibilitySensor
                key={status}
                partialVisibility
                onChange={handleVisibilityChange}
              >
                <button
                  className="button"
                  onClick={fetchPokemons}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Loading..." : "Load more"}
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

        <style jsx>{`
          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          header {
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #eaeaea;
          }

          main {
            padding: 4rem 2rem;
            width: 100%;
            background: #fdfdfd;
            text-align: center;
          }

          @media (min-width: 600px) {
            main {
              padding: 4rem;
            }
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .cards {
            align-items: center;
            display: grid;
            grid-gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            margin-bottom: 2rem;
            text-align: left;
          }

          .cards__item {
            animation: fadein 2s;
            border-radius: 2rem;
            border: none;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
            color: white;
            // cursor: pointer;
            font-size: 1em;
            padding: 2rem;
            transition: 0.2s;
            width: 100%;
          }

          .cards__item:hover,
          .cards__item:focus {
            transform: scale3d(1.1, 1.1, 1);
          }

          .button {
            transition: 0.2s;
            cursor: pointer;
            background: white;
            border: none;
            border-radius: 2rem;
            padding: 1rem 2rem;
            font-size: 2em;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }

          .button:hover,
          .button:focus {
            transform: scale3d(1.1, 1.1, 1);
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          ul {
            margin: 0;
            padding: 0;
          }

          li {
            list-style: none;
          }

          h2 {
            margin: 0;
            font-size: 2em;
          }
        `}</style>
      </div>
    </html>
  );
}
