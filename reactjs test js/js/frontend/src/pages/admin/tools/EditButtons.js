import Button from "react-bootstrap/Button";

import { useHistory } from "react-router";

export default function Editbuttons(props) {
  const history = useHistory();

  function newPost() {
    history.push("/admin/new/");
  }

  function editPost() {
    history.push("/admin/edit/" + props.id);
  }

  let variant;
  let HandleButtonPress;
  let toolTitle;
  switch (props.type) {
    case "new":
      variant = "success";
      HandleButtonPress = newPost;
      toolTitle = "Make a new post";
      break;
    case "edit":
      variant = "success";
      HandleButtonPress = editPost;
      toolTitle = "Edit post";
      break;
    default:
      variant = "primary";
      HandleButtonPress = editPost;
      break;
  }

  return (
    <Button
      variant={variant}
      onClick={HandleButtonPress}
      data-toggle="tooltip"
      data-placement="top"
      title={toolTitle}
    >
      {props.children}
    </Button>
  );
}
