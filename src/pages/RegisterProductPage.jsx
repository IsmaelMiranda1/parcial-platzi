import { useEffect, useState } from "react";
import "./RegisterProductPage.css";

export default function RegisterProductPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // solo para validación

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const resCat = await fetch("https://api.escuelajs.co/api/v1/categories");
        const dataCat = await resCat.json();
        setCategories(dataCat);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }

      // cargar productos de API (solo valida nombres)
      try {
        const resProd = await fetch("https://api.escuelajs.co/api/v1/products");
        const dataProd = await resProd.json();
        setProducts(dataProd || []);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }

    }

    loadData();
  }, []);

  function clearMessageAfter(delay = 3000) {
    setTimeout(() => setMessage(""), delay);
  }

  function handleSave(e) {
    e.preventDefault();

    // Validar formulario completo
    if (!title.trim() || !price || !description.trim() || !category || !imageUrl.trim()) {
      setMessage("❌ Formulario incompleto");
      clearMessageAfter();
      return;
    }

    // Leer productos guardados en localStorage
    const localStored = JSON.parse(localStorage.getItem("myProducts")) || [];

    // Validar nombre repetido en API o localStorage
    const nameLower = title.trim().toLowerCase();
    const nameExistsInAPI = products.some(p => (p.title || p.name || "").toString().toLowerCase() === nameLower);
    const nameExistsLocal = localStored.some(p => (p.title || p.name || "").toString().toLowerCase() === nameLower);

    if (nameExistsInAPI || nameExistsLocal) {
      setMessage("❌ Producto no guardado, producto ya registrado con ese nombre");
      clearMessageAfter();
      return;
    }

    // Construir producto con misma forma que la API (para renderizar sin problemas)
    const newProduct = {
      id: Date.now(), // id local único
      title: title.trim(),
      price: Number(price),
      description: description.trim(),
      category: { name: category },
      images: [imageUrl.trim()]
    };

    // Guardar en localStorage (append)
    const updatedLocal = [...localStored, newProduct];
    localStorage.setItem("myProducts", JSON.stringify(updatedLocal));

    setMessage("✅ Producto guardado correctamente");
    clearMessageAfter();

    // Limpiar formulario
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImageUrl("");
  }

  return (
    <div className="register-container">
      <h2 className="register-title">Registrar producto</h2>

      <form className="register-card" onSubmit={handleSave}>
        {/* PRIMERA FILA */}
        <div className="row">
          <div className="input-box">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-box">
            <label>Precio</label>
            <div className="price-box">
              <span className="price-sign">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* SEGUNDA FILA */}
        <div className="row">
          <div className="input-box">
            <label>Descripción</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="input-box">
            <label>Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TERCERA FILA */}
        <div className="row">
          <div className="input-box" style={{ width: "100%" }}>
            <label>URL de la imagen</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Pega aquí la URL de la imagen"
            />
          </div>
        </div>

        <button className="btn-save" type="submit">Guardar producto</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
