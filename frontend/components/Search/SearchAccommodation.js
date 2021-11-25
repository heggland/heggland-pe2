import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { SEARCH_SCHEMA } from "../../constants/schema";
import { BASE_URL, ACCOMMONDATION_PATH } from "../../constants/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch as SearchIcon,
  faTimes as Close,
} from "@fortawesome/free-solid-svg-icons";

import Heading from "../Common/Heading";
import Row from "../Row/Row";
import Col from "../Col/Col";
import * as Style from "./SearchAccommodation.Style";

import Modal from "react-modal";
import Error from "../../modules/error/error";

import Image from "next/image";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
    width: "90%",
  },
  overlay: { zIndex: 1000 },
};

const SearchAccommodation = ({ type }) => {
  const [error, setError] = useState(null);
  const [accommodations, setAccommodation] = useState(null);

  const [searchResult, setSearchResult] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const {
    register,
    handleSubmit,
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
        setError(error.toString());
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
                .includes(search.toLowerCase())
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
      setError(error.toString());
    }
  }

  if (type === "nav") {
    const data = (searchResult && searchResult) || accommodations;
    return (
      <>
        <Style.ButtonContainer onClick={openModal}>
          <FontAwesomeIcon icon={SearchIcon} />
        </Style.ButtonContainer>
        <div id="searchForm">
          <Modal
            id="searchForm"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <Style.ModalContainer>
              <Style.Header>
                <Row justifyContent="center" padding="0 0 5px  0">
                  <Col xs={1}>
                    <FontAwesomeIcon icon={SearchIcon} />
                  </Col>
                  <Col xs={9}>
                    <Style.Form onChange={handleSubmit(onChange)}>
                      <Style.Input
                        autocomplete="off"
                        {...register("search")}
                        type="search"
                        disabled={!accommodations && true}
                        error={(error && true) || false}
                        placeholder={
                          (errors.search && errors.search.message) || "search.."
                        }
                        autoFocus
                      />
                    </Style.Form>
                  </Col>
                  <Col xs={1}>
                    <Style.CloseModal onClick={closeModal}>
                      <FontAwesomeIcon icon={Close} transform="grow-5" />
                    </Style.CloseModal>
                  </Col>
                </Row>
              </Style.Header>
              <Style.Result>
                <Col xs={11}>
                  <Col>
                    {error && <Error string={error} path="search" />}
                    {data &&
                      data.map(
                        ({
                          id,
                          name,
                          city,
                          address,
                          zip_code,
                          description,
                          image,
                        }) => {
                          return (
                            <Row key={id} margin="5% 0">
                              <Col xs={12}>
                                <a href={`/accommodation/${id}`}>
                                  <Row justifyContent="center" padding="35px 0">
                                    <Col xs={12} md={6} margin="0 25px 0 0">
                                      <Heading size={4}>{name}</Heading>
                                      <Heading size={6}>
                                        {(address, zip_code, city).toString()}
                                      </Heading>
                                      <Row xs="none">
                                        <i>
                                          <small>
                                            {description.slice(0, 250)}
                                            {description.length > 250 && "..."}
                                          </small>
                                        </i>
                                      </Row>
                                    </Col>
                                    <Col xs={12} md={4}>
                                      {image[0] && (
                                        <Style.ResultImage>
                                          <Image
                                            src={image[0].url}
                                            alt={image[0].alternativeText}
                                            layout="fill"
                                            objectFit="scale-down"
                                          />
                                        </Style.ResultImage>
                                      )}
                                    </Col>
                                  </Row>
                                </a>
                              </Col>
                            </Row>
                          );
                        }
                      )}
                  </Col>
                </Col>
              </Style.Result>
            </Style.ModalContainer>
          </Modal>
        </div>
      </>
    );
  }

  return (
    <div>
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
