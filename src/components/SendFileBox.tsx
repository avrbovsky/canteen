import React, { useEffect, useState } from "react";
import { Button, Input, Spinner } from "reactstrap";

type options = {
  label: string;
  value: number;
};

const mockedOptions = [
  { value: 1, label: "Jozo" },
  { value: 2, label: "Fero" },
];

export const SendFileBox: React.FC = () => {
  const [options, setOptions] = useState<options[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [file, setFile] = useState<File>();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const uploadedFile = e.target.files![0];
    setFile(uploadedFile);
  };

  const handleFileSend = () => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", file!, file!.name);
    const requestOptions = {
      method: "POST",
      body: bodyFormData,
      mode: "no-cors" as RequestMode,
    };
  };

  useEffect(() => {
    //fetchnut data z BE
    //setnut ich ako options do selectu
    //Nakolko tento select, ktory prave pouzivame nefunguje najlepsie, treba nastavit selectedUserId na prvy option value
    setOptions(mockedOptions);
  }, []);

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
      <Button
        style={{ marginRight: "10px" }}
        color="primary"
        disabled={!file || !selectedUserId}
        onClick={handleFileSend}
      >
        Send File
      </Button>
    </>
  );
};
