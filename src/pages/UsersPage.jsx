import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import "./UsersPage.css";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const apiData = await getUsers();
        setUsers(apiData);
      } catch (err) {
        console.error("❌ Error cargando usuarios", err);
      }
    }
    load();
  }, []);

  return (
    <div className="content-container">
      <h1 className="page-title">Usuarios</h1>

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={user.name} />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p className="role">{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersPage;
