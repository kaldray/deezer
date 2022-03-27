import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import { convertToMinutes } from "../utils/convertTime";
import Heart from "./Heart";

const TrackCard = ({ dataTrack, addOrRemoveFromLocalStorage, isFavori }) => {
  const textCenter = {
    textAlign: "center",
  };
  const Heartstyle = {
    height: "25px",
    cursor: "pointer",
    alignSelf: "center",
  };
  return (
    <>
      <Col
        className="d-flex justify-content-center flex-column align-items-center"
        sm={12}
      >
        <div className="d-flex flex-row gap-3">
          <h1>Titre : {dataTrack.title}</h1>
          <Heart
            addOrRemoveFromLocalStorage={addOrRemoveFromLocalStorage}
            isFavori={isFavori}
          />
        </div>
        <span>Durée : {convertToMinutes(dataTrack.duration)}</span>
        <span>Date de parution : {dataTrack.release_date}</span>
      </Col>
      <Col sm={12} lg={4} className="mt-3" style={textCenter}>
        <Image style={{ width: "100%" }} src={dataTrack.album.cover_medium} />
        <span>Album : {dataTrack.album.title}</span>
      </Col>
      <Col sm={12} lg={4} className="mt-3" style={textCenter}>
        <Image
          style={{ width: "100%" }}
          src={dataTrack.artist.picture_medium}
        />
        <span>Artiste : {dataTrack.artist.name}</span>
      </Col>
    </>
  );
};

export default TrackCard;
