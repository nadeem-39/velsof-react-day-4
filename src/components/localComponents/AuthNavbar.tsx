// src/components/Navbar.tsx
import { useAuthStore } from "../../lib/authStore";
import { useNavigate } from "react-router-dom";

export default function AuthNavbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between p-4 text-white">
      <div>Welcome, {user?.name}</div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
