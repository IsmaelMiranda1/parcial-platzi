

export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Error cargando los productos");
  }

  const data = await res.json();
  const adapted = data.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: { name: p.category },
    images: [p.image] 
  }));

  return adapted;
}
      