import * as Style from "./services.style";

import Heading from "../../components/Common/Heading";
import Row from "../../components/Row/Row";
import Col from "../../components/Col/Col";

import Image from "next/image";
import hotel from "../../public/hotel.jpg";
import resort from "../../public/resort.jpg";
import apartment from "../../public/apartment.jpg";
import homestay from "../../public/homestay.jpg";

const services = () => {
  return (
    <>
      <Heading size={2}>Our services</Heading>
      <p>
        Suspendisse posuere neque non odio blandit, et facilisis est venenatis.
        Nullam commodo ligula justo.
      </p>
      <Col xs={12}>
        <Row padding="0 0 10px 0">
          <Style.Group>
            <Col xs={12} sm={5.5}>
              <Style.Card>
                <Row>
                  <Col xs={12} sm={5.5}>
                    <Style.Image>
                      <Image
                        src={hotel}
                        alt="Photo by Jovydas Pinkevicius from Pexels"
                        layout="fill"
                        objectFit="contain"
                      />
                    </Style.Image>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Heading size={4}>Hotels</Heading>
                    Suspendisse posuere neque non odio blandit, et facilisis est
                    venenatis. Nullam commodo ligula justo.
                  </Col>
                </Row>
              </Style.Card>
            </Col>
            <Col xs={1} />
            <Col xs={12} sm={5.5}>
              <Style.Card>
                <Row>
                  <Col xs={12} sm={6}>
                    <Style.Image>
                      <Image
                        src={apartment}
                        alt="Photo by SevenStorm JUHASZIMRUS from Pexels"
                        layout="fill"
                        objectFit="contain"
                      />
                    </Style.Image>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Heading size={4}>Apartments</Heading>
                    Suspendisse posuere neque non odio blandit, et facilisis est
                    venenatis. Nullam commodo ligula justo.
                  </Col>
                </Row>
              </Style.Card>
            </Col>
          </Style.Group>
        </Row>

        <Row padding="0 0 10px 0">
          <Style.Group>
            <Col xs={12} sm={5.5}>
              <Style.Card>
                <Row>
                  <Col xs={12} sm={6}>
                    <Style.Image>
                      <Image
                        src={resort}
                        alt="Photo by Vincent Gerbouin from Pexels"
                        layout="fill"
                        objectFit="contain"
                      />
                    </Style.Image>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Heading size={4}>Resorts</Heading>
                    Suspendisse posuere neque non odio blandit, et facilisis est
                    venenatis. Nullam commodo ligula justo.
                  </Col>
                </Row>
              </Style.Card>
            </Col>
            <Col xs={1} />
            <Col xs={12} sm={5.5}>
              <Style.Card>
                <Row>
                  <Col xs={12} sm={6}>
                    <Style.Image>
                      <Image
                        src={homestay}
                        alt="Photo from Pexels"
                        layout="fill"
                        objectFit="contain"
                      />
                    </Style.Image>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Heading size={4}>Homestays</Heading>
                    Suspendisse posuere neque non odio blandit, et facilisis est
                    venenatis. Nullam commodo ligula justo.
                  </Col>
                </Row>
              </Style.Card>
            </Col>
          </Style.Group>
        </Row>
      </Col>
    </>
  );
};
export default services;
