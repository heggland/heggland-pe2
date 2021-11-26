import Container from "../../components/Container/Container";
import Col from "../../components/Col/Col";
import Row from "../../components/Row/Row";
import { useRouter } from "next/router";
import * as Style from "./searchBox.style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed as BedIcon,
  faCalendarAlt as CalendarIcon,
} from "@fortawesome/free-solid-svg-icons";
import { FRONTPAGESEARCH_SCHEMA } from "../../constants/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Card from "../../components/Card/Card";
import FormatDate from "../../components/Common/FormatDate";
import * as Colors from "../../constants/colors";
import Heading from "../../components/Common/Heading";

const SearchBox = ({ accomondations = "", width }) => {
  let suggestion;

  if (accomondations) {
    // array of cities
    suggestion =
      accomondations &&
      accomondations.map((item) => {
        return item.city + " " + item.name;
      });
    // remove duplicate in the array
    suggestion = [...new Set(suggestion)];
  }

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

    const filterSearch = accomondations.filter((item) => {
      // split the city and name
      return (
        item.city.toLowerCase() + " " + item.name.toLowerCase() ===
        data.search.toLowerCase()
      );
    });

    const path = "/accommodation/" + filterSearch[0].id;

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    let dateFrom = "";
    if (data.date_from) {
      /*       dateFrom = new Intl.DateTimeFormat("en-UK", options).format(
        new Date(data.date_from)
      ); */
      dateFrom = "from=" + data.date_from;
    }

    let dateTo = "";
    if (data.date_to) {
      /*      dateTo = new Intl.DateTimeFormat("en-UK", options).format(
        new Date(data.date_to)
      ); */

      dateTo = "to=" + data.date_to;
    }

    console.log(dateFrom, dateTo);

    let date = "";
    if (dateFrom && dateTo) {
      date = "?" + dateFrom + "&" + dateTo;
    } else if (dateFrom) {
      date = "?" + dateFrom;
    } else if (dateTo) {
      date = "?" + dateTo;
    }

    router.push(path + date);
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
                          <Style.TextInput
                            list="suggestions"
                            type="text"
                            placeholder="Where to go?"
                            name="textInput"
                            id="textInput"
                            {...register("search")}
                          />
                          <datalist id="suggestions">
                            {suggestion &&
                              suggestion.length > 0 &&
                              suggestion.map((item) => {
                                return <option key={item}>{item}</option>;
                              })}
                          </datalist>
                          <Style.ErrorSearch>
                            {errors.search && errors.search.message}
                          </Style.ErrorSearch>
                        </Col>
                      </Row>
                    </Col>

                    <Col xs="none" sm={0.15} />

                    <Col xs={12} sm={3} height="100%">
                      <Row alignItems="center" padding="0 10px">
                        <Col xs={1} sm={1}>
                          <Style.InputIcon>
                            <FontAwesomeIcon icon={CalendarIcon} />
                          </Style.InputIcon>
                        </Col>
                        <Col xs={10} sm={10}>
                          <Style.InputLabel htmlFor="startDate">
                            Check in
                          </Style.InputLabel>
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
                      <Row alignItems="center" padding="0 0 0 10px">
                        <Col xs={1} sm={1}>
                          <Style.InputIcon>
                            <FontAwesomeIcon icon={CalendarIcon} />
                          </Style.InputIcon>
                        </Col>
                        <Col xs={10} sm={10}>
                          <Style.InputLabel htmlFor="endDate">
                            Check out
                          </Style.InputLabel>
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
                        Search
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
