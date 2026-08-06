import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) { navigate("/login"); return; }
    alert("Order placed successfully! 🎉");
    clearCart();
    navigate("/orders");
  };

  if (items.length === 0) return (
    <div style={{minHeight:"60vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"16px"}}>
      <ShoppingBag size={64} style={{color:"#cbd5e1"}}/>
      <p style={{fontSize:"20px",fontWeight:"600",color:"#64748b"}}>Your cart is empty</p>
      <Link to="/" style={{padding:"10px 24px",background:"#059669",color:"white",borderRadius:"10px",textDecoration:"none",fontWeight:"500"}}>Browse Products</Link>
    </div>
  );

  const tax = Math.round(totalPrice * 0.18);
  const shipping = totalPrice >= 499 ? 0 : 49;
  const total = totalPrice + tax + shipping;

  return (
    <div style={{maxWidth:"1000px",margin:"0 auto",padding:"32px 16px"}}>
      <h1 style={{fontSize:"24px",fontWeight:"700",color:"#0f172a",marginBottom:"24px"}}>Shopping Cart ({items.length} items)</h1>
      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:"24px",alignItems:"start"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {items.map(item=>(
            <div key={item.id} style={{background:"white",borderRadius:"12px",padding:"16px",display:"flex",alignItems:"center",gap:"16px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",border:"1px solid #f1f5f9"}}>
              <div style={{width:"60px",height:"60px",background:"#f1f5f9",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px",flexShrink:0}}>
                {item.imageUrl ? <img src={item.imageUrl} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"8px"}}/> : "📦"}
              </div>
              <div style={{flex:1}}>
                <p style={{fontWeight:"600",fontSize:"14px",color:"#1e293b",marginBottom:"2px"}}>{item.name}</p>
                <p style={{fontSize:"13px",color:"#059669",fontWeight:"600"}}>₹{Number(item.price).toLocaleString("en-IN")}</p>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"8px",border:"1px solid #e2e8f0",borderRadius:"8px",overflow:"hidden"}}>
                <button onClick={()=>updateQty(item.id,item.qty-1)} style={{padding:"6px 10px",border:"none",background:"white",cursor:"pointer"}}><Minus size={14}/></button>
                <span style={{fontSize:"14px",fontWeight:"600",minWidth:"20px",textAlign:"center"}}>{item.qty}</span>
                <button onClick={()=>updateQty(item.id,item.qty+1)} style={{padding:"6px 10px",border:"none",background:"white",cursor:"pointer"}}><Plus size={14}/></button>
              </div>
              <p style={{fontWeight:"700",fontSize:"15px",color:"#0f172a",minWidth:"80px",textAlign:"right"}}>₹{(Number(item.price)*item.qty).toLocaleString("en-IN")}</p>
              <button onClick={()=>removeFromCart(item.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#cbd5e1",padding:"4px"}}><Trash2 size={18}/></button>
            </div>
          ))}
        </div>
        <div style={{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",border:"1px solid #f1f5f9",position:"sticky",top:"80px"}}>
          <h2 style={{fontSize:"16px",fontWeight:"700",marginBottom:"16px",color:"#0f172a"}}>Order Summary</h2>
          {[["Subtotal",`₹${totalPrice.toLocaleString("en-IN")}`],["GST (18%)",`₹${tax.toLocaleString("en-IN")}`],["Shipping",shipping===0?"FREE":`₹${shipping}`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#64748b",marginBottom:"8px"}}>
              <span>{k}</span><span style={{color:v==="FREE"?"#059669":"inherit"}}>{v}</span>
            </div>
          ))}
          <div style={{borderTop:"1px solid #f1f5f9",paddingTop:"12px",marginTop:"8px",display:"flex",justifyContent:"space-between",fontWeight:"700",fontSize:"16px",color:"#0f172a"}}>
            <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <button onClick={handleCheckout}
            style={{width:"100%",marginTop:"20px",padding:"14px",background:"#059669",color:"white",border:"none",borderRadius:"12px",fontSize:"15px",fontWeight:"700",cursor:"pointer"}}>
            {user ? "Place Order 🎉" : "Login to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}