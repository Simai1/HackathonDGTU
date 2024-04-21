import React, { useState } from 'react';

 const Dijkstra = () => {
  const [graph, setGraph] = useState({
    A: { B: 1949, C: 2040 },
    B: { A: 2161, C: 2168, D: 1114 },
    C: { A: 1838, B: 1992, D: 1650 },
    D: { B: 874, C: 1812 },
  });
  
  const [startNode, setStartNode] = useState('A');
  const [endNode, setEndNode] = useState('D');
  const [shortestPath, setShortestPath] = useState([]);

  const dijkstra = (graph, start, end) => {
    const visitedNodes = {};
    const distances = {};
    const predecessors = {};
    let unvisitedNodes = Object.keys(graph);

    unvisitedNodes.forEach(node => {
      distances[node] = Infinity;
      predecessors[node] = null;
    });

    distances[start] = 0;

    while (unvisitedNodes.length) {
      const currentNode = unvisitedNodes.reduce((minNode, node) => {
        return distances[node] < distances[minNode] ? node : minNode;
      }, unvisitedNodes[0]);

      unvisitedNodes = unvisitedNodes.filter(node => node !== currentNode);

      Object.keys(graph[currentNode]).forEach(neighbor => {
        const weight = graph[currentNode][neighbor];
        const totalDistance = distances[currentNode] + weight;
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          predecessors[neighbor] = currentNode;
        }
      });
    }

    const path = [];
    let current = end;
    while (current !== null) {
      path.unshift(current);
      current = predecessors[current];
    }
    return path;
  };

  const findShortestPath = () => {
    const path = dijkstra(graph, startNode, endNode);
    setShortestPath(path);
  };
console.log(shortestPath)

  return (
    <div>
      <h1>Dijkstra's Algorithm</h1>
      <label>
        Start Node:
        <select value={startNode} onChange={e => setStartNode(e.target.value)}>
          {Object.keys(graph).map(node => (
            <option key={node} value={node}>{node}</option>
          ))}
        </select>
      </label>
      <label>
        End Node:
        <select value={endNode} onChange={e => setEndNode(e.target.value)}>
          {Object.keys(graph).map(node => (
            <option key={node} value={node}>{node}</option>
          ))}
        </select>
      </label>
      <button onClick={findShortestPath}>Find Shortest Path</button>
      <div>
        Shortest Path: {shortestPath.join(' -> ')}
      </div>
    </div>
  );
};

export default Dijkstra;