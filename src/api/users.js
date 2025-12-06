export async function getUsers() {
  const res = await fetch("https://api.escuelajs.co/api/v1/users");
  const data = await res.json();
  return data;
}
