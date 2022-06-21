import Navigation from "../../components/Navbar";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FavoriteTrack from "./FavoriteTrack";
const Favorite = () => {
  const [getDataFromLocaleStorage, setDataFromLocaleStorage] = useState<DeezerSdk.Track[]>([]);
  const [favoriToDelete] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("favori")?.length !== undefined) {
      setDataFromLocaleStorage(JSON.parse(localStorage.getItem("favori") || ""));
    }
  }, [favoriToDelete]);

  console.log(getDataFromLocaleStorage);

  const getItemToDelete = (data: DeezerSdk.Track) => {
    const itemToDelete = data;
    const dataLocalStorage: DeezerSdk.Track[] = JSON.parse(localStorage.getItem("favori") || "");
    const allFavorites = dataLocalStorage.filter((item) => item.id !== itemToDelete.id);
    setDataFromLocaleStorage(allFavorites);
    localStorage.setItem("favori", JSON.stringify(allFavorites));
  };

  return (
    <>
      <Navigation />
      <Container className="mt-3">
        <Row>
          <Col className="d-flex justify-content-center" sm={12} lg={12}>
            <h1>Mes favoris</h1>
          </Col>
          <Col className="d-flex  flex-wrap ">
            {getDataFromLocaleStorage.length === 0 ? (
              <Col className="d-flex justify-content-center mt-5" sm={12}>
                <span>Vous n'avez actuellment pas de fovori</span>
              </Col>
            ) : (
              getDataFromLocaleStorage.map((data) => (
                <FavoriteTrack data={data} key={data.id} getItemToDelete={getItemToDelete} />
              ))
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Favorite;
