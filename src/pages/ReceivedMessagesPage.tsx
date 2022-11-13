import { MessageTable } from "../components/MessageTable";

export const ReceivedMessagesPage = () => {
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
      <MessageTable />
    </div>
  );
};
