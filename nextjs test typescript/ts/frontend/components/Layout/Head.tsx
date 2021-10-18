import NextHead from "next/head";

const Head = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={description} />
    </NextHead>
  );
};

export default Head;
