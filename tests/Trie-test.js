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

  it('should count words in base case', function() {
    let word = new Trie();
    word.insert("a");
    expect(word.length).to.equal(1);
  })

  it('should make a new node of letter in base case', function() {
    let wordTrie = new Trie();
    wordTrie.insert("a");
    expect(wordTrie.head.children.a.data).to.deep.equal("a");
  })

  it('should count letters in recursive case', function() {
    let word = new Trie();
    word.insert("am");
    word.insert("hello");
    expect(word.length).to.equal(2);
  })

  it('should make a new node of letters in recursive case', function() {
    let wordTrie = new Trie();
    wordTrie.insert("am");
    expect(wordTrie.head.children.a.data).to.deep.equal("a");
    expect(wordTrie.head.children.a.children.m.data).to.deep.equal("m");
  })

  it('should make a lot of new nodes for lots of letters', function() {
    let wordTrie = new Trie();
    wordTrie.insert("pizza");
    expect(wordTrie.head.children.p.data).to.deep.equal('p');
    expect(wordTrie.head.children.p.children.i.data).to.deep.equal('i');
    expect(wordTrie.head.children.p.children.i.children.z.data).to.deep.equal('z');
  })

  it('should make nodes for letters in multiple words', function() {
    let wordTrie = new Trie();
    wordTrie.insert("pizza");
    wordTrie.insert("hi")
    // console.log( JSON.stringify(wordTrie, null, 4) );
    expect(wordTrie.head.children.p.data).to.deep.equal('p');
    expect(wordTrie.head.children.p.children.i.data).to.deep.equal('i');
    expect(wordTrie.head.children.p.children.i.children.z.data).to.deep.equal('z');
    expect(wordTrie.head.children.h.data).to.deep.equal('h');
    expect(wordTrie.head.children.h.children.i.data).to.deep.equal('i');
  })
})

describe('SUGGEST', () => {
  it('should take in a string and return an array', () => {
    let trie = new Trie();
    // console.log(trie.suggest('piz'))
    expect(trie.suggest('piz')).to.be.array;
  });

  it('should suggest all words matching the phrase parameter (small sample)', () => {
    let trie = new Trie();
    trie.insert("dead");
    trie.insert("dirt");
    trie.insert("done");
    trie.insert("donuts");

    expect(trie.suggest("d")).to.deep.equal(["dead", "dirt", "done", "donuts"]);
    // expect(trie.suggest("do")).to.deep.equal(["done", "donuts"]);
  });


  it('should return empty array if the phrase does not match any words (small sample)', () => {
    let trie = new Trie();
    trie.insert('piece');
    trie.insert('pizza');

    expect(trie.suggest('!')).to.deep.equal([]);
  });


  describe('POPULATE', () => {
    it('should have a large word count', () =>{
      let trie = new Trie();
      trie.populate();
      expect(trie.length).to.equal(235886);
      expect(trie.suggest("piz")).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
    })
  })

  describe('SELECT', () => {
    it('should be able to sort selections', () => {
      let trie = new Trie();
      trie.populate();
      trie.suggest("piz");
      expect(trie.suggest("piz")).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
      trie.select("pizzeria");
      expect(trie.suggest("piz")).to.deep.equal(["pizzeria","pize", "pizza", "pizzicato", "pizzle"]);

    })
  })
});