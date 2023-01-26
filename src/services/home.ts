import axios from "../shared/axios";
import { Item, HomeFilms } from "../shared/types";

// movie tab
export const getHomeMovies = async (): Promise<HomeFilms> => {
    const endpoints: { [key: string]: string } = {
        Trending: "/trending/movie/day",
        Popular: "/movie/popular",
        "Top Rated": "/movie/top_rated",
        Hot: "/trending/movie/day?page=2",
        Upcoming: "/movie/upcoming",
    };

    const response = await Promise.all(Object.entries(endpoints).map((endpoint) => axios.get(endpoint[1])));
    const data = response.reduce((final, current, index) => {
        final[Object.entries(endpoints)[index][0]] = current.data.results.map((item: Item) => ({
            ...item,
            media_type: "movie",
        }));
        return final;
    }, {} as HomeFilms);

    return data;
};

export const getMovieBannerInfo = async (movies: Item[]): Promise<any> => {
    const detailRes = await Promise.all(movies.map((movie) => axios.get(`/movie/${movie.id}`)));
    const translationRes = await Promise.all(movies.map((movie) => axios.get(`/movie/${movie.id}/translations`)));

    const translations = translationRes.map((item: any) =>
        item.data.translations
            .filter((translation: any) => ["vi", "fr", "ja", "pt", "ru", "es"].includes(translation.iso_639_1))
            .reduce((acc: any, element: any) => {
                if (element.iso_639_1 === "vi") {
                    return [element, ...acc];
                }
                return [...acc, element];
            }, [] as any)
            .map((translation: any) => translation.data.title)
    );

    const genres = detailRes.map((item: any) => item.data.genres.filter((_: any, index: number) => index < 3));

    return genres.map((genre, index) => ({
        genre,
        translation: translations[index],
    }));
};

// tv tab
export const getHomeTVs = async (): Promise<HomeFilms> => {
    const endpoints: { [key: string]: string } = {
        Trending: "/trending/tv/day",
        Popular: "/tv/popular",
        "Top Rated": "/tv/top_rated",
        Hot: "/trending/tv/day?page=2",
        "On the air": "/tv/on_the_air",
    };

    const response = await Promise.all(Object.entries(endpoints).map((endpoint) => axios.get(endpoint[1])));
    const data = response.reduce((final, current, index) => {
        final[Object.entries(endpoints)[index][0]] = current.data.results.map((item: Item) => ({
            ...item,
            media_type: "tv",
        }));
        return final;
    }, {} as HomeFilms);

    return data;
};

export const getTVBannerInfo = async (tvs: Item[]): Promise<any> => {
    const detailRes = await Promise.all(tvs.map((tv) => axios.get(`/tv/${tv.id}`)));
    const translationRes = await Promise.all(tvs.map((tv) => axios.get(`/tv/${tv.id}/translations`)));

    const translations = translationRes.map((item: any) =>
        item.data.translations
            .filter((translation: any) => ["vi", "fr", "ja", "pt", "ru", "es"].includes(translation.iso_639_1))
            .reduce((acc: any, element: any) => {
                if (element.iso_639_1 === "vi") {
                    return [element, ...acc];
                }
                return [...acc, element];
            }, [] as any)
            .map((translation: any) => translation.data.nam)
    );

    const genres = detailRes.map((item: any) => item.data.genres.filter((_: any, index: number) => index < 3));
    return genres.map((genre, index) => ({
        genre,
        translation: translations[index],
    }));
};

// general
export const getTrendingNow = async (): Promise<Item[]> => {
    return (await axios.get("/trending/all/day?page=2")).data.results;
};
