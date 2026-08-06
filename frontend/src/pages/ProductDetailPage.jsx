import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsApi } from "../services/api";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ShoppingCart, Star, CheckCircle } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi.getById(id)
      .then(res => setProduct(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    addToCart({ ...product, category: product.category?.name }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div style={{textAlign:"center",padding:"80px",color:"#94a3b8"}}>Loading...</div>;
  if (!product) return <div style={{textAlign:"center",padding:"80px",color:"#94a3b8"}}>Product not found.</div>;

  return (
    <div style={{maxWidth:"900px",margin:"0 auto",padding:"32px 16px"}}>
      <button onClick={()=>navigate(-1)} style={{display:"flex",alignItems:"center",gap:"6px",background:"none",border:"none",cursor:"pointer",color:"#64748b",marginBottom:"24px",fontSize:"14px"}}>
        <ArrowLeft size={16}/> Back
      </button>
      <div style={{background:"white",borderRadius:"20px",padding:"32px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"40px",boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
        <div style={{background:"linear-gradient(135deg,#f1f5f9,#e2e8f0)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",minHeight:"280px",fontSize:"80px"}}>
          {product.imageUrl ? <img src={product.imageUrl} alt={product.name} style={{width:"100%",height:"280px",objectFit:"cover",borderRadius:"16px"}}/> : "📦"}
        </div>
        <div>
          <p style={{fontSize:"12px",color:"#059669",fontWeight:"600",textTransform:"uppercase",marginBottom:"8px"}}>{product.category?.name}</p>
          <h1 style={{fontSize:"24px",fontWeight:"700",color:"#0f172a",marginBottom:"12px",lineHeight:"1.3"}}>{product.name}</h1>
          <div style={{display:"flex",gap:"2px",marginBottom:"12px"}}>
            {[1,2,3,4,5].map(s=><Star key={s} size={16} style={{color:s<=4?"#f59e0b":"#e2e8f0",fill:s<=4?"#f59e0b":"#e2e8f0"}}/>)}
            <span style={{fontSize:"13px",color:"#64748b",marginLeft:"6px"}}>4.0 (128 reviews)</span>
          </div>
          <p style={{fontSize:"14px",color:"#64748b",lineHeight:"1.6",marginBottom:"20px"}}>{product.description}</p>
          <p style={{fontSize:"32px",fontWeight:"800",color:"#0f172a",marginBottom:"8px"}}>₹{Number(product.price).toLocaleString("en-IN")}</p>
          <p style={{fontSize:"13px",color:product.stockQuantity>0?"#059669":"#dc2626",fontWeight:"500",marginBottom:"24px"}}>
            {product.stockQuantity>0 ? `✓ In stock (${product.stockQuantity} available)` : "✗ Out of stock"}
          </p>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{display:"flex",alignItems:"center",border:"1px solid #e2e8f0",borderRadius:"10px",overflow:"hidden"}}>
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{padding:"10px 14px",border:"none",background:"white",cursor:"pointer",fontSize:"16px"}}>−</button>
              <span style={{padding:"10px 16px",fontWeight:"600",borderLeft:"1px solid #e2e8f0",borderRight:"1px solid #e2e8f0"}}>{qty}</span>
              <button onClick={()=>setQty(q=>Math.min(product.stockQuantity,q+1))} style={{padding:"10px 14px",border:"none",background:"white",cursor:"pointer",fontSize:"16px"}}>+</button>
            </div>
            <button onClick={handleAdd} disabled={product.stockQuantity===0}
              style={{flex:1,padding:"12px",background:added?"#065f46":"#059669",color:"white",border:"none",borderRadius:"10px",fontSize:"14px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
              {added ? <><CheckCircle size={18}/> Added!</> : <><ShoppingCart size={18}/> Add to Cart</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}