import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Page from "./Page";
import Pagination from "./Pagination";
import PokemonDetails from "./PokemonDetails";

function Result({selectedTypes, currentPage, setCurrentPage}) {
    const [pokemon, setPokemon] = useState([])
    const [pokemonPerPage] = useState(10)
    const [selectedPokemon, setSelectedPokemon] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json")
            setPokemon(response.data)
        }
        fetchData()
    }, [])

    let lastIndex = currentPage * pokemonPerPage;
    let firstIndex = lastIndex - pokemonPerPage;
    let allCurrentPokemon = pokemon.slice(firstIndex, lastIndex)
    let numberOfPages = Math.ceil(pokemon.length / pokemonPerPage);
    let newPokemon = []

    const setupPageNumbers = function(newPokemon) {
        lastIndex = currentPage * pokemonPerPage
        firstIndex = lastIndex - pokemonPerPage;
        numberOfPages = Math.ceil(newPokemon.length / pokemonPerPage);
        allCurrentPokemon = newPokemon.slice(firstIndex, lastIndex)
    }

    return (
        <div>
            {
                pokemon.map(poke => {
                    if(selectedTypes.length === 0 || selectedTypes.length > 2) {
                        lastIndex = 0
                        firstIndex = 0
                        allCurrentPokemon = pokemon.slice(firstIndex, lastIndex)
                        numberOfPages = 0
                        return
                    } else if(selectedTypes.every(type => poke.type.includes(type))) {
                        newPokemon.push(poke)
                    }
                })
            }

            {
                setupPageNumbers(newPokemon)
            }

            <div>
                <Page currentPokemon={allCurrentPokemon} currentPage={currentPage} setSelectedPokemon={setSelectedPokemon} />
                <Pagination numberOfPages={numberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

            {
                (selectedPokemon !== null) &&
                <PokemonDetails pokemon={pokemon} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
            }
        </div>
    )
}

export default Result;