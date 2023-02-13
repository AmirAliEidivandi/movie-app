import { FunctionComponent } from "react";
import SortBy from "./SortBy";
import FilterBy from "./FilterBy";

interface ExploreFilterProps {
  currentTab: string;
}

const ExploreFilter: FunctionComponent<ExploreFilterProps> = ({
  currentTab,
}) => {
  return (
    <>
      <SortBy />
      <FilterBy currentTab={currentTab} />
    </>
  );
};

export default ExploreFilter;
