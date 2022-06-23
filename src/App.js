import "./App.css";
import React, { useState, useEffect, useCallback } from "react";

function App() {
  const [nameList, setNameList] = useState([]);
  const [search, setSearch] = useState("");

  const fetchHandler = useCallback(async function () {
    try {
      const response = await fetch(
        "https://api.jikan.moe/v3/top/anime/1/bypopularity"
      );
      const data = await response.json();

      setNameList(data.top);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  //map the array in the p tag
  const filteredNameList = nameList.filter((name) => {
    return name.title.toLowerCase().includes(search.toLowerCase());
  });

  const nameListMap = filteredNameList.map((name) => {
    return (
      <div key={name.mal_id} style={{ display: "flex" }}>
        <img src={name.image_url} alt="" style={{ marginBottom: "20px" }} />
        <br />
        <div style={{ margin: "20px" }}>
          <a href={name.url} style={{ color: "white", textDecoration: "none" }}>
            {name.rank}. {name.title}
          </a>
          {<br></br>}
          <p style={{ fontSize: "20px" }}>
            ⭐ Score: {name.score} on MyAnimeList
            <br />
            <br />
            🎞️ Episode count: {name.episodes}
            <br />
            <br />
            📅 Date: {name.start_date} to {name.end_date}
            <br />
            <br />
            📖 Type: {name.type}
          </p>
          {<br></br>}
          <a href={name.url} style={{ color: "grey", fontSize: "16px" }}>
            🌐 Read more about anime
          </a>
        </div>
      </div>
    );
  });

  console.log(nameList);

  return (
    <div className="App">
      <header>
        <center>
          <input
            style={{
              width: "40%",
              height: "50px",
              margin: "20px",
              textAlign: "center",
              borderRadius: "5px",
              border: "1px solid black",
              fontSize: "20px",
            }}
            type="text"
            placeholder="Find name here"
            onChange={inputHandler}
          />
        </center>
        {nameListMap}
      </header>
    </div>
  );
}
export default App;
