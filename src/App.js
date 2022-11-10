import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { listRestaurants } from "./graphql/queries";
import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.css";

import {
  createRestaurant as createRestaurantMutation,
} from "./graphql/allData";
import YelpNavbar from "./components/Header";
import "../src/styles/app.css";

const initialFormStateManaSenga = { name: "", description: "", city: "" };

function App({ signOut }) {
  const [restaurantManaYana, setRestaurantsAllEkanda] = useState([]);
  const [formDataOla, setFormDataKetdiData] = useState(
    initialFormStateManaSenga
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const apiData = await API.graphql({ query: listRestaurants });
    setRestaurantsAllEkanda(apiData.data.listRestaurants.items);
  }

  async function createRestaurant() {
    if (!formDataOla.name || !formDataOla.description) return;
    console.log(formDataOla);
    await API.graphql({
      query: createRestaurantMutation,
      variables: { input: formDataOla },
    });
    setRestaurantsAllEkanda([...restaurantManaYana, formDataOla]);
    setFormDataKetdiData(initialFormStateManaSenga);
  }

  return (
    <div className="App">
      <YelpNavbar signOut={signOut} />
      <Container>
        <Row className="mt-3 align-items-center">
          <Col md="7" className="input">
            <Form>
              <Form.Group as={Col} md="40" controlId="formDataName">
                <Form.Control
                  onChange={(e) =>
                    setFormDataKetdiData({
                      ...formDataOla,
                      name: e.target.value,
                    })
                  }
                  type="text"
                  value={formDataOla.name}
                  placeholder="Restaurant name"
                  className="input outline-none mb-4"
                />
              </Form.Group>
              <Form.Group controlId="formDataDescription">
                <Form.Control
                  onChange={(e) =>
                    setFormDataKetdiData({
                      ...formDataOla,
                      description: e.target.value,
                    })
                  }
                  type="text"
                  value={formDataOla.description}
                  placeholder="Description"
                  className="input outline-none mb-4"
                />
              </Form.Group>
              <Form.Group controlId="formDataCity">
                <Form.Control
                  onChange={(e) =>
                    setFormDataKetdiData({
                      ...formDataOla,
                      city: e.target.value,
                    })
                  }
                  type="text"
                  value={formDataOla.city}
                  placeholder="Location"
                  className="input outline-none mb-4"
                />
              </Form.Group>
            </Form>
          </Col>
          <Button
            className="create"
            onClick={createRestaurant}
            as={Col}
            md="2"
            style={{
              borderRadius: 0,
            }}
          >
            Create
          </Button>
        </Row>
        <h1 className="text2">Restaurants</h1>
        {restaurantManaYana.length ? (
          <Row className="my-3">
            <Col>
              <Table
                striped
                bordered
                style={{
                  color: "#eee",
                }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantManaYana.map((restaurant, index) => (
                    <tr key={`restaurant-${index}`}>
                      <td className="text-white">{index + 1}</td>
                      <td className="text-white">{restaurant.name}</td>
                      <td className="text-white">
                        {/* {restaurant.description}*/} fds
                      </td>
                      <td className="text-white">{restaurant.city}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
}

export default withAuthenticator(App);
