import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Products = ({ selectedProductCategory, selectedCategory }) => {
  const selectedProducts = selectedProductCategory?.map(({product_id}) => product_id);
  const [toggle, setToggle] = useState(0);
  const [products, setProducts] = useState(null);
  const [productItem, setProductItem] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const navigate = useNavigate();


  const getUser = async () => {
    if(!selectedProducts){
      navigate('/')
      return;
    };
    try{
      const response = await axios.get('https://alphanode-api.herokuapp.com/products', {
        params: {
          productIds: JSON.stringify(selectedProducts)
        }
      })
      setProducts(response.data);
      setProductItem(response.data[0]);

    } catch(err){
      console.log(err);
    }
  }

  const handleClick = (product, _index) => {
    setToggle(_index);
    setProductItem(product);
  }
  
  useEffect(() => {
    getUser();
  }, []);
  console.log(toggle);
  console.log(productItem?.product_name);

  return (
    <div className='products'>
        <Nav />

        <div className='product-container'>
          <ul>
            {products?.map((product, _index) =>
              <li key={_index}>
                <button className={toggle === _index? 'product-clicked' : 'product'} onClick={() => handleClick(product, _index)}>{product.product_name}</button>
              </li>
            )}
          </ul>
        </div>

        <div className='content-container'>
          <div className='detail-product'>
            <h3>{productItem?.product_name}</h3> 
            <p>{productItem?.description}</p>
            <br />
            {productItem?.detail_price.map((multiPrice, _index) =>
            <div key={_index}>{_index === 0 ? <h3 key={_index}>{multiPrice}</h3> : <p key={_index}>{multiPrice}</p>}</div>       
            )}
          </div>

          <div className='price-container'>
            <h2>Harga</h2>
            <h2>{productItem?.price}</h2>
            <br />
            <p>{error}</p>
            <a target="_blank" rel="noreferrer" href={cookies.AuthToken && productItem?.url} className='btn-daftar' onClick={() =>
              (!cookies.AuthToken && setError('login terlebih dahulu'))
             }>Daftar Sekarang</a>
            <p className='atau'>atau</p>
            <a target="_blank" rel="noreferrer" href='https://api.whatsapp.com/send?phone=6285702891223' className='btn-contac'><img src={require('../assets/whatsapp.png')} alt=''/> Hubungi Kami</a>
          </div>
        </div>
        
    </div>
  )
}

export default Products