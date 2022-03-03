import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const AlbumCard = (props) => {
  const { dataAlbum } = props;
  const goToAlbumOnDeezer = () => {
    window.location.href = dataAlbum.link;
  };
  return (
    <>
      <Col className="d-flex justify-content-center align-items-center flex-column mt-3">
        <h1 style={{ cursor: "pointer" }} onClick={goToAlbumOnDeezer}>
          {dataAlbum.title}
        </h1>
        <Link to={`/artist/${dataAlbum.artist.id}`}>
          <h2 style={{ color: "black" }}>{dataAlbum.artist.name}</h2>
        </Link>
      </Col>
      <Col className="d-flex justify-content-center mt-3" sm={12} lg={12}>
        <Image rounded={true} src={dataAlbum.cover_medium} />
      </Col>
      <Col
        className="d-flex flew-row flex-wrap mt-3 p-3 justify-content-center"
        sm={12}
        lg={12}
      >
        {dataAlbum.tracks.data.map((track) => (
          <p className="m-1" key={track.id}>
            {" | "}
            {track.title}
            {" | "}
          </p>
        ))}
      </Col>
      <Col className="d-flex justify-content-center">
        <Link style={{ color: "black" }} to={`/${dataAlbum.link}`}>
          <Button>Aller vers la page de l'album sur Deezer</Button>
        </Link>
      </Col>
    </>
  );
};

export default AlbumCard;
