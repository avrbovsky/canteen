import { Button, Table } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { url } from "../config";
import { message } from "../types";
import { UserContext } from "../contexts/UserContext";
import { useGetUsers } from "../hooks/useGetUsers";

type receivedMessage = {
  id: number;
  login: string;
  filename: string;
  sent_time: string;
  receiver_id: number;
};

export const MessageTable = () => {
  const [messages, setMessages] = useState<receivedMessage[]>([]);
  const { users } = useGetUsers();
  const { currentUser } = useContext(UserContext);
  const [downloading, setDownloading] = useState<boolean>(false);

  // const handleFileDownload = (filename: string) => {
  //   setDownloading(true);
  //   fetch(`${url}/api/readMessage`, {
  //     method: "GET",
  //     body: JSON.stringify({
  //       receiverId: currentUser!.id,
  //       fileName: filename,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {})
  //     .finally(() => {
  //       setDownloading(false);
  //     });
  // };

  const handleFileDownload = (fileName: string) => {
    fetch(
      `${url}/api/readMessage?receiverId=${
        currentUser!.id
      }&fileName=${fileName}`
    )
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `decrypted_${fileName}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (users.length) {
      fetch(`${url}/api/messages/${currentUser!.id}`)
        .then((response) => response.json())
        .then((result: message[]) => {
          const messages: receivedMessage[] = result.map((message) => {
            const sender = users.find((user) => user.id === message.senderId);
            return {
              id: message.id,
              login: sender!.login,
              filename: message.fileName,
              sent_time: message.sentTime.toString(),
              receiver_id: message.receiverId,
            };
          });
          setMessages(messages);
        })
        .catch((error) => console.log("error", error));
    }
  }, [users]);

  const onRefresh = () => {
    fetch(`${url}/api/messages/${currentUser!.id}`)
      .then((response) => response.json())
      .then((result: message[]) => {
        const messages: receivedMessage[] = result.map((message) => {
          const sender = users.find((user) => user.id === message.senderId);
          return {
            id: message.id,
            login: sender!.login,
            filename: message.fileName,
            sent_time: message.sentTime.toString(),
            receiver_id: message.receiverId,
          };
        });
        setMessages(messages);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Login</th>
            <th>File</th>
            <th>Sent at</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => {
            return (
              <tr key={message.id}>
                <td>{message.id}</td>
                <td>{message.login}</td>
                <td>{message.sent_time}</td>
                <td>{message.filename}</td>
                <td>
                  <Button
                    onClick={() => handleFileDownload(message.filename)}
                    disabled={downloading}
                  >
                    Download
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={onRefresh}>Refresh messages</Button>
    </div>
  );
};
