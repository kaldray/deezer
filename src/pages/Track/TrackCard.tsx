import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import { DeezerSdkTrack } from "../../types";
import { convertToMinutes } from "../../function";
import Heart from "../../components/Heart";

type TrackProps = {
  dataTrack: DeezerSdkTrack;
  addOrRemoveFromLocalStorage: () => void;
  isFavori: boolean;
};

const TrackCard = ({
  dataTrack,
  addOrRemoveFromLocalStorage,
  isFavori,
}: TrackProps) => {
  const textCenter: React.CSSProperties = {
    textAlign: "center",
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
            data={dataTrack}
          />
        </div>
        <span>Durée : {convertToMinutes(dataTrack.duration)}</span>
        <span>Date de parution : {dataTrack.release_date}</span>
      </Col>
      <Col sm={12} lg={4} className="mt-3" style={textCenter}>
        <Image
          style={{ width: "100%" }}
          src={dataTrack.album.cover_medium}
          alt="Pochette d'album"
        />
        <span>Album : {dataTrack.album.title}</span>
      </Col>
      <Col sm={12} lg={4} className="mt-3" style={textCenter}>
        <Image
          style={{ width: "100%" }}
          src={dataTrack.artist.picture_medium}
          alt="Pochette d'album"
        />
        <span>Artiste : {dataTrack.artist.name}</span>
      </Col>
    </>
  );
};

export default TrackCard;
