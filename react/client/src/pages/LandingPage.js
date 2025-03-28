import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../httpClient";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterApplied, setFilterApply] = useState(false);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  const logout = async () => {
    const resp = await httpClient.post("http://127.0.0.1:5000/logout");
    console.log(resp.data);
    window.location.href = "/LandingPage";
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

  const fetchCards = async () => {
    try {
      const resp = await httpClient.post(
        "http://127.0.0.1:5000/get_card",
        {
          filter_field: filterField,
          filter_value: filterValue,
        },
        {
          withCredentials: true,
        }
      );
      setCards(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log("Error fetching cards:", error);
    }
  };

  const fetchFilterOptions = async (selectedField) => {
    if (!selectedField) return;

    try {
      const resp = await httpClient.post(
        "http://127.0.0.1:5000/get_filter",
        { filter_field: selectedField },
        { withCredentials: true }
      );
      setFilterOptions(resp.data); // Update state with the distinct values
    } catch (error) {
      console.log("Error fetching filter options:", error);
      setFilterOptions([]); // Reset options on error
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

    fetchUser();
    fetchCards();
  }, []);

  useEffect(() => {
    if (filterField) {
      fetchFilterOptions(filterField);
    }
  }, [filterField]);

  const editCard = (cardId) => {
    console.log(cardId);
    navigate(`/editCard/${cardId}`);
  };

  const applyFilter = () => {
    setFilterApply(true);
    fetchCards();
  };

  const resetFilter = async () => {
    setFilterField("");
    setFilterValue("");

    try {
      const resp = await httpClient.post(
        "http://127.0.0.1:5000/get_card",
        {
          filter_field: "",
          filter_value: "",
        },
        { withCredentials: true }
      );
      setCards(resp.data);
      setFilterApply(false);
    } catch (error) {
      console.log("Error resetting filter:", error);
    }
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
      <h1 className="titleofpage">This is Starting Page</h1>
      {user ? (
        <div>
          <p className="userlogin">You are loged in {user.username}</p>
        </div>
      ) : (
        <p className="userlogin">you are not logged in</p>
      )}
      <div className="book">
        {user && (
          <div>
            <h2>Your Cards:</h2>
            <div>
              <select
                value={filterField}
                onChange={(e) => setFilterField(e.target.value)}
              >
                <option value={""}>Select Filter Field</option>
                <option value={"sport"}>Sport</option>
                <option value={"brand"}>Brand</option>
                <option value={"player"}>Player</option>
                <option value={"set"}>Set</option>
                <option value={"year"}>Year</option>
                <option value={"graded"}>Graded</option>
              </select>
              {filterField && (
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                >
                  <option value="">Select {filterField}</option>
                  {filterOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {filterField && filterValue && (
                <button onClick={applyFilter}>Apply Filter</button>
              )}
              {filterApplied && (
                <button onClick={resetFilter}>Reset Filter</button>
              )}
            </div>
            <ul className="grid-list">
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
                disabled={
                  currentPage === Math.ceil(cards.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
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
