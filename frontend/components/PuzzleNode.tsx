"use client";

import { Handle, Position } from "reactflow";

export default function PuzzleNode({ data }: { data: any }) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        background: data.active ? "#4F46E5" : "#ffffff",
        border: "2px solid #555",
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 600,
        position: "relative",
        color: data.active ? "white" : "black",
      }}
    >
      {data.label}

      {/* ---- SOURCE HANDLES ---- */}
      <Handle type="source" position={Position.Top} id="top-s" />
      <Handle type="source" position={Position.Bottom} id="bottom-s" />
      <Handle type="source" position={Position.Left} id="left-s" />
      <Handle type="source" position={Position.Right} id="right-s" />

      {/* ---- TARGET HANDLES ---- */}
      <Handle type="target" position={Position.Top} id="top-t" />
      <Handle type="target" position={Position.Bottom} id="bottom-t" />
      <Handle type="target" position={Position.Left} id="left-t" />
      <Handle type="target" position={Position.Right} id="right-t" />
    </div>
  );
}
