import React from "react";
import DeckDelete from "../Delete/DeckDelete";
import { useHistory } from "react-router-dom";

function DeckView({ deck }) {
    const history = useHistory();

    return (
        <div className="border rounded p-2 my-2" key={deck.id}>
            <div>
                <h3>{deck.name}</h3>
                <h6>{deck.cards.length} cards</h6>
            </div>
            <div>
                <p>{deck.description}</p>
            </div>
            <div>
                <button className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
                    <span className="oi oi-eye mx-1"></span>
                    View
                </button>
                <button className="btn btn-primary" onClick={() => history.push(`/decks/${deck.id}/study`)}>
                    <span className="oi oi-book mx-1"></span>
                    Study
                </button>
                    <DeckDelete deckId={deck.id} />
            </div>
        </div>
    )

}

export default DeckView;