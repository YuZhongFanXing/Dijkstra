import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProofExplainer: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-blue-900">
            📐 为什么贪心选择一定是正确的？
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="bg-white p-3 rounded border border-blue-100">
            <p className="font-semibold text-blue-900 mb-2">
              定理：设 u 是未访问节点中距离最小的节点，则 d[u] 就是 u 的最短距离。
            </p>
            <p className="text-blue-800 leading-relaxed">
              <strong>证明（反证法）：</strong>
              假设存在一条更短的路径到达 u，设其长度为 d'[u] &lt; d[u]。
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>分析这条更短路径：</strong>
            </p>
            <div className="bg-white p-3 rounded border-l-4 border-blue-400">
              <p className="text-xs text-gray-600 font-mono mb-2">
                路径: V₀ → ... → v → u
              </p>
              <p className="text-gray-700">
                其中 v 是路径上最后一个未访问的节点。
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>关键不等式：</strong>
            </p>
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <p className="text-xs font-mono text-yellow-900">
                d'[u] = d'[v] + weight(v, u)
              </p>
              <p className="text-xs text-gray-600 mt-2">
                因为所有边权非负，所以：
              </p>
              <p className="text-xs font-mono text-yellow-900 mt-1">
                d'[v] ≥ d[v]（d[v] 是 v 的最短距离）
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>矛盾产生：</strong>
            </p>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-xs text-red-900">
                d'[u] = d'[v] + weight(v, u) ≥ d[v] + weight(v, u)
              </p>
              <p className="text-xs text-red-900 mt-2">
                但由于 u 是未访问节点中距离最小的：
              </p>
              <p className="text-xs text-red-900 mt-1">
                d[v] ≥ d[u]（v 也是未访问的）
              </p>
              <p className="text-xs text-red-900 mt-2">
                所以 d'[u] ≥ d[u]，与假设矛盾！
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded border border-green-200">
            <p className="text-xs text-green-900 font-semibold">
              ✓ 结论：不存在比 d[u] 更短的路径，因此 d[u] 就是 u 的最短距离。
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-purple-900">
            🔄 循环不变式
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-purple-800">
            在每次迭代的开始，集合 S（已访问节点）中的所有节点都有正确的最短距离。
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-purple-900">初始化 (i=0):</p>
            <div className="bg-white p-2 rounded text-xs text-gray-700">
              S = {'{'} V₀ {'}'} ，d[V₀] = 0 ✓ 正确
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-purple-900">维持 (i→i+1):</p>
            <div className="bg-white p-2 rounded text-xs text-gray-700">
              假设 S 中所有节点距离正确。选择 u（未访问中最小），由证明知 d[u] 正确。
              <br />
              将 u 加入 S，不变式仍成立。
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-purple-900">终止 (i=n-1):</p>
            <div className="bg-white p-2 rounded text-xs text-gray-700">
              S 包含所有 n 个节点，所有节点距离都正确。✓
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-green-900">
            ⚙️ 松弛操作为何有效
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-green-800">
            当确定了节点 u 的最短路径后，我们检查是否能通过 u 找到其他节点的更短路径。
          </p>

          <div className="bg-white p-3 rounded border border-green-200">
            <p className="text-xs font-mono text-green-900 mb-2">
              for each edge (u, v):
              <br />
              &nbsp;&nbsp;if d[u] + weight(u, v) &lt; d[v]:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;d[v] ← d[u] + weight(u, v)
            </p>
          </div>

          <p className="text-green-800">
            <strong>为什么这是安全的：</strong>
            由于 d[u] 已确定为最短距离，通过 u 到达 v 的路径长度
            <code className="bg-green-100 px-1 rounded text-xs">d[u] + weight(u, v)</code>
            一定是当前最优的。如果它比之前的 d[v] 更短，我们就更新。
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-orange-900">
            ⏱️ 时间复杂度分析
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="space-y-2">
            <p className="font-semibold text-orange-900">基础实现 (邻接矩阵):</p>
            <div className="bg-white p-2 rounded text-xs text-gray-700 font-mono">
              O(V²)
              <br />
              • 外层循环: O(V)
              <br />
              • 选择最小: O(V)
              <br />
              • 松弛操作: O(V)
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-orange-900">优化实现 (二叉堆):</p>
            <div className="bg-white p-2 rounded text-xs text-gray-700 font-mono">
              O((V + E) log V)
              <br />
              • 外层循环: O(V)
              <br />
              • 选择最小: O(log V)
              <br />
              • 松弛操作: O(E log V)
            </div>
          </div>

          <p className="text-orange-800 text-xs">
            <strong>注意：</strong>
            Dijkstra 要求所有边权非负。如果有负权边，需要用 Bellman-Ford 算法。
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProofExplainer;
