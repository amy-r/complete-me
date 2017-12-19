import { expect } from 'chai';
import Trie from '../lib/Trie';

describe('Trie', () => {

  it('should exist', function() {
    expect(true, true)
  })

  it('should be a constructor', function() {
    let completion = new Trie();
    expect(completion, new Trie());
  })

  it('should count letters in base case', function() {
    let word = new Trie();
    word.insert("a");
    expect(word.count).to.equal(1);
  })

  it('should make a new node of letter in base case', function() {
    let wordTrie = new Trie();
    wordTrie.insert("a");
    expect(wordTrie.root.children.data).to.deep.equal("a");
  })

  it('should count letters in recursive case', function() {
    let word = new Trie();
    word.insert("am");
    expect(word.count).to.equal(2);
  })

  it('should make a new node of letter in recursive case', function() {
    let wordTrie = new Trie();
    wordTrie.insert("am");
    expect(wordTrie.root.children.data).to.deep.equal("a");
    expect(wordTrie.root.children.children.data).to.deep.equal("m");
  })

})