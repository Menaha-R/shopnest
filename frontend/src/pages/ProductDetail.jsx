import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../styles/product.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1
      }));
      toast.success('Successfully added to your cart!');
    }
  };

  if (loading) {
    return (
      <div className="product-detail-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Breadcrumb Skeleton */}
        <div className="skeleton-shimmer" style={{ width: '200px', height: '18px', marginBottom: '20px', borderRadius: '4px' }}></div>
        
        <div className="product-detail">
          {/* Left Side: Image Skeleton */}
          <div className="detail-image-container">
            <div className="skeleton-shimmer" style={{ width: '100%', height: '450px', borderRadius: '16px' }}></div>
          </div>

          {/* Right Side: Information Skeleton */}
          <div className="detail-info" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="skeleton-shimmer" style={{ width: '70%', height: '40px', borderRadius: '8px', marginBottom: '10px' }}></div>
            <div className="skeleton-shimmer" style={{ width: '30%', height: '38px', borderRadius: '8px', marginBottom: '15px' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
              <div className="skeleton-shimmer" style={{ width: '25%', height: '20px', borderRadius: '4px', marginBottom: '8px' }}></div>
              <div className="skeleton-shimmer" style={{ width: '100%', height: '15px', borderRadius: '4px' }}></div>
              <div className="skeleton-shimmer" style={{ width: '90%', height: '15px', borderRadius: '4px' }}></div>
              <div className="skeleton-shimmer" style={{ width: '95%', height: '15px', borderRadius: '4px' }}></div>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div className="skeleton-shimmer" style={{ flexGrow: '1', height: '56px', borderRadius: '8px' }}></div>
              {user && user.role === 'admin' && (
                <div className="skeleton-shimmer" style={{ width: '150px', height: '56px', borderRadius: '8px' }}></div>
              )}
            </div>
            
            <div className="skeleton-shimmer" style={{ width: '40%', height: '18px', borderRadius: '4px', marginTop: '20px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div style={{ textAlign: 'center', margin: '100px', color: '#ef4444', fontSize: '1.2rem' }}>Product Not Found</div>;

  return (
    <div className="product-detail-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ color: '#a1a1aa', marginBottom: '20px', fontSize: '0.95rem' }}>
        <Link to="/" style={{ color: '#f97316' }}>Home</Link> / <Link to="/shop" style={{ color: '#f97316' }}>Shop</Link> / {product.category} / <span style={{ color: '#fff' }}>{product.name}</span>
      </div>

      <div className="product-detail">
        {/* Left Side: Image */}
        <div className="detail-image-container">
          <img src={product.imageUrl} alt={product.name} className="detail-image" />
        </div>

        {/* Right Side: Information Block */}
        <div className="detail-info">
          
          <h2 style={{ fontSize: '2.8rem', marginBottom: '10px' }}>{product.name}</h2>

          <p className="detail-price" style={{ fontSize: '2.5rem', margin: '15px 0' }}>₹{product.price.toFixed(2)}</p>

          {/* Description */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>Product Description</h4>
            <p style={{ color: '#a1a1aa', lineHeight: '1.8' }}>{product.description}</p>
          </div>

          {/* Cart & Stock Actions */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={handleAddToCart} className="btn" style={{ flexGrow: '1', padding: '18px', fontSize: '1.2rem' }}>
              Add to Shopping Cart
            </button>
            {user && user.role === 'admin' && (
              <Link 
                to={`/admin/edit-product/${product._id}`} 
                className="btn" 
                style={{ 
                  background: '#3b82f6', 
                  boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)', 
                  padding: '18px', 
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                ✏️ Edit Product
              </Link>
            )}
          </div>
          
          <p style={{ marginTop: '20px', color: product.stock > 0 ? '#10b981' : '#ef4444', fontWeight: '600' }}>
            {product.stock > 0 ? `● In Stock (${product.stock} units available)` : `● Temporarily Out of Stock`}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
