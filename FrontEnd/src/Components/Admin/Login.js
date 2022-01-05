import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function onClick(e) {
    e.preventDefault();
    console.log("email: ", email)
    console.log("pass: ", password)

    let body = {
      'email': { email },
      'password': { password },

    }

    console.log("body: ", body)
    let url = "http://localhost:8080/searchUser"

    axios
      .post(url, body)
      .then(res => {
        console.log("respnose: ", res)
        console.log("gamed louji!")
        // setResult(res.data)
        // window.scroll(0, 9950)
        console.log("cond: ", res.data[0].type)
        if (res.data[0].type == 0) {

          history.push('/allflights');
        }
        else {
          console.log("not admin")
        }
        //
      })
      .catch(error => {
        console.log("idiot!");
        console.log(error.message);
      })

  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()} onClick={onClick}>
          Login
        </Button>
      </Form>
    </div>
  );
}