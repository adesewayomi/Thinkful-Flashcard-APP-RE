import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { updateDeck } from "../utils/api/index";

function EditDeck() {
    const history = useHistory();
    const [deck, setDeck] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { deckId } = useParams();
    
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

        
        useEffect(() => {
            const abortController = new AbortController();
    
            async function loadDeck() {
                try{
                    const pullDeck = await readDeck(deckId, abortController.signal);
                    setDeck(pullDeck);
                    setName(pullDeck.name);
                    setDescription(pullDeck.description);
                }
                catch (error) {
                    console.log("error creating deck list");
                }
    
                return () => abortController.abort();
            }
    
            loadDeck();
        }, [deckId])

    
    const handleSubmit = (event) => {
        event.preventDefault();
        updateDeck({
            ...deck,
            name: name,
            description: description,
        }).then((newDeck) => history.push(`/decks/${newDeck.id}`))
    };

    return (
        <div className="edit-deck">
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
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h3>Edit: {deck.name}</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                className="form-control" 
                id="name" 
                required
                onChange={handleNameChange} 
                value={name}
                 />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                className="form-control" 
                id="description" 
                rows="3" 
                required
                onChange={handleDescriptionChange}
                value={description}
                ></textarea>
            </div>
            <br />
            <button className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deck.id}`)}>
                Cancel
            </button>
            <button type="submit" className="btn btn-primary mx-1">
                Submit
            </button>
        </form>
        </div>
    )

}

export default EditDeck;