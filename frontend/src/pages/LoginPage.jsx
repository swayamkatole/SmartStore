import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Store, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch { setError("Invalid email or password"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a,#065f46)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
      <div style={{background:"white",borderRadius:"20px",padding:"40px",width:"100%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",fontSize:"22px",fontWeight:"bold",color:"#0f172a",marginBottom:"8px"}}>
            <Store style={{color:"#059669"}} size={28}/> SmartStore
          </div>
          <p style={{color:"#64748b",fontSize:"14px"}}>Sign in to your account</p>
        </div>
        {error && <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"12px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"8px",color:"#dc2626",fontSize:"13px",marginBottom:"16px"}}><AlertCircle size={16}/>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:"16px"}}>
            <label style={{display:"block",fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"}}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@smartstore.com" required
              style={{width:"100%",padding:"10px 14px",border:"1px solid #e2e8f0",borderRadius:"10px",fontSize:"14px",outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div style={{marginBottom:"24px"}}>
            <label style={{display:"block",fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"}}>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required
              style={{width:"100%",padding:"10px 14px",border:"1px solid #e2e8f0",borderRadius:"10px",fontSize:"14px",outline:"none",boxSizing:"border-box"}}/>
          </div>
          <button type="submit" disabled={loading}
            style={{width:"100%",padding:"12px",background:"#059669",color:"white",border:"none",borderRadius:"10px",fontSize:"15px",fontWeight:"600",cursor:"pointer"}}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p style={{textAlign:"center",fontSize:"13px",color:"#64748b",marginTop:"20px"}}>
          No account? <Link to="/register" style={{color:"#059669",fontWeight:"500"}}>Create one</Link>
        </p>
        <div style={{marginTop:"16px",padding:"12px",background:"#f0fdf4",borderRadius:"8px",fontSize:"12px",color:"#166534"}}>
          <strong>Demo:</strong> admin@smartstore.com / admin123
        </div>
      </div>
    </div>
  );
}