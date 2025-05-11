import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNode } from '../features/diagram/diagramSlice';

export const Toolbar: React.FC = () => {
  const dispatch = useDispatch();
  const [newNodeText, setNewNodeText] = useState('');

  const handleAddNode = () => {
    if (newNodeText.trim()) {
      dispatch(addNode({ text: newNodeText, type: 'rectangle' }));
      setNewNodeText('');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        padding: '10px',
        background: '#f1f3f5',
        borderBottom: '1px solid #ddd',
      }}
    >
      <input
        required
        type="text"
        value={newNodeText}
        onChange={(e) => setNewNodeText(e.target.value)}
        placeholder="Enter step description"
        style={{
          padding: '8px',
          marginRight: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          flexGrow: 1,
        }}
        onKeyUp={(e) => e.key === 'Enter' && handleAddNode()}
      />
      <button
        onClick={handleAddNode}
        style={{
          padding: '8px 16px',
          background: '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add Step
      </button>
    </div>
  );
};
