import axios from "axios";
import { getId } from "../../utils";

const typeColor = {
  normal: "#707576",
  fighting: "#BD581A",
  flying: "#23809B",
  poison: "#9D5DAE",
  ground: "#857633",
  rock: "#897414",
  bug: "#5C8034",
  ghost: "#7b62a3",
  steel: "#617B7C",
  fire: "#C75301",
  water: "#357CAA",
  grass: "#568211",
  electric: "#887605",
  psychic: "#D42E90",
  ice: "#237F9B",
  dragon: "#377DA2",
  dark: "#4A4A4A",
  fairy: "#986689",
  unknown: "#707576",
  shadow: "#4A4A4A",
};

const LIMIT = 10;

function getNextUrl(url) {
  if (!url) return null;

  const { searchParams } = new URL(url);

  return `/api/pokemons?offset=${searchParams.get("offset")}`;
}

export default async (req, res) => {
  const { offset = 0 } = req.query;

  try {
    const pokemonsResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
    );
    const pokemonsDetailsResponses = await Promise.all(
      pokemonsResponse.data.results.map((result) => axios.get(result.url))
    );
    const data = {
      count: pokemonsResponse.data.count,
      next: getNextUrl(pokemonsResponse.data.next),
      results: pokemonsDetailsResponses.map(({ data }) => ({
        id: data.id,
        name: data.name,
        abilities: data.abilities.map(({ ability }) => ({
          name: ability.name,
        })),
        forms: data.forms,
        image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getId(
          data.id
        )}.png`,
        types: data.types.map(({ type }) => ({
          name: type.name,
          color: typeColor[type.name],
        })),
      })),
    };

    return res.status(200).json(data);
  } catch (ex) {
    res.status(500).json({ message: ex.message });
  }
};
