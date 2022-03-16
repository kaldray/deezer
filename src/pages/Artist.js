import Navigation from "../components/Navbar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import Row from "react-bootstrap/esm/Row";
import ArtistCard from "../components/ArtistCard";

const Artist = () => {
  const { id } = useParams();
  const [dataArtist, setDataArtist] = useState();
  useEffect(() => {
    fetchJsonp(`https://api.deezer.com/artist/${id}&output=jsonp`).then(
      (response) =>
        response.json().then((data) => {
          setDataArtist(data);
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
