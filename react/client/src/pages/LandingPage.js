import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../httpClient";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  const logout = async () => {
    const resp = await httpClient.post("http://127.0.0.1:5000/logout");
    console.log(resp.data);
    window.location.href = "/";
  };

  const deleteCard = async (cardId) => {
    try {
      const resp = await httpClient.delete(
        "http://127.0.0.1:5000/delete_card",
        {
          data: { id: cardId },
          withCredentials: true,
        }
      );
      console.log(resp.data);

      setCards(cards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.log("Error deleting card:", error);
    }
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

  const editCard = (cardId) => {
    console.log(cardId);
    navigate(`/editCard/${cardId}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = cards.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(cards.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
        <div className="book">
          <h2>Your Cards:</h2>

          <ul class="grid-list">
            {currentCards.length > 0 ? (
              currentCards.map((card) => (
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
                  <button onClick={() => editCard(card.id)}>Edit</button>
                  <button onClick={() => deleteCard(card.id)}>Delete</button>
                </li>
              ))
            ) : (
              <p>No cards found</p>
            )}
          </ul>
          <div>
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(cards.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
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
