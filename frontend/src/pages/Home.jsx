import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-banner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '120px 30px' }}>
        <h1 style={{ marginBottom: '10px', fontSize: '3.8rem' }}>Welcome to ShopNest</h1>
        <p style={{ marginBottom: '10px', maxWidth: '700px', margin: '0 auto', fontSize: '1.3rem', lineHeight: '1.6' }}>
          Discover our premium, handpicked collection of electronics, gadgets, and lifestyle products at unbeatable prices.
        </p>
        <Link to="/shop" className="btn" style={{ padding: '14px 36px', fontSize: '1.1rem', borderRadius: '30px', marginTop: '10px' }}>
          Explore Shop Now
        </Link>
      </div>

      <h2 style={{ fontSize: '2rem', marginBottom: '25px' }}>Featured Products</h2>
      {loading ? (
        <div className="product-grid">
          {[...Array(4)].map((_, i) => (
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
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Brand Features Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '70px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '50px' }}>
        <div style={{ background: '#18181b', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '15px' }}>🚀</div>
          <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '12px' }}>Free & Fast Delivery</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>Enjoy free delivery on all orders over ₹999. Fast track shipping options are available at checkout.</p>
        </div>
        <div style={{ background: '#18181b', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '15px' }}>🛡️</div>
          <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '12px' }}>Secure Payments</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>Fully integrated Razorpay gateway securing your credit cards, netbanking, and UPI transactions.</p>
        </div>
        <div style={{ background: '#18181b', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '15px' }}>💬</div>
          <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '12px' }}>24/7 Support Desk</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>Reach out to our customer support staff at any hour. We are here to answer all your order questions.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
