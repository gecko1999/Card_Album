import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);

  const logout = async () => {
    const resp = await httpClient.post("http://127.0.0.1:5000/logout");
    console.log(resp.data);
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await httpClient.get("http://127.0.0.1:5000/@me", {
          withCredentials: true,
        });
        setUser(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log("Unathorized");
      }
    };

    const fetchCards = async () => {
      try {
        const resp = await httpClient.post("http://127.0.0.1:5000/get_card", {
          withCredentials: true,
        });
        setCards(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log("Error fetching cards:", error);
      }
    };

    fetchUser();
    fetchCards();
  }, []);

  return (
    <div>
      <h1>This is Starting Page</h1>
      {user ? (
        <div>
          <p>You are loged in {user.username}</p>
        </div>
      ) : (
        <p>you are not logged in</p>
      )}
      {user && (
        <div>
          <h2>Your Cards:</h2>
          <ul>
            {cards.length > 0 ? (
              cards.map((card) => (
                <li key={card.id}>
                  <img
                    src={require("./" + card.linktopic)}
                    alt="card"
                    height={350}
                    width={250}
                  />
                  <br />
                  {card.player} - {card.brand} {card.set} ({card.year})
                  {console.log(card.linktopic)}
                  <button onClick={null}>Edit</button>
                </li>
              ))
            ) : (
              <p>No cards found</p>
            )}
          </ul>
        </div>
      )}
      {user ? (
        <div className="button-span">
          <a href="/logout">
            <button onClick={logout}>Logout</button>
          </a>
          <a href="addCard">
            <button>Add Card</button>
          </a>
        </div>
      ) : (
        <div className="button-span">
          <a href="/login">
            <button>Login</button>
          </a>
          <a href="/register">
            <button>Register</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
