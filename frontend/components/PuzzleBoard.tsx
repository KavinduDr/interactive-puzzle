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

// Register custom nodes
const nodeTypes = {
  puzzle: PuzzleNode,
};

// Generate 49 nodes in a 7x7 grid
const createGridNodes = () => {
  const nodes: Node[] = [];
  const gridSize = 7;
  const spacing = 90;

  let idCounter = 1;

  // Nodes to highlight as puzzle steps (replace with actual puzzle path)
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

  // Allowed path example (change later)
  const allowedConnections = ["1-8", "8-15", "15-16", "16-23"];

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
