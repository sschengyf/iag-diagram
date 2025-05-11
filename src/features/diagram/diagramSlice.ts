import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DiagramState, Node } from '../../types';

const initialState: DiagramState = {
  nodes: [],
  selectedNodeId: null,
};

export const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    addNode: (
      state,
      action: PayloadAction<{ text: string; type: 'rectangle' | 'arrow' }>
    ) => {
      const newNode: Node = {
        id: `node-${Date.now()}`,
        shape: {
          type: action.payload.type,
          size: {
            width: 150,
            height: 60,
          },
          style: {
            fill: '#e9f5ff',
            stroke: '#4a90e2',
            strokeWidth: 2,
          },
        },
        text: action.payload.text,
      };

      state.nodes.push(newNode);
    },
    selectNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
    updateNodeText: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.text = action.payload.text;
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((shape) => shape.id !== action.payload);
    },
  },
});

export const { addNode, selectNode, updateNodeText, removeNode } =
  diagramSlice.actions;

export const diagramReducer = diagramSlice.reducer;
