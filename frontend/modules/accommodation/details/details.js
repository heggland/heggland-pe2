import Heading from "../../../components/Common/Heading";
import { BASE_URL } from "../../../constants/api";
import * as Style from "./details.style";

const Details = ({ accommodation }) => {
  let img;
  let alt;
  if (accommodation.image.length != 0) {
    img = BASE_URL + accommodation.image[0].url;
    alt = accommodation.image[0].alternativeText;
  }

  console.log(accommodation);

  return (
    <Style.Container>
      <img src={img} alt={alt} />
      <Heading>{accommodation.name}</Heading>
      <Style.Text>{accommodation.description}</Style.Text>

      <Heading size={3}>Locaction</Heading>
      <Style.Text>{accommodation.city}</Style.Text>
      <Style.Text>{accommodation.address}</Style.Text>
      <Style.Text>{accommodation.zip_code}</Style.Text>
    </Style.Container>
  );
};

export default Details;
