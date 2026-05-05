// src/components/Navbar.tsx
import { useAuthStore } from "../../lib/authStore";
import { useNavigate } from "react-router-dom";
import velocityImage from "../../assets/images/velocity_logo.png";

export default function AuthNavbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // return (
  //   <div classNameNameName="flex justify-between p-4 text-white">
  //     <div>Welcome, {user?.name}</div>

  //     <button onClick={handleLogout}>Logout</button>
  //   </div>
  // );

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex bg-gray-800 h-full">
          <div className="navbar-brand-box  ">
            <span className="logo-sm ">
              <img src={velocityImage} alt="icon" height="40" />
            </span>
            <span className="logo-lg">
              <img src={velocityImage} alt="icon" height="" />
            </span>
          </div>
        </div>

        <div className="d-flex pr-2">
          <div className="dropdown d-inline-block">
            <span className="d-none d-xl-inline-block ml-1" key="t-henry">
              Welcome, {user?.name}
            </span>
            &nbsp;&nbsp;
            <button className="text-blue-500" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
