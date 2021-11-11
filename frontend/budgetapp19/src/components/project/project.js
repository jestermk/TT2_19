import { Button, ListGroup, Badge, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {Grid } from '@material-ui/core'
// import './project.css' from "./";

const expenses = [
  {
    id: 1,
    project_id: 2,
    category_id: 2,
    name: "Server Maintenance",
    description:
      "Server maintenance and upgrading work to incorporate BC plans",
    amount: 30000,
    created_at: "2021-11-04T16:00:00.000Z",
    created_by: "Jacky",
    updated_at: "2021-11-06T16:00:00.000Z",
    updated_by: "Jacky",
  },
  {
    id: 2,
    project_id: 3,
    category_id: 4,
    name: "Consultant",
    description: "Consultancy services for integration work",
    amount: 10000,
    created_at: "2021-11-06T16:00:00.000Z",
    created_by: "Helen",
    updated_at: "2021-11-07T16:00:00.000Z",
    updated_by: "Helen",
  },
];

function formatPrice(price) {
  let priceString = price.toString();
  priceString = `$${priceString.slice(0, -3)},${priceString.slice(
    -3,
    priceString.length
  )}`;
  return priceString;
}

function Project() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  let { id } = useParams();
  const projExpenses = expenses.filter((exp) => exp.project_id == id);
  console.log(projExpenses);
  const [ex, setEx] = useState({
    name: "",
    description:"",
    amount: 0,
  });

  function handleAdd() {
    // api call to be made
    console.log(id);
    setModal(true);
  }

  function handleEdit() {
    //setEx[projExpenses.index]
    setModal2(true);
  }

  function handleClose() {
    setModal(false);
  }

  function handleClose2() {
    console.log(modal2)
    setModal2(false);
  }

  function handleSave() {
    // api call to save expense here
    setModal(false);
  }

  function handleSave2() {
    // api call to edit expense here
    setModal2(false);
  }

  const handleChange = (e) => {
    setEx({...ex, [e.target.name]: e.target.value})
}

  return (
    <>
      <Container>
        <br />
        <>
          {modal && (
            <Modal
              show={modal}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Expense</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form onSubmit={handleSave}>
                    Name: <input name="name" label="name" handleChange={handleChange} autoFocus/><br/><br/>
                    Description: <input name="description" label="description" handleChange={handleChange} autoFocus/><br/><br/>
                    Amount: <input name="amount" label="name" handleChange={handleChange} autoFocus/><br/><br/>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={handleSave} variant="primary">
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          {modal2 && (
            <Modal
              show={modal2}
              onHide={handleClose2}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Expense</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSave2}>
                    Name: <input name="name" label="name" handleChange={handleChange} autoFocus/><br/><br/>
                    Description: <input name="description" label="description" handleChange={handleChange} autoFocus/><br/><br/>
                    Amount: <input name="amount" label="name" handleChange={handleChange} autoFocus/><br/><br/>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                  Close
                </Button>
                <Button onClick={handleSave2} variant="primary">
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          <>
              <Button onClick={handleAdd}> Add Expense</Button>
              
            <ListGroup as="ol" numbered>
              {projExpenses.length ? (
                projExpenses.map((exp, index) => (
                  <>
                    <br />
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{exp.name}</div>
                        {exp.description}
                      </div>
                      <Badge variant="primary" pill>
                        {formatPrice(exp.amount)}
                      </Badge>&nbsp;&nbsp;
                      <Button onClick={handleEdit}> Edit Expense </Button>
                    </ListGroup.Item>
                  </>
                ))
              ) : (
                <div> There are no expenses yet - Start creating one! </div>
              )}
            </ListGroup>
          </>
        </>
      </Container>
    </>
  );
}

export default Project;
