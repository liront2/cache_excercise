class Cache {
  constructor(maxItems) {
    this.cache = {};
    this.cacheLengthItems = 0;
    this.maxItems = maxItems;
    this.keysEntrySequence = []
  }
  getKey(key) {
    if (this.cache[key]) {
      this.cache[key] = Date.now();
      this.keysEntrySequence.push(key)
    }
    return this.cache[key]
  }
  setKey(key, value = Date.now()) {
    this.keysEntrySequence.push(key)
    if(!this.maxItems || this.cacheLengthItems < this.maxItems) {
      this.cache[key] = value;
      this.cacheLengthItems++;
    } else {
      /* to get O(1) we update/set of keys by order,
        so the oldest key will always be maxItems from the end
        (arr.length and index access are both O(1))
       */
      const oldestKey = this.getkeysEntrySequence()[this.keysEntrySequence.length - (this.maxItems + 1)]
      delete this.cache[oldestKey]
      this.cache[key] = value
    }
    
  }
  getLength() {
    return this.cacheLengthItems;
  }
  getkeysEntrySequence() {
    return this.keysEntrySequence;
  }
  toObject() {
    return this.cache;
  }
}

//new
const maxItems = 4
const testCache = new Cache(maxItems);

// getter
console.log(testCache.getKey('key1') + '\n')
console.log(testCache.getLength())

// setter (new)
testCache.setKey('key1')
testCache.setKey('key2')
testCache.setKey('key3')
console.log(JSON.stringify(testCache.toObject()) + '\n') // stringify proves it's parsable

// set the last possible key (4 out of 4)
testCache.setKey('key4')
console.log(JSON.stringify(testCache.toObject()))

// getter (set new time) - take a few seconds to ensure latest timestamp is far enough
setTimeout(() => {
  testCache.getKey('key1')
  console.log(JSON.stringify(testCache.toObject()))
  testCache.setKey('key5')
  console.log(JSON.stringify(testCache.toObject()))
  // key5 is the latest, then key1, key4 and key3
}, 5000)
