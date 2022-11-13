import { SendFileBox } from "../components/SendFileBox";

const title = "SEND FILE TO A USER";
export const SendFilePage = () => {
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
      <SendFileBox />
    </div>
  );
};
