import React, { useState } from "react";

const AddCard = () => {
  const [sport, setSport] = useState("");
  const [brand, setBrand] = useState("");
  const [set, setSet] = useState("");
  const [player, setPlayer] = useState("");
  const [year, setYear] = useState("");
  const [numbered, setNumbered] = useState("");
  const [number, setNumber] = useState("");
  const [numberedTo, setNumberedTo] = useState("");
  const [graded, setGraded] = useState("");
  const [gradedBy, setGradedBy] = useState("");
  const [grade, setGrade] = useState("");

  return (
    <div>
      <h1>Add Card</h1>
      <p>Here you can add Cards to your Account</p>
      <div>
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
            value={numberedTo}
            onChange={(e) => setNumberedTo(e.target.value)}
          />
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
          <label>Grading Company</label>
          <br />
          <input
            type="text"
            name="graded by"
            value={gradedBy}
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
          <br />{" "}
          <button type="button" onClick={null}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
