import React, { useState, useMemo, useEffect } from 'react';

// --- DATA ---
const CATALOG_DATA = [
  { itemname: "Kia Sonet", category: "Cars", image: "https://stimg.cardekho.com/images/car-images/930x620/Kia/Sonet/9783/1705386619542/222_Pewter-Olive_33382d.jpg", itemprops: [{ label: "Color", value: "Pewter Olive" }, { label: "Engine", value: "1.2L Kappa" }, { label: "RPM", value: "6000" }, { label: "Capacity", value: "5 Seater" }] },
  { itemname: "iPhone 16 Pro", category: "Phones", image: "https://images.unsplash.com/photo-1726732970014-f2df88c87dd3?q=80&w=1032&auto=format&fit=crop", itemprops: [{ label: "Lens Type", value: "Tetraprism Telephoto" }, { label: "Screen Size", value: "6.3-inch" }, { label: "Battery", value: "3577 mAh" }] },
  { itemname: "Tesla Model 3", category: "Cars", image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Main-Hero-Desktop-LHD.jpg", itemprops: [{ label: "Range", value: "341 miles" }, { label: "0-60 mph", value: "5.8s" }, { label: "Top Speed", value: "125 mph" }] },
  { itemname: "MacBook Pro M3", category: "Computers", image: "https://images.unsplash.com/photo-1724859234679-964acf07b126?q=80&w=870&auto=format&fit=crop", itemprops: [{ label: "Processor", value: "Apple M3 Max" }, { label: "RAM", value: "36GB" }, { label: "Display", value: "Liquid Retina XDR" }] },
  { itemname: "Ducati Panigale V4", category: "Bikes", image: "https://images.ctfassets.net/x7j9qwvpvr5s/43adRuY33iuCayAyMy3wTw/5545b174f876fc95ffcfff3d643c4d23/Ducati-MY25-Panigale-V4-overview-carousel-hero-link-1600x650-01.jpg", itemprops: [{ label: "Type", value: "Superbike" }, { label: "Displacement", value: "1,103 cc" }, { label: "Max Power", value: "214 hp" }] },
  { itemname: "Samsung S24 Ultra", category: "Phones", image: "https://images.samsung.com/in/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-carousel-exclusive.jpg", itemprops: [{ label: "Zoom", value: "100x Space Zoom" }, { label: "Stylus", value: "S-Pen Included" }] },
  { itemname: "Royal Enfield Himalayan", category: "Bikes", image: "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/himalayan-450/gma/gma-himalayan.webp", itemprops: [{ label: "Engine", value: "Sherpa 450" }, { label: "Weight", value: "196 kg" }] },
  { itemname: "Dell XPS 15", category: "Computers", image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/touch-black/notebook-xps-15-9530-t-black-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=677&qlt=100,1&resMode=sharp2&size=677,402&chrss=full", itemprops: [{ label: "GPU", value: "RTX 4050" }, { label: "Chassis", value: "CNC Aluminum" }] },
  { itemname: "Hyundai Tucson", category: "Cars", image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Tucson/10133/1762431617294/front-left-side-47.jpg", itemprops: [{ label: "AWD", value: "Yes" }] },
  { itemname: "Google Pixel 9", category: "Phones", image: "https://images.unsplash.com/photo-1727132528094-117c9dceb047?q=80&w=1031&auto=format&fit=crop", itemprops: [{ label: "Chip", value: "Tensor G4" }] },
  { itemname: "Kawasaki Ninja H2", category: "Bikes", image: "https://cdn.bikedekho.com/processedimages/kawasaki/kawasaki-ninja-h2/source/kawasaki-ninja-h261a5ba444bbd9.jpg", itemprops: [{ label: "Supercharged", value: "Yes" }] },
  { itemname: "ASUS ROG Zephyrus", category: "Computers", image: "https://www.amd.com/content/dam/amd/en/images/products/laptops/2201103-amd-advantage-laptop-rog-zephyrus-g14-video-thumbnail.png", itemprops: [{ label: "Screen", value: "OLED" }] },
  { itemname: "Honda Civic", category: "Cars", image: "https://images10.gaadi.com/usedcar_image/5247609/original/processed_50a4a83c-3124-4bde-982c-ab0888306cfb.jpg?imwidth=930", itemprops: [{ label: "Hybrid", value: "Available" }] },
  { itemname: "OnePlus 12", category: "Phones", image: "https://imgs.search.brave.com/J2oKrlKjJ-nIFwv-DvHWsskgA1vun-Qe21pKTBrUYcg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y25ldC5jb20vYS9p/bWcvcmVzaXplL2Nm/ZGY2N2FiOTQyMWM3/ZjdmYjc5ZDQwMDBj/MzhjZGRjMjdkYjNm/OWUvaHViLzIwMjQv/MDEvMjIvYTc2ZmUy/OGEtNjgyNC00MzI5/LTg3NjUtNjYyMDVm/YmJjNTIyL29uZXBs/dXMtMTItMTJyLWNu/ZXQtbGFueG9uLXJl/dmlldy0xMS5qcGc_/YXV0bz13ZWJwJmZp/dD1jcm9wJmhlaWdo/dD0zNjImd2lkdGg9/NjQ0", itemprops: [{ label: "Charge", value: "100W" }] },
  { itemname: "BMW S1000RR", category: "Bikes", image: "https://imgs.search.brave.com/MLnRAqJ4g5uJP1oieyiD9Nu6z06sKCBnl25db6XnvJc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdk/LmFlcGxjZG4uY29t/LzY0MngzNjEvbi9j/dy9lYy8xOTE0MDUv/Ym13LXMxMDAwcnIt/cmlnaHQtc2lkZS12/aWV3Ny5qcGVnP2lz/aWc9MCZxPTc1", itemprops: [{ label: "HP", value: "205" }] },
  { itemname: "Toyota Fortuner", category: "Cars", image: "https://static3.toyotabharat.com/images/showroom/fortuner/fortuner-mmc/new-fortuner.webp", itemprops: [{ label: "Engine", value: "2.8L Diesel" }] },
  { itemname: "Nothing Phone 2", category: "Phones", image: "https://imgs.search.brave.com/_8xKzsucYHNzZXVnfxBpTD0IGRrKeCgQ9dJ0t4c4IXA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mZG4u/Z3NtYXJlbmEuY29t/L2ltZ3Jvb3QvcmV2/aWV3cy8yMi9ub3Ro/aW5nLXBob25lLTEv/bGlmZXN0eWxlLy0x/MDI0dzIvZ3NtYXJl/bmFfMDExLmpwZw", itemprops: [{ label: "Glyph", value: "Version 2.0" }] },
  { itemname: "Harley Fat Boy", category: "Bikes", image: "https://images.unsplash.com/photo-1646904473811-a6a4b3a0a508?q=80&w=774&auto=format&fit=crop", itemprops: [{ label: "Engine", value: "Milwaukee-Eight 114" }] },
  { itemname: "Lenovo Legion 5", category: "Computers", image: "https://cdn.mos.cms.futurecdn.net/iATyhDP3bd5cX9Jn5TsTiM-1920-80.jpg.webp", itemprops: [{ label: "GPU", value: "RTX 4060" }] },
  { itemname: "Volkswagen Virtus", category: "Cars", image: "https://cdn-s3.autocarindia.com/volkswagen/Virtus/500_8133.jpg?w=640&q=75", itemprops: [{ label: "TSI", value: "1.5L" }] },
  { itemname: "Triumph Rocket 3", category: "Bikes", image: "https://images.unsplash.com/photo-1740750047356-47f64339d196?q=80&w=387&auto=format&fit=crop", itemprops: [{ label: "CC", value: "2458cc" }] },
  { itemname: "Surface Pro 9", category: "Computers", image: "https://images.unsplash.com/photo-1682939634606-363829072b91?q=80&w=464&auto=format&fit=crop", itemprops: [{ label: "CPU", value: "Intel i7" }] },
  { itemname: "Ford Mustang", category: "Cars", image: "https://images.unsplash.com/photo-1591293836027-e05b48473b67?q=80&w=870&auto=format&fit=crop", itemprops: [{ label: "Engine", value: "5.0L Coyote V8" }] },
  { itemname: "Yamaha R1", category: "Bikes", image: "https://images.unsplash.com/photo-1626840362735-afb64615318d?q=80&w=387&auto=format&fit=crop", itemprops: [{ label: "Tech", value: "Crossplane" }] },
  { itemname: "HP Spectre x360", category: "Computers", image: "https://images.unsplash.com/photo-1599299009482-3b5326fc52e4?q=80&w=870&auto=format&fit=crop", itemprops: [{ label: "Nits", value: "400" }] },
  { itemname: "Audi e-tron GT", category: "Cars", image: "https://images.unsplash.com/photo-1615222874898-37089fcf47ee?q=80&w=465&auto=format&fit=crop", itemprops: [{ label: "0-100", value: "3.3s" }] },
  { itemname: "Suzuki Hayabusa", category: "Bikes", image: "https://images.unsplash.com/photo-1719161107534-6dc58147c3a4?q=80&w=774&auto=format&fit=crop", itemprops: [{ label: "Top Speed", value: "299 km/h" }] },
  { itemname: "Porsche 911 GT3", category: "Cars", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=870&auto=format&fit=crop", itemprops: [{ label: "Weight", value: "1435 kg" }] },
  { itemname: "Alienware m18", category: "Computers", image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/alienware-notebooks/alienware-m18-mlk/media-gallery/hd/laptop-alienware-m18-r2-hd-perkey-intel-bk-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=522&qlt=100,1&resMode=sharp2&size=522,402&chrss=full", itemprops: [{ label: "Display", value: "18-inch QHD+" }] },
  { itemname: "Jeep Wrangler", category: "Cars", image: "https://images.unsplash.com/photo-1640021042546-2a1b900f324b?q=80&w=464&auto=format&fit=crop", itemprops: [{ label: "Offroad", value: "Rock-Trac 4WD" }] },
  { itemname: "KTM Duke 390", category: "Bikes", image: "https://images.unsplash.com/photo-1591378603223-e15b45a81640?q=80&w=870&auto=format&fit=crop", itemprops: [{ label: "Weight", value: "165kg" }] },
  { itemname: "Motorola Edge 50 Pro", category: "Phones", image: "https://amateurphotographer.com/wp-content/uploads/sites/7/2024/05/Motorola-Edge-50-Pro-closeup-of-cameras-e1741256801259.jpg?w=900", itemprops: [{ label: "Display", value: "144Hz pOLED" }] },
  { itemname: "ASUS ROG Phone 8", category: "Phones", image: "https://www.cnet.com/a/img/resize/d3abe24000cb0a0039f997b46ab22e3945781eed/hub/2024/01/14/c12c1958-45aa-40ea-9bbb-8ed19f4fa6fe/p1000268.jpg?auto=webp&width=1200", itemprops: [{ label: "Audio", value: "3.5mm Jack Included" }] },
  { itemname: "HP Omen 16", category: "Computers", image: "https://images.unsplash.com/photo-1613750147830-c770850838b0?q=80&w=435&auto=format&fit=crop", itemprops: [{ label: "Cooling", value: "Tempest Cooling" }] },
  { itemname: "Land Rover Defender", category: "Cars", image: "https://images.unsplash.com/photo-1722786102904-c6bf6bec8fc3?q=80&w=870&auto=format&fit=crop", itemprops: [{ label: "Ground Clearance", value: "291mm" }] },
  { itemname: "Lamborghini Revuelto", category: "Cars", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=870&auto=format&fit=crop", itemprops: [{ label: "Hybrid", value: "V12 PHEV" }] }
];

const CATEGORY_ORDER = ["Cars", "Phones", "Bikes", "Computers"];

// --- UTILS ---
const groupItemsByCategory = (data) => {
  const grouped = {};
  data.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });
  return grouped;
};

// --- STYLES (Injected for single-file portability) ---
const GLOBAL_CSS = `
:root {
  --bg-primary: #0b0f19;
  --bg-secondary: #151b2b;
  --bg-card: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent: #3b82f6;
  --radius: 14px;
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);
  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', system-ui, sans-serif; background-color: var(--bg-primary); color: var(--text-primary); line-height: 1.6; }
.cat-app { max-width: 1280px; margin: 0 auto; padding: 24px; }
.cat-header { display: flex; justify-content: space-between; align-items: center; padding: 24px 0 40px; border-bottom: 1px solid var(--bg-secondary); margin-bottom: 32px; flex-wrap: wrap; gap: 16px; }
.cat-header h1 { font-size: clamp(1.5rem, 4vw, 2.2rem); font-weight: 800; letter-spacing: -0.5px; }
.cat-header p { color: var(--text-secondary); font-size: 0.95rem; margin-top: 4px; }
.cat-btn-back { background: var(--bg-card); color: var(--text-primary); border: 1px solid rgba(255,255,255,0.05); padding: 10px 18px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; transition: var(--transition); }
.cat-btn-back:hover { background: var(--accent); transform: translateX(-3px); border-color: var(--accent); }
.cat-category-section { margin-bottom: 56px; animation: cat-slideUp 0.5s ease forwards; opacity: 0; }
.cat-category-title { font-size: 1.4rem; margin-bottom: 20px; padding-left: 12px; border-left: 4px solid var(--accent); font-weight: 700; }
.cat-items-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.cat-item-card { background: var(--bg-secondary); border-radius: var(--radius); overflow: hidden; cursor: pointer; transition: var(--transition); box-shadow: var(--shadow); border: 1px solid rgba(255,255,255,0.03); }
.cat-item-card:hover { transform: translateY(-6px); border-color: var(--accent); box-shadow: 0 12px 24px -8px rgba(59, 130, 246, 0.25); }
.cat-card-img-wrapper { width: 100%; height: 180px; overflow: hidden; background: #020617; }
.cat-card-img { width: 100%; height: 100%; object-fit: cover; transition: var(--transition); }
.cat-item-card:hover .cat-card-img { transform: scale(1.05); }
.cat-card-content { padding: 18px; }
.cat-card-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
.cat-card-preview { font-size: 0.8rem; color: var(--text-secondary); display: flex; gap: 8px; flex-wrap: wrap; }
.cat-card-preview span { background: var(--bg-card); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05); }
.cat-detail-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; flex-wrap: wrap; gap: 16px; }
.cat-detail-title { font-size: clamp(1.8rem, 5vw, 2.5rem); font-weight: 800; line-height: 1.2; }
.cat-detail-category { display: inline-block; background: var(--accent); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 10px; }
.cat-detail-layout { display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; background: var(--bg-secondary); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); border: 1px solid rgba(255,255,255,0.03); }
.cat-detail-img-container { width: 100%; min-height: 420px; background: #020617; }
.cat-detail-img { width: 100%; height: 100%; object-fit: cover; }
.cat-detail-props { padding: 36px; display: flex; flex-direction: column; gap: 24px; }
.cat-props-header { color: var(--text-secondary); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.cat-prop-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--bg-card); padding-bottom: 16px; }
.cat-prop-row:last-child { border-bottom: none; }
.cat-prop-label { color: var(--text-secondary); font-weight: 500; }
.cat-prop-value { color: var(--text-primary); font-weight: 700; text-align: right; max-width: 60%; word-wrap: break-word; }
@media (max-width: 900px) { .cat-detail-layout { grid-template-columns: 1fr; } .cat-detail-img-container { min-height: 280px; } }
@media (max-width: 600px) { .cat-app { padding: 16px; } .cat-header { padding: 16px 0 24px; } .cat-detail-props { padding: 24px; } }
@media (max-width: 350px) { .cat-items-grid { grid-template-columns: 1fr; } }
@keyframes cat-slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.cat-hidden { display: none !important; }
`;

// --- COMPONENTS ---

const Header = ({ view, onBack, title, subtitle }) => (
  <header className="cat-header">
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
    {view === 'detail' && (
      <button className="cat-btn-back" onClick={onBack} aria-label="Go back to catalog">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back
      </button>
    )}
  </header>
);

const ItemCard = ({ item, index, onSelect }) => (
  <div 
    className="cat-item-card" 
    tabIndex="0" 
    role="button" 
    aria-label={`View details for ${item.itemname}`}
    onClick={() => onSelect(index)}
    onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') onSelect(index); }}
  >
    <div className="cat-card-img-wrapper">
      <img src={item.image} alt={item.itemname} className="cat-card-img" loading="lazy" onError={(e) => e.target.src = 'image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgODAwIDYwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMxZTI5M2IiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzk0YTNiOCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='} />
    </div>
    <div className="cat-card-content">
      <h3 className="cat-card-title">{item.itemname}</h3>
      <div className="cat-card-preview">
        {item.itemprops.slice(0, 2).map((prop, i) => (
          <span key={i}>{prop.label}</span>
        ))}
      </div>
    </div>
  </div>
);

const CategorySection = ({ category, items, onSelect }) => (
  <section className="cat-category-section">
    <h2 className="cat-category-title">{category} ({items.length})</h2>
    <div className="cat-items-grid">
      {items.map((item, idx) => (
        <ItemCard key={item.itemname} item={item} index={CATALOG_DATA.indexOf(item)} onSelect={onSelect} />
      ))}
    </div>
  </section>
);

const CatalogHome = ({ onSelectItem }) => {
  const grouped = useMemo(() => groupItemsByCategory(CATALOG_DATA), []);
  
  return (
    <>
      {CATEGORY_ORDER.map(cat => {
        const items = grouped[cat] || [];
        return items.length > 0 ? (
          <CategorySection key={cat} category={cat} items={items} onSelect={onSelectItem} />
        ) : null;
      })}
    </>
  );
};

const ItemDetail = ({ item }) => (
  <div style={{ animation: 'cat-slideUp 0.4s ease forwards' }}>
    <div className="cat-detail-header">
      <div>
        <span className="cat-detail-category">{item.category}</span>
        <h1 className="cat-detail-title">{item.itemname}</h1>
      </div>
    </div>
    <div className="cat-detail-layout">
      <div className="cat-detail-img-container">
        <img src={item.image} alt={item.itemname} className="cat-detail-img" onError={(e) => e.target.src = 'image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgODAwIDYwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMxZTI5M2IiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzk0YTNiOCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='} />
      </div>
      <div className="cat-detail-props">
        <div className="cat-props-header">Specifications</div>
        {item.itemprops.map((prop, i) => (
          <div className="cat-prop-row" key={i}>
            <span className="cat-prop-label">{prop.label}</span>
            <span className="cat-prop-value">{prop.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- MAIN APP ---
const App = () => {
  const [view, setView] = useState('home');
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    // Inject global styles
    const styleEl = document.createElement('style');
    styleEl.textContent = GLOBAL_CSS;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  const handleSelectItem = (index) => {
    setSelectedIndex(index);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setView('home');
    setSelectedIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedItem = selectedIndex !== null ? CATALOG_DATA[selectedIndex] : null;

  return (
    <div className="cat-app">
      <Header 
        view={view} 
        onBack={handleBack} 
        title={view === 'home' ? 'Product Catalog' : 'Item Details'}
        subtitle={view === 'home' ? 'Explore across categories' : `Viewing ${selectedItem?.itemname || ''}`}
      />
      <main>
        {view === 'home' && <CatalogHome onSelectItem={handleSelectItem} />}
        {view === 'detail' && selectedItem && <ItemDetail item={selectedItem} />}
      </main>
    </div>
  );
};

export default App;
