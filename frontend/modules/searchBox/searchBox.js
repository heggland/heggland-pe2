import Container from "../../components/Container/Container";
import Col from "../../components/Col/Col";
import Row from "../../components/Row/Row";
import { useRouter } from "next/router";
import * as Style from "./searchBox.style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed as BedIcon,
  faCalendarAlt as CalendarIcon,
  faChevronDown as ChevronDownIcon,
  faChevronUp as ChevronUpIcon,
  faTimes as CloseIcon,
} from "@fortawesome/free-solid-svg-icons";
import { FRONTPAGESEARCH_SCHEMA } from "../../constants/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Colors from "../../constants/colors";
import { useState } from "react";

const SearchBox = ({ content = [], width }) => {
  const [accommodations] = useState(content);
  const [search, setSearch] = useState([]);
  const [inputSelected, setInputSelected] = useState("");
  const [selected, setSelected] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FRONTPAGESEARCH_SCHEMA),
  });

  const router = useRouter();

  const onSubmit = (data) => {
    //search data.city in accomondations
    if (selected) {
      // filter out name from accommodations
      const filterAccommodations = accommodations.filter((item) => {
        return item.name === inputSelected;
      });
      router.push("/accommodation/" + filterAccommodations[0].id);
      return;
    }

    try {
      const searchInput = (inputSelected && inputSelected) || data.search;
      const search = "?search=" + searchInput;

      let dateFrom = "";
      if (data.date_from) {
        dateFrom = "from=" + data.date_from;
      }

      let dateTo = "";
      if (data.date_to) {
        dateTo = "to=" + data.date_to;
      }

      let date = "";
      if (dateFrom && dateTo) {
        date = "&" + dateFrom + "&" + dateTo;
      } else if (dateFrom) {
        date = "&" + dateFrom;
      } else if (dateTo) {
        date = "&" + dateTo;
      }

      router.push("/accommodations" + search + date);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    let filterSearch;

    if (value && value.length >= 1) {
      setShowSuggestions(true);
      filterSearch = accommodations.filter((items) => {
        if (
          JSON.stringify({
            name: items.name,
            city: items.city,
            id: items.id,
          })
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          return items;
        }
      });
    } else {
      setSearch([]);
      setShowSuggestions(false);
    }

    if (filterSearch && filterSearch.length > 5) {
      filterSearch = filterSearch.slice(0, 5);
    }

    setSearch(filterSearch);
  };

  const handleClickChevronDown = () => {
    // if search is true it means that the user has selected an item from the suggestions

    if (search) {
      setShowSuggestions(true);
    } else {
      setSearch(content.slice(0, 5));
      setShowSuggestions(true);
    }
  };
  const handleClickChevronUp = () => {
    if (search) {
      setShowSuggestions(false);
    } else {
      setSearch([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (e) => {
    const name = e.target.dataset.name;
    const city = e.target.dataset.city;
    setSearch([]);
    setInputSelected(name);

    if (name !== city) {
      setSelected(true);
    }
  };

  const resetSearch = () => {
    setSearch([]);
    setInputSelected("");
  };

  return (
    <Container
      height="150px"
      placeContent="center"
      backgroundColor={Colors.darkBlue}
    >
      <Row justifyContent="center">
        <Col xs={12} sm={11}>
          <Row justifyContent="center">
            <Style.Title> Where you want to go?</Style.Title>
            <Style.Container width={width}>
              <Col xs={12} height="100%">
                <Style.Form autoComplete="off">
                  <Row height="100%">
                    <Col xs={12} sm={4} height="100%">
                      <Row alignItems="center" padding="0 10px">
                        <Col xs={1} sm={1}>
                          <Style.InputIcon htmlFor="textInput">
                            <FontAwesomeIcon icon={BedIcon} />
                          </Style.InputIcon>
                        </Col>
                        <Col xs={11} sm={11}>
                          {(inputSelected && (
                            <Row alignItems="center">
                              <Col xs={11}>
                                <Style.InputSelected
                                  {...register("search")}
                                  title={inputSelected}
                                >
                                  {inputSelected}
                                </Style.InputSelected>
                              </Col>
                              <Col xs={1}>
                                <Style.SelectedButton onClick={resetSearch}>
                                  <FontAwesomeIcon icon={CloseIcon} />
                                </Style.SelectedButton>
                              </Col>
                            </Row>
                          )) || (
                            <Row alignItems="center">
                              <Col xs={11}>
                                <Style.TextInput
                                  onKeyDown={handleInputChange}
                                  onKeyUp={handleInputChange}
                                  type="text"
                                  placeholder={
                                    (errors.search && errors.search.message) ||
                                    "Where to go?"
                                  }
                                  name="textInput"
                                  id="textInput"
                                  {...register("search")}
                                />
                              </Col>
                              <Col xs={1}>
                                <Style.InputIcon hover={true}>
                                  {(showSuggestions && (
                                    <FontAwesomeIcon
                                      onClick={handleClickChevronUp}
                                      icon={ChevronUpIcon}
                                    />
                                  )) || (
                                    <FontAwesomeIcon
                                      onClick={handleClickChevronDown}
                                      icon={ChevronDownIcon}
                                    />
                                  )}
                                </Style.InputIcon>
                              </Col>
                            </Row>
                          )}
                          <Style.Suggestions show={showSuggestions && true}>
                            {search &&
                              search.map(({ id, name, city }) => {
                                return (
                                  <Style.Dropdown
                                    key={id}
                                    onClick={handleSelect}
                                    data-city={city}
                                    data-name={name}
                                    data-id={id}
                                  >
                                    {name}
                                  </Style.Dropdown>
                                );
                              })}
                          </Style.Suggestions>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs="none" sm={0.15} />

                    <Col xs={12} sm={3} height="100%">
                      <Row alignItems="center" padding="0 10px">
                        <Col xs={1} sm={1}>
                          <Style.InputIcon>from</Style.InputIcon>
                        </Col>
                        <Col xs={10} sm={10}>
                          <Style.DateInput
                            type="date"
                            name="startDate"
                            id="startDate"
                            {...register("date_from")}
                            min={new Date().toISOString().split("T")[0]}
                          />
                          <Style.ErrorDate>
                            {(errors.date_from &&
                              errors.date_from.message.includes("type") &&
                              "Please choose a date") ||
                              (errors.date_from && errors.date_from.message)}
                          </Style.ErrorDate>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs="none" sm={0.15} />

                    <Col xs={12} sm={3} height="100%">
                      <Row alignItems="center" padding="0 10px">
                        <Col xs={1} sm={1}>
                          <Style.InputIcon>to</Style.InputIcon>
                        </Col>
                        <Col xs={10} sm={10}>
                          <Style.DateInput
                            type="date"
                            name="endDate"
                            id="endDate"
                            {...register("date_to")}
                            min={new Date().toISOString().split("T")[0]}
                          />
                          <Style.ErrorDate>
                            {(errors.date_to &&
                              errors.date_to.message.includes("type") &&
                              "Please choose a date") ||
                              (errors.date_to && errors.date_to.message)}
                          </Style.ErrorDate>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs="none" sm={0.15} />
                    <Col sm={1} height="100%" width="100%">
                      <Style.Button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Go
                      </Style.Button>
                    </Col>
                  </Row>
                </Style.Form>
              </Col>
            </Style.Container>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBox;
