import Style from "./Paragraph.style";

const Paragraph = (props) => {
  const { children, ...rest } = props;
  return <Style values={rest}>{children}</Style>;
};

export default Paragraph;
