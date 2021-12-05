import Col from "../Col/Col";
import Row from "../Row/Row";
import Container from "../Container/Container";
import * as Style from "./Footer.style";
import Heading from "../Common/Heading";

import {
  faFacebook as FacebookIcon,
  faTwitter as TwitterIcon,
  faYoutube as YoutubeIcon,
  faInstagram as InstagramIcon,
} from "@fortawesome/free-brands-svg-icons";

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
                    <u>
                      <Heading size={4}>Copyright</Heading>
                    </u>
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
                  <Col xs={11} sm={9}>
                    <u>
                      <Heading size={4}>Social media</Heading>
                    </u>
                  </Col>
                  <Col xs={11} sm={9}>
                    <Row>
                      <Col xs={12} md={10} xl={6}>
                        <Style.Link href="#">
                          <Row>
                            <Col xs={7}>Twitter</Col>
                            <Col xs={5}>
                              <Style.SocialMediaIcon icon={TwitterIcon} />
                            </Col>
                          </Row>
                        </Style.Link>
                      </Col>
                      <Col xs={12} md={10} xl={6}>
                        <Style.Link href="#">
                          <Row>
                            <Col xs={7}>Facebook</Col>
                            <Col xs={5}>
                              <Style.SocialMediaIcon icon={FacebookIcon} />
                            </Col>
                          </Row>
                        </Style.Link>
                      </Col>
                      <Col xs={12} md={10} xl={6}>
                        <Style.Link href="#">
                          <Row>
                            <Col xs={7}>Youtube</Col>
                            <Col xs={5}>
                              <Style.SocialMediaIcon icon={YoutubeIcon} />
                            </Col>
                          </Row>
                        </Style.Link>
                      </Col>
                      <Col xs={12} md={10} xl={6}>
                        <Style.Link href="#">
                          <Row>
                            <Col xs={7}>Instagram</Col>
                            <Col xs={5}>
                              <Style.SocialMediaIcon icon={InstagramIcon} />
                            </Col>
                          </Row>
                        </Style.Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} sm={4}>
                <Row justifyContent="end">
                  <Col xs={12} sm={9}>
                    <a href="/contact">
                      <u>
                        <Heading size={4}>Contact</Heading>
                      </u>
                    </a>
                  </Col>
                  <Col xs={12} sm={9}>
                    <address>
                      <span>4600 Kristiansand, </span>
                      <span>Strandgata 13</span>
                      <br />
                      <span>Norway, </span>
                      <span>+00 12 34 56 78 </span>
                    </address>
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
