import axios from "../shared/axios";
import { ConfigType, Item, ItemsPage } from "../shared/types";

export const getExploreMovie: (
  page: number,
  config?: ConfigType
) => Promise<ItemsPage> = async (page, config = {}) => {
  const data = (
    await axios.get("/discover/movie", {
      params: {
        ...config,
        page,
      },
    })
  ).data;

  const adjustedItem = data.results
    .filter((item: Item) => item.poster_path)
    .map((item: any) => ({
      ...item,
      media_type: "movie",
    }));

  return {
    ...data,
    results: adjustedItem,
  };
};

export const getExploreTV: (
  page: number,
  config?: ConfigType
) => Promise<ItemsPage> = async (page, config = {}) => {
  const data = (
    await axios.get("/discover/tv", {
      params: {
        ...config,
        page,
      },
    })
  ).data;

  const adjustedItem = data.results
    .filter((item: Item) => item.poster_path)
    .map((item: any) => ({
      ...item,
      media_type: "tv",
    }));

  return {
    ...data,
    results: adjustedItem,
  };
};
