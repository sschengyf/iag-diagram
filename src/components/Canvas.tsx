import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { updateNodeText, removeNode } from '../features/diagram/diagramSlice';
import { Node } from '../types';

export const Canvas: React.FC = () => {
  const nodes = useSelector((state: RootState) => state.diagram.nodes);
  const dispatch = useDispatch();
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const nodeGap = 50;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && selectedNode) {
        dispatch(removeNode(selectedNode));
        setSelectedNode(null);
        if (editingNode === selectedNode) {
          setEditingNode(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode, dispatch, editingNode]);

  const handleNodeClick = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setSelectedNode(nodeId);
      setEditingNode(nodeId);
      setEditText(node.text);
    }
  };

  const handleCanvasClick = () => {
    setSelectedNode(null);
    if (editingNode) {
      dispatch(updateNodeText({ id: editingNode, text: editText }));
      setEditingNode(null);
    }
  };

  const calculateNodePosition = (index: number) => {
    let xPosition = nodeGap;
    if (index > 0) {
      const previousNodesWidth = nodes
        .slice(0, index)
        .reduce((acc, node) => acc + node.shape.size.width + nodeGap, 0);
      xPosition += previousNodesWidth;
    }

    return xPosition;
  };

  const renderArrow = (x: number, y: number) => {
    const arrowSize = 25; // Your SVG's viewBox size
    const arrowX = x + arrowSize / 2; // Center in gap
    const arrowY = y - arrowSize / 2; // Center vertically

    return (
      <g transform={`translate(${arrowX}, ${arrowY})`}>
        <svg width={arrowSize} height={arrowSize} viewBox="0 0 25 25">
          <path
            fill="#232326"
            d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
          />
        </svg>
      </g>
    );
  };

  const renderNode = (node: Node, index: number) => {
    const xPosition = calculateNodePosition(index);
    const { shape, text, id } = node;
    const { width, height } = shape.size;
    const isSelected = selectedNode === id;

    return (
      <g key={id} transform={`translate(${xPosition}, ${nodeGap})`}>
        {/* Rectangle with selection highlight */}
        <rect
          width={width}
          height={height}
          rx={10}
          ry={10}
          fill={shape.style.fill}
          stroke={isSelected ? '#ff6b6b' : shape.style.stroke}
          strokeWidth={isSelected ? 3 : shape.style.strokeWidth}
          onClick={(e) => handleNodeClick(id, e)}
          style={{ cursor: 'pointer' }}
        />

        {/* Text content */}
        {editingNode === id ? (
          <foreignObject x={5} y={5} width={width - 10} height={height - 10}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleCanvasClick}
                onKeyUp={(e) => e.key === 'Enter' && handleCanvasClick()}
                autoFocus
                style={{
                  width: '100%',
                  textAlign: 'center',
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif',
                }}
              />
            </div>
          </foreignObject>
        ) : (
          <text
            x={width / 2}
            y={height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#333"
            fontSize="14"
            fontFamily="Arial, sans-serif"
            onClick={(e) => handleNodeClick(id, e)}
            style={{ cursor: 'text' }}
          >
            {text}
          </text>
        )}

        {index < nodes.length - 1 && renderArrow(width, height / 2)}
      </g>
    );
  };

  return (
    <svg
      width="100%"
      height="100%"
      style={{
        backgroundColor: '#f8f9fa',
        overflow: 'visible',
      }}
      onClick={handleCanvasClick}
    >
      {nodes.map(renderNode)}
    </svg>
  );
};
