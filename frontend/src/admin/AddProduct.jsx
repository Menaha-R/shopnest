import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image');
      return;
    }
    
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data
      });
      const responseData = await res.json();
      
      if (res.ok) {
        toast.success('Product created successfully with Cloudinary Image URL!');
        navigate('/shop');
      } else {
        toast.error(responseData.message || 'Error creating product');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while creating the product');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = { color: '#a1a1aa', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' };
  const inputStyle = { padding: '12px 16px', background: '#09090b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff', fontSize: '15px', outline: 'none' };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', background: '#18181b', padding: '45px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', color: '#fff' }}>
      <h2 style={{ color: '#f97316', fontSize: '2rem', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '15px' }}>Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="admin-grid-form">
        {/* Left Column - Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Product Name</label>
            <input type="text" placeholder="e.g. Wireless Headphones" required onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Product Description</label>
            <textarea placeholder="Write detailed description..." required rows="5" onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}>Price (₹)</label>
              <input type="number" step="0.01" placeholder="0.00" required onChange={(e) => setFormData({...formData, price: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}>Stock Quantity</label>
              <input type="number" placeholder="0" required onChange={(e) => setFormData({...formData, stock: e.target.value})} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Category</label>
            <input type="text" placeholder="e.g. Electronics, Clothing" required onChange={(e) => setFormData({...formData, category: e.target.value})} style={inputStyle} />
          </div>
          
          <button type="submit" disabled={loading} className="btn" style={{ marginTop: '15px', padding: '15px', fontSize: '1.1rem' }}>
            {loading ? 'Publishing Product...' : 'Publish Product'}
          </button>
        </div>

        {/* Right Column - Media Preview & Upload */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Selected Image Preview</label>
            <div style={{ background: '#09090b', padding: '15px', borderRadius: '12px', border: '1px solid #27272a', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '230px' }}>
              {image ? (
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Selected Preview" 
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }} 
                />
              ) : (
                <span style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>No image chosen yet</span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Product Image</label>
            <div style={{ padding: '20px', border: image ? '2px dashed #f97316' : '2px dashed #27272a', borderRadius: '12px', background: '#09090b', textAlign: 'center', transition: 'all 0.3s' }}>
              <input 
                type="file" 
                accept="image/*" 
                id="add-file-upload"
                onChange={(e) => setImage(e.target.files[0])} 
                style={{ display: 'none' }} 
              />
              <label htmlFor="add-file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '2rem' }}>📷</span>
                <span style={{ color: '#f97316', fontWeight: '600' }}>Choose Product Image</span>
                <span style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>{image ? image.name : 'JPEG or PNG formats'}</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
