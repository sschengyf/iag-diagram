export interface Size {
  width: number;
  height: number;
}

export interface Style {
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface Shape {
  type: string;
  style: Style;
  size: Size;
}

export interface Rectangle extends Shape {
  type: 'rectangle';
}

export interface Arrow extends Shape {
  type: 'arrow';
}

export interface Node {
  id: string;
  shape: Rectangle | Arrow;
  text: string;
}

export interface DiagramState {
  nodes: Node[];
  selectedNodeId: string | null;
}
