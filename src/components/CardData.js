import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { ReactComponent as Heart } from "../assets/heart-svgrepo-com.svg";
import { ReactComponent as HeartFull } from "../assets/heart-svgrepo-com-2.svg";
import Button from "react-bootstrap/Button";

const CardData = (props) => {
  const [favori, setFavori] = useState(false);

  const { data } = props;

  const changeFavoriIcon = (e) => {
    setFavori(!favori);
    console.log(e);
  };

  const convertToMinutes = (duration) => {
    return (
      (duration - (duration %= 60)) / 60 +
      (9 < duration ? ":" : ":0") +
      duration
    );
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
            {favori === true ? (
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
      </Col>
    </>
  );
};

export default CardData;
