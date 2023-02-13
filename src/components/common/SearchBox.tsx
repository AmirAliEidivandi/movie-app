import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getSearchKeyword } from "../../services/search";

interface SearchBoxProps {
  autoFocus?: boolean;
}
let isInitial = true;

const SearchBox: FC<SearchBoxProps> = ({ autoFocus = false }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("query") || ""
  );
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSuggestions([]);

    if (!searchInput.trim()) return;

    timeoutRef.current = setTimeout(async () => {
      const keywords = await getSearchKeyword(searchInput.trim());
      setSuggestions(keywords);

      if (isInitial) {
        isInitial = false;
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [searchInput]);

  const searchSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    clearTimeout(timeoutRef.current);
    setSuggestions([]);
  };

  useEffect(() => {
    setSuggestions([]);
    clearTimeout(timeoutRef.current);
  }, [location.search]);

  return (
    <div
      className={`absolute z-30 shadow-md left-6 right-6 top-7 group bg-dark-lighten rounded-full ${
        suggestions.length > 0 && "!rounded-3xl"
      }`}
    >
      <form className="relative" onSubmit={searchSubmitHandler}>
        <button className="absolute top-1/2 -translate-y-1/2 left-5">
          <BiSearch
            className="hover:text-white transition duration-300"
            size={25}
          />
        </button>
        <input
          className="w-full pl-14 pr-7 outline-none bg-transparent py-3 placeholder-gray-500 text-white"
          type="text"
          placeholder="The Walking Dead"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          autoFocus={autoFocus}
        />
      </form>

      {suggestions.length > 0 && (
        <ul className="hidden group-focus-within:flex flex-col gap-3 py-3 relative after:absolute after:top-0 after:h-[2px]  after:bg-gray-darken after:left-[5%] after:right-[5%]">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="focus:bg-red-500 outline-none"
              tabIndex={index - 1}
            >
              <button
                className="flex items-center gap-3 ml-5 hover:text-white transition duration-300"
                onClick={() => {
                  navigate(`/search?query=${encodeURIComponent(suggestion)}`);
                  setSuggestions([]);
                }}
              >
                <BiSearch size={25} />
                <span>{suggestion}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
