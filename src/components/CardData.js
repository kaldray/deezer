import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { convertToMinutes } from "../utils/convertTime";
import Heart from "./Heart";

const CardData = ({
  data,
  LocalStorage,
  dataLocalStorage,
  allFavorites,
  setDataLocalStorage,
}) => {
  const [isFavori, setIsFavori] = useState(false);

  useEffect(() => {
    if (
      dataLocalStorage.find((item) => {
        return item.id === data.id;
      })
    ) {
      setIsFavori(true);
    }
  }, []);

  const addOrRemoveFromLocalStorage = (data) => {
    if (isFavori === false) {
      setIsFavori(!isFavori);
      if (
        localStorage.getItem("favori") === "" ||
        localStorage.getItem("favori") === "[]"
      ) {
        allFavorites.push(data);
        console.log(allFavorites);
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
    } else if (isFavori === true) {
      setIsFavori(!isFavori);
      allFavorites = JSON.parse(localStorage.getItem("favori"));
      allFavorites = allFavorites.filter((item) => item.id !== data.id);
      localStorage.setItem("favori", JSON.stringify(allFavorites));
      setDataLocalStorage(JSON.parse(localStorage.getItem("favori")));
    }
  };
  return (
    <>
      <Col className="d-flex justify-content-center mb-5" sm={12} lg={4}>
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src={data.album.cover_medium} />
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>{data.artist.name}</Card.Text>
            <Card.Text>{convertToMinutes(data.duration)}</Card.Text>
            <Heart
              LocalStorage={LocalStorage}
              data={data}
              addOrRemoveFromLocalStorage={addOrRemoveFromLocalStorage}
              dataLocalStorage={dataLocalStorage}
              isFavori={isFavori}
            />

            <Stack className="mt-3" gap="2">
              <Link to={`/artist/${data.artist.id}`}>
                <Button size="sm" variant="primary">
                  Voir affiche de l'artiste.
                </Button>
              </Link>
              <Link to={`/album/${data.album.id}`}>
                <Button size="sm" variant="primary">
                  Voir fiche album.
                </Button>
              </Link>
              <Link to={`/track/${data.id}`}>
                <Button size="sm" variant="primary">
                  Voir la fiche du titre.
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
