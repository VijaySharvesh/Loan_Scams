import React, { useState } from 'react';

export function AdminDashboard() {
  const [newLender, setNewLender] = useState({
    name: '',
    rbi_number: '',
    image_url: '',
    approval_date: '',
  });

  const addLender = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/lenders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLender),
      });
      if (!response.ok) {
        throw new Error('Failed to add lender');
      }
      alert('Lender added successfully');
      setNewLender({ name: '', rbi_number: '', image_url: '', approval_date: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add lender');
    }
  };

  return (
    <form onSubmit={addLender}>
      <input type="text" placeholder="Name" value={newLender.name} onChange={(e) => setNewLender({ ...newLender, name: e.target.value })} required />
      <input type="text" placeholder="RBI Number" value={newLender.rbi_number} onChange={(e) => setNewLender({ ...newLender, rbi_number: e.target.value })} required />
      <input type="url" placeholder="Image URL" value={newLender.image_url} onChange={(e) => setNewLender({ ...newLender, image_url: e.target.value })} required />
      <input type="date" value={newLender.approval_date} onChange={(e) => setNewLender({ ...newLender, approval_date: e.target.value })} required />
      <button type="submit">Add Lender</button>
    </form>
  );
}
