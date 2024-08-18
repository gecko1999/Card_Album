import React, { useState } from "react";
import httpClient from "../httpClient";

const AddCard = () => {
  const [sport, setSport] = useState("");
  const [brand, setBrand] = useState("");
  const [set, setSet] = useState("");
  const [player, setPlayer] = useState("");
  const [team, setTeam] = useState("");
  const [year, setYear] = useState("");
  const [numbered, setNumbered] = useState(false);
  const [number, setNumber] = useState(0);
  const [numberedof, setNumberedTo] = useState("");
  const [graded, setGraded] = useState(false);
  const [gradedby, setGradedBy] = useState("");
  const [grade, setGrade] = useState(0);
  const [image, setImage] = useState("");

  const addCard = async () => {
    try {
      const formData = new FormData();
      formData.append("sport", sport);
      formData.append("brand", brand);
      formData.append("set", set);
      formData.append("player", player);
      formData.append("team", team);
      formData.append("year", year);
      formData.append("numbered", numbered);
      formData.append("number", number);
      formData.append("numberof", numberedof);
      formData.append("graded", graded);
      formData.append("gradedby", gradedby);
      formData.append("grade", grade);
      formData.append("image", image);

      const resp = await httpClient.post(
        "http://127.0.0.1:5000/add_card",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(resp.data);
      window.location.href = "/";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Error adding Card");
      }
    }
  };

  return (
    <div>
      <h1>Add Card</h1>
      <p>Here you can add Cards to your Account</p>
      <div className="addCard">
        <form>
          <label>Sport:</label>
          <br />
          <input
            type="text"
            name="sport"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          />
          <br />
          <label>Brand:</label>
          <br />
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <br />
          <label>Set</label>
          <br />
          <input
            type="text"
            name="set"
            value={set}
            onChange={(e) => setSet(e.target.value)}
          />
          <br />
          <label>Player</label>
          <br />
          <input
            type="text"
            name="player"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
          />
          <br />
          <label>Team</label>
          <br />
          <input
            type="text"
            name="team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
          <br />
          <label>Year</label>
          <br />
          <input
            type="number"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <br />
          <label>Numberd</label>
          <br />
          <input
            type="checkbox"
            name="numbered"
            value={numbered}
            onChange={(e) => setNumbered(e.target.value)}
          />
          <br />
          {numbered && (
            <div>
              <label>Number</label>
              <br />
              <input
                type="number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <br />
              <label>Numbered to</label>
              <br />
              <input
                type="number"
                name="numbered to"
                value={numberedof}
                onChange={(e) => setNumberedTo(e.target.value)}
              />{" "}
            </div>
          )}
          <br />
          <label>Graded</label>
          <br />
          <input
            type="checkbox"
            name="graded"
            value={graded}
            onChange={(e) => setGraded(e.target.value)}
          />
          <br />
          {graded && (
            <div>
              <label>Grading Company</label>
              <br />
              <input
                type="text"
                name="graded by"
                value={gradedby}
                onChange={(e) => setGradedBy(e.target.value)}
              />
              <br />
              <label>Grade</label>
              <br />
              <input
                type="number"
                name="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
          )}
          <input
            type="file"
            name="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <button type="button" onClick={() => addCard()}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
