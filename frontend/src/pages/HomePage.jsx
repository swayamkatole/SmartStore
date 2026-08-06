import { useState, useEffect } from "react";
import { productsApi } from "../services/api";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";

const CATS = ["All","Electronics","Clothing","Books","Sports","Home"];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await productsApi.getAll();
      setProducts(res.data);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  };

  const filtered = products.filter(p => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category?.name === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div style={{background:"linear-gradient(135deg,#0f172a,#065f46)",color:"white",padding:"48px 24px",textAlign:"center"}}>
        <h1 style={{fontSize:"36px",fontWeight:"800",marginBottom:"8px"}}>Welcome to <span style={{color:"#34d399"}}>SmartStore</span></h1>
        <p style={{color:"#94a3b8",marginBottom:"24px"}}>Discover amazing products at the best prices</p>
        <div style={{position:"relative",maxWidth:"500px",margin:"0 auto"}}>
          <Search size={18} style={{position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",color:"#94a3b8"}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..."
            style={{width:"100%",padding:"12px 12px 12px 44px",borderRadius:"12px",border:"none",fontSize:"14px",outline:"none",boxSizing:"border-box"}}/>
        </div>
      </div>

      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"24px 16px"}}>
        <div style={{display:"flex",gap:"8px",marginBottom:"24px",flexWrap:"wrap"}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCategory(c)}
              style={{padding:"6px 16px",borderRadius:"99px",border:"1px solid",fontSize:"13px",cursor:"pointer",fontWeight:"500",
                background:category===c?"#059669":"white",color:category===c?"white":"#475569",borderColor:category===c?"#059669":"#e2e8f0"}}>
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"16px"}}>
            {[...Array(8)].map((_,i)=><div key={i} style={{height:"280px",background:"#f1f5f9",borderRadius:"16px",animation:"pulse 1.5s infinite"}}/>)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{textAlign:"center",padding:"60px",color:"#94a3b8"}}>
            <p style={{fontSize:"48px",marginBottom:"16px"}}>🔍</p>
            <p>No products found</p>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"16px"}}>
            {filtered.map(p=><ProductCard key={p.id} product={p}/>)}
          </div>
        )}
      </div>
    </div>
  );
}