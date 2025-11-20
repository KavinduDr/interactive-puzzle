"use client";

import { Handle, Position } from "reactflow";

export default function PuzzleNode({ data }: { data: { label: string; active?: boolean } }) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        background: data.active ? "#4F46E5" : "#ffffff",
        border: "2px solid #777",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 700,
        position: "relative",
        color: data.active ? "white" : "black",
      }}
    >
      {data.label}

      {/* ↓ Smaller, separated, clean handle UI */}

      {/* SOURCE HANDLES */}
      <Handle type="source" position={Position.Right} id="s-right"
        style={{ right: -4, top: "-4", width: 8, height: 8, background: "#20c997" }} />
      <Handle type="source" position={Position.Left} id="s-left"
        style={{ left: -4, top: "-4", width: 8, height: 8, background: "#20c997" }} />
      <Handle type="source" position={Position.Top} id="s-top"
        style={{ top: -4, left: "-4", width: 8, height: 8, background: "#20c997" }} />
      <Handle type="source" position={Position.Bottom} id="s-bottom"
        style={{ bottom: -4, left: "-4", width: 8, height: 8, background: "#20c997" }} />

      {/* TARGET HANDLES */}
      <Handle type="target" position={Position.Right} id="t-right"
        style={{ right: -14, width: 8, height: 8, background: "#ff4d6d" }} />
      <Handle type="target" position={Position.Left} id="t-left"
        style={{ left: -14, width: 8, height: 8, background: "#ff4d6d" }} />
      <Handle type="target" position={Position.Top} id="t-top"
        style={{ top: -14, width: 8, height: 8, background: "#ff4d6d" }} />
      <Handle type="target" position={Position.Bottom} id="t-bottom"
        style={{ bottom: -14, width: 8, height: 8, background: "#ff4d6d" }} />
    </div>
  );
}
