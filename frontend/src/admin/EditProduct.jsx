import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '', stock: '' });
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setFormData({ name: data.name, description: data.description, price: data.price, category: data.category, stock: data.stock });
        setCurrentImageUrl(data.imageUrl);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load product details');
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    if (image) data.append('image', image);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data
      });
      setLoading(false);
      if (res.ok) {
        toast.success('Product updated successfully!');
        navigate('/admin/products');
      } else {
        toast.error('Failed to update product');
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error('An error occurred while updating');
    }
  };

  const labelStyle = { color: '#a1a1aa', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' };
  const inputStyle = { padding: '12px 16px', background: '#09090b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff', fontSize: '15px', outline: 'none' };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', background: '#18181b', padding: '45px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', color: '#fff' }}>
      <h2 style={{ color: '#f97316', fontSize: '2rem', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '15px' }}>Edit Product</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
        {/* Left Column - Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Product Name</label>
            <input type="text" placeholder="e.g. Wireless Headphones" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Product Description</label>
            <textarea placeholder="Write detailed description..." required rows="5" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}>Price (₹)</label>
              <input type="number" step="0.01" placeholder="0.00" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}>Stock Quantity</label>
              <input type="number" placeholder="0" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Category</label>
            <input type="text" placeholder="e.g. Electronics, Clothing" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={inputStyle} />
          </div>
          
          <button type="submit" disabled={loading} className="btn" style={{ marginTop: '15px', padding: '15px', fontSize: '1.1rem' }}>
            {loading ? 'Saving Changes...' : 'Update Product'}
          </button>
        </div>

        {/* Right Column - Media Preview & Upload */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Current Image</label>
            <div style={{ background: '#09090b', padding: '15px', borderRadius: '12px', border: '1px solid #27272a', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '230px' }}>
              {currentImageUrl ? (
                <img 
                  src={currentImageUrl} 
                  alt="Current Preview" 
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }} 
                />
              ) : (
                <span style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>No image loaded</span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Replace Image</label>
            <div style={{ padding: '20px', border: image ? '2px dashed #f97316' : '2px dashed #27272a', borderRadius: '12px', background: '#09090b', textAlign: 'center', transition: 'all 0.3s' }}>
              <input 
                type="file" 
                accept="image/*" 
                id="file-upload"
                onChange={(e) => setImage(e.target.files[0])} 
                style={{ display: 'none' }} 
              />
              <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '2rem' }}>📷</span>
                <span style={{ color: '#f97316', fontWeight: '600' }}>Choose New File</span>
                <span style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>{image ? image.name : 'No file selected (optional)'}</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
