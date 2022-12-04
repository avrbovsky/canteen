import { useContext } from "react";
import { SendFileBox } from "../components/SendFileBox";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const title = "SEND FILE TO A USER";
export const SendFilePage = () => {
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
      <h3>{title}</h3>
      {currentUser ? <SendFileBox /> : <Navigate to={"/login"} />}
    </div>
  );
};
