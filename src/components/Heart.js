import { ReactComponent as HeartEmpty } from "../assets/heart-svgrepo-com.svg";
import { ReactComponent as HeartFull } from "../assets/heart-svgrepo-com-2.svg";

const Heart = ({ isFavori, addOrRemoveFromLocalStorage, data }) => {
  return (
    <>
      {" "}
      {isFavori === true ? (
        <HeartFull
          onClick={() => addOrRemoveFromLocalStorage(data)}
          style={{ height: "25px", cursor: "pointer" }}
        />
      ) : (
        <HeartEmpty
          onClick={() => addOrRemoveFromLocalStorage(data)}
          style={{ height: "25px", cursor: "pointer" }}
        />
      )}
    </>
  );
};

export default Heart;
