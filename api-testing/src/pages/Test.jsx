import axios from "axios";
import { useEffect, useState } from "react";
import './test.css'


const Test = () => {

    const [beer, setBeer] = useState();
    const [tagline, setTagline] = useState()
    const [abv, setAbv] = useState()
    const [image, setImage] = useState()
    const [desc, setDesc] = useState()

    const getABeer = () => {
        window.location.reload()
    }

    const url = 'https://api.punkapi.com/v2/beers/random';

    useEffect(() => {
        const fetchBeer = async () => {
            await axios.get(url)
            .then((response) => {
                setBeer(response.data[0].name);
                setTagline(response.data[0].tagline);
                setAbv(response.data[0].abv);
                setImage(response.data[0].image_url);
                setDesc(response.data[0].description);
            })
            .catch((error) => {console.log(error.message)})
        }
    fetchBeer()
    }, [])


    return <>
        <button className="btn" onClick={getABeer}>Get Boozie</button>

        <h1 className="beer">Beer:{beer}</h1>
         <h1>Description:{desc}</h1>

         <h1 className="tagline">Tagline: {tagline}
         </h1>
         <h1>Abv:{abv}</h1>
         <img className='img'src={image} alt="" />
        </>
}

export default Test;