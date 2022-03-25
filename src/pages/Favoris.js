import Navigation from "../components/Navbar";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FavoriteTrack from "../components/FavoriteTrack";
const Favorite = () => {
  const [getDataFromLocaleStorage, setDataFromLocaleStorage] = useState();
  const [favoriToDelete, setfavoriToDelete] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("favori").length >= 1) {
      setDataFromLocaleStorage(JSON.parse(localStorage.getItem("favori")));
    }
  }, [favoriToDelete]);

  const getItemToDelete = (data) => {
    let itemToDelete = data;
    let dataLocalStorage = JSON.parse(localStorage.getItem("favori"));
    let allFavorites = dataLocalStorage.filter(
      (item) => item.id !== itemToDelete.id
    );
    setDataFromLocaleStorage(allFavorites);
    localStorage.setItem("favori", JSON.stringify(allFavorites));
  };

  return (
    <>
      <Navigation />
      <Container className="mt-3">
        <Row>
          <Col className="d-flex justify-content-center" sm={12} lg={12}>
            <h1>Mes favoris</h1>
          </Col>
          <Col className="d-flex  flex-wrap ">
            {getDataFromLocaleStorage &&
              getDataFromLocaleStorage.map((data) => (
                <FavoriteTrack
                  data={data}
                  key={data.id}
                  getDataFromLocaleStorage={getDataFromLocaleStorage}
                  getItemToDelete={getItemToDelete}
                />
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Favorite;
