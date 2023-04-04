import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Page({currentPokemon, currentPage, setSelectedPokemon, setCurrentImage, setCurrentDetails}) {
    const [images, setImages] = useState([])

    const getId = (id) => {
        if (id < 10) return `00${id}`
        if (id < 100) return `0${id}`
        return id
    }

    const setImage = (poke) => {
        setSelectedPokemon(poke[1])
        setCurrentImage(poke[0].URL)

        const asyncGetDetails = async () => {
            let response = await axios.get(`http://localhost:3000/api/v1/pokemon/${poke[1]}`)
            setCurrentDetails(response.data[0])
        }
        asyncGetDetails()
    }

    useEffect(() => {
        const getImages = async () => {
            let newImages = []
            for(let i = 0; i < currentPokemon.length; i++){
                const response = await axios.get(`http://localhost:3000/api/v1/pokemonImage/${currentPokemon[i].id}`)
                newImages.push([response.data, currentPokemon[i].id])
            }
            setImages(newImages)
        }
        getImages()
    }, [currentPokemon])

    return (
        <div>
            <h1>Page number: {currentPage}</h1>
            <div className="pokemonList">
                {
                    images.map(poke => (
                        <div>
                            <img src={poke[0].URL} onClick={() => setImage(poke)}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
  
export default Page;