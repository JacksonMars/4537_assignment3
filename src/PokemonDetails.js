import React, { useState } from "react";

function PokemonDetails({pokemon, selectedPokemon, setSelectedPokemon, currentImage, currentDetails}) {
    let selectedTypes = ""

    const setTypes = function(types) {
        if(types.length === 1) {
            selectedTypes = types[0]
        } else {
            selectedTypes = types[0] + ", " + types[1]
        }
    }

    return (
        <div>
            {
                (selectedPokemon != undefined && currentDetails != null) &&
                <div>
                    {setTypes(currentDetails.type)}
                    <button onClick={() => setSelectedPokemon(null)}>Remove</button>
                    <img src={currentImage} />
                    <h2>Name: {currentDetails.name.english}</h2>
                    <p>Pokedex Number: {selectedPokemon}</p>
                    <p>Type: {selectedTypes}</p>
                    <p>HP: {currentDetails.base.HP}</p>
                    <p>Attack: {currentDetails.base.Attack}</p>
                    <p>Defense: {currentDetails.base.Defense}</p>
                    <p>Special Attack: {currentDetails.base['Speed Attack']}</p>
                    <p>Special Defense: {currentDetails.base['Speed Defense']}</p>
                    <p>Speed: {currentDetails.base.Speed}</p>
                </div>
            }
        </div>
    )
}

export default PokemonDetails;