import { useState } from "react";
import * as Style from "./save.style";

const save = ({ children }) => {
  const [text, setText] = useState(true);

  setTimeout(() => {
    setText(false);
  }, 1500);

  return text && <Style.Container>{children}</Style.Container>;
};
export default save;
