import Row from "react-bootstrap/Col";

import PropTypes from "prop-types";

export default function FormatDate({ date, modifiedDate }) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatted = new Intl.DateTimeFormat("en-UK", options).format(
    new Date(date)
  );

  if (modifiedDate) {
    const formattedModified = new Intl.DateTimeFormat("en-UK", options).format(
      new Date(modifiedDate)
    );

    if (formatted !== formattedModified) {
      return (
        <>
          <Row
            className="px-0 cursor-help"
            data-toggle="tooltip"
            data-placement="top"
            role="button"
            title={"Post created at " + formatted}
          >
            {formatted}
          </Row>
          <Row
            className="px-0 cursor-help"
            data-toggle="tooltip"
            data-placement="top"
            title={"Post last modified at " + formattedModified}
          >
            <small role="button" className="cursor-help">
              * {formattedModified}
            </small>
          </Row>
        </>
      );
    }
  }

  return (
    <Row
      className="px-0 cursor-help"
      data-toggle="tooltip"
      data-placement="top"
      title={"Post created at " + formatted}
    >
      {formatted}
    </Row>
  );
}

FormatDate.proptTypes = {
  date: PropTypes.node.isRequired,
};
