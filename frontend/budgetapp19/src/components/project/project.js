import { Button, ListGroup, Badge, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {Grid } from '@material-ui/core'
import { getExpense } from "../../api/index";
// import './project.css' from "./";

// const expenses = [
//   {
//     id: 1,
//     project_id: 2,
//     category_id: 2,
//     name: "Server Maintenance",
//     description:
//       "Server maintenance and upgrading work to incorporate BC plans",
//     amount: 30000,
//     created_at: "2021-11-04T16:00:00.000Z",
//     created_by: "Jacky",
//     updated_at: "2021-11-06T16:00:00.000Z",
//     updated_by: "Jacky",
//   },
//   {
//     id: 2,
//     project_id: 3,
//     category_id: 4,
//     name: "Consultant",
//     description: "Consultancy services for integration work",
//     amount: 10000,
//     created_at: "2021-11-06T16:00:00.000Z",
//     created_by: "Helen",
//     updated_at: "2021-11-07T16:00:00.000Z",
//     updated_by: "Helen",
//   },
// ];

function formatPrice(price) {
  let priceString = price.toString();
  priceString = `$${priceString.slice(0, -3)},${priceString.slice(
    -3,
    priceString.length
  )}`;
  return priceString;
}

function Project() {
  let projectID;
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [expList, setExpense] = useState([]);
  let { id } = useParams();
  projectID = id;
  const [ex, setEx] = useState({
    name: "",
    description:"",
    amount: 0,
  });

  const handleAdd = () => {
    // api call to be made
    console.log(id);
    setModal(true);
  }

  const handleEdit = (index) => {
    setEx(expList[index])
    setModal2(true);
  }

  const handleClose = () => {
    setModal(false);
  }

  const handleClose2 = () => {
    console.log(modal2)
    setModal2(false);
  }

  const handleSave = () => {
    // api call to save expense here
    setModal(false);
  }

  const handleSave2 = () => {
    // api call to edit expense here
    setModal2(false);
  }

  const handleChange = (e) => {
    setEx({...ex, [e.target.name]: e.target.value})
}

useEffect(() => {
  async function fetchExpenses() {
    try {
      let expList = await getExpense(projectID);
      console.log(projectID)
      console.log(expList)
      setExpense(expList.data);
    } catch (err) {
      console.log(err);
    }
  }
  fetchExpenses();
  console.log(expList);
}, []);

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
                    Name: <input name="name" label="name" value={ex.name} handleChange={handleChange} autoFocus/><br/><br/>
                    Description:<textarea name="description" rows="5" label="description" value={ex.description} handleChange={handleChange} autoFocus/><br/><br/>
                    Amount: <input name="amount" label="name" value={ex.amount} handleChange={handleChange} autoFocus/><br/><br/>
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
              {expList.length ? (
                expList.map((exp, index) => (
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
                      <Button onClick= {() => handleEdit(index)}> Edit Expense </Button>
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
