export async function getCategories() {
  const response = await fetch("https://api.escuelajs.co/api/v1/categories");
  const data = await response.json();
  return data;
}
