import React, { useState } from "react";
import { Form, Button, Card, Row } from "react-bootstrap";

function Calculator() {
  const [input, setInput] = useState("");
  const [stack, setStack] = useState();
  const [operators, setOperators] = useState();
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false) 

  const changeHandler = (e) => {
    const newInput = e.target.value;
    setInput(newInput);

    var a = newInput.split(",").map(Number);

    var b = a.filter((value) => !Number.isNaN(value));

    setStack(b);
    var c = newInput.split(",").map((value) => {
      if (isNaN(parseInt(value)) && value) {
        return value;
      }
      return undefined
    });

    var d = c.filter(value => value !== undefined);

    setOperators(d);
  };
  const insertNum = (e) => {
    e.preventDefault();
    let result;
    if (!input || input === "") {
      setMessage("You did not enter anything");
      return;
    }
    for (let i = 0; i < input.length; i++) {
      if (input[i].match("^[a-zA-Z]+$")) {
        setMessage("Only numbers and aritmetic operators are valid");
        return;
      }
    }
    if (operators.length + 1 < stack.length || operators.length === 0) {
      setMessage("Check the number of operands");
      return;
    } else if (operators.length + 1 > stack.length) {
      setMessage("Check the number of operators");
      return;
    }

    if (operators[0] === "+") {
      result = stack[stack.length - 1] + stack[stack.length - 2];
    } else if (operators[0] === "-") {
      result = stack[stack.length - 1] - stack[stack.length - 2];
    } else if (operators[0] === "*") {
      result = stack[stack.length - 1] * stack[stack.length - 2];
    } else if (operators[0] === "/") {
      result = stack[stack.length - 1] / stack[stack.length - 2];
    }

    stack.pop();
    stack.pop();

    if (operators.length > 1) {
      operators.shift();
    }

    while (stack.length > 0) {
      if (operators[0] === "+") {
        result += stack[stack.length - 1];
      } else if (operators[0] === "-") {
        result -= stack[stack.length - 1];
      } else if (operators[0] === "*") {
        result *= stack[stack.length - 1];
      } else if (operators[0] === "/") {
        result /= stack[stack.length - 1];
      }

      stack.pop();
      if (operators.length > 1) {
        operators.shift();
      }
    }

    result = result.toFixed(2);
    let finalInput = input + "  = " + result;
    setInput(finalInput);
    setMessage("done");
    setStack();
    setOperators();
    setDisabled(true);
  };
  const clearHandler = () => {
    setInput("");
    setStack();
    setOperators();
    setMessage("");
    setDisabled(false);
  };

  return (
    <div className="container">
      <Card style={{ width: "52rem" }}>
        <Row className="align-items-center">
          <h2>Reverse Polish Notation Calculator</h2>
          <hr className="line" style={{ width: "52rem" }}/>
          <form onSubmit={insertNum} onReset={clearHandler}>
            <Form.Label>
              <Form.Control
                placeholder="Enter the operand and operator: 1,2,3,4,+,*,-"
                type="text"
                onChange={changeHandler}
                value={input}
                disabled={disabled}
                style={{ width: "30rem" }}
              />
            </Form.Label>{" "}
            <Button variant="primary" type="reset">
              Clear
            </Button>{" "}
            <Button variant="primary"  disabled={disabled} type="submit">
              Compute
            </Button>{" "}
            <div>{message}</div>
          </form>
        </Row>
      </Card>
    </div>
  );
}

export default Calculator;
