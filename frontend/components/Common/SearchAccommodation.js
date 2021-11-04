import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { SEARCH_SCHEMA } from "../../constants/schema";
import { BASE_URL, ACCOMMONDATION_PATH } from "../../constants/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as SearchIcon } from "@fortawesome/free-solid-svg-icons";

const SearchAccommodation = ({ type }) => {
  const [fetchError, setFetchError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [accommodations, setHotels] = useState(null);

  const [searchResult, setSearchResult] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SEARCH_SCHEMA),
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(BASE_URL + ACCOMMONDATION_PATH);
        if (response.data.length !== 0) {
          setHotels(response.data);
        }
      } catch (error) {
        console.error(error);
        setFetchError(error.toString());
      }
    }
    fetchData();
  }, []);

  async function onChange({ search }) {
    setSearchResult(null);

    let filtered;
    try {
      if (search.length !== 0) {
        if (search.length > 1) {
          filtered = accommodations.filter(function (accommodations) {
            if (
              JSON.stringify({
                name: accommodations.name,
                description: accommodations.description,
                address: accommodations.address,
                zip_code: accommodations.zip_code,
              })
                .toLowerCase()
                .includes(search)
            ) {
              return accommodations;
            }
          });

          if (filtered) {
            setSearchResult(filtered);
          } else {
            setSearchResult(null);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setSearchError(error.toString());
    }
  }

  //TODO bring up search..
  if (type === "nav") {
    return (
      <>
        <FontAwesomeIcon icon={SearchIcon} />
      </>
    );
  }
  return (
    <div>
      {/*      {searchError && (
        <>
          {searchError.includes("null") ? (
            <>
              {fetchError && <span>{fetchError}</span>}
              <span>Database is properly down</span>
            </>
          ) : (
            <span>{searchError}</span>
          )}
        </>
      )} */}
      <form onChange={handleSubmit(onChange)}>
        <input
          {...register("search")}
          disabled={!accommodations && true}
          placeholder={(errors.search && errors.search.message) || "search.."}
        ></input>
      </form>
      {searchResult && (
        <>
          {searchResult.map(
            ({ id, name, city, address, zip_code, description }) => {
              return (
                <div key={id}>
                  <a href={`accommodation/${id}`}>
                    <p>{name}</p>
                  </a>
                  <p>{city}</p>
                  <p>{address}</p>
                  <p>{zip_code}</p>
                  <small>{description}</small>
                </div>
              );
            }
          )}
        </>
      )}
    </div>
  );
};

export default SearchAccommodation;

/*


    {searchResult.map(({ id, name, city, description }) => {
        return (
          <div key={id}>
            <a href={`accommodation/${id}`}>
              <Heading size="4">{name}</Heading>
            </a>
            <p>{city}</p>
            <small>{description}</small>
          </div>
        );
      })}

      */
