import Button from "react-bootstrap/Button";
import { useState } from "react";
import UseAxios from "../../../hooks/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteButton(props) {
  const [error, setError] = useState(null);

  const http = UseAxios();

  const url = `/wp/v2/posts/${props.id}`;

  async function handleDelete() {
    const confirmDelete = window.confirm("Delete this post?");

    if (confirmDelete) {
      try {
        const check = await http.delete(url);
        if (check.data.status === "trash") {
          document.querySelector("#item-" + props.id).remove();
        }
      } catch (error) {
        setError(error);
      }
    }
  }

  return (
    <Button
      variant="danger"
      className="delete"
      onClick={handleDelete}
      data-toggle="tooltip"
      data-placement="top"
      title="Delete post"
    >
      {error ? "Error" : <FontAwesomeIcon icon={faTrash} />}
    </Button>
  );
}
