import Style from "./Span.style";

const Span = (props) => {
  const { children, ...rest } = props;
  return <Style values={rest}>{children}</Style>;
};

export default Span;
