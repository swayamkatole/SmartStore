import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Store, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <nav style={{background:"#0f172a",color:"white",padding:"0 24px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 8px rgba(0,0,0,0.3)"}}>
      <Link to="/" style={{display:"flex",alignItems:"center",gap:"8px",color:"#34d399",textDecoration:"none",fontSize:"20px",fontWeight:"bold"}}>
        <Store size={24}/> SmartStore
      </Link>
      <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
        <Link to="/" style={{color:"#cbd5e1",textDecoration:"none",fontSize:"14px"}}>Products</Link>
        {user && <Link to="/orders" style={{color:"#cbd5e1",textDecoration:"none",fontSize:"14px"}}>My Orders</Link>}
        <Link to="/cart" style={{position:"relative",color:"#cbd5e1"}}>
          <ShoppingCart size={22}/>
          {totalItems > 0 && (
            <span style={{position:"absolute",top:"-8px",right:"-8px",background:"#34d399",color:"white",borderRadius:"50%",width:"18px",height:"18px",fontSize:"11px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"}}>
              {totalItems}
            </span>
          )}
        </Link>
        {user ? (
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <span style={{color:"#94a3b8",fontSize:"13px",display:"flex",alignItems:"center",gap:"4px"}}><User size={15}/>{user.email}</span>
            <button onClick={handleLogout} style={{display:"flex",alignItems:"center",gap:"4px",padding:"6px 12px",background:"#1e293b",color:"#94a3b8",border:"1px solid #334155",borderRadius:"8px",cursor:"pointer",fontSize:"13px"}}>
              <LogOut size={14}/> Logout
            </button>
          </div>
        ) : (
          <div style={{display:"flex",gap:"8px"}}>
            <Link to="/login" style={{padding:"6px 14px",color:"#94a3b8",textDecoration:"none",fontSize:"13px"}}>Login</Link>
            <Link to="/register" style={{padding:"6px 14px",background:"#059669",color:"white",borderRadius:"8px",textDecoration:"none",fontSize:"13px",fontWeight:"500"}}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}