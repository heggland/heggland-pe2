import Col from "../../components/Col/Col";
import Row from "../../components/Row/Row";
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

const SearchBox = ({ accomondations = "" }) => {
  /* date handler react  
  
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const FromDate = (e) => setFromDate(e.target.value);
  const DateTo = (e) => {
    // check if e target is greater than fromDate
    setToDate((e.target.value >= fromDate && e.target.value) || null);

                 onChange={FromDate}
                  onChange={DateTo}
                  
  }; */

  let cityArray;
  if (accomondations) {
    // array of cities
    cityArray =
      accomondations &&
      accomondations.map((item) => {
        return item.city;
      });
    // remove duplicate in the array
    cityArray = [...new Set(cityArray)];
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FRONTPAGESEARCH_SCHEMA),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Style.Container>
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
                  {cityArray &&
                    cityArray.length > 0 &&
                    cityArray.map((item) => {
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
              <Style.Button type="submit" onClick={handleSubmit(onSubmit)}>
                Search
              </Style.Button>
            </Col>
          </Row>
        </form>
      </Col>
    </Style.Container>
  );
};

export default SearchBox;
