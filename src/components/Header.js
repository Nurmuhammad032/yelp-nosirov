import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "../styles/header.css";

// add commit

export default function YelpNavbar({ signOut }) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        background: "#fff",
        padding: 0,
        height: "50px",
      }}
    >
      <Container
        style={{
          height: "100%",
        }}
      >
        <Navbar.Brand bg="light" fixed="bottom" className="restaruant">
          Restaurant
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse
          className="justify-content-end"
          style={{
            height: "100%",
          }}
        >
          <Navbar.Text
            style={{
              height: "100%",
              padding: 0,
            }}
          >
            <Button className="signout" onClick={signOut}>
              Sign Out
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
