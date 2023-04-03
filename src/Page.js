import React from 'react'

function Page({currentPokemon, currentPage, setSelectedPokemon}) {
    const getId = (id) => {
        if (id < 10) return `00${id}`
        if (id < 100) return `0${id}`
        return id
    }
    
    return (
        <div>
            <h1>Page number: {currentPage}</h1>
            <div className="pokemonList">
                {
                    currentPokemon.map(poke => (
                        <div>
                            <img src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${getId(poke.id)}.png`} onClick={() => setSelectedPokemon(poke.id)}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
  
export default Page;