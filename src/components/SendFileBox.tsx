import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Spinner } from "reactstrap";
import { url } from "../config";
import { user } from "../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

type options = {
  label: string;
  value: string;
};

export const SendFileBox: React.FC = () => {
  const [options, setOptions] = useState<options[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("1");
  const [file, setFile] = useState<File>();
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      axios.get(`${url}/api/user`).then((response) => {
        const options = response.data.map((user: user) => {
          return { value: "" + user.id, label: user.login };
        });
        setOptions(options);
      });
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const uploadedFile = e.target.files![0];
    setFile(uploadedFile);
  };

  const handleFileSend = () => {
    setFileUploading(true);
    const bodyFormData = new FormData();
    bodyFormData.append("file", file!, file!.name);
    const requestOptions = {
      method: "POST",
      body: bodyFormData,
      mode: "no-cors" as RequestMode,
    };
    fetch(`${url}/ENDPOINT JEBNI SEM`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error))
      .finally(() => setFileUploading(false));
  };

  return (
    <>
      {options.length === 0 ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : (
        <Input
          type="select"
          onChange={(e) => setSelectedUserId(e.currentTarget.value)}
          value={selectedUserId}
          style={{ marginTop: "15px" }}
        >
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </Input>
      )}
      <Input
        onChange={handleFileSelect}
        type="file"
        style={{ marginBottom: "15px", marginTop: "15px" }}
      />
      {fileUploading ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : (
        <Button
          style={{ marginRight: "10px" }}
          color="primary"
          disabled={!file || !selectedUserId || fileUploading}
          onClick={handleFileSend}
        >
          Send File
        </Button>
      )}
    </>
  );
};
