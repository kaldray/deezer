/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Navigation from "../../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import TrackCard from "./TrackCard";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import type { DeezerSdkTrack } from "../../types/index";

const Track = () => {
  const { id } = useParams();
  const [dataTrack, setDataTrack] = useState<DeezerSdkTrack>();
  const navigate = useNavigate();
  const [isFavori, setIsFavori] = useState(false);
  let favArray: DeezerSdk.Track[] = [];

  useEffect(() => {
    fetchJsonp(`https://api.deezer.com/track/${id}&output=jsonp`).then((response) =>
      response.json().then((data) => {
        if (data.error) {
          navigate("/");
        } else {
          setDataTrack(data);
        }
      })
    );
  }, [id]);

  useEffect(() => {
    if (localStorage.getItem("favori") !== "" && dataTrack !== undefined) {
      const localStorageData: DeezerSdkTrack[] = JSON.parse(localStorage.getItem("favori") || "");
      const checkIfExist = localStorageData.find((item) => {
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
      if (localStorage.getItem("favori") === "" && isFavori === false && dataTrack !== undefined) {
        favArray.push(dataTrack);
        localStorage.setItem("favori", JSON.stringify(favArray));
      } else if (
        JSON.parse(localStorage.getItem("favori") || "").length >= 1 &&
        isFavori === false &&
        dataTrack !== undefined
      ) {
        favArray = JSON.parse(localStorage.getItem("favori") || "");
        const checkIfExist = favArray.find((item) => item.id === dataTrack.id);
        if (checkIfExist === undefined) {
          favArray.push(dataTrack);
          localStorage.setItem("favori", JSON.stringify(favArray));
        }
      }
    } else if (isFavori === true && dataTrack !== undefined) {
      setIsFavori(!isFavori);
      favArray = JSON.parse(localStorage.getItem("favori") || "");
      favArray = favArray.filter((item) => item.id !== dataTrack.id);
      localStorage.setItem("favori", JSON.stringify(favArray));
    }
  };

  return (
    <>
      <Navigation />
      <Row className="flex-row justify-content-center mt-5">
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
            <figure className="d-flex gap-3 mb-5 flex-column justify-content-center align-items-center">
              <figcaption>Ecouter l'extrait !</figcaption>
              <audio controls src={dataTrack.preview}></audio>
              <a style={{ color: "black" }} href={dataTrack.link}>
                <Button className="link">Ecouter l'extrait sur Deezer</Button>
              </a>
            </figure>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Track;
