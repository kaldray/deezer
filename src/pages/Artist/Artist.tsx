/* eslint-disable react-hooks/exhaustive-deps */
import Navigation from "../../components/Navbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import Row from "react-bootstrap/esm/Row";
import ArtistCard from "./ArtistCard";
import type { DeezerSdkArtist } from "../../types";

const Artist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataArtist, setDataArtist] = useState<DeezerSdkArtist>();
  useEffect(() => {
    fetchJsonp(`https://api.deezer.com/artist/${id}&output=jsonp`).then((response) =>
      response.json().then((data) => {
        if (data.error) {
          navigate("/");
        } else {
          setDataArtist(data);
        }
      })
    );
  }, []);
  return (
    <>
      <Navigation />
      <Row>{dataArtist && <ArtistCard dataArtist={dataArtist} />}</Row>
    </>
  );
};

export default Artist;
