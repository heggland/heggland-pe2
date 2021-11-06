import Style from "./Row.style";

const Row = (props) => {
  const { children, ...rest } = props;
  return <Style values={rest}>{children}</Style>;
};

export default Row;
