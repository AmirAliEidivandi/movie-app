import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrendingNow } from "../../services/home";
import { Item } from "../../shared/types";
import RightbarFilms from "../common/RightbarFilms";

const TrendingNow: FC = () => {
    const { isLoading, data, isError, error } = useQuery<Item[], Error>(["genres"], getTrendingNow);
    if (isError) return <div>ERROR: ${error.message}</div>;

    return <RightbarFilms className="mt-7" name="Trending" limitNumber={2} films={data} isLoading={isLoading} />;
};

export default TrendingNow;
