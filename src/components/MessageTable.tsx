import { Button, Table } from "reactstrap";
import { useContext, useEffect, useState } from "react";
import { url } from "../config";
import { message, user } from "../types";
import { UserContext } from "../contexts/UserContext";

type receivedMessage = {
  id: number;
  login: string;
  filename: string;
  sent_time: string;
  receiver_id: number;
};

export const MessageTable = () => {
  const [messages, setMessages] = useState<receivedMessage[]>([]);
  const [users, setUsers] = useState<user[]>([]);
  const { currentUser } = useContext(UserContext);
  const [downloading, setDownloading] = useState<boolean>(false);

  const handleFileDownload = (
    filename: string,
    sent_time: string,
    receiver_id: number
  ) => {
    setDownloading(true);
    const sentTime = new Date(sent_time);
    fetch(`${url}/DOWNLOAD`, {
      method: "POST",
      body: JSON.stringify({
        filename: filename,
        sent_time: sentTime,
        receiver_id: receiver_id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {})
      .finally(() => {
        setDownloading(false);
      });
  };

  useEffect(() => {
    fetch(`${url}/api/user`)
      .then((response) => response.json())
      .then((result: user[]) => {
        setUsers(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    fetch(`${url}/api/messages/${currentUser!.id}`)
      .then((response) => response.json())
      .then((result: message[]) => {
        const messages: receivedMessage[] = result.map((message) => {
          const sender = users.find((user) => user.id === message.sender_id);
          return {
            id: message.message_id,
            login: sender!.login,
            filename: message.filename,
            sent_time: message.sent_time.toString(),
            receiver_id: message.receiver_id,
          };
        });
        setMessages(messages);
      })
      .catch((error) => console.log("error", error));
  }, [users]);

  const onRefresh = () => {
    fetch(`${url}/api/messages/${currentUser!.id}`)
      .then((response) => response.json())
      .then((result: message[]) => {
        const messages: receivedMessage[] = result.map((message) => {
          const sender = users.find((user) => user.id === message.sender_id);
          return {
            id: message.message_id,
            login: sender!.login,
            filename: message.filename,
            sent_time: message.sent_time.toString(),
            receiver_id: message.receiver_id,
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
                    onClick={() =>
                      handleFileDownload(
                        message.filename,
                        message.sent_time,
                        message.receiver_id
                      )
                    }
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
