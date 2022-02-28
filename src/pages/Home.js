import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Navigation from "../components/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

const Home = () => {


  return (
    <>
      <Navigation />
      <Container fluid className="mt-5">
        <Row className="justify-content-center">
          <Form className="w-75 d-flex flex-column justify-content-center align-items-center">
            <Form.Group className="mb-3 ">
              <Form.Label>Rechercher sur Deezer</Form.Label>
              <Form.Control type="input" placeholder="Damso" required />
            </Form.Group>
            <Form.Select>
              <option>Trier les résultats de la recherche par ...</option>
              <option value="ALbum">Album</option>
              <option value="Artiste">Artiste</option>
              <option value="Musique">Musique</option>
              <option value="Les plus populaires">Les plus populaires</option>
              <option value="Les moins populaires">Les moins populaires</option>
            </Form.Select>
            <Button className="m-3" type="submit">
              Rechercher
            </Button>
          </Form>
        </Row>
      </Container>
      <Container style={{ paddingBottom: "5rem" }}>
        <Row className="justify-content-center align-items-center flex-wrap  ">
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Titre music</Card.Title>
              <Card.Text>Artiste</Card.Text>
              <Card.Text>Durée du son</Card.Text>
              <Stack gap="2">
                <Button size="sm" variant="primary">
                  Ecouter
                </Button>
                <Button size="sm" variant="primary">
                  Consulter
                </Button>
                <Button size="sm" variant="primary">
                  Voir affiche titre
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Home;
