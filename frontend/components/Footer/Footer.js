import * as Style from "./Footer.style";

const Footer = () => {
  // create one new true/false usestate

  return (
    <Style.Footer className="mt-5">
      Environment: {process.env.NODE_ENV}
    </Style.Footer>
  );
};

export default Footer;
