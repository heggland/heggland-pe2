import * as Style from "./Header.style";

const Header = ({ imgUrl, imgAlt }) => {
  return (
    <Style.Header>
      <img src={imgUrl} alt={imgAlt} />
    </Style.Header>
  );
};

export default Header;
