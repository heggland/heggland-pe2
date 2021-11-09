import Style from "./Col.style";

const Col = (props) => {
  const { children, ...rest } = props;

  // regex to only accept rest key with string
  const restKeys = Object.keys(rest).filter(
    (key) => typeof rest[key] === "string"
  );
  return <Style values={rest}>{props.children}</Style>;
};

export default Col;
