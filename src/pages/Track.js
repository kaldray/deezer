import React, { useState, useEffect } from "react";
import Navigation from "../components/Navbar";
import { useParams } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import TrackCard from "../components/TrackCard";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";

const Track = () => {
  const { id } = useParams();
  const [dataTrack, setDataTrack] = useState();
  const [isFavori, setIsFavori] = useState(false);
  let favArray = [];

  useEffect(() => {
    fetchJsonp(`https://api.deezer.com/track/${id}&output=jsonp`).then(
      (response) =>
        response.json().then((data) => {
          setDataTrack(data);
        })
    );
  }, [id]);

  useEffect(() => {
    if (localStorage.getItem("favori") !== "" && dataTrack !== undefined) {
      let localStorageData = JSON.parse(localStorage.getItem("favori"));
      let checkIfExist = localStorageData.find((item) => {
        return item.id === dataTrack.id;
      });
      if (checkIfExist !== undefined) {
        setIsFavori(true);
      }
    }
  }, [dataTrack]);

  const addOrRemoveFromLocalStorage = () => {
    if (isFavori === false) {
      setIsFavori(!isFavori);
      if (localStorage.getItem("favori") === "" && isFavori === false) {
        favArray.push(dataTrack);
        localStorage.setItem("favori", JSON.stringify(favArray));
      } else if (
        JSON.parse(localStorage.getItem("favori")).length >= 1 &&
        isFavori === false
      ) {
        favArray = JSON.parse(localStorage.getItem("favori"));
        let checkIfExist = favArray.find((item) => item.id === dataTrack.id);
        if (checkIfExist === undefined) {
          favArray.push(dataTrack);
          localStorage.setItem("favori", JSON.stringify(favArray));
        }
      }
    } else if (isFavori === true) {
      setIsFavori(!isFavori);
      favArray = JSON.parse(localStorage.getItem("favori"));
      favArray = favArray.filter((item) => item.id !== dataTrack.id);
      localStorage.setItem("favori", JSON.stringify(favArray));
    }
  };

  return (
    <>
      <Navigation />
      <Row className="flex-row justify-content-center m-1 mt-5">
        {dataTrack && (
          <TrackCard
            addOrRemoveFromLocalStorage={addOrRemoveFromLocalStorage}
            isFavori={isFavori}
            dataTrack={dataTrack}
          />
        )}
      </Row>
      <Row className="mt-3 mb-5">
        {dataTrack && (
          <Col sm={12}>
            <figure
              sm={12}
              className="d-flex gap-3 flex-column justify-content-center align-items-center"
            >
              <figcaption>Ecouter l'extrait !</figcaption>
              <audio controls src={dataTrack.preview}></audio>
              <a style={{ color: "black" }} href={dataTrack.link}>
                <Button>
                  <figcaption>Ecouter l'extrait sur Deezer</figcaption>
                </Button>
              </a>
            </figure>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Track;
