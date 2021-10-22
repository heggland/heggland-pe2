import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { SEARCH_SCHEMA } from "../../constants/schema";
import { BASE_URL, HOTELS_PATH } from "../../constants/api";

const SearchHotels = () => {
  const [fetchError, setFetchError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [hotels, setHotels] = useState(null);

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
        const response = await axios.get(BASE_URL + HOTELS_PATH);
        setHotels(response.data);
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
        if (search.length > 2) {
          filtered = hotels.filter(function (hotels) {
            if (
              JSON.stringify({
                name: hotels.name,
                description: hotels.description,
                address: hotels.address,
                zip_code: hotels.zip_code,
              })
                .toLowerCase()
                .includes(search)
            ) {
              return hotels;
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
          placeholder={(errors.search && errors.search.message) || "search.."}
        ></input>
      </form>
      {searchResult && (
        <>
          {searchResult.map(
            ({ id, name, city, address, zip_code, description }) => {
              return (
                <div key={id}>
                  <a href={`hotel/${id}`}>
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

export default SearchHotels;

/*


    {searchResult.map(({ id, name, city, description }) => {
        return (
          <div key={id}>
            <a href={`hotel/${id}`}>
              <Heading size="4">{name}</Heading>
            </a>
            <p>{city}</p>
            <small>{description}</small>
          </div>
        );
      })}

      */
