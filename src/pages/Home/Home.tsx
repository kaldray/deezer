import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Navigation from "../../components/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import fetchJsonp from "fetch-jsonp";
import CardData from "./HomeCard";
import { DeezerSdkTrack } from "../../types";
import Loader from "../../components/Loader";
import ScrollToTop from "../../components/BackToTop";

const Home = () => {
  const [valueOption, setValueOption] = useState({ artiste: "", option: "" });
  const [data, setData] = useState<DeezerSdkTrack[]>([]);
  const [dataLocalStorage, setDataLocalStorage] = useState<DeezerSdk.Track[]>(
    []
  );
  const selectOption: React.RefObject<HTMLSelectElement> = useRef(null);
  const artisteInput: React.RefObject<HTMLInputElement> = useRef(null);
  let allFavorites: DeezerSdk.Track[] = [];
  const [scrollPosition, setScrollPosition] = useState<number>();
  const [windowHeigth, setWindowHeigth] = useState<number>();
  const [nextResult, setNextResult] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!localStorage.getItem("favori")) {
      localStorage.setItem("favori", "");
    }
  }, []);

  useEffect(() => {
    if (dataLocalStorage === null) {
      return;
    } else {
      if (localStorage.getItem("favori")) {
        setDataLocalStorage(JSON.parse(localStorage.getItem("favori") || ""));
      }
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", getScrollPosition);
    if (
      scrollPosition !== undefined &&
      nextResult !== undefined &&
      windowHeigth !== undefined &&
      windowHeigth === scrollPosition
    ) {
      fetchJsonp(nextResult)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIsLoading(true);
          console.log(data);
          setNextResult(data.next);
          setData((prevSate) => [...prevSate, ...data.data]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      window.removeEventListener("scroll", getScrollPosition);
    };
  }, [windowHeigth]);

  const handleOptionChange = () => {
    if (selectOption.current && artisteInput.current) {
      setValueOption({
        option: selectOption.current.value,
        artiste: artisteInput.current.value,
      });
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (valueOption.option === "DEFAULT") {
      fetchJsonp(
        `https://api.deezer.com/search?q=${valueOption.artiste}&output=jsonp`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setNextResult(data.next);
          setData(data.data);
          setIsLoading(false);
          console.log(data);
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
          setNextResult(data.next);
          setData(data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getScrollPosition: EventListener = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const documentHeigth = Math.ceil(document.documentElement.scrollHeight);
    const windowHeight = Math.ceil(window.innerHeight);
    let scroll = Math.ceil(window.scrollY);
    setWindowHeigth(scroll);
    setScrollPosition(documentHeigth - windowHeight);
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
                placeholder="Rechercher un titre, un album ..."
                required
              />
            </Form.Group>
            <Form.Select onChange={handleOptionChange} ref={selectOption}>
              <option value="DEFAULT">
                Trier les résultats de la recherche par ...
              </option>
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
          {(isLoading && (
            <div className="loader-container">
              <Loader />
            </div>
          )) ||
            (data &&
              data.map((data) => (
                <CardData
                  key={data.id}
                  data={data}
                  dataLocalStorage={dataLocalStorage}
                  allFavorites={allFavorites}
                  setDataLocalStorage={setDataLocalStorage}
                />
              )))}
        </Row>
        {nextResult && <ScrollToTop />}
      </Container>
    </>
  );
};

export default Home;
