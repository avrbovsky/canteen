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
};

const mockedMessages = [
  { id: 1, login: "user1", filename: "file", sent_time: "13.11.2022 0:10" },
  { id: 2, login: "user2", filename: "subor", sent_time: "12.11.2022 23:36" },
];

export const MessageTable = () => {
  const [messages, setMessages] = useState<receivedMessage[]>([]);
  const [users, setUsers] = useState<user[]>([]);
  const { currentUser } = useContext(UserContext);

  const handleFileDownload = (filename: string) => {
    //download file
  };

  useEffect(() => {
    fetch(`${url}/api/users`)
      .then((response) => response.json())
      .then((result: user[]) => {
        setUsers(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    fetch(`${url}/messages/${currentUser!.id}`)
      .then((response) => response.json())
      .then((result: message[]) => {
        const messages: receivedMessage[] = result.map((message) => {
          const sender = users.find((user) => user.id === message.sender_id);
          return {
            id: message.message_id,
            login: sender!.login,
            filename: message.filename,
            sent_time: message.sent_time.toString(),
          };
        });
        setMessages(messages);
      })
      .catch((error) => console.log("error", error));
    setMessages(mockedMessages);
  }, [users]);

  const onRefresh = () => {
    fetch(`${url}/JEBNI SEM ENDPOINT`)
      .then((response) => response.json())
      .then((result: message[]) => {
        const messages: receivedMessage[] = result.map((message) => {
          const sender = users.find((user) => user.id === message.sender_id);
          return {
            id: message.message_id,
            login: sender!.login,
            filename: message.filename,
            sent_time: message.sent_time.toString(),
          };
        });
        setMessages(messages);
      })
      .catch((error) => console.log("error", error));
    setMessages(mockedMessages);
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
                  <Button onClick={() => handleFileDownload(message.filename)}>
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
