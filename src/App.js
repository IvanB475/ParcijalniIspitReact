import React from "react";
import { InputForm } from "./input";
import { DisplayData } from "./display";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";




export default function App() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [data, setData] = React.useState(null);
  const [ attribute , setAttribute ] = React.useState(true);

  const handleSubmit = (text) => {
    setQuery(text);
  };



  React.useEffect(() => {
    if (!query) {
      setResults([]);
      setData([]);
      return;
    }

    setAttribute(false);
    console.log(attribute);
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.github.com/users/${query}`
    )
      .then((response) => response.json())
      .then((results) => {
        console.log(results);
        setResults(results);
      })
      .catch(() => alert("Došlo je do greške"));

    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.github.com/users/${query}/repos`
    )
      .then((response) => response.json())
      .then((githubData) => {
        setAttribute(true);
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
      <div hidden={attribute}></div>
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
