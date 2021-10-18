const Heading = ({
  size = 1,
  align,
  children,
}: {
  size?: number;
  align?: string;
  children?: React.ReactNode;
}) => {
  switch (size) {
    case 1:
      return <h1 className={align}>{children}</h1>;
    case 2:
      return <h2 className={align}>{children}</h2>;
    case 3:
      return <h3 className={align}>{children}</h3>;
    case 4:
      return <h4 className={align}>{children}</h4>;
    case 5:
      return <h5 className={align}>{children}</h5>;
    case 6:
      return <h6 className={align}>{children}</h6>;
    default:
      return <h1 className={align}>{children}</h1>;
  }
};

export default Heading;
