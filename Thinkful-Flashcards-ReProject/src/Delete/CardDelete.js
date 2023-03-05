import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardDelete({cardId}) {
    const history = useHistory();

    function handleCardDelete() {
    const deleteCardPromt = window.confirm("Delete this Card?\nYou will not be able to recover it.")

    if(deleteCardPromt) {
        deleteCard(cardId)
        .then((history.push(`/`)))
        .then(window.location.reload()) 
    }
}

    return (
        <button className="btn btn-danger" onClick={handleCardDelete}>
            <span className="oi oi-trash"></span>
        </button>
    )
}

export default CardDelete;