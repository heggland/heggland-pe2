import * as Style from "./Header.style";

const Header = ({ page, imgUrl, imgAlt }) => {
  return (
    <Style.Header page={page}>
      <img src={imgUrl} alt={imgAlt} />
    </Style.Header>
  );
};

export default Header;
