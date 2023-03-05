import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams } from "react-router-dom";
import CardList from "../Cards/CardList";
import { Link } from "react-router-dom";


function Study() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardCount, setCardCount] = useState(0);
    const { deckId } = useParams();

    
    useEffect(() => {
        const abortController = new AbortController();

        async function showCard() {
            try {
                const cardList = await readDeck(deckId, abortController.signal);
                setDeck(cardList);
                setCardCount(cardList.cards.length)
                setCards(cardList.cards)
            }
            catch (error) {
                console.log("error creating card list");
            }
            return () => abortController.abort();
        }

        showCard();
    }, [deckId]);


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
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h3>{deck.name}: Study</h3>
            <div> <CardList deck={deck} cardCount={cardCount} cards={cards}/> </div>
        </div>
    )
}

export default Study;