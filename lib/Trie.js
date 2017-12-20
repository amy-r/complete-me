import Node from './Node'

export default class Trie {
  constructor() {
    this.head = new Node();
    this.length = 0;
    this.suggestArray = [];
  }

  insert(data, node = this.head) {
    // base case
    if (data.length === 0) {
      this.length += 1;
      node.isWord = true;
      return;
    }

    if (!node.children[data[0]]) {
      node.children[data[0]] = new Node(data[0]);
      return this.insert(data.substr(1), node.children[data[0]]);
    } else {
      return this.insert(data.substr(1), node.children[data[0]]);
    }
  }

  suggest(phrase) {
    this.suggestArray = [];
    phrase = phrase.split('');
    let currentNode = this.head;

    phrase.forEach(letter => {
      
      if (currentNode && currentNode.children) {
        currentNode = currentNode.children[letter];
      }
    });

    if (!currentNode || !currentNode.children) {
      return [];

    } else {
      console.log(currentNode.children)
      return this.findSuggestions(currentNode, phrase.join(''), this.suggestions);
    }
  }
  
  findSuggestions(current, string) {
    let nextLetter = Object.keys(current.children);

    //base case
    if (current.isWord) {
      this.suggestArray.push(string);
    }

    nextLetter.forEach((value) => {
      this.findSuggestions(current.children[value], string + value);
    })

    return this.suggestArray
  }

  sortSuggestions(suggestions) {
    this.suggestions.sort((a, b) => {
      return b.selected - a.selected;
    });

    return this.suggestions.map(suggestion => {
      return this.suggestion.word;
    });
  }
}