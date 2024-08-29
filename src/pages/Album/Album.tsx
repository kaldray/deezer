import fetchJsonp from "fetch-jsonp";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navbar";
import type { DeezerSdkAlbum } from "../../types";
import AlbumCard from "./AlbumCard";

const Album = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataAlbum, setDataAlbum] = useState<DeezerSdkAlbum>();
  useEffect(() => {
    fetchJsonp(`https://api.deezer.com/album/${id}&output=jsonp`).then((response) =>
      response.json().then((data) => {
        if (data.error) {
          navigate("/");
        } else {
          setDataAlbum(data);
        }
      })
    );
  }, []);

  return (
    <>
      <Navigation />
      <Row className="flex-column">{dataAlbum && <AlbumCard dataAlbum={dataAlbum} />}</Row>
    </>
  );
};

export default Album;
