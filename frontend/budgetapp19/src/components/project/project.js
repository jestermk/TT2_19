import { Button, ListGroup, Badge, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
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
  let subtitle;
  const [modal, setModal] = useState(false);
  let { id } = useParams();
  const projExpenses = expenses.filter((exp) => exp.project_id == id);
  console.log(projExpenses);

  function handleAdd() {
    // api call to be made
    console.log(id);
    setModal(true);
  }

  function handleClose() {
    setModal(false);
  }

  function handleSave() {
    // api call to save expense here
    setModal(false);
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
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>Insert form content here!</Modal.Body>
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
          <>
            <Button onClick={handleAdd}> Add Expense </Button>
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
                      </Badge>
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
