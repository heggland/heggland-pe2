import * as Style from "./Header.style";
import Image from "next/image";
import HeadImg from "../../public/head.jpg";
import Col from "../Col/Col";
import Row from "../Row/Row";

const Header = ({ page }) => {
  return (
    <Row justifyContent="center">
      <Col xs={12}>
        <Style.Header page={page}>
          <Image
            src={HeadImg}
            alt="Photo by Valdemaras D. from Pexels"
            layout="responsive"
            objectFit="cover"
            priority="eager"
          />
        </Style.Header>
      </Col>
    </Row>
  );
};

export default Header;
