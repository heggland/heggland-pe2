import * as Style from "./Header.style";
import Image from "next/image";
import HeadImg from "../../public/head.jpg";

const Header = ({ page }) => {
  return (
    <Style.Header page={page}>
      <Image src={HeadImg} alt="header" />
    </Style.Header>
  );
};

export default Header;
