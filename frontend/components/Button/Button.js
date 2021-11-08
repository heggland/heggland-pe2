import Style from "./Button.style";

const Button = (props) => {
  const { children, ...rest } = props;
  return <Style values={rest}>{props.children}</Style>;
};

export default Button;
