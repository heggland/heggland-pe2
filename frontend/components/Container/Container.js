import Style from "./Container.style";

const Container = (props) => {
  const { children, ...rest } = props;
  return <Style values={rest}>{props.children}</Style>;
};

export default Container;
