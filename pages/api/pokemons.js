import axios from "axios";
import { TYPE_COLOR } from "../../constants";
import { getId } from "../../utils";

function getNextUrl(url) {
  if (!url) return null;

  const { searchParams } = new URL(url);

  return `/api/pokemons?offset=${searchParams.get("offset")}`;
}

const IMAGES_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex";

function getImage(data) {
  const id = getId(data.id);

  return {
    small: `${IMAGES_URL}/detail/${id}.png`,
    big: `${IMAGES_URL}/full/${id}.png`,
  };
}

export default async (req, res) => {
  const { offset = 0 } = req.query;

  try {
    const pokemonsResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
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
        height: data.height / 10,
        weight: data.weight / 10,
        abilities: data.abilities.map(({ ability }) => ({
          name: ability.name,
        })),
        forms: data.forms,
        image: getImage(data),
        types: data.types.map(({ type }) => ({
          name: type.name,
          color: TYPE_COLOR[type.name],
        })),
      })),
    };

    return res.json(data);
  } catch (ex) {
    res.status(500).json({ message: ex.message });
  }
};
