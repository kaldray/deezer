import Col from "react-bootstrap/esm/Col";
import { ReactComponent as Bin } from "../assets/bin-svgrepo-com.svg";

const FavoriteTrack = ({ data, getItemToDelete }) => {
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
