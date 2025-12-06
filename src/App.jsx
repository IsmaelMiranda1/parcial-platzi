import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import UsersPage from "./pages/UsersPage";
import RegisterProductPage from "./pages/RegisterProductPage";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ paddingLeft: "200px", width: "100%" }}>
        <Header />

        <div style={{ padding: "20px", marginTop: "100px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/register" element={<RegisterProductPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
