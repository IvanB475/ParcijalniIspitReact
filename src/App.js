import React from "react";
import { InputForm } from "./input";
import { DisplayData } from "./display";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";




let spinner;

export default function App() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [data, setData] = React.useState(null);

  const handleSubmit = (text) => {
    setQuery(text);
  };

  React.useEffect(() => {
    spinner = document.getElementById("spinner");
    if (!query) {
      setResults([]);
      setData([]);
      return;
    }
    spinner.removeAttribute("hidden");
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.github.com/users/${query}`
    )
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
        setResults(results);
      })
      .catch(() => alert("Došlo je do greške"));

    spinner.removeAttribute("hidden");
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.github.com/users/${query}/repos`
    )
      .then((response) => response.json())
      .then((githubData) => {
        spinner.setAttribute("hidden", "");
        setData(githubData);
      })
      .catch(() => alert("Došlo je do greške"));
  }, [query, setResults]);

  const resetState = () => {
    setResults([]);
    setData([]);
    return;
  };

  const { location, name, avatar_url, bio } = results;
  return (
    <div>
      <InputForm handleSubmit={handleSubmit}></InputForm>
      <div hidden id="spinner"></div>
      <DisplayData
        location={location}
        name={name}
        avatar_url={avatar_url}
        bio={bio}
      ></DisplayData>
      <h6>REPOSITORIES:</h6>
      <ListGroup>
        {data !== null && data.length > 1 ? (
          data.map((result) => (
            <ListGroup.Item key={result.id}>{result.name}</ListGroup.Item>
          ))
        ) : (
          <p></p>
        )}
        {data !== null && data.length > 1 ? (
          <Button onClick={() => resetState()}>Reset</Button>
        ) : (
          <p></p>
        )}
      </ListGroup>
    </div>
  );
}
