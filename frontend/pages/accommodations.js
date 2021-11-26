import Layout from "../components/Layout/Layout";
import {
  TITLE_ACCOMMONDATION,
  DESCRIPTION_ACCOMMONDATION,
} from "../constants/meta";
import Heading from "../components/Common/Heading";
import axios from "axios";
import { BASE_URL, ACCOMMONDATION_PATH } from "../constants/api";

import Error from "../modules/error/error";

import Card from "../components/Card/Card";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";

import styled from "styled-components";
import { useState } from "react";

import * as Colors from "../constants/colors";
import { set } from "react-hook-form";

const CategoryContainer = styled.div`
  display: flex;
  margin-top: -50px;
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

const Accommodation = ({ content, error }) => {
  const [accommondation, setAccommodation] = useState(content);

  /*   // sort content by name
  content = content.sort((a, b) => {
    return (a.name < b.name && -1) || (a.name > b.name && 1) || 0;
  }); */

  const HandleClickCategory = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setAccommodation(content);
    } else {
      // filter out the content by category value
      const filteredContent = content.filter((item) => {
        return item.category === value;
      });
      setAccommodation(filteredContent);
    }
  };
  return (
    <Layout
      title={TITLE_ACCOMMONDATION}
      description={DESCRIPTION_ACCOMMONDATION}
    >
      <Container padding="0 0 50px 0">
        <Row justifyContent="center">
          <Col xs={11} md={8}>
            <Row padding="100px 0 100px 0" flexDirection="column">
              <Row>
                <CategoryContainer>
                  <Category>
                    <CategoryButton onClick={HandleClickCategory} value="hotel">
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
                </CategoryContainer>
              </Row>
              <Row>
                {(accommondation &&
                  accommondation.length >= 1 &&
                  accommondation.map(({ id, name, image, city }) => {
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
            <CategoryContainer>
              <Category>
                <CategoryButton onClick={HandleClickCategory} value="all">
                  Show all
                </CategoryButton>
              </Category>
            </CategoryContainer>
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
