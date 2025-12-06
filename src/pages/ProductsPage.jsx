import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const apiData = await getProducts();
        console.log("📦 API:", apiData);

        // productos guardados localmente
        const local = JSON.parse(localStorage.getItem("myProducts")) || [];

        // API primero, luego los manuales
        setProducts([...apiData, ...local]);

      } catch (err) {
        console.error("❌ Error API:", err);
        const local = JSON.parse(localStorage.getItem("myProducts")) || [];
        setProducts(local);
      }
    }

    load();
  }, []);

  return (
    <div className="products-container">
      <h1 className="page-title">Productos</h1>

      <div className="products-grid">
        {products.length === 0 ? (
          <p>No hay productos para mostrar.</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.images[0]} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>
              <p className="category">{product.category?.name}</p>
              <p className="description">{product.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
