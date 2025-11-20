"use client";

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";
import PuzzleNode from "./PuzzleNode";

const nodeTypes = { puzzle: PuzzleNode };

const createGridNodes = () => {
  const nodes: Node[] = [];
  const gridSize = 7;
  const spacing = 90;

  let idCounter = 1;

  const coloredNumbers = new Set([
    "1",
    "4",
    "7",
    "9",
    "11",
    "15",
    "17",
    "19",
    "21",
    "24",
  ]);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      nodes.push({
        id: `${idCounter}`,
        type: "puzzle",
        position: { x: col * spacing, y: row * spacing },
        data: {
          label: `${idCounter}`,
          active: coloredNumbers.has(`${idCounter}`),
        },
      });

      idCounter++;
    }
  }

  return nodes;
};

const initialNodes: Node[] = createGridNodes();
const initialEdges: Edge[] = [];

export default function PuzzleBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const isValidConnection = (conn: Connection) => {
  if (!conn.source || !conn.target) return false;
  
  const source = Number(conn.source);
  const target = Number(conn.target);
  const diff = Math.abs(source - target);

  const sourceRow = Math.floor((source - 1) / 7);
  const targetRow = Math.floor((target - 1) / 7);

  // Vertical: difference is exactly 7
  if (diff === 7) return true;

  // Horizontal: difference is 1 AND same row
  if (diff === 1 && sourceRow === targetRow) return true;

  return false;
};

  // FIXED: Proper connection handler
  const onConnect = (params: Edge | Connection) => {
    if (isValidConnection(params as Connection)) {
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    } else {
      alert("❌ Invalid path!");
    }
  };

  const onNodeClick = (_: any, node: Node) => {
    alert(`Clicked box ${node.id} → show question here`);
  };

  return (
    <div className="w-full h-[85vh] border rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}       // << correct handler
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background gap={12} size={1} color="#ddd" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
