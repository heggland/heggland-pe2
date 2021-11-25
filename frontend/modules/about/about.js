import Image from "next/image";
import Col from "../../components/Col/Col";
import Heading from "../../components/Common/Heading";
import Row from "../../components/Row/Row";
import aboutImg from "../../public/aboutus.jpg";

import * as Style from "./about.style";

const About = () => {
  return (
    <Row justifyContent="center">
      <Col xs={11} md={8}>
        <Row>
          <Col xs={12} md={6}>
            <Heading size={2}>About Us</Heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut
              elit eget urna condimentum porta ac ut nibh. Nunc sit amet erat
              non elit suscipit vehicula. Nulla euismod neque semper felis
              imperdiet, ut sodales turpis efficitur. Pellentesque volutpat est
              ornare ultrices malesuada. Fusce ultrices mauris quis suscipit
              tempor. Cras id mauris sed justo semper varius. In hendrerit urna
              elit, scelerisque lacinia leo porta a. Sed eu vulputate massa.
            </p>
            {/*                 <Row xs="none" sm="none" padding="20px 5px">
        <Image src={logo} width={75} height={75} />
      </Row> */}
          </Col>
          <Col xs="none" sm="none" md={1} />
          <Col xs={12} sm={6} md={5}>
            <Row justifyContent="center">
              <Style.ImageContainer>
                <Image src={aboutImg} alt="Photo by Monstera from Pexels" />
              </Style.ImageContainer>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default About;
