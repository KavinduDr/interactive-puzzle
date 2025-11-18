"use client";

import React, { useCallback, useState } from "react";
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

// Generate 49 nodes in a 7x7 grid
const createGridNodes = () => {
  const nodes: Node[] = [];
  const gridSize = 7;
  const spacing = 90; // space between boxes

  let idCounter = 1;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      nodes.push({
        id: `${idCounter}`,
        position: { x: col * spacing, y: row * spacing },
        data: { label: `${idCounter}` },
        style: {
          width: 50,
          height: 50,
          borderRadius: 8,
          background: ["1","2","3","4","5","6","7","8","9","10"].includes(`${idCounter}`)
            ? "#4F46E5" // Highlight puzzle path boxes
            : "#ffffff",
          border: "1px solid #555",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 600,
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

  // Placeholder for allowed paths
  const allowedConnections = [
    "1-8",
    "8-15",
    "15-16",
    "16-23",
    // you will add the real correct path here later
  ];

  const isValidConnection = (conn: Connection) =>
    allowedConnections.includes(`${conn.source}-${conn.target}`);

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
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background gap={12} size={1} color="#ddd" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
