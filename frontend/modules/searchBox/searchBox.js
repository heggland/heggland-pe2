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
    <Style.SearchBox>
      <Row justifyContent="center" padding="0 0  100px 0">
        <Col xs={11} sm={12}>
          <Row justifyContent="center">
            <Style.Container width={width}>
              <Col sm={12} height="100%">
                <form autoComplete="off">
                  <Row height="100%">
                    <Col xs={12} sm={5} height="100%">
                      <Row alignItems="center" padding="0 10px">
                        <Style.InputLabel htmlFor="textInput">
                          <FontAwesomeIcon icon={BedIcon} />
                        </Style.InputLabel>

                        <Style.TextInput
                          list="suggestions"
                          type="text"
                          placeholder="Where are you going?"
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
                      </Row>
                    </Col>

                    <Col xs={6} sm={3} height="100%">
                      <Row alignItems="center" padding="0 10px">
                        <Style.InputLabel htmlFor="startDate">
                          <FontAwesomeIcon icon={CalendarIcon} />
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
                      </Row>
                    </Col>

                    <Col xs={6} sm={3} height="100%">
                      <Row alignItems="center" padding="0 0 0 10px">
                        <Style.InputLabel htmlFor="endDate">
                          <FontAwesomeIcon icon={CalendarIcon} />
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
                      </Row>
                    </Col>
                    <Col sm={1} height="100%" width="100%">
                      <Style.Button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Search
                      </Style.Button>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Style.Container>
          </Row>
        </Col>
      </Row>
    </Style.SearchBox>
  );
};

export default SearchBox;
