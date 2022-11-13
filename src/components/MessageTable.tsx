import { Button, Table } from "reactstrap";
import { useEffect, useState } from "react";

type message = {
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
  const [messages, setMessages] = useState<message[]>([]);

  const handleFileDownload = (filename: string) => {
    //download file
  };

  useEffect(() => {
    //fetchovanie sprav
    setMessages(mockedMessages);
  }, []);

  const onRefresh = () => {
    //fetchni spravy
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
