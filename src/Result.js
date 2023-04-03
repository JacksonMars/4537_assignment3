import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Page from "./Page";
import Pagination from "./Pagination";

function Result({selectedTypes, currentPage, setCurrentPage}) {
    const [pokemon, setPokemon] = useState([])
    const [pokemonPerPage] = useState(10)

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
                        // <>
                        //     {poke.name.english}
                        //     <br />
                        // </>
                        newPokemon.push(poke)
                    }
                })
            }

            {
                newPokemon.map(poke => {
                    lastIndex = currentPage * pokemonPerPage;
                    firstIndex = lastIndex - pokemonPerPage;
                    allCurrentPokemon = newPokemon.slice(firstIndex, lastIndex)
                    numberOfPages = Math.ceil(newPokemon.length / pokemonPerPage);
                })
            }
        
            <Page currentPokemon={allCurrentPokemon} currentPage={currentPage} />
            <Pagination numberOfPages={numberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
        // <div>
        //     {
        //         pokemon.map(poke => {
        //             if(selectedTypes.length === 0) {
        //                 return(
        //                     <></>
        //                 )
        //             } else if(selectedTypes.every(type => poke.type.includes(type))) {
        //                 return(
        //                     <>
        //                         {poke.name.english}
        //                         <br />
        //                     </>
        //                 )
        //             }
        //         })
        //     }
        // </div>
    )
}

export default Result;