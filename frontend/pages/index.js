import Heading from "../components/Common/Heading";
import Layout from "../components/Layout/Layout";
import { DESCRIPTION_HOME, TITLE_HOME } from "../constants/meta";
import axios from "axios";
import { ACCOMMONDATION_PATH, BASE_URL } from "../constants/api";

import styled from "styled-components";
import * as Breakpoints from "../components/Global/Breakpoints";

import Card from "../components/Card/Card";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";
import Header from "../components/Header/Header";
import Error from "../modules/error/error";
import SearchBox from "../modules/searchBox/searchBox";

import Services from "../modules/services/services";
import About from "../modules/about/about";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft as BackIcon,
  faChevronRight as ForwardIcon,
} from "@fortawesome/free-solid-svg-icons";

const PageButton = styled.div`
  height: 100%;
  align-self: center;
  &:hover {
    cursor: pointer;
  }
  stroke: black;
  stroke-width: 25;
  color: white;
`;

const Content = styled.div`
  ${Breakpoints.mobileOnly} {
    display: flex;
    flex-direction: row;
    overflow-y: scroll;
    flex-wrap: inherit;

    & > * > * {
      width: 300px;
    }
  }
`;

const Board = styled.div`
  & > * {
    min-height: 100%;
    ${Breakpoints.sm} {
      min-height: calc(395px * 2);
    }
    ${Breakpoints.md} {
      min-height: 100%;
    }
  }
`;

const Index = ({ content, error }) => {
  let featuredPages = [];
  let featured;
  let searchContent = content;
  const [page, setPage] = useState(0);
  // const [scroll, setScroll] = useState(0);

  if (content) {
    // filter out featured accomondations
    featured = content.filter((item) => item.featured === true);
    // sorting accomondations by id
    featured = featured.sort((a, b) => {
      return (a.id > b.id && -1) || (a.id < b.id && 1) || 0;
    });

    // devide featured accomondations into pages on 8
    for (let i = 0; i < featured.length; i += 4) {
      featuredPages.push(featured.slice(i, i + 4));
    }

    // filter out cities to be used in SearchBox.
    let cities = content.map((item) => {
      return item.city;
    });
    // remove duplicate in the array
    cities = [...new Set(cities)];

    const cityObject = [];
    cities.forEach((city) => {
      cityObject.push({
        name: city,
        city: city,
        id: city,
      });
    });

    // cities first then the accomondations
    searchContent = cityObject.concat(searchContent);
  }

  const [pagination, setPagination] = useState(featuredPages[0]);

  const handleClickForward = () => {
    if (page === 0) {
      setPage(1);
      if (featuredPages[1]) {
        setPagination(featuredPages[1]);
      }
    } else {
      let newPage = page + 1;
      setPage(newPage);
    }
  };

  const handleClickBack = () => {
    if (page === 1) {
      setPage(0);
      setPagination(featuredPages[0]);
    } else {
      let newPage = page - 1;
      setPage(newPage);
      if (featuredPages[newPage]) {
        setPagination(featuredPages[newPage]);
      }
    }
  };

  return (
    <Layout title={TITLE_HOME} description={DESCRIPTION_HOME}>
      <Header page="home" />
      <SearchBox
        content={searchContent && searchContent.length >= 1 && searchContent}
        width={7}
      />
      <Container placeContent="center" backgroundColor="odd" padding="100px 0">
        <About />
      </Container>
      <Container placeContent="center" backgroundColor="even" padding="100px 0">
        <Row justifyContent="center">
          <Col xs={11} sm={11} md={8}>
            <Row>
              <Heading size={2}>Recommended establishments</Heading>
            </Row>
            <Board>
              <Row>
                <Col xs="none" sm={0.5} alignSelf="center">
                  {page !== 0 && (
                    <PageButton onClick={handleClickBack}>
                      <FontAwesomeIcon icon={BackIcon} transform="shrink-11" />
                    </PageButton>
                  )}
                </Col>
                <Col xs={12} sm={11}>
                  <Row placeContent="center">
                    {(featured &&
                      featured.length >= 1 &&
                      pagination &&
                      pagination.map(({ id, name, image, city }) => {
                        return (
                          <Col xs="none" sm={6} md={6} lg={6} xxl={3} key={id}>
                            <Card
                              name={name}
                              city={city}
                              image={image}
                              id={id}
                            />
                          </Col>
                        );
                      })) ||
                      (!error && <span>No featured establishments</span>) || (
                        <Error string={error} path="accomondation" />
                      )}
                  </Row>
                  <Content>
                    {(featured &&
                      featured.length >= 1 &&
                      featured.map(({ id, name, image, city }) => {
                        return (
                          <Col xs={12} sm="none" key={id}>
                            <Card
                              name={name}
                              city={city}
                              image={image}
                              id={id}
                            />
                          </Col>
                        );
                      })) ||
                      (!error && <span>No featured establishments</span>) || (
                        <Error string={error} path="accomondation" />
                      )}
                  </Content>
                </Col>
                <Col xs="none" sm={0.5} alignSelf="center">
                  {pagination.length === 4 && (
                    <PageButton onClick={handleClickForward}>
                      <FontAwesomeIcon
                        icon={ForwardIcon}
                        transform="shrink-11"
                      />
                    </PageButton>
                  )}
                </Col>
              </Row>
            </Board>
          </Col>
        </Row>
      </Container>
      <Container placeContent="center" backgroundColor="odd" padding="100px 0">
        <Row justifyContent="center">
          <Col xs={11} md={8}>
            <Services />
          </Col>
        </Row>
      </Container>
      <Container placeContent="center" backgroundColor="even" padding="100px 0">
        <Row justifyContent="center">
          <Col xs={11} md={8}>
            <Heading size={2}>We are trusted by thousands of travelers</Heading>
            <p>
              <i>
                Suspendisse posuere neque non odio blandit, et facilisis est
                venenatis. - Nullam commodo .
              </i>
            </p>
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

export default Index;
