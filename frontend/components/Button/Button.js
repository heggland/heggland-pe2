import Style from "./Button.style";

const Button = (props) => {
  const { children, ...rest } = props;
  return <Style values={rest}>{children}</Style>;
};

export default Button;
