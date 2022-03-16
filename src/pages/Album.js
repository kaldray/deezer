import fetchJsonp from "fetch-jsonp";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navbar";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import AlbumCard from "../components/AlbumCard";
const Album = () => {
  const { id } = useParams();
  const [dataAlbum, setDataAlbum] = useState();
  useEffect(() => {
    fetchJsonp(`https://api.deezer.com/album/${id}&output=jsonp`).then(
      (response) =>
        response.json().then((data) => {
          setDataAlbum(data);
        })
    );
  }, []);
  return (
    <>
      <Navigation />
      <Row className="flex-column">
        {dataAlbum && <AlbumCard dataAlbum={dataAlbum} />}
      </Row>
    </>
  );
};

export default Album;
