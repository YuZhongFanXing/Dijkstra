import React from 'react';
import { AlgorithmState } from '@/lib/dijkstra';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AlgorithmStatePanelProps {
  state: AlgorithmState;
  nodeCount: number;
}

const AlgorithmStatePanel: React.FC<AlgorithmStatePanelProps> = ({
  state,
  nodeCount,
}) => {
  const INFINITY = 99999;

  const formatDistance = (d: number): string => {
    return d === INFINITY ? '∞' : d.toString();
  };

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {/* Explanation */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-blue-900">
            当前步骤说明
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-800 leading-relaxed">
            {state.explanation}
          </p>
        </CardContent>
      </Card>

      {/* Current Node */}
      {state.currentNode !== null && state.currentNode !== -1 && (
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-amber-900">
              当前选中节点
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-amber-900">
              V{state.currentNode}
            </div>
            <p className="text-xs text-amber-700 mt-1">
              距离: {formatDistance(state.distance[state.currentNode])}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Distance Array */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">距离数组 distance[]</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: nodeCount }).map((_, i) => (
              <div
                key={i}
                className={`p-2 rounded text-center text-xs font-mono ${
                  state.confirmedNodes.includes(i)
                    ? 'bg-teal-100 text-teal-900 border border-teal-300'
                    : state.currentNode === i
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : state.candidates.includes(i)
                    ? 'bg-yellow-50 text-yellow-900 border border-yellow-200'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                <div className="font-semibold">V{i}</div>
                <div className="text-xs">
                  {formatDistance(state.distance[i])}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visited Set */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">已确定集合 S</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {state.confirmedNodes.length === 0 ? (
              <span className="text-xs text-gray-500">空集</span>
            ) : (
              state.confirmedNodes.map((nodeId) => (
                <span
                  key={nodeId}
                  className="inline-block px-2 py-1 bg-teal-100 text-teal-900 text-xs font-semibold rounded"
                >
                  V{nodeId}
                </span>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Candidate Nodes */}
      {state.candidates.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">候选节点</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {state.candidates.map((nodeId) => (
                <div
                  key={nodeId}
                  className="flex justify-between items-center p-2 bg-yellow-50 rounded text-xs"
                >
                  <span className="font-semibold">V{nodeId}</span>
                  <span className="text-yellow-700">
                    d = {formatDistance(state.distance[nodeId])}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Algorithm Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">算法进度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>已确定节点:</span>
              <span className="font-semibold">
                {state.confirmedNodes.length} / {nodeCount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(state.confirmedNodes.length / nodeCount) * 100}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insight */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-green-900">
            💡 核心原理
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-800 leading-relaxed">
            每次从未访问的节点中选择距离最小的节点，其最短路径已确定。这是因为：任何通过其他未访问节点的路径长度都不会更短。
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgorithmStatePanel;
