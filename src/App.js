import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./loading";
import ErrorMessage from "./errorMessage";
import { ImageModal } from "./imageModal";

function App() {
  const [dogs, setDogsList] = useState([]);
  const [currentBreed, setCurrentBreed] = useState("");
  const [state, setState] = useState("loading");
  const [selectDog, setSelectDog] = useState("");

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setState("loading");
        if (currentBreed === "") {
          const response = await fetch(
            "https://dog.ceo/api/breeds/image/random/10"
          );
          const data = await response.json();
          setDogsList(data.message);
          setState("success");
        } else {
          const response = await fetch(
            `https://dog.ceo/api/breed/${currentBreed}/images/random/10`
          );
          const data = await response.json();
          if (data.status === "error") throw new Error(data.message);
          setDogsList(data.message);
          setState("success");
        }
      } catch (e) {
        console.log(e);
        setState("error");
      }
    };
    const timer = setTimeout(() => fetchDogs(), 1000);
    return () => clearTimeout(timer);
  }, [currentBreed]);

  const renderDogs = () => {
    switch (state) {
      case "error":
        return <ErrorMessage />;
      case "success":
        return (
          <div className="gallery">
            {dogs.map((dog, index) => (
              <img
                key={index}
                src={dog}
                style={{ width: "100%" }}
                alt="breed"
                onClick={(e) => setSelectDog(e.target.currentSrc)}
              />
            ))}
            {selectDog && <ImageModal image={selectDog} setSelectDog={setSelectDog} />}
          </div>
        );
      default:
        return <Loading />;
    }
  };

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

      <input
        id="breed"
        type="text"
        onChange={(e) => setCurrentBreed(e.target.value)}
        placeholder="write a breed..."
      />
      {renderDogs()}
    </div>
  );
}

export default App;
