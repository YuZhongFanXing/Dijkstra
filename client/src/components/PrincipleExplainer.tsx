import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PrincipleExplainer: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('greedy');

  const sections = [
    {
      id: 'greedy',
      title: '为什么贪心选择是正确的？',
      content: (
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            <strong>核心问题：</strong>
            为什么每次选择未访问节点中距离最小的节点，其最短路径就一定已确定？
          </p>
          <p>
            <strong>答案（交换论证）：</strong>
            假设我们选择了节点 <code className="bg-gray-100 px-1 rounded">u</code>，它在未访问节点中距离最小。
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              设 <code className="bg-gray-100 px-1 rounded">d[u]</code> 是起点到 <code className="bg-gray-100 px-1 rounded">u</code> 的当前距离
            </li>
            <li>
              任何通过未访问节点 <code className="bg-gray-100 px-1 rounded">v</code> 到达 <code className="bg-gray-100 px-1 rounded">u</code> 的路径长度至少为 <code className="bg-gray-100 px-1 rounded">d[v] + weight(v,u)</code>
            </li>
            <li>
              因为 <code className="bg-gray-100 px-1 rounded">d[u] ≤ d[v]</code>（u是最小的），且所有边权非负，所以 <code className="bg-gray-100 px-1 rounded">d[u] ≤ d[v] + weight(v,u)</code>
            </li>
            <li>
              因此，不存在更短的路径到达 <code className="bg-gray-100 px-1 rounded">u</code>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'invariant',
      title: '循环不变式',
      content: (
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            <strong>不变式：</strong>
            在每次迭代开始时，集合 <code className="bg-gray-100 px-1 rounded">S</code> 中的所有节点都有正确的最短距离。
          </p>
          <p>
            <strong>初始化：</strong>
            起点在 <code className="bg-gray-100 px-1 rounded">S</code> 中，距离为 0，这是正确的。
          </p>
          <p>
            <strong>维持：</strong>
            当我们添加节点 <code className="bg-gray-100 px-1 rounded">u</code> 到 <code className="bg-gray-100 px-1 rounded">S</code> 时，由于 <code className="bg-gray-100 px-1 rounded">u</code> 在未访问节点中距离最小，它的最短距离已确定。
          </p>
          <p>
            <strong>终止：</strong>
            当所有节点都在 <code className="bg-gray-100 px-1 rounded">S</code> 中时，所有节点的最短距离都已确定。
          </p>
        </div>
      ),
    },
    {
      id: 'relaxation',
      title: '松弛操作（Relaxation）',
      content: (
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            <strong>目的：</strong>
            当确定了节点 <code className="bg-gray-100 px-1 rounded">u</code> 的最短路径后，通过 <code className="bg-gray-100 px-1 rounded">u</code> 可能找到到其他节点的更短路径。
          </p>
          <p>
            <strong>操作：</strong>
            对于每条从 <code className="bg-gray-100 px-1 rounded">u</code> 出发的边 <code className="bg-gray-100 px-1 rounded">(u, v)</code>：
          </p>
          <div className="bg-gray-50 p-3 rounded font-mono text-xs">
            if d[u] + weight(u, v) &lt; d[v]:<br />
            &nbsp;&nbsp;d[v] = d[u] + weight(u, v)<br />
            &nbsp;&nbsp;parent[v] = u
          </div>
          <p>
            这样逐步更新所有节点的距离，直到找到最短路径。
          </p>
        </div>
      ),
    },
    {
      id: 'complexity',
      title: '时间复杂度',
      content: (
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            <strong>基础实现：</strong>
            <code className="bg-gray-100 px-1 rounded">O(V²)</code>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>选择最小节点：O(V)</li>
            <li>外层循环：O(V)</li>
            <li>松弛操作：O(V)</li>
          </ul>
          <p>
            <strong>使用优先队列：</strong>
            <code className="bg-gray-100 px-1 rounded">O((V + E) log V)</code>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>选择最小节点：O(log V)</li>
            <li>外层循环：O(V)</li>
            <li>松弛操作：O(E log V)</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900 mb-4">算法原理详解</h3>
      {sections.map((section) => (
        <Card
          key={section.id}
          className="cursor-pointer hover:border-teal-300 transition-colors"
          onClick={() =>
            setExpandedSection(
              expandedSection === section.id ? null : section.id
            )
          }
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                {section.title}
              </CardTitle>
              {expandedSection === section.id ? (
                <ChevronUp className="w-4 h-4 text-teal-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </CardHeader>
          {expandedSection === section.id && (
            <CardContent className="pt-0">{section.content}</CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default PrincipleExplainer;
