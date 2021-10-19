import { useContext } from "react";
import StatusContext from "../../../context/StatusContext";

export default function TitleLink(props) {
  const [updatedStatus] = useContext(StatusContext);

  let status = props.status;
  if (updatedStatus) {
    status = updatedStatus;
  }

  return (
    <>
      {status === "publish" ? (
        <a
          href={"/posts/" + props.id}
          target="_blank"
          rel="noreferrer"
          data-toggle="tooltip"
          data-placement="top"
          title="Show post"
          className="border-bottom border-dark text-decoration-none text-dark font-weight-bold"
        >
          {props.children}
        </a>
      ) : status === "draft" ? (
        <a
          href={"/admin/draft/" + props.id}
          target="_blank"
          rel="noreferrer"
          data-toggle="tooltip"
          data-placement="top"
          title="Preview post"
          className="border-bottom border-dark text-decoration-none text-dark font-weight-bold"
        >
          {props.children}
        </a>
      ) : (
        <span>{props.children}</span>
      )}
    </>
  );
}
