'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingProduct(prev => ({ ...prev, [name]: value }));
    } else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    setProducts([...products, data]);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      category: ''
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async () => {
    const response = await fetch(`/api/products?id=${editingProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingProduct),
    });
    const updatedProduct = await response.json();
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mb-8">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            name="name"
            value={newProduct.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description"
            value={newProduct.description} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input 
            id="price" 
            name="price"
            type="number" 
            value={newProduct.price} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input 
            id="imageUrl" 
            name="imageUrl"
            value={newProduct.imageUrl} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input 
            id="category" 
            name="category"
            value={newProduct.category} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <Button type="submit">Add Product</Button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Existing Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            {editingProduct && editingProduct.id === product.id ? (
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-2">
                <Input 
                  name="name"
                  value={editingProduct.name} 
                  onChange={(e) => handleInputChange(e, true)} 
                  required 
                />
                <Textarea 
                  name="description"
                  value={editingProduct.description} 
                  onChange={(e) => handleInputChange(e, true)} 
                  required 
                />
                <Input 
                  name="price"
                  type="number" 
                  value={editingProduct.price} 
                  onChange={(e) => handleInputChange(e, true)} 
                  required 
                />
                <Input 
                  name="imageUrl"
                  value={editingProduct.imageUrl} 
                  onChange={(e) => handleInputChange(e, true)} 
                  required 
                />
                <Input 
                  name="category"
                  value={editingProduct.category} 
                  onChange={(e) => handleInputChange(e, true)} 
                  required 
                />
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
              </form>
            ) : (
              <>
                <h3 className="font-bold">{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
                <p>Category: {product.category}</p>
                <div className="mt-2">
                  <Button variant="outline" className="mr-2" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(product.id)}>Delete</Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

