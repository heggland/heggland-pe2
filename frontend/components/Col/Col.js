import Style from "./Col.style";

const Col = (props) => {
  const { children, ...rest } = props;

  console.log(rest);

  return <Style width={rest}>{props.children}</Style>;
};
export default Col;
