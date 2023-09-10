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
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    for(let item of this.nodes) {
      if (item === v1) {
        item.adjacent.add(v2)
      }
      if (item === v2) {
        item.adjacent.add(v1)
      }
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    for(let item of this.nodes) {
      if(item === v1) {
        item.adjacent.delete(v2);
      }
      if(item === v2) {
        item.adjacent.delete(v1);
      }
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let item of this.nodes) {
      if(item === vertex) {
        this.nodes.delete(vertex);
      } else {
        if(item.adjacent.has(vertex)) {
          item.adjacent.delete(vertex);
        }
      }
    } 
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let searchArray = [];
    let toVisitStack = [start];
    let seenNodes = new Set(toVisitStack);

    while(toVisitStack.length > 0) {
      let currentItem = toVisitStack.pop(); 
      searchArray.push(currentItem.value);
      console.log(currentItem.value)
      
      for (let neighbor of currentItem.adjacent) {
        if(!seenNodes.has(neighbor)) {
          toVisitStack.push(neighbor);
          seenNodes.add(neighbor);
        }
      }
    } return searchArray;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let searchArray = [];
    let toVisitQueue = [start];
    let seenNodes = new Set(toVisitQueue);

    while(toVisitQueue.length > 0) {
      let currentItem = toVisitQueue.shift(); 
      searchArray.push(currentItem.value);
      
      for (let neighbor of currentItem.adjacent) {
        if(!seenNodes.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seenNodes.add(neighbor);
        }
      }
    } return searchArray;
  }

}

module.exports = {Graph, Node}