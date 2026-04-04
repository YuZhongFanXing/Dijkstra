import React, { useMemo } from 'react';
import { AlgorithmState, GraphNode, GraphEdge } from '@/lib/dijkstra';

interface GraphVisualizationProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  state: AlgorithmState;
  onNodeHover?: (nodeId: number | null) => void;
}

const VIEWBOX_W = 800;
const VIEWBOX_H = 600;
const INFINITY = 99999;

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  nodes,
  edges,
  state,
  onNodeHover,
}) => {
  const getNodeColor = (nodeId: number): string => {
    if (state.confirmedNodes.includes(nodeId)) return '#0D7377';
    if (state.currentNode === nodeId) return '#FF9F1C';
    if (state.candidates.includes(nodeId)) return '#FFD580';
    return '#E8E8E8';
  };

  const getNodeTextColor = (nodeId: number): string => {
    if (state.confirmedNodes.includes(nodeId) || state.currentNode === nodeId)
      return '#FFFFFF';
    return '#1A1A1A';
  };

  const getEdgeStyle = (edge: GraphEdge) => {
    const isExplored = state.exploredEdges.some(
      (e) => e.from === edge.from && e.to === edge.to
    );
    if (isExplored) return { stroke: '#0D7377', strokeWidth: 3, opacity: 1 };
    if (state.currentNode === edge.from) return { stroke: '#FF9F1C', strokeWidth: 2, opacity: 0.7 };
    return { stroke: '#CCCCCC', strokeWidth: 1.5, opacity: 0.5 };
  };

  return (
    /* 关键修复：用 padding-bottom 撑开容器，SVG 绝对定位填满，避免 height:100% 解析为0 */
    <div style={{ position: 'relative', width: '100%', paddingBottom: '75%' /* 600/800 */ }}>
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid #E0E0E0',
        }}
      >
        {/* 边 */}
        {edges.map((edge, idx) => {
          const from = nodes[edge.from];
          const to = nodes[edge.to];
          const style = getEdgeStyle(edge);
          const mx = (from.x + to.x) / 2;
          const my = (from.y + to.y) / 2;
          return (
            <g key={`edge-${idx}`}>
              <line
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
                opacity={style.opacity}
                style={{ transition: 'stroke 0.3s, opacity 0.3s' }}
              />
              <text
                x={mx} y={my - 8}
                textAnchor="middle"
                fontSize="12"
                fontFamily="monospace"
                fill="#666"
                style={{ pointerEvents: 'none' }}
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {/* 点 */}
        {nodes.map((node) => {
          const distance = state.distance[node.id];
          const isConfirmed = state.confirmedNodes.includes(node.id);
          const isCurrent = state.currentNode === node.id;
          return (
            <g
              key={`node-${node.id}`}
              onMouseEnter={() => onNodeHover?.(node.id)}
              onMouseLeave={() => onNodeHover?.(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* 选中节点外圈光晕 */}
              {isCurrent && (
                <circle cx={node.x} cy={node.y} r={36}
                  fill="#FF9F1C" opacity={0.2} />
              )}
              {/* 已确定节点外圈 */}
              {isConfirmed && (
                <circle cx={node.x} cy={node.y} r={34}
                  fill="#0D7377" opacity={0.15} />
              )}
              {/* 主圆 */}
              <circle
                cx={node.x} cy={node.y} r={28}
                fill={getNodeColor(node.id)}
                stroke="#333" strokeWidth={2}
                style={{ transition: 'fill 0.3s' }}
              />
              {/* 节点标签 */}
              <text
                x={node.x} y={node.y + 6}
                textAnchor="middle"
                fontSize="15" fontWeight="600"
                fontFamily="sans-serif"
                fill={getNodeTextColor(node.id)}
                style={{ pointerEvents: 'none' }}
              >
                V{node.id}
              </text>
              {/* 距离标签 */}
              {distance < INFINITY ? (
                <text
                  x={node.x} y={node.y - 40}
                  textAnchor="middle"
                  fontSize="13" fontFamily="monospace"
                  fill="#0D7377" fontWeight="600"
                  style={{ pointerEvents: 'none' }}
                >
                  d={distance}
                </text>
              ) : (
                <text
                  x={node.x} y={node.y - 40}
                  textAnchor="middle"
                  fontSize="13" fontFamily="monospace"
                  fill="#999"
                  style={{ pointerEvents: 'none' }}
                >
                  ∞
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GraphVisualization;
