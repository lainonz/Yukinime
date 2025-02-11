// Search.jsx
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../assets/services.gif";
import AnimeDetails from "../pages/AnimeDetails/AnimeDetails";

const Search = () => {
  const history = useHistory();
  const [anime, setAnime] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [clicked, setClicked] = useState(false);

  const btnClick = (animeKey) => {
    axios
      .get(`https://nice-puce-capris.cyclic.app/anime?name=${animeKey}`)
      .then((d) => setAnime(d.data));
    setClicked(true);
    navigateTo("/anime-details"); // Navigate to /anime-details after fetching data
  };

  const thisObject = (obj) => {
    return (
      typeof obj === "object" &&
      Object.prototype.toString.call(obj) === "[object Object]"
    );
  };

  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <>
      <header className="py-8 bg-header">
      <div className="container mx-auto">
          <div className="flex lg:justify-between items-center">
            <a
              href="/"
              className="font-bold font-primary text-[1.5rem] lg:text-[2rem]"
            >
              Yuki<span className="text-accent">nime!</span>
            </a>
            <div className="flex ml-10 gap-x-2 lg:static">
              <input
                type="text"
                className="w-full rounded-lg border-[2px] bg-transparent border-opacity-20 outline-none text-white text-opacity-60 py-1 px-3 text-sm lg:text-[1rem]"
                placeholder="Search anime"
                onKeyDown={(e) =>
                  e.keyCode === 13 ? btnClick(e.target.value) : null
                }
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                onClick={() => btnClick(keyword)}
                className="btn btn-sm font-primary font-semibold"
              >
                <IoIosSearch size={30} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto mt-5 text-white p-3">
        {clicked === true ? (
          thisObject(anime) ? (
            <AnimeDetails anime={anime} />
          ) : (
            <div className="text-center">
              <h1 className="opacity-70 text-2xl font-semibold mb-6">
                Chotto matte...
              </h1>
              <img
                src={Loading}
                alt="Loading"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
          )
        ) : null}
      </div>
      <br />
      <br />
      <footer
        className={
          thisObject(anime)
            ? "text-center p-3 bg-darkBg text-white"
            : "absolute bottom-0 left-0 right-0 text-center p-3 bg-darkBg text-white"
        }
      >
      </footer>
    </>
  );
};

export default Search;
