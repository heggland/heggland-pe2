import Heading from "../../../components/Common/Heading";
import { BASE_URL } from "../../../constants/api";
import * as Style from "./details.style";
import Col from "./../../../components/Col/Col";
import Row from "./../../../components/Row/Row";

const Details = ({ accommodation }) => {
  let img;
  let alt;
  if (accommodation.image.length != 0) {
    img = BASE_URL + accommodation.image[0].url;
    alt = accommodation.image[0].alternativeText;
  }

  return (
    <Style.Container>
      <Row justifyContent="center" padding="5% 0 0 0">
        <Col md={6}>
          <Style.Image src={img} alt={alt} width="100%" />
          <Heading>{accommodation.name}</Heading>
          <Style.Text>{accommodation.description}</Style.Text>

          <Heading size={3}>Locaction</Heading>
          <address>
            <Style.Text>{accommodation.city}</Style.Text>
            <Style.Text>{accommodation.address}</Style.Text>
            <Style.Text>{accommodation.zip_code}</Style.Text>
          </address>
        </Col>
      </Row>
    </Style.Container>
  );
};

export default Details;
