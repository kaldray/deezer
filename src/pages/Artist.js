import Navigation from "../components/Navbar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ArtistCard from "../components/ArtistCard";

const Artist = () => {
  const { id } = useParams();
  const [dataArtist, setDataArtist] = useState();
  useEffect(() => {
    console.log(id);
    fetchJsonp(`https://api.deezer.com/artist/${id}&output=jsonp`).then(
      (response) =>
        response.json().then((data) => {
          setDataArtist(data);
          console.log(data);
        })
    );
  }, []);
  return (
    <>
      <Navigation />;
      <Row>{dataArtist && <ArtistCard dataArtist={dataArtist} />}</Row>
    </>
  );
};

export default Artist;
