import React, { useState } from "react";
// import { useNavigate } from "react-router";
import { Container, ListGroup, Badge } from "react-bootstrap";

const Home = () => {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
//   const history = useNavigate();
//   const logout = () => {
//     history("/");
//     setUser(null);
//     localStorage.clear();
//   };
  const projects = [
    {
      id: 1,
      user_id: 4,
      name: "RTF",
      budget: 12000,
      description: "Realtime Face Recogniton",
    },
    {
      id: 2,
      user_id: 1,
      name: "SWT",
      budget: 80000,
      description: "Smart Watch Tracker",
    },
    {
      id: 3,
      user_id: 2,
      name: "ULS",
      budget: 11000,
      description: "Upgrade Legacy System",
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

  return (
    <div>
        <br />
        <h2> Your Projects </h2>
      <Container>
        <ListGroup as="ol" numbered>
          {projects &&
            projects.map((proj, index) => (
              <>
                <br />
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{proj.name}</div>
                    {proj.description}
                  </div>
                  <Badge variant="primary" pill>
                    {formatPrice(proj.budget)}
                  </Badge>
                </ListGroup.Item>
              </>
            ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default Home;
