import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { SEARCH_SCHEMA } from "../../constants/schema";
import { BASE_URL, ACCOMMONDATION_PATH } from "../../constants/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as SearchIcon } from "@fortawesome/free-solid-svg-icons";

import Row from "../Row/Row";
import Col from "../Col/Col";
import * as Style from "./SearchAccommodation.Style";

import { faTimes as close } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import GlobalStyle from "../Global/Global";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
  },
};

const SearchAccommodation = ({ type }) => {
  const [fetchError, setFetchError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [accommodations, setAccommodation] = useState(null);

  const [searchResult, setSearchResult] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
          setAccommodation(response.data);
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

    const stringData = JSON.stringify({
      name: accommodations.name,
      description: accommodations.description,
      address: accommodations.address,
      zip_code: accommodations.zip_code,
      city: accommodations.city,
    });

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
                city: accommodations.city,
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

  if (type === "nav") {
    Modal.setAppElement("#searchForm");
    return (
      <>
        <FontAwesomeIcon icon={SearchIcon} onClick={openModal} />
        <div id="searchForm">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <GlobalStyle overflow="hidden" />
            <Style.Container>
              <Style.Header>
                <Row>
                  <Col xs={1}>
                    <FontAwesomeIcon icon={SearchIcon} />
                  </Col>
                  <Col xs={10}>
                    <Style.Form onChange={handleSubmit(onChange)}>
                      <Style.Input
                        autocomplete="off"
                        {...register("search")}
                        type="search"
                        disabled={!accommodations && true}
                        placeholder={
                          (errors.search && errors.search.message) || "search.."
                        }
                        autoFocus
                      />
                    </Style.Form>
                  </Col>
                  <Col xs={1}>
                    <Style.CloseModal onClick={closeModal}>
                      <FontAwesomeIcon icon={close} />
                    </Style.CloseModal>
                  </Col>
                </Row>
              </Style.Header>
              <Style.Result>
                <Col xs={11}>
                  <Col>
                    {(searchResult &&
                      searchResult.map(
                        ({
                          id,
                          name,
                          city,
                          address,
                          zip_code,
                          description,
                        }) => {
                          return (
                            <Row key={id}>
                              <a href={`accommodation/${id}`}>
                                <p>{name}</p>
                              </a>
                              <p>{city}</p>
                              <p>{address}</p>
                              <p>{zip_code}</p>
                              <small>{description}</small>
                            </Row>
                          );
                        }
                      )) ||
                      (accommodations !== null &&
                        accommodations.map(
                          ({
                            id,
                            name,
                            city,
                            address,
                            zip_code,
                            description,
                            featured,
                          }) => {
                            if (featured) {
                              return (
                                <Row key={id}>
                                  <a href={`accommodation/${id}`}>
                                    <p>{name}</p>
                                  </a>
                                  <p>{city}</p>
                                  <p>{address}</p>
                                  <p>{zip_code}</p>
                                  <small>{description}</small>
                                </Row>
                              );
                            }
                          }
                        ))}
                  </Col>
                </Col>
              </Style.Result>
            </Style.Container>
          </Modal>
        </div>
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

            const regex = new RegExp(search, "gi");
            const searchTerm = dataString.replace(regex, `<b>${search}</b>`);
            // datastring json parse
            const jsonData = JSON.parse(searchTerm);

      */
