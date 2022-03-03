import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { ReactComponent as Heart } from "../assets/heart-svgrepo-com.svg";
import { ReactComponent as HeartFull } from "../assets/heart-svgrepo-com-2.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CardData = (props) => {
  const { data } = props;
  const [favori, setFavori] = useState(false);
  const [dataLocalStorage, setDataLocalStorage] = useState([]);
  let allFavorites = [];
  useEffect(() => {
    if (dataLocalStorage === null || dataLocalStorage === "undefined") {
      return;
    } else {
      if (
        dataLocalStorage.find((item) => {
          return item.id === data.id;
        })
      ) {
        setFavori(true);
      }
    }
  }, []);

  function changeFavoriIcon() {
    if (favori === false) {
      setFavori(!favori);
      if (localStorage.getItem("favori") === "") {
        allFavorites.push(data);
        localStorage.setItem("favori", JSON.stringify(allFavorites));
        setDataLocalStorage(JSON.parse(localStorage.getItem("favori")));
      } else if (JSON.parse(localStorage.getItem("favori")).length >= 1) {
        allFavorites = JSON.parse(localStorage.getItem("favori"));
        let checkIfExist = allFavorites.find((item) => item.id === data.id);
        if (checkIfExist === undefined) {
          allFavorites.push(data);
          localStorage.setItem("favori", JSON.stringify(allFavorites));
          setDataLocalStorage(allFavorites);
        }
      }
    } else if (favori === true) {
      setFavori(!favori);
      allFavorites = JSON.parse(localStorage.getItem("favori"));
      allFavorites = allFavorites.filter((item) => item.id !== data.id);
      localStorage.setItem("favori", JSON.stringify(allFavorites));
      setDataLocalStorage(JSON.parse(localStorage.getItem("favori")));
      console.log(allFavorites);
    }
    console.log("click");
  }

  const convertToMinutes = (duration) => {
    return (
      (duration - (duration %= 60)) / 60 +
      (9 < duration ? ":" : ":0") +
      duration
    );
  };

  const goToAlbumpage = () => {};

  return (
    <>
      <Col className="d-flex justify-content-center mb-5" sm={12} lg={4}>
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src={data.album.cover_medium} />
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>{data.artist.name}</Card.Text>
            <Card.Text>{convertToMinutes(data.duration)}</Card.Text>
            {favori === true &&
            dataLocalStorage.find((item) => {
              return item.id === data.id;
            }) ? (
              <HeartFull
                onClick={changeFavoriIcon}
                style={{ height: "25px", cursor: "pointer" }}
              />
            ) : (
              <Heart
                onClick={changeFavoriIcon}
                style={{ height: "25px", cursor: "pointer" }}
              />
            )}

            <Stack className="mt-3" gap="2">
              <Link to={`/artist/${data.artist.id}`}>
                <Button size="sm" variant="primary">
                  Voir affiche de l'artiste.
                </Button>
              </Link>
              <Link to={`/album/${data.album.id}`}>
                <Button size="sm" variant="primary">
                  Consulter l'album.
                </Button>
              </Link>
              <Link to={`/track/${data.id}`}>
                <Button size="sm" variant="primary">
                  Ecouter un extrait.
                </Button>
              </Link>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default CardData;
