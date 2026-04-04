/**
 * Dijkstra Algorithm Implementation
 * Based on the provided C code, adapted for animation and state tracking
 */

const INFINITY = 99999;

export interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: number;
  to: number;
  weight: number;
}

export interface AlgorithmState {
  step: number;
  currentNode: number | null;
  distance: number[];
  found: boolean[];
  path: number[];
  candidates: number[];
  exploredEdges: Array<{ from: number; to: number }>;
  confirmedNodes: number[];
  explanation: string;
  isComplete: boolean;
}

export class DijkstraAlgorithm {
  private adjacencyMatrix: number[][];
  private nodeCount: number;
  private startNode: number;
  private states: AlgorithmState[] = [];
  private currentStateIndex: number = 0;

  constructor(
    adjacencyMatrix: number[][],
    nodeCount: number,
    startNode: number
  ) {
    this.adjacencyMatrix = adjacencyMatrix;
    this.nodeCount = nodeCount;
    this.startNode = startNode;
  }

  /**
   * Choose the unvisited node with minimum distance
   */
  private choose(distance: number[], found: boolean[]): number {
    let minDist = INFINITY;
    let minIdx = -1;
    for (let i = 0; i < this.nodeCount; i++) {
      if (!found[i] && distance[i] < minDist) {
        minDist = distance[i];
        minIdx = i;
      }
    }
    return minIdx;
  }

  /**
   * Run Dijkstra algorithm and record all states for animation
   */
  run(): AlgorithmState[] {
    const distance = new Array(this.nodeCount).fill(INFINITY);
    const found = new Array(this.nodeCount).fill(false);
    const path = new Array(this.nodeCount).fill(-1);

    // Initialize distances from start node
    for (let i = 0; i < this.nodeCount; i++) {
      distance[i] = this.adjacencyMatrix[this.startNode][i];
    }

    // Start node is already found with distance 0
    found[this.startNode] = true;
    distance[this.startNode] = 0;

    // Record initial state
    this.recordState(
      -1,
      [...distance],
      [...found],
      [...path],
      [],
      [],
      [this.startNode],
      `初始化：起点V${this.startNode}的距离为0，其他节点的距离为起点到它们的直接边权。`
    );

    // Main loop: n-1 iterations
    for (let i = 1; i < this.nodeCount; i++) {
      const next = this.choose(distance, found);

      if (next === -1) break; // No more reachable nodes

      // Record state before marking as found
      this.recordState(
        next,
        [...distance],
        [...found],
        [...path],
        this.getUnvisitedCandidates(distance, found),
        [],
        [...this.getConfirmedNodes(found)],
        `选择未访问节点中距离最小的：V${next}（距离=${distance[next]}）。这个节点的最短路径已确定。`
      );

      found[next] = true;

      // Relaxation step
      const exploredEdges: Array<{ from: number; to: number }> = [];
      for (let j = 0; j < this.nodeCount; j++) {
        if (!found[j]) {
          const newDist = distance[next] + this.adjacencyMatrix[next][j];
          if (newDist < distance[j]) {
            exploredEdges.push({ from: next, to: j });
            distance[j] = newDist;
            path[j] = next;

            // Record state for each relaxation
            this.recordState(
              next,
              [...distance],
              [...found],
              [...path],
              this.getUnvisitedCandidates(distance, found),
              exploredEdges,
              [...this.getConfirmedNodes(found)],
              `松弛操作：通过V${next}更新V${j}的距离为${distance[j]}（原为∞或更大值）。`
            );
          }
        }
      }
    }

    // Final state
    this.recordState(
      -1,
      [...distance],
      [...found],
      [...path],
      [],
      [],
      [...this.getConfirmedNodes(found)],
      `算法完成！所有节点的最短路径已确定。`
    );

    return this.states;
  }

  private recordState(
    currentNode: number | null,
    distance: number[],
    found: boolean[],
    path: number[],
    candidates: number[],
    exploredEdges: Array<{ from: number; to: number }>,
    confirmedNodes: number[],
    explanation: string
  ): void {
    this.states.push({
      step: this.states.length,
      currentNode,
      distance,
      found,
      path,
      candidates,
      exploredEdges,
      confirmedNodes,
      explanation,
      isComplete: this.states.length > 0 && found.every((f) => f),
    });
  }

  private getUnvisitedCandidates(distance: number[], found: boolean[]): number[] {
    const candidates: number[] = [];
    for (let i = 0; i < this.nodeCount; i++) {
      if (!found[i] && distance[i] < INFINITY) {
        candidates.push(i);
      }
    }
    return candidates.sort((a, b) => distance[a] - distance[b]);
  }

  private getConfirmedNodes(found: boolean[]): number[] {
    const confirmed: number[] = [];
    for (let i = 0; i < this.nodeCount; i++) {
      if (found[i]) {
        confirmed.push(i);
      }
    }
    return confirmed;
  }

  getStates(): AlgorithmState[] {
    return this.states;
  }

  getStateCount(): number {
    return this.states.length;
  }
}

/**
 * Build adjacency matrix from the provided graph structure
 */
export function buildAdjacencyMatrix(
  nodeCount: number,
  edges: GraphEdge[]
): number[][] {
  const matrix = Array(nodeCount)
    .fill(null)
    .map(() => Array(nodeCount).fill(INFINITY));

  // Set diagonal to 0
  for (let i = 0; i < nodeCount; i++) {
    matrix[i][i] = 0;
  }

  // Add edges
  for (const edge of edges) {
    matrix[edge.from][edge.to] = edge.weight;
  }

  return matrix;
}

/**
 * Get the shortest path from start to end node
 */
export function getShortestPath(
  path: number[],
  start: number,
  end: number
): number[] {
  if (path[end] === -1 && end !== start) {
    return []; // No path exists
  }

  const result: number[] = [];
  let current = end;
  while (current !== -1) {
    result.unshift(current);
    current = path[current];
  }
  return result;
}
