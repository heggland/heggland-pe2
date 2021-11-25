import Col from "../Col/Col";
import Row from "../Row/Row";
import Container from "../Container/Container";
import * as Style from "./Footer.style";
import Heading from "../Common/Heading";

const Footer = () => {
  return (
    <Style.Footer>
      <Container>
        <Row justifyContent="center" padding="20px 0 50px 0 ">
          <Col xs={12} sm={8}>
            <Row>
              <Col xs={12} sm={4}>
                <Row>
                  <Col xs={12} sm={9}>
                    <Heading size={5}>Copyright</Heading>
                  </Col>
                  <Col xs={12} sm={9}>
                    Holidaze &copy; 2021
                  </Col>
                  <Col xs={12} sm={9}>
                    All rights reserved
                  </Col>
                </Row>
              </Col>
              <Col xs={12} sm={4}>
                <Row justifyContent="center">
                  <Col xs={12} sm={9}>
                    <Heading size={5}>Social media</Heading>
                  </Col>
                  <Col xs={12} sm={9}>
                    Twitter, Instagram, Facebook,
                  </Col>
                  <Col xs={12} sm={9}>
                    and YouTube
                  </Col>
                </Row>
              </Col>
              <Col xs={12} sm={4}>
                <Row justifyContent="end">
                  <Col xs={12} sm={9}>
                    <Heading size={5}>Contact</Heading>
                  </Col>
                  <Col xs={12} sm={9}>
                    <a href="/contact">Get in touch with us here.</a>
                  </Col>
                  <Col xs={12} sm={9}>
                    4600 Kristiansand, Strandgata 13, Norway, +00 12 34 56 78
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Style.Footer>
  );
};

export default Footer;
