import { ReactComponent as HeartEmpty } from "@app/assets/heart-svgrepo-com.svg";
import { ReactComponent as HeartFull } from "@app/assets/heart-svgrepo-com-2.svg";

type HeartSVG = {
  isFavori: boolean;
  addOrRemoveFromLocalStorage: (data: DeezerSdk.Track) => void;
  data: DeezerSdk.Track;
};

const Heart = ({ isFavori, addOrRemoveFromLocalStorage, data }: HeartSVG) => {
  return (
    <>
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
