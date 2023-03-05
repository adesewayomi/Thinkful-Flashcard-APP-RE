import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api";
import DeckView from "./DeckView";

function DeckList() {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        const abortController =  new AbortController();

        async function getDecksList() {
            try {
                const list = await listDecks(abortController.signal);
                setDecks(list);
            }
            catch (error) {
                console.log("error creating deck list");
            }
            return () => abortController.abort();
        }

        getDecksList();
    }, [])

    const deckList = decks.map((deck) => <DeckView key= {deck.id} deck={deck} />)

    return (
        <div className="decks">
            {deckList}
        </div>
    )
}

export default DeckList;
