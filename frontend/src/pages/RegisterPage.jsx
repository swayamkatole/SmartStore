import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Store, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ email:"", password:"", fullName:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await register(form.email, form.password, form.fullName);
      navigate("/");
    } catch { setError("Registration failed. Email may already be taken."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a,#065f46)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
      <div style={{background:"white",borderRadius:"20px",padding:"40px",width:"100%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",fontSize:"22px",fontWeight:"bold",color:"#0f172a",marginBottom:"8px"}}>
            <Store style={{color:"#059669"}} size={28}/> SmartStore
          </div>
          <p style={{color:"#64748b",fontSize:"14px"}}>Create your account</p>
        </div>
        {error && <div style={{display:"flex",alignItems:"center",gap:"8px",padding:"12px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"8px",color:"#dc2626",fontSize:"13px",marginBottom:"16px"}}><AlertCircle size={16}/>{error}</div>}
        <form onSubmit={handleSubmit}>
          {[["Full Name","text","fullName","John Doe"],["Email","email","email","you@example.com"],["Password","password","password","Min. 6 characters"]].map(([label,type,key,ph])=>(
            <div key={key} style={{marginBottom:"16px"}}>
              <label style={{display:"block",fontSize:"13px",fontWeight:"500",color:"#374151",marginBottom:"6px"}}>{label}</label>
              <input type={type} value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} placeholder={ph} required
                style={{width:"100%",padding:"10px 14px",border:"1px solid #e2e8f0",borderRadius:"10px",fontSize:"14px",outline:"none",boxSizing:"border-box"}}/>
            </div>
          ))}
          <button type="submit" disabled={loading}
            style={{width:"100%",padding:"12px",background:"#059669",color:"white",border:"none",borderRadius:"10px",fontSize:"15px",fontWeight:"600",cursor:"pointer",marginTop:"8px"}}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p style={{textAlign:"center",fontSize:"13px",color:"#64748b",marginTop:"20px"}}>
          Already have an account? <Link to="/login" style={{color:"#059669",fontWeight:"500"}}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}