import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { Container, ListGroup, ListGroupItem, Badge } from "react-bootstrap";
import { getProjects } from "../../api/index";
import "./home.css";

const Home = () => {
    const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);

  function formatPrice(price) {
    let priceString = price.toString();
    priceString = `$${priceString.slice(0, -3)},${priceString.slice(
      -3,
      priceString.length
    )}`;
    return priceString;
  }

  function getLink(id) {
    return "/home/project/" + id;
  }

  useEffect(() => {
    async function fetchProjects() {
      try {
        let profile = JSON.parse(localStorage.getItem("profile"));
        let projList = await getProjects(profile.id);
        setProjects(projList.data);
        setUser(profile);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProjects();
    console.log(projects);
  }, []);

  return (
    <div>
      <br />
      <Container>
          <div className="central">
      <h1> Hi {user.username}, Welcome to your Dashboard! </h1>
        </div>
      <br />
      <h2> Your Projects </h2>
        <ListGroup as="ol" numbered>
          {projects.length ? (
            projects.map((proj, index) => (
              <>
                <br />
                <ListGroupItem
                  action
                  href={getLink(proj.id)}
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{proj.name}</div>
                    {proj.description}
                  </div>
                  <Badge className="badge" pill>
                    {formatPrice(proj.budget)}
                  </Badge>
                </ListGroupItem>
              </>
            ))
          ) : (
            <div> You have no projects yet! </div>
          )}
        </ListGroup>
      </Container>
    </div>
  );
};

export default Home;
