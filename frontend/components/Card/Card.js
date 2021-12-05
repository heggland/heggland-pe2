import Heading from "../Common/Heading";
import * as Style from "./Card.style";
import Image from "next/image";

const Card = ({ name, city, image }) => {
  let img;
  let alt;
  if (image[0]) {
    img = image[0].url;
    alt = image[0].alternativeText;
  }
  return (
    <Style.Card>
      <Style.Head>
        <Style.Image>
          <Image
            src={img}
            alt={alt}
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </Style.Image>
      </Style.Head>
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
