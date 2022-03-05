import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Navigation from "../components/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import fetchJsonp from "fetch-jsonp";
import CardData from "../components/CardData";

const Home = () => {
  const [valueOption, setValueOption] = useState({ artiste: "", option: "" });
  const [data, setData] = useState([]);
  const [isFavori, setIsFavori] = useState(false);
  const [dataLocalStorage, setDataLocalStorage] = useState([]);
  const selectOption = useRef();
  const artisteInput = useRef();
  let allFavorites = [];
  let LocalStorage = useRef();

  useEffect(() => {
    if (!localStorage.getItem("favori")) {
      localStorage.setItem("favori", []);
    }
  }, []);

  useEffect(() => {
    if (dataLocalStorage === null || dataLocalStorage === "") {
      return;
    } else {
      if (
        localStorage.getItem("favori") !== "" ||
        localStorage.getItem("option") !== "[]"
      ) {
        setDataLocalStorage(JSON.parse(localStorage.getItem("favori")));
        LocalStorage.current = JSON.parse(localStorage.getItem("favori"));
      }
    }
  }, [data]);

  const handleOptionChange = () => {
    setValueOption({
      option: selectOption.current.value,
      artiste: artisteInput.current.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (valueOption.option === "Trier les résultats de la recherche par ...") {
      fetchJsonp(
        `https://api.deezer.com/search?q=${valueOption.artiste}&output=jsonp`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (valueOption.option !== "Trier les résultats de la recherche par ...") {
      fetchJsonp(
        `https://api.deezer.com/search?q=${valueOption.artiste}&order=${valueOption.option}&output=jsonp`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Navigation />
      <Container fluid className="mt-5">
        <Row className="justify-content-center">
          <Form
            onSubmit={onSubmit}
            className="w-75 d-flex flex-column justify-content-center align-items-center"
          >
            <Form.Group className="mb-3 ">
              <Form.Label>Rechercher sur Deezer</Form.Label>
              <Form.Control
                ref={artisteInput}
                onBlur={handleOptionChange}
                type="input"
                placeholder="Damso"
                required
              />
            </Form.Group>
            <Form.Select onChange={handleOptionChange} ref={selectOption}>
              <option>Trier les résultats de la recherche par ...</option>
              <option value="ALBUM_ASC">Album</option>
              <option value="ARTIST_ASC">Artiste</option>
              <option value="TRACK_ASC">Musique</option>
              <option value="RANKING">Les plus populaires</option>
              <option value="RATING_ASC">Mieux Notées</option>
            </Form.Select>
            <Button className="m-3" type="submit">
              Rechercher
            </Button>
          </Form>
        </Row>
      </Container>
      <Container style={{ paddingBottom: "5rem" }}>
        <Row>
          {data &&
            data.map((data) => (
              <CardData
                key={data.id}
                isFavori={isFavori}
                data={data}
                dataLocalStorage={dataLocalStorage}
                setIsFavori={setIsFavori}
                LocalStorage={LocalStorage}
                allFavorites={allFavorites}
                setDataLocalStorage={setDataLocalStorage}
              />
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
