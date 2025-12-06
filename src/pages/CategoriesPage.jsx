import { useEffect, useState } from "react";
import { getCategories } from "../api/categories";
import "./CategoriesPage.css";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const apiData = await getCategories();
        setCategories(apiData);
      } catch (err) {
        console.error("❌ Error cargando categorías", err);
      }
    }
    load();
  }, []);

  return (
    <div className="content-container">
      <h1 className="page-title">Categorías</h1>

      <div className="categories-grid">
        {categories.map(cat => (
          <div key={cat.id} className="category-card">
            <img src={cat.image} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
    