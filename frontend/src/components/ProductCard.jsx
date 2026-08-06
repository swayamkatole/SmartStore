import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Star } from "lucide-react";

const EMOJI = { Electronics:"📱", Clothing:"👕", Books:"📚", Sports:"⚽", Home:"🏠", Beauty:"💄" };

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const cat = product.category?.name || "General";

  return (
    <div style={{background:"white",borderRadius:"16px",overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.08)",border:"1px solid #f1f5f9",transition:"transform 0.2s, box-shadow 0.2s"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.12)"}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.08)"}}>
      <Link to={`/products/${product.id}`} style={{textDecoration:"none",color:"inherit"}}>
        <div style={{height:"160px",background:"linear-gradient(135deg,#f1f5f9,#e2e8f0)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"56px"}}>
          {product.imageUrl ? <img src={product.imageUrl} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : EMOJI[cat] || "📦"}
        </div>
        <div style={{padding:"14px"}}>
          <p style={{fontSize:"11px",color:"#059669",fontWeight:"600",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:"4px"}}>{cat}</p>
          <h3 style={{fontSize:"14px",fontWeight:"600",color:"#1e293b",marginBottom:"6px",lineHeight:"1.4",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{product.name}</h3>
          <div style={{display:"flex",marginBottom:"10px"}}>
            {[1,2,3,4,5].map(s=><Star key={s} size={12} style={{color: s<=4?"#f59e0b":"#e2e8f0",fill: s<=4?"#f59e0b":"#e2e8f0"}}/>)}
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:"18px",fontWeight:"700",color:"#0f172a"}}>₹{Number(product.price).toLocaleString("en-IN")}</span>
            <button onClick={e=>{e.preventDefault();addToCart({...product, category: cat})}}
              style={{display:"flex",alignItems:"center",gap:"4px",padding:"6px 10px",background:"#059669",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",fontSize:"12px",fontWeight:"500"}}>
              <ShoppingCart size={13}/> Add
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}