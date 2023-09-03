class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(node => this.nodes.add(node));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const DFSvalues = [];

    function dfsHelper(node) {
      if (!node) return;
      
      DFSvalues.push(node.value);
      for (let neighbor of node.adjacent) {
        if (!DFSvalues.includes(neighbor.value)) {
          dfsHelper(neighbor);
        }
      }
    }
  
    dfsHelper(start);
  
    return DFSvalues;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisit = [start];
    let seen = new Set(toVisit);
    let BFSvalues = [];

    while (toVisit.length) {
      let current = toVisit.shift();
      BFSvalues.push(current.value)

      for(let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisit.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return BFSvalues;
  }
}

module.exports = {Graph, Node}