import { useContext } from "react";
import { MessageTable } from "../components/MessageTable";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

export const ReceivedMessagesPage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div
      style={{
        width: "80%",
        backgroundColor: "gray",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h3>Check and/or download messages</h3>
      {currentUser ? <MessageTable /> : <Navigate to={"/login"} />}
    </div>
  );
};
