import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [dogs, setDogsList] = useState([]);
  const [breeds, setBreedList] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await fetch(
        "https://dog.ceo/api/breeds/image/random/10"
      );
      const data = await response.json();
      setDogsList(data.message);
    };
    fetchDogs();
  }, []);

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
      <label htmlFor="breed" style={{marginRight:'5px'}}>Breed:</label>
      <select id="breed" className="select">
        <option selected disabled>
          Choose breed
        </option>
        {breeds.map((breed, index) => (
          <option className="option" key={index}>
            {breed}
          </option>
        ))}
      </select>
      <div className="gallery">
        {dogs.map((dog, index) => (
          <img key={index} src={dog} style={{ width: "100%" }} />
        ))}
      </div>
    </div>
  );
}

export default App;
