import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="shop-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '25px' }}>Explore Catalog</h2>
      
      {/* Search Input */}
      <div style={{ marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
          style={{ width: '100%', maxWidth: '500px', padding: '14px 20px', fontSize: '15px', background: '#18181b', border: '1px solid #27272a', borderRadius: '30px', color: '#fff', outline: 'none', transition: 'all 0.3s' }}
        />
      </div>

      {/* Category Pills */}
      {!loading && products.length > 0 && (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px 24px',
                borderRadius: '30px',
                border: selectedCategory === cat ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
                background: selectedCategory === cat ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' : '#18181b',
                color: '#fff',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: selectedCategory === cat ? '0 4px 14px rgba(234, 88, 12, 0.3)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="product-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="product-card" style={{ height: '380px', pointerEvents: 'none' }}>
              <div className="skeleton-shimmer" style={{ width: '100%', height: '240px' }} />
              <div className="product-info" style={{ gap: '10px', justifyContent: 'flex-start' }}>
                <div className="skeleton-shimmer" style={{ width: '80%', height: '20px', borderRadius: '4px', marginBottom: '5px' }} />
                <div className="skeleton-shimmer" style={{ width: '40%', height: '22px', borderRadius: '4px', marginBottom: '10px' }} />
                <div className="skeleton-shimmer" style={{ width: '100%', height: '40px', borderRadius: '8px', marginTop: 'auto' }} />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '100px 0', color: '#a1a1aa', padding: '40px', background: '#18181b', borderRadius: '12px', border: '1px solid #27272a' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>No products found matching your criteria.</p>
          <span style={{ color: '#f97316', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { setSearch(''); setSelectedCategory('All'); }}>Clear filters</span>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
