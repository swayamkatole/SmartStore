import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ordersApi } from "../services/api";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      ordersApi.getByUser(user.id).then(res => setOrders(res.data)).catch(()=>setOrders([]));
    }
  }, [user]);

  if (!user) return (
    <div style={{textAlign:"center",padding:"80px"}}>
      <p style={{marginBottom:"16px",color:"#64748b"}}>Please login to see your orders.</p>
      <Link to="/login" style={{padding:"10px 24px",background:"#059669",color:"white",borderRadius:"10px",textDecoration:"none"}}>Login</Link>
    </div>
  );

  return (
    <div style={{maxWidth:"800px",margin:"0 auto",padding:"32px 16px"}}>
      <h1 style={{fontSize:"24px",fontWeight:"700",color:"#0f172a",marginBottom:"24px"}}>My Orders</h1>
      {orders.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px",background:"white",borderRadius:"16px"}}>
          <Package size={48} style={{color:"#cbd5e1",marginBottom:"16px"}}/>
          <p style={{color:"#64748b",marginBottom:"16px"}}>No orders yet.</p>
          <Link to="/" style={{padding:"10px 24px",background:"#059669",color:"white",borderRadius:"10px",textDecoration:"none"}}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {orders.map(order=>(
            <div key={order.id} style={{background:"white",borderRadius:"12px",padding:"20px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
                <p style={{fontWeight:"600",color:"#0f172a"}}>Order #{order.id}</p>
                <span style={{padding:"4px 10px",borderRadius:"99px",fontSize:"12px",fontWeight:"500",
                  background:order.status==="DELIVERED"?"#dcfce7":order.status==="SHIPPED"?"#ede9fe":"#fef9c3",
                  color:order.status==="DELIVERED"?"#166534":order.status==="SHIPPED"?"#6d28d9":"#713f12"}}>
                  {order.status}
                </span>
              </div>
              <p style={{fontSize:"13px",color:"#64748b"}}>Total: <strong style={{color:"#0f172a"}}>₹{Number(order.totalAmount).toLocaleString("en-IN")}</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}