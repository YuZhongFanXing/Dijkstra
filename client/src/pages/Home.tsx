import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GraphVisualization from '@/components/GraphVisualization';
import AlgorithmStatePanel from '@/components/AlgorithmStatePanel';
import AnimationControls from '@/components/AnimationControls';
import PrincipleExplainer from '@/components/PrincipleExplainer';
import ProofExplainer from '@/components/ProofExplainer';
import {
  DijkstraAlgorithm,
  buildAdjacencyMatrix,
  AlgorithmState,
  GraphNode,
  GraphEdge,
} from '@/lib/dijkstra';

/**
 * Home Page - Dijkstra Algorithm Animation
 * 
 * Design: Educational Minimalism with Interactive Depth
 * - Left panel (60%): Large interactive graph visualization
 * - Right panel (40%): Algorithm state and explanation
 * - Bottom: Timeline scrubber and playback controls
 */

// Sample graph from the provided C code (9 nodes, 24 edges)
const GRAPH_NODES: GraphNode[] = [
  { id: 0, label: 'V0', x: 150, y: 150 },
  { id: 1, label: 'V1', x: 250, y: 100 },
  { id: 2, label: 'V2', x: 350, y: 150 },
  { id: 3, label: 'V3', x: 250, y: 250 },
  { id: 4, label: 'V4', x: 400, y: 250 },
  { id: 5, label: 'V5', x: 500, y: 300 },
  { id: 6, label: 'V6', x: 450, y: 400 },
  { id: 7, label: 'V7', x: 350, y: 450 },
  { id: 8, label: 'V8', x: 500, y: 500 },
];

const GRAPH_EDGES: GraphEdge[] = [
  // V0
  { from: 0, to: 1, weight: 1 },
  { from: 0, to: 2, weight: 5 },
  // V1
  { from: 1, to: 0, weight: 1 },
  { from: 1, to: 2, weight: 3 },
  { from: 1, to: 3, weight: 7 },
  { from: 1, to: 4, weight: 5 },
  // V2
  { from: 2, to: 0, weight: 5 },
  { from: 2, to: 1, weight: 3 },
  { from: 2, to: 4, weight: 1 },
  { from: 2, to: 5, weight: 7 },
  // V3
  { from: 3, to: 1, weight: 7 },
  { from: 3, to: 4, weight: 2 },
  { from: 3, to: 6, weight: 3 },
  // V4
  { from: 4, to: 1, weight: 5 },
  { from: 4, to: 2, weight: 1 },
  { from: 4, to: 3, weight: 2 },
  { from: 4, to: 5, weight: 3 },
  { from: 4, to: 6, weight: 6 },
  { from: 4, to: 7, weight: 9 },
  // V5
  { from: 5, to: 2, weight: 7 },
  { from: 5, to: 4, weight: 3 },
  { from: 5, to: 7, weight: 5 },
  // V6
  { from: 6, to: 3, weight: 3 },
  { from: 6, to: 4, weight: 6 },
  { from: 6, to: 7, weight: 2 },
  { from: 6, to: 8, weight: 7 },
  // V7
  { from: 7, to: 4, weight: 9 },
  { from: 7, to: 5, weight: 5 },
  { from: 7, to: 6, weight: 2 },
  { from: 7, to: 8, weight: 4 },
  // V8
  { from: 8, to: 6, weight: 7 },
  { from: 8, to: 7, weight: 4 },
];

export default function Home() {
  const [states, setStates] = useState<AlgorithmState[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Initialize algorithm
  useEffect(() => {
    const adjacencyMatrix = buildAdjacencyMatrix(
      GRAPH_NODES.length,
      GRAPH_EDGES
    );
    const algorithm = new DijkstraAlgorithm(adjacencyMatrix, GRAPH_NODES.length, 0);
    const algorithmStates = algorithm.run();
    setStates(algorithmStates);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || states.length === 0) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= states.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800 / speed); // Base interval: 800ms

    return () => clearInterval(interval);
  }, [isPlaying, speed, states.length]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, states.length - 1));
    setIsPlaying(false);
  }, [states.length]);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setIsPlaying(false);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  const handleStepChange = useCallback((step: number) => {
    setCurrentStep(step);
    setIsPlaying(false);
  }, []);

  const currentState = states[currentStep] || states[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Dijkstra 最短路径算法动画演示
          </h1>
          <p className="text-gray-600 mt-2">
            通过交互式动画理解贪心算法的原理与证明
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Graph Visualization (60%) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">
                  图形可视化
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  深青色：已确定最短路径 | 琥珀色：当前选中 | 浅黄色：候选节点
                </p>
              </div>
              <div className="p-4" style={{ minHeight: '500px' }}>
                {states.length > 0 && (
                  <GraphVisualization
                    nodes={GRAPH_NODES}
                    edges={GRAPH_EDGES}
                    state={currentState}
                    onNodeHover={setHoveredNode}
                  />
                )}
              </div>
            </div>

            {/* Animation Controls */}
            {states.length > 0 && (
              <AnimationControls
                isPlaying={isPlaying}
                currentStep={currentStep}
                totalSteps={states.length}
                speed={speed}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onReset={handleReset}
                onSpeedChange={handleSpeedChange}
                onStepChange={handleStepChange}
              />
            )}
          </div>

          {/* Right Panel: Algorithm State & Principles (40%) */}
          <div className="lg:col-span-1 space-y-4">
            <Tabs defaultValue="state" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="state" className="text-xs sm:text-sm">
                  算法状态
                </TabsTrigger>
                <TabsTrigger value="principles" className="text-xs sm:text-sm">
                  原理讲解
                </TabsTrigger>
              </TabsList>

              <TabsContent value="state" className="space-y-4 mt-4">
                {states.length > 0 && (
                  <AlgorithmStatePanel
                    state={currentState}
                    nodeCount={GRAPH_NODES.length}
                  />
                )}
              </TabsContent>

              <TabsContent value="principles" className="mt-4 space-y-4 max-h-[600px] overflow-y-auto">
                <ProofExplainer />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Educational Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🎯 算法步骤
            </h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>1. 初始化：</strong>
                起点距离为0，其他节点距离为∞
              </li>
              <li>
                <strong>2. 选择：</strong>
                从未访问节点中选距离最小的
              </li>
              <li>
                <strong>3. 松弛：</strong>
                通过该节点更新其他节点的距离
              </li>
              <li>
                <strong>4. 重复：</strong>
                直到所有节点都被访问
              </li>
            </ol>
          </div>

          <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              ✨ 核心洞察
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              每次选择距离最小的未访问节点时，该节点的最短路径已确定。这是因为所有边权非负，任何通过其他未访问节点的路径都不会更短。这个贪心选择保证了算法的正确性。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
