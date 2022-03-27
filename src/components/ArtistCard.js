import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const ArtistCard = ({ dataArtist }) => {
  const goToArtistOnDeezer = () => {
    window.location.href = dataArtist.link;
  };
  return (
    <>
      <Col className="d-flex justify-content-center align-items-center flex-column mt-3">
        <h1>{dataArtist.name}</h1>
      </Col>
      <Col className="d-flex justify-content-center mt-3" sm={12} lg={12}>
        <Image rounded={true} src={dataArtist.picture_medium} />
      </Col>
      <Col
        className="d-flex justify-content-center mt-3 flex-column align-items-center"
        sm={12}
        lg={12}
      >
        <p>Nombre d'album : {dataArtist.nb_album}</p>
        <p>Nombre de fans : {dataArtist.nb_fan}</p>
        <Button
          className="link"
          onClick={goToArtistOnDeezer}
          style={{ color: "black" }}
        >
          Lien vers la fiche Deezer
        </Button>
      </Col>
    </>
  );
};

export default ArtistCard;
