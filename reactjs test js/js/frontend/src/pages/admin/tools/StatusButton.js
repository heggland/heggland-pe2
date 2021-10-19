import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import UseAxios from "../../../hooks/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import StatusContext from "../../../context/StatusContext";

export default function StatusButton(props) {
  const [updateStatusButton, SetUpdateStatusButton] = useState(null);
  const [updateType, SetUpdateType] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSave] = useState(false);
  const [, setStatus] = useContext(StatusContext);

  const http = UseAxios();

  const url = `/wp/v2/posts/${props.identity}`;

  // return variables
  let type = updateType;
  let faButton;
  const spinnerIcon = <FontAwesomeIcon icon={faSpinner} />;
  const publishedIcon = <FontAwesomeIcon icon={faCheck} />;
  const draftIcon = <FontAwesomeIcon icon={faSave} />;

  if (!updateType) {
    if (updateStatusButton === null) {
      if (props.status === "publish") {
        type = "success";
        faButton = publishedIcon;
      } else if (props.status === "draft") {
        type = "warning";
        faButton = draftIcon;
      } else {
        type = updateType;
      }
    } else {
      if (updateStatusButton === "publish") {
        type = "success";
        faButton = publishedIcon;
      } else if (updateStatusButton === "draft") {
        type = "warning";
        faButton = draftIcon;
      }
    }
  }

  async function updateStatus() {
    let status = props.status === "publish" ? "draft" : "published";
    const confirmUpdate = window.confirm(
      "Post Title: " +
        props.title +
        "\nUpdate status from " +
        props.status +
        " to " +
        status +
        "?"
    );

    if (confirmUpdate) {
      setSave(true);
      SetUpdateType("secondary");

      if (updateStatusButton === null) {
        status = props.status === "publish" ? "draft" : "publish";
      } else {
        status = updateStatusButton === "publish" ? "draft" : "publish";
      }

      const data = {
        id: props.identity,
        status: status,
      };

      try {
        const putResponse = await http.put(url, data);
        if (putResponse.status === 200 || putResponse.status === 201) {
          SetUpdateStatusButton(putResponse.data.status);
          setStatus(putResponse.data.status);
          setSave(true);
        }
      } catch (error) {
        setError(error);
        console.log("error", error);
      } finally {
        SetUpdateType(null);
        setSave(false);
      }
    }
  }

  return (
    <>
      {updateStatusButton === "publish" || updateStatusButton === "draft" ? (
        <Button
          variant={type}
          className="update"
          onClick={updateStatus}
          data-toggle="tooltip"
          data-placement="top"
          title={"Update status to " + updateStatusButton}
        >
          {!error ? (!saving ? faButton : spinnerIcon) : "error"}
        </Button>
      ) : (
        <Button
          variant={type}
          className="update"
          onClick={updateStatus}
          data-toggle="tooltip"
          data-placement="top"
          title={
            props.status !== "publish"
              ? "Set status to publish"
              : "Set status to  draft"
          }
        >
          {!saving ? faButton : spinnerIcon}
        </Button>
      )}
    </>
  );
}
