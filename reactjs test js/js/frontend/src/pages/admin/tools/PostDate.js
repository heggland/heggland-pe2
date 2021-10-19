import { useContext } from "react";
import StatusContext from "../../../context/StatusContext";
import FormatDate from "../../../components/Common/FormatDate";

export default function PostDate({ date, modifiedDate }) {
  const [status] = useContext(StatusContext);
  if (status) {
    console.log(status);
    modifiedDate = new Date();
  }
  return (
    <>
      {status ? (
        <FormatDate date={date} modifiedDate={modifiedDate} />
      ) : (
        <FormatDate date={date} modifiedDate={modifiedDate} />
      )}
    </>
  );
}
