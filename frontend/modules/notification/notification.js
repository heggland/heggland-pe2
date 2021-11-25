import { useState } from "react";
import * as Style from "./notification.style";

const Notification = ({ children, type }) => {
  const [text, setText] = useState(true);

  setTimeout(() => {
    setText(false);
  }, 1500);
  return text && <Style.Container type={type}>{children}</Style.Container>;
};
export default Notification;
