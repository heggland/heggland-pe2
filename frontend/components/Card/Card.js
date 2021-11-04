import { BASE_URL } from "../../constants/api";
import Heading from "../Common/Heading";
import * as Style from "./Card.style";

const Card = ({ name, city, image }) => {
  let img;
  let alt;
  if (image[0]) {
    img = BASE_URL + image[0].url;
    alt = image[0].alternativeText;
  }
  return (
    <Style.Card>
      <Style.Image src={img} alt={alt} />
      <Style.Content>
        <Style.Heading>
          <Heading size={4}>{name}</Heading>
        </Style.Heading>
        <Style.Text>{city}</Style.Text>
      </Style.Content>
    </Style.Card>
  );
};

export default Card;
