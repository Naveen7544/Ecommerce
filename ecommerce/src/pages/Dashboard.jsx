import React,{ useState, useEffect } from 'react'
import ProductsCard from '../components/ProductsCard';
import '../index.scss';
import axios from 'axios';
function Dashboard() {
    const [productsData, setProductsData] = useState(null);
    const [error, setError] = useState(null);
    
     console.log("productsData11",productsData)

    useEffect(() => {
        getProduct()
      }, []); 

    const getProduct = () => {
        let apiUrl = 'http://localhost:4343/api/product';
        const token = localStorage.getItem('token');
        axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            setProductsData(response.data);
          })
          .catch(error => {
            setError(error);
          });
      }

  return (
    <>
    <section id="home">
        <div className="container">
            <div className="home_content">
                {
                    productsData?.map((item) => (
                        <ProductsCard key={item.id} {...item} />
                    ))
                }
            </div>
        </div>
    </section>
</>
  )
}

export default Dashboard