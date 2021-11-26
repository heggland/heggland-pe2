import Layout from "../components/Layout/Layout";
import { DESCRIPTION_CONTACT, TITLE_CONTACT } from "../constants/meta";
import Heading from "../components/Common/Heading";
import ContactForm from "../modules/contactForm/contactForm";
import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";
import Header from "../components/Header/Header";
import styled from "styled-components";
import * as Breakpoints from "../components/Global/Breakpoints";

const Position = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  display: column;
  top: 50%;
  transform: translate(0, -50%);

  /*  & > * > * {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  } */

  ${Breakpoints.sm} {
    display: flex;
    display: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
  } ;
`;

export default function Home() {
  return (
    <Layout title={TITLE_CONTACT} description={DESCRIPTION_CONTACT}>
      <Header page="contact" />
      <Position>
        <Container placeContent="center">
          <Row justifyContent="center">
            <Col xs={11} md={12} backgroundColor="white">
              <Row padding="0 0 0 30px" justifyContent="center">
                <Heading>Contact us</Heading>
              </Row>
              <Row>
                <Col xs={12} padding="30px">
                  <ContactForm />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Position>
    </Layout>
  );
}
