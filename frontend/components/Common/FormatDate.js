import PropTypes from "prop-types";

export default function FormatDate({ date }) {
  if (!date) {
    return <> </>;
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatted = new Intl.DateTimeFormat("en-UK", options).format(
    new Date(date)
  );

  // suppressHydrationWarning, Text content did not match. Server: "October 28, 2021" Client: "28 October 2021"
  return <span suppressHydrationWarning>{formatted}</span>;
}

FormatDate.proptTypes = {
  date: PropTypes.node.isRequired,
};
