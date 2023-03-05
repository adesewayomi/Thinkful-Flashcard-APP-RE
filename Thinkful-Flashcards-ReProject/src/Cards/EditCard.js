import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const [deck, setDeck] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [thisCard, setThisCard] = useState({});
  const { deckId } = useParams();
  const { cardId } = useParams();
  const history = useHistory();

  
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const pullDeck = await readDeck(deckId, abortController.signal);
        setDeck(pullDeck);
      } catch (error) {
        console.log("error loading the deck");
      }

      return () => abortController.abort();
    }

    loadDeck();
  }, [deckId]);

  
  useEffect(() => {
    const abortController = new AbortController();

    async function findCard() {
      try {
        const pullCard = await readCard(cardId, abortController.signal);
        setThisCard(pullCard);
        setFront(pullCard.front);
        setBack(pullCard.back);
      } catch (error) {
        console.log("error getting card");
      }
      return () => abortController.abort();
    }

    findCard();
  }, [cardId]);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard({
      ...thisCard,
      front: front,
      back: back,
    }).then((response) => history.push(`/decks/${deck.id}`));
  };
  
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home mx-1"></span>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {thisCard.id}
          </li>
        </ol>
      </nav>
      <h3>Edit Card</h3>
      <div className="card-info">
        <CardForm
          front={front}
          back={back}
          deck={deck}
          setFront={setFront}
          setBack={setBack}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default EditCard;
