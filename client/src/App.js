import './App.css'
import React, {useEffect, useState} from 'react'

function App() {

  const [products, setProducts] = useState(null);

  useEffect(() => {
    // Grap data from the API route
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const remove = (product) => {
    // Delete product from array
    setProducts(products.filter(products => products !== product))
  }

  return (
    <div className="App">

      <h1>Listings</h1>

      {/* No products? Display loading. If there is, Loop over our product data */}
      {!products ? <p>loading...</p> : products.map(product => {

        return (
          <div key={product.title} className='products'>
            
            <button onClick={() => remove(product)}>X</button>

            <h5>{product.title}</h5>

            {console.log("->" + product.photo)}
            <img src={product.photo} alt="product"/>

            <p>{product.price}</p>

          </div>
        )

      })}

    </div>
  );
}

export default App;
