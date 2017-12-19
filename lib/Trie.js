import Node from './Node'

export default class Trie {
  constructor() {
    this.root = new Node();
    this.count = 0;
  }

  insert(data) {
    // insert a new word into our Trie
    // by breaking it down into letters

    let dataArray = [...data];
    let currentNode = new Node();
    this.count += dataArray.length;

    function makeLetterNodes(dataArray, previousNode) {
    
      //base case
      if (dataArray.length <= 1) {
        let currentNode = new Node();
        currentNode.data = dataArray.shift();
        currentNode.complete = true;
        previousNode.children = currentNode;
        return currentNode;
      }

      //getting closer to our base case
      else {
        let currentNode = new Node();
        currentNode.data = dataArray.shift();
        previousNode.children = currentNode;
        makeLetterNodes(dataArray, currentNode);
      }

    }

    makeLetterNodes(dataArray, this.root);
    // and making a new node for each letter 
  }
}