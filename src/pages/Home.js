import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Nav from '../components/Nav';

const Home = ({ setSelectedProductCategory, setSelectedCategory }) => {
    const [categories, setCategories] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['categories']);

    const navigate = useNavigate();
    
    const getCategories = async () => {
        try{
            const response = await axios.get('https://alphanode-api.herokuapp.com/get-categories');
            setCategories(response.data);
            setCookie('Categories', response.data);
        } catch(error){
            console.log(error);
        }
    }

    const handleClick = (products, category_name) => {
        setSelectedProductCategory(products);
        setSelectedCategory(category_name);
        navigate('/detail-product');
    }

    useEffect(() => {
        getCategories();
    }, [])

    const foundCategories = cookies.Categories? cookies.Categories : categories;

  return (
    <div className='overLay'>
        <section className='section-1'>
        <Nav />

            <div className='home'>
                <div className='home-text'>
                    <p>Asah kemampuan berbahasamu sekarang juga! </p>
                    <p>"WiraBasa, teman belajarmu untuk menjadi pewara dan penyunting tulisan yang handal"</p>
                </div>
                <div className='card-container'>
                    {foundCategories?.map((cataegory, _index) => 
                        <div className='card' key={_index}>
                            <h2>{cataegory.category_name}</h2>
                            <p>{cataegory.description}</p>
                            <button className='button-card' onClick={() => handleClick(cataegory.products, cataegory.category_name)}>See More</button>
                        </div>
                    )}
                </div>
                
            </div>
        </section>
    </div>
  )
}

export default Home