import * as Style from "./Header.style";
import Image from "next/image";
//import sogndalstrand from "../../public/sogndalstrand.jpg";

const Header = ({ page, imgUrl, imgAlt }) => {
  return (
    <Style.Header page={page}>
      <img src={imgUrl} alt={imgAlt} />
      {/* <Image src={sogndalstrand} alt="My image" /> */}
    </Style.Header>
  );
};

export default Header;
