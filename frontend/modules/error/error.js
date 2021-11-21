import * as Style from "./error.style";

const Error = ({ string, path }) => {
  //  array that hold html errors and description
  const errorsArray = [
    {
      code: "400",
      description: "Bad Request",
      comment: "The request cannot be fulfilled due to bad syntax.",
      custom: {
        login: "Invalid login, try with different credentials",
      },
    },
    {
      code: "401",
      description: "Unauthorized",
      comment:
        "The request was a legal request, but the server is refusing to respond to it.",
      note: "you dont have permissions to do that",
      custom: {
        admin: "you dont have permissions to do that",
      },
    },
    {
      code: "403",
      description: "Forbidden",
      comment:
        "The server understood the request, but is refusing to fulfill it.",
      note: "There might be some permission issues",
      custom: {
        contact:
          "An unexpected error occured on the server. Please call us at 12345678.",
        enquirie:
          "An unexpected error occured on the server. Please call us at 12345678.",
        accomondation:
          "An unexpected error occured on the server. Permission issue.",
        search: "An unexpected error occured on the server. Permission issue.",
      },
    },
    {
      code: "404",
      description: "Not Found",
      comment: "The server has not found anything matching the request URI.",
    },
    {
      code: "405",
      description: "Method Not Allowed",
      comment:
        "The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.",
    },
    {
      code: "408",
      description: "Request Timeout",
      comment:
        "The client did not produce a request within the time that the server was prepared to wait.",
    },
    {
      code: "500",
      description: "Internal Server Error",
      comment:
        "The server encountered an unexpected condition which prevented it from fulfilling the request.",
    },
    {
      code: "501",
      description: "Not Implemented",
      comment:
        "The server does not support the functionality required to fulfill the request.",
    },
    {
      code: "502",
      description: "Bad Gateway",
      comment:
        "The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.",
    },
    {
      code: "503",
      description: "Service Unavailable",
      comment:
        "The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.",
    },
    {
      code: "504",
      description: "Gateway Timeout",
      comment:
        "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI (e.g. HTTP, FTP, LDAP) or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request.",
    },
    {
      code: "505",
      description: "HTTP Version Not Supported",
      comment:
        "The server does not support, or refuses to support, the HTTP protocol version that was used in the request message.",
    },
  ];

  // filter out error code from string
  const filteredError = errorsArray.find((item) => string.includes(item.code));
  /*   const stringError =
    filteredError.code +
    " " +
    filteredError.description +
    " " +
    filteredError.comment; */

  if (string.includes("ECONNREFUSED")) {
    return (
      <Style.ErrorString>Connection error to the server! </Style.ErrorString>
    );
  }

  // custom errors
  if (path) {
    const paths = ["contact", "login", "enquiry", "accomondation"];
    const filteredPath = paths.find((item) => path.includes(item));

    const customError =
      path === filteredPath
        ? filteredError.custom[filteredPath]
        : filteredError.note;

    return <Style.ErrorString>{customError}</Style.ErrorString>;
  }

  return (
    <Style.Container>
      <Style.Title>{filteredError.code}</Style.Title>
      <Style.Subtitle>{filteredError.description}</Style.Subtitle>
      <Style.Description>{filteredError.comment}</Style.Description>
      {filteredError.note && <Style.Note>{filteredError.note}</Style.Note>}
    </Style.Container>
  );
};

export default Error;
