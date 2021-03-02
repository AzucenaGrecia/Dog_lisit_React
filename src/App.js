import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./loading";

function App() {
  const [dogs, setDogsList] = useState([]);
  const [breeds, setBreedList] = useState([]);
  const [currentBreed, setCurrentBreed] = useState("all");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true)
      if (currentBreed === "all") {
        const response = await fetch(
          "https://dog.ceo/api/breeds/image/random/10"
        );
        const data = await response.json();
        setDogsList(data.message);
        setLoading(false)
      } else {
        const response = await fetch(
          `https://dog.ceo/api/breed/${currentBreed}/images/random/10`
        );
        const data = await response.json();
        setDogsList(data.message);
        setLoading(false)
      }
    };
    fetchDogs();
  }, [currentBreed]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const data = await response.json();
      setBreedList(Object.keys(data.message));
    };
    fetchBreeds();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <i className="fas fa-paw"></i>
        <h1>THE DOGS</h1>
        <i className="fas fa-paw"></i>
      </header>
      <label htmlFor="breed" style={{ marginRight: "5px" }}>
        Breed:
      </label>

      <select
        id="breed"
        className="select"
        onChange={(e) => setCurrentBreed(e.target.value)}
      >
        <option selected value="all">
          Choose a Breed
        </option>
        {breeds.map((breed, index) => (
          <option className="option" value={breed} key={index}>
            {breed}
          </option>
        ))}
      </select>

      {loading ? (
        <Loading />
      ) : (
        <div className="gallery">
          {dogs.map((dog, index) => (
            <img key={index} src={dog} style={{ width: "100%" }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
