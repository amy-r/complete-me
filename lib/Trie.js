import Node from './Node';

export default class Trie {
  constructor() {
    this.head = new Node();
    this.length = 0;
  }

  insert(string, node = this.head) {
    // base case
    if (string.length === 0) {
      this.length += 1;
      node.isWord = true;
      return;
    }

    if (!node.children[string[0]]) {
      node.children[string[0]] = new Node(string[0]);
    } 

    return this.insert(string.substr(1), node.children[string[0]]);
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

      return this.findSuggestions(currentNode, phrase.join(''));
    }
  }
  
  findSuggestions(currentNode, string) {
    let nextLetter = Object.keys(currentNode.children);
    console.log(nextLetter)

    //base case
    if (currentNode.isWord) {
      this.suggestArray.push({ word: string, favor: currentNode.favored });
    }

    nextLetter.forEach((letter) => {
      this.findSuggestions(currentNode.children[letter], string + letter);
    });

    return this.sortSuggestions(this.suggestArray);
  }

  sortSuggestions(suggestArray) {
    suggestArray.sort((a, b) => b.favor - a.favor);
    return suggestArray.map(object => object.word);
  }

  select(string) {
    let currentNode = this.traverse(string);

    currentNode.favored++;
  }

  populate() {
    const fs = require('fs');

    const text = "/usr/share/dict/words";

    const dictionary = fs.readFileSync(text).toString().trim().split('\n');

    dictionary.forEach((word)=>{
      this.insert(word);
    });
  }

  traverse(string) {
    let currentNode = this.head;
    let wordArray = [...string];

    wordArray.forEach(letter => {
      currentNode = currentNode.children[letter];
    });
    return currentNode;
  }

  delete(string) {
    let currentNode = this.traverse(string);

    currentNode.isWord = false;
  }
}