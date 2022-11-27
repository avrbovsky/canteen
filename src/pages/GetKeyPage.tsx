import { useState } from "react";
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import { url } from "../config";

export const GetKeyPage = () => {
  const [privateKey, setPrivateKey] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");

  const handleGetKeys = () => {
    fetch(`${url}/generate-assymetric-key`)
      .then((response) => response.json())
      .then((result) => {
        setPrivateKey(result.privateKey);
        setPublicKey(result.publicKey);
      })
      .catch((error) => console.log("error", error));
  };

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
      <h3>GET RANDOM ASSYMETRIC KEY</h3>
      <Row>
        <Col>
          <InputGroup>
            <InputGroupText>Private Key</InputGroupText>
            <Input type="text" disabled value={privateKey} />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <InputGroupText>Public Key</InputGroupText>
            <Input type="text" disabled value={publicKey} />
          </InputGroup>
        </Col>
      </Row>
      <Button
        color="primary"
        onClick={handleGetKeys}
        style={{ marginTop: "15px" }}
      >
        Get random keys
      </Button>
    </div>
  );
};
