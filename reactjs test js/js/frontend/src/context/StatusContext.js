import React, { useState } from "react";

const StatusContext = React.createContext([null, () => {}]);

export const StatusProvider = (props) => {
  const [status, setStatus] = useState(null, null);
  return (
    <StatusContext.Provider value={[status, setStatus]}>
      {props.children}
    </StatusContext.Provider>
  );
};

export default StatusContext;
