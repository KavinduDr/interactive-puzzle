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

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "1" },
    type: "default",
  },
  {
    id: "2",
    position: { x: 300, y: 100 },
    data: { label: "2" },
  },
];

const initialEdges: Edge[] = [];

export default function PuzzleBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Example allowed path: only 1 -> 2 is valid
  const allowedConnections = ["1-2"];

  const isValidConnection = (conn: Edge | Connection) => {
    return allowedConnections.includes(`${conn.source}-${conn.target}`);
  };

  const onConnect = (params: Edge | Connection) => {
    if (isValidConnection(params)) {
      setEdges((eds) => addEdge(params, eds));
    } else {
      alert("❌ Invalid path! You cannot connect these boxes.");
    }
  };

  const onNodeClick = (_ : any, node: Node) => {
    alert(`Clicked node ${node.id}. Show question popup here.`);
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
