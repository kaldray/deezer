import Col from "react-bootstrap/esm/Col";
import { ReactComponent as Bin } from "../../assets/bin-svgrepo-com.svg";

type FavotiteProps = {
  data: DeezerSdk.Track;
  getItemToDelete: (data: DeezerSdk.Track) => void;
};

const FavoriteTrack = ({ data, getItemToDelete }: FavotiteProps) => {
  return (
    <>
      <Col sm={12} lg={4} className="d-flex justify-content-center mt-5">
        <span>{data.title}-</span>
        <span>
          {data.artist.name} •• {data.album.title}
        </span>
        <Bin
          onClick={() => getItemToDelete(data)}
          style={{ cursor: "pointer" }}
        />
      </Col>
    </>
  );
};

export default FavoriteTrack;
