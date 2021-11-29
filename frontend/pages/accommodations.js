import Layout from "../components/Layout/Layout";
import {
  TITLE_ACCOMMONDATION,
  DESCRIPTION_ACCOMMONDATION,
} from "../constants/meta";
import axios from "axios";
import { BASE_URL, ACCOMMONDATION_PATH } from "../constants/api";

import Error from "../modules/error/error";

import Card from "../components/Card/Card";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";

import styled from "styled-components";
import { useEffect, useState } from "react";

import * as Colors from "../constants/colors";
import * as Breakpoints from "../components/Global/Breakpoints";
import { useRouter } from "next/router";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -50px;
  width: 100%;
  align-items: center;
`;

const Category = styled.div`
  margin-left: 10px;
`;

const CategoryButton = styled.button`
  margin: 10px;
  width: 100px;
  height: 45px;
  background-color: rgb(255 74 82);
  color: white;
  border: 0;
  cursor: pointer;

  ${Breakpoints.mobileOnly} {
    width: 70px;
    font-size: 0.7rem;
  }

  &:hover {
    transition: all 0.15s ease-in;
    background-color: ${Colors.turquoise};
  }
`;

const EmptyAccomondations = styled.div`
  margin: 30px;
  height: 45px;
  border: 0;
  cursor: pointer;
`;

const SearchError = styled.div`
  color: red;
  position: absolute;
  margin-left: 10px;
`;

const Input = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 45px;
  border: 0;
  background-color: rgb(255 74 82);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;

  &::placeholder {
    color: white;
  }
`;

const Accommodation = ({ content, error }) => {
  const [accommondation, setAccommodation] = useState(content);
  const [searchError, setSearchError] = useState(false);
  const [filter, setFilter] = useState(false);

  const router = useRouter();
  let query = router.query;

  const [search, setSearch] = useState(query.search);

  let querySearch;
  let queryDate;
  let queryFilter;

  if (query.search) {
    querySearch = query.search;

    try {
      let dateFrom = "";
      if (query.from) {
        dateFrom = "from=" + query.from;
      }

      let dateTo = "";
      if (query.to) {
        dateTo = "to=" + query.to;
      }

      queryDate = "";
      if (dateFrom && dateTo) {
        queryDate = "?" + dateFrom + "&" + dateTo;
      } else if (dateFrom) {
        queryDate = "?" + dateFrom;
      } else if (dateTo) {
        queryDate = "?" + dateTo;
      }

      if (querySearch) {
        // search.length > 1
        queryFilter = content.filter(function (accommodations) {
          if (
            JSON.stringify({
              city: accommodations.city,
            })
              .toLowerCase()
              .includes(querySearch.toLowerCase())
          ) {
            return accommodations;
          }
        });
      }
    } catch (error) {
      setSearchError(error.toString());
      console.log(error);
    }
  }

  const removePreSearch = () => {
    setSearch("");
  };

  const HandleClickCategory = (e) => {
    const value = e.target.value;
    if (value === "all") {
      removePreSearch();
      setAccommodation(content);
      router.replace(router.pathname);
    } else {
      // filter out the data
      let filteredData;
      if (queryFilter) {
        console.log("presearch go");
        filteredData = queryFilter.filter((accommodations) => {
          if (accommodations.category === value) {
            return accommodations;
          }
        });
      } else {
        filteredData = content.filter((accommodations) => {
          if (accommodations.category === value) {
            return accommodations;
          }
        });
      }
      setFilter(true);
      setAccommodation(filteredData);
    }
  };

  const handleSearch = (e) => {
    // router.replace(router.pathname);
    if (router.query.search) {
      router.replace(router.pathname + queryDate);
    }
    const value = e.target.value;
    if (value === "") {
      setSearch(false);
      setAccommodation(content);
    } else {
      // filter out the content
      const filtered = content.filter(function (accommodations) {
        if (
          JSON.stringify({
            name: accommodations.name,
            description: accommodations.description,
            address: accommodations.address,
            zip_code: accommodations.zip_code,
            city: accommodations.city,
          })
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          return accommodations;
        }
      });
      setSearch(true);
      setAccommodation(filtered);
    }
  };

  console.log(accommondation);

  return (
    <Layout
      title={TITLE_ACCOMMONDATION}
      description={DESCRIPTION_ACCOMMONDATION}
    >
      <Container padding="0 0 50px 0">
        <Row justifyContent="center">
          <Col xs={11} md={8}>
            <Row padding="100px 0 100px 0" flexDirection="column">
              <Row alignItems="center">
                <FilterContainer>
                  <Col xs={4} margin="0 15px;">
                    <SearchError>{searchError}</SearchError>
                    <Input
                      defaultValue={
                        (search && queryFilter && query.search) || ""
                      }
                      placeholder="Search.."
                      onChange={handleSearch}
                    />
                  </Col>

                  <Col xs={8} justifyContent="right">
                    <Category>
                      <CategoryButton
                        onClick={HandleClickCategory}
                        value="hotel"
                      >
                        Hotel
                      </CategoryButton>
                      <CategoryButton
                        onClick={HandleClickCategory}
                        value="apartment"
                      >
                        Apartment
                      </CategoryButton>
                      <CategoryButton
                        onClick={HandleClickCategory}
                        value="resort"
                      >
                        Resort
                      </CategoryButton>
                      <CategoryButton
                        onClick={HandleClickCategory}
                        value="homestay"
                      >
                        Homestay
                      </CategoryButton>
                    </Category>
                  </Col>
                </FilterContainer>
              </Row>
              <Row>
                {(!filter &&
                  queryFilter &&
                  queryFilter.length > 0 &&
                  queryFilter.map(({ id, name, image, city }) => {
                    console.log("query print go brrr");
                    return (
                      <Col xs={12} md={6} lg={4} xxl={3} key={id}>
                        <a href={`accommodation/${id + queryDate}`}>
                          <Card
                            name={name}
                            city={city}
                            image={image}
                            key={id}
                          />
                        </a>
                      </Col>
                    );
                  })) ||
                  (accommondation &&
                    accommondation.length >= 1 &&
                    accommondation.map(({ id, name, image, city }) => {
                      console.log("accommondation print go brrr");
                      return (
                        <Col xs={12} md={6} lg={4} xxl={3} key={id}>
                          <a href={`accommodation/${id}`}>
                            <Card
                              name={name}
                              city={city}
                              image={image}
                              key={id}
                            />
                          </a>
                        </Col>
                      );
                    })) ||
                  (!error && (
                    <EmptyAccomondations>
                      No accommodations found
                    </EmptyAccomondations>
                  )) || <Error string={error} path="accomondation" />}
              </Row>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container padding="0 0 50px 0">
        <Row justifyContent="center">
          <Col xs={11} md={8}>
            <FilterContainer>
              <Col xs={12}>
                <Category>
                  <CategoryButton onClick={HandleClickCategory} value="all">
                    Show all
                  </CategoryButton>
                </Category>
              </Col>
            </FilterContainer>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps() {
  let data = [];

  try {
    const response = await axios.get(BASE_URL + ACCOMMONDATION_PATH);

    data = response.data;
  } catch (error) {
    return {
      props: {
        error: error.toString(),
      },
    };
  }

  return {
    props: {
      content: data,
      length: data.length,
    },
  };
}

export default Accommodation;
