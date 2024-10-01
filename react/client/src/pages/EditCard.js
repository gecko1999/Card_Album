import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpClient from "../httpClient";

const EditCard = () => {
  const { cardId } = useParams(); // Extract the cardId from the URL
  const [cardData, setCardData] = useState({
    sport: "",
    brand: "",
    set: "",
    player: "",
    team: "",
    year: "",
    numberd: "",
    number: "",
    numberof: "",
    graded: "",
    gradedby: "",
    grade: "",
    linktopic: "",
  });
  const navigate = useNavigate(); // Allows redirecting

  // Fetch the card details when the page loads
  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const resp = await httpClient.get(
          `http://127.0.0.1:5000/update_card/${cardId}`,
          { withCredentials: true }
        );
        console.log(cardId);
        setCardData(resp.data); // Pre-fill the form with the fetched data
        console.log(resp.data);
      } catch (error) {
        console.log("Error fetching card data:", error);
        console.log(cardId);
      }
    };

    fetchCardDetails();
  }, [cardId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
    console.log(cardData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await httpClient.put(
        `http://127.0.0.1:5000/update_card/${cardId}`,
        cardData,
        { withCredentials: true }
      );
      console.log("Card updated:", resp.data);
      // Redirect to another page, e.g., back to the landing page or card listing
      navigate("/");
    } catch (error) {
      console.log("Error updating card:", error);
    }
  };

  return (
    <div className="background">
      <div className="editCard">
        <h1>Edit Card</h1>
        <form onSubmit={handleSubmit} className="editForm">
          <div>
            <label>Sport:</label>
            <br />
            <input
              type="text"
              name="sport"
              value={cardData.sport}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Brand:</label>
            <br />
            <input
              type="text"
              name="brand"
              value={cardData.brand}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Set:</label>
            <br />
            <input
              type="text"
              name="set"
              value={cardData.set}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Player:</label>
            <br />
            <input
              type="text"
              name="player"
              value={cardData.player}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Team:</label>
            <br />
            <input
              type="text"
              name="team"
              value={cardData.team}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Year:</label>
            <br />
            <input
              type="number"
              name="year"
              value={cardData.year}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Numbered:</label>
            <br />
            <input
              type="checkbox"
              name="numbered"
              value={cardData.numbered}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Number:</label>
            <br />
            <input
              type="number"
              name="number"
              value={cardData.number}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Numbered to:</label>
            <br />
            <input
              type="number"
              name="numberedof"
              value={cardData.numberof}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Graded:</label>
            <br />
            <input
              type="checkbox"
              name="graded"
              value={cardData.graded}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Grading Company:</label>
            <br />
            <input
              type="text"
              name="gradedby"
              value={cardData.gradedby}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Grade:</label>
            <br />
            <input
              type="number"
              name="grade"
              value={cardData.grade}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Image Path (linktopic):</label>
            <br />
            <input
              type="text"
              name="linktopic"
              value={cardData.linktopic}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditCard;
