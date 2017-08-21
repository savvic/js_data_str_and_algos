// Generated by CoffeeScript 1.12.2
(function() {
  var BinarySearchTree, Dictionary, DoublyLinkedList, EventEmmiter, HashTable, LinkedList, PriorityQueue, Queue, Set, WithLog, after, fs, hotPotato, log, numFile, printNode, printer, pry, readFileAsArray, server, strFile, toBinary, tree,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  log = console.log.bind(console);

  fs = require('fs');

  numFile = './numbers.txt';

  strFile = './string.txt';

  EventEmmiter = require('events');

  server = require('http').createServer();

  pry = require('pry');

  after = function(ms, fn) {
    return setTimeout(fn, ms);
  };

  readFileAsArray = function(file, cb) {
    return new Promise(function(res, rej) {
      return fs.readFile(file, function(err, data) {
        var lines;
        if (err) {
          rej(err) && cb(err);
        }
        lines = data.toString().split(', ');
        res(lines);
        return cb(null, lines);
      });
    });
  };

  printer = function(err, arr) {
    var numbers, oddNumbers;
    if (err) {
      throw err;
    }
    numbers = arr.map(Number);
    return oddNumbers = numbers.filter((function(_this) {
      return function(n) {
        return n % 2 === 1;
      };
    })(this));
  };

  readFileAsArray(numFile, printer);

  WithLog = (function(superClass) {
    extend(WithLog, superClass);

    function WithLog() {
      return WithLog.__super__.constructor.apply(this, arguments);
    }

    WithLog.prototype.execute = function(taskFunc) {
      log('before executing');
      this.emit('begin');
      taskFunc();
      this.emit('end');
      return log('after executing');
    };

    return WithLog;

  })(EventEmmiter);

  server.on('request', function(req, res) {
    return fs.readFile(strFile, function(err, data) {
      if (err) {
        throw err;
      }
      return res.end(data);
    });
  });

  toBinary = function(decimalNumber, base) {
    var baseString, binaryArray, binaryNumber, binaryString, digits, emptyArr, results;
    binaryArray = [];
    emptyArr = binaryArray.length;
    binaryString = '';
    baseString = '';
    digits = '0123456789ABCDEF';
    results = [];
    while (decimalNumber > 0) {
      binaryNumber = Math.floor(decimalNumber % base);
      binaryArray.push(binaryNumber);
      decimalNumber = Math.floor(decimalNumber / base);
      results.push(binaryString += digits[binaryArray.pop()]);
    }
    return results;
  };

  PriorityQueue = (function() {
    var QueueElement;

    function PriorityQueue(items) {
      this.items = [];
    }

    QueueElement = (function() {
      function QueueElement(element1, priority1) {
        this.element = element1;
        this.priority = priority1;
      }

      return QueueElement;

    })();

    PriorityQueue.prototype.enqueue = function(element, priority) {
      var added, item, j, len, queueElement, ref;
      queueElement = new QueueElement(element, priority);
      if (this.isEmpty()) {
        return items.push(queueElement);
      } else {
        added = false;
        ref = this.items;
        for (j = 0, len = ref.length; j < len; j++) {
          item = ref[j];
          if (queueElement.priority < item.priority) {
            items.splice(item, 0, queueElement);
            added = true;
          }
        }
        if (!added) {
          return items.push(queueElement);
        }
      }
    };

    PriorityQueue.prototype.dequeue = function() {
      return items.shift();
    };

    PriorityQueue.prototype.front = function() {
      return items[0];
    };

    PriorityQueue.prototype.isEmpty = function() {
      return items.length === 0;
    };

    PriorityQueue.prototype.clear = function() {
      var items;
      return items = [];
    };

    PriorityQueue.prototype.size = function() {
      return items.length;
    };

    PriorityQueue.prototype.print = function() {
      return log('priority q: ', items);
    };

    return PriorityQueue;

  })();

  Queue = (function() {
    function Queue(items) {
      this.items = [];
    }

    Queue.prototype.enqueue = function(element) {
      return items.push(element);
    };

    Queue.prototype.dequeue = function() {
      return items.shift();
    };

    Queue.prototype.front = function() {
      return items[0];
    };

    Queue.prototype.isEmpty = function() {
      return items.length === 0;
    };

    Queue.prototype.clear = function() {
      var items;
      return items = [];
    };

    Queue.prototype.size = function() {
      return items.length;
    };

    Queue.prototype.print = function() {
      return log(items);
    };

    return Queue;

  })();

  hotPotato = function(nameList, num) {
    var eliminated, i, j, k, len, queue, ref, y;
    queue = new Queue;
    for (i = j = 0, len = nameList.length; j < len; i = ++j) {
      y = nameList[i];
      queue.enqueue(y);
    }
    eliminated = '';
    while (queue.size() > 1) {
      for (k = 0, ref = num; 0 <= ref ? k < ref : k > ref; 0 <= ref ? k++ : k--) {
        log(queue.front());
        queue.enqueue(queue.dequeue());
      }
      eliminated = queue.dequeue();
      log(eliminated + ' was eliminated from the Hot Potato game.');
    }
    return queue.dequeue();
  };

  LinkedList = (function() {
    var Node;

    function LinkedList(length, head) {
      this.length = 0;
      this.head = null;
    }

    Node = (function() {
      function Node(element1, next) {
        this.element = element1;
        this.next = next;
      }

      return Node;

    })();

    LinkedList.prototype.append = function(element) {
      var current, node;
      node = new Node(element);
      if (this.head == null) {
        this.head = node;
      } else {
        current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = node;
      }
      return this.length++;
    };

    LinkedList.prototype.insert = function(position, element) {
      var current, index, node, previous;
      if (position >= 0 && position <= this.length) {
        node = new Node(element);
        current = this.head;
        index = 0;
        if (position === 0) {
          node.next = current;
          this.head = node;
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;
        }
        this.length++;
        return true;
      } else {
        return false;
      }
    };

    LinkedList.prototype.removeAt = function(position) {
      var current, index, previous;
      if (position > -1 && position < this.length) {
        current = this.head;
        index = 0;
        if (position === 0) {
          this.head = current.next;
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          previous.next = current.next;
        }
        this.length--;
        return current.element;
      } else {
        return null;
      }
    };

    LinkedList.prototype.remove = function(element) {
      var index;
      index = this.indexOf(element);
      return this.removeAt(index);
    };

    LinkedList.prototype.indexOf = function(element) {
      var current, index;
      current = this.head;
      index = 0;
      while (current) {
        if (element === current.element) {
          return index;
        }
        index++;
        current = current.next;
      }
      return index;
    };

    LinkedList.prototype.isEmpty = function() {
      return this.length === 0;
    };

    LinkedList.prototype.size = function() {
      return this.length;
    };

    LinkedList.prototype.toString = function() {
      var current, string;
      current = this.head;
      while (current) {
        string = current.element;
        current = current.next;
      }
      return string;
    };

    LinkedList.prototype.getHead = function() {
      return this.head;
    };

    return LinkedList;

  })();

  DoublyLinkedList = (function() {
    var Node;

    function DoublyLinkedList(length, head, tail) {
      this.length = 0;
      this.head = null;
      this.tail = null;
    }

    Node = (function() {
      function Node(element1, next, prev) {
        this.element = element1;
        this.next = next;
        this.prev = prev;
      }

      return Node;

    })();

    DoublyLinkedList.prototype.append = function(element) {};

    DoublyLinkedList.prototype.insert = function(position, element) {
      var current, index, node, previous;
      if (position >= 0 && position <= this.length) {
        node = new Node(element);
        current = this.head;
        index = 0;
        if (position === 0) {
          if (!this.head) {
            this.head = node;
            this.tail = node;
          } else {
            node.next = current;
            current.prev = node;
            this.head = node;
          }
        } else if (position === this.length) {
          current = this.tail;
          current.next = node;
          node.prev = current;
          this.tail = node;
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;
          current.prev = node;
          node.prev = previous;
        }
        lenght++;
        return true;
      } else {
        return false;
      }
    };

    DoublyLinkedList.prototype.removeAt = function(position) {
      var current, index, previous;
      if (position > -1 && position < this.length) {
        current = this.head;
        index = 0;
        if (position === 0) {
          this.head = current.next;
          if (this.length === 1) {
            this.tail === null;
          } else {
            this.head.prev = null;
          }
        } else if (position === this.length(-1)) {
          current = this.tail;
          this.tail = current.prev;
          this.tail.next = null;
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          previous.next = current.next;
          current.next.prev = previous;
        }
        this.length--;
        return current.element;
      } else {
        return null;
      }
    };

    DoublyLinkedList.prototype.remove = function(element) {
      var index;
      index = this.indexOf(element);
      return this.removeAt(index);
    };

    DoublyLinkedList.prototype.indexOf = function(element) {
      var current, index;
      current = this.head;
      index = 0;
      while (current) {
        if (element === current.element) {
          return index;
        }
        index++;
        current = current.next;
      }
      return index;
    };

    DoublyLinkedList.prototype.isEmpty = function() {
      return this.length === 0;
    };

    DoublyLinkedList.prototype.size = function() {
      return this.length;
    };

    DoublyLinkedList.prototype.toString = function() {
      var current, string;
      current = this.head;
      while (current) {
        string = current.element;
        current = current.next;
      }
      return string;
    };

    DoublyLinkedList.prototype.getHead = function() {
      return this.head;
    };

    return DoublyLinkedList;

  })();

  Set = (function() {
    function Set(items, ownLength) {
      this.items = {};
      this.ownLength = 0;
    }

    Set.prototype.add = function(value) {
      if (!this.has(value)) {
        this.items[value] = value;
        this.ownLength++;
        true;
      }
      return false;
    };

    Set.prototype.remove = function(value) {
      if (this.has(value)) {
        delete this.items[value];
        this.ownLength--;
        true;
      }
      return false;
    };

    Set.prototype.has = function(value) {
      return value in this.items;
    };

    Set.prototype.clear = function() {
      return this.items = {};
    };

    Set.prototype.size = function() {
      log("ownLenght is: " + this.ownLength);
      return Object.keys(this.items).length;
    };

    Set.prototype.sizeLegacy = function() {
      var count, prop;
      count = 0;
      for (prop in this.items) {
        if (this.items.hasOwnProperty(prop)) {
          ++count;
        }
      }
      return count;
    };

    Set.prototype.values = function() {
      return Object.keys(this.items);
    };

    Set.prototype.valuesLegacy = function() {
      var key, keys;
      keys = [];
      for (key in this.items) {
        keys.push(key);
      }
      return keys;
    };

    Set.prototype.union = function(otherSet) {
      var i, unionSet, values;
      unionSet = new Set();
      values = this.values();
      for (i in values) {
        unionSet.add(values[i]);
      }
      values = otherSet.values();
      for (i in values) {
        unionSet.add(values[i]);
      }
      return unionSet;
    };

    Set.prototype.intersection = function(otherSet) {
      var i, intersectionSet, values;
      intersectionSet = new Set();
      values = this.values();
      log("values of setA: " + values);
      for (i in values) {
        if (otherSet.has(values[i])) {
          intersectionSet.add(values[i]);
        }
      }
      return intersectionSet;
    };

    Set.prototype.difference = function(otherSet) {
      var differenceSet, i, values;
      differenceSet = new Set();
      values = this.values();
      for (i in values) {
        if (!otherSet.has(values[i])) {
          differenceSet.add(values[i]);
        }
      }
      return differenceSet;
    };

    Set.prototype.subset = function(otherSet) {
      var i, values;
      if (this.size() > otherSet.size()) {
        return false;
      } else {
        values = this.values();
        for (i in values) {
          if (!otherSet.has(values[i])) {
            log("A is not a subset of B");
            return false;
          }
        }
        log("A is a subset of B");
        return true;
      }
    };

    return Set;

  })();

  Dictionary = (function() {
    function Dictionary(items) {
      this.items = {};
    }

    Dictionary.prototype.set = function(key, value) {
      return this.items[key] = value;
    };

    Dictionary.prototype.remove = function(key) {
      if (this.has(key)) {
        delete this.items[key];
        return true;
      } else {
        return false;
      }
    };

    Dictionary.prototype.has = function(key) {
      return key in this.items;
    };

    Dictionary.prototype.get = function(key) {
      if (this.has(key)) {
        return this.items[key];
      } else {
        return void 0;
      }
    };

    Dictionary.prototype.clear = function() {
      var items;
      return items = {};
    };

    Dictionary.prototype.size = function() {
      return Object.keys(this.items).length;
    };

    Dictionary.prototype.keys = function() {
      var key, keys, ref, val;
      keys = [];
      ref = this.items;
      for (key in ref) {
        val = ref[key];
        if (this.has(key)) {
          keys.push(key);
        }
      }
      return key;
    };

    Dictionary.prototype.values = function() {
      var key, values;
      values = [];
      for (key in this.items) {
        if (this.has(key)) {
          values.push(this.items[key]);
        }
      }
      return values;
    };

    Dictionary.prototype.getItems = function() {
      return this.items;
    };

    return Dictionary;

  })();

  HashTable = (function() {
    var ValuePair;

    function HashTable(table, lastHash) {
      this.table = [];
      this.lastHash = 0;
    }

    HashTable.prototype.loseloseHashCode = function(key) {
      var hash, i, j, len;
      hash = 0;
      for (j = 0, len = key.length; j < len; j++) {
        i = key[j];
        hash += i.charCodeAt();
      }
      return hash;
    };

    HashTable.prototype.djb2HashCode = function(key) {
      var hash, i, j, len;
      hash = 5381;
      for (j = 0, len = key.length; j < len; j++) {
        i = key[j];
        hash = hash * 33 + i.charCodeAt();
      }
      return hash % 1013;
    };

    HashTable.prototype.put = function(key, value) {
      var position;
      position = this.loseloseHashCode(key);
      log(position + ' - ' + value);
      return this.table[position] = value;
    };

    HashTable.prototype.remove = function(key) {
      return this.table[this.loseloseHashCode(key)] = void 0;
    };

    HashTable.prototype.get = function(key) {
      return this.table[this.loseloseHashCode(key)];
    };

    ValuePair = (function() {
      function ValuePair(key1, value1) {
        this.key = key1;
        this.value = value1;
      }

      ValuePair.prototype.toString = function() {
        return "[ " + this.key + " - " + this.value + " ]";
      };

      return ValuePair;

    })();

    HashTable.prototype.putSC = function(key, value) {
      var position;
      position = this.loseloseHashCode(key);
      log(position + ' -SC- ' + value);
      if (this.table[position] === void 0) {
        this.table[position] = new LinkedList();
      }
      return this.table[position].append(new ValuePair(key, value));
    };

    HashTable.prototype.getSC = function(key) {
      var current, position;
      position = this.loseloseHashCode(key);
      if (this.table[position] !== void 0) {
        current = this.table[position].getHead();
        while (current.next) {
          if (current.element.key === key) {
            return current.element.value;
          }
          current = current.next;
        }
        if (current.element.key === key) {
          return current.element.value;
        }
      }
      return void 0;
    };

    HashTable.prototype.removeSC = function(key) {
      var current, position;
      position = this.loseloseHashCode(key);
      if (this.table[position] !== void 0) {
        current = this.table[position].getHead();
        while (current.next) {
          if (current.element.key === key) {
            this.table[position].remove(current.element);
            if (this.table[position].isEmpty()) {
              this.table[position] = void 0;
            }
            return true;
          }
          current = current.next;
        }
        if (currnet.element.key === key) {
          this.table[position].remove(current.element);
          if (this.table[position].isEmpty()) {
            this.table[position] = void 0;
          }
          return true;
        }
      }
      return false;
    };

    HashTable.prototype.putLP = function(key, value) {
      var index, position;
      position = this.loseloseHashCode(key);
      if (position > this.lastHash) {
        this.lastHash = position;
      }
      if (this.table[position] === void 0) {
        return this.table[position] = new ValuePair(key, value);
      } else {
        index = position + 1;
        while (this.table[index] !== void 0) {
          index = index + 1;
        }
        log(index + (" index of " + key));
        return this.table[index] = new ValuePair(key, value);
      }
    };

    HashTable.prototype.getLP = function(key) {
      var index, position;
      position = this.loseloseHashCode(key);
      if (this.table[position] !== void 0) {
        if (this.table[position].key === key) {
          return this.table[position].value;
        }
      } else {
        index = position + 1;
        while ((this.table[index] === void 0 || this.table[index].key !== key) && index <= this.lastHash) {
          index = index + 1;
        }
        if (this.table[index] !== void 0) {
          if (this.table[index].key === key) {
            return this.table[index].value;
          } else {
            return void 0;
          }
        }
      }
    };

    HashTable.prototype.removeLP = function(key) {
      var index, position;
      position = this.loseloseHashCode(key);
      if (this.table[position] !== void 0) {
        if (this.table[position].key === key) {
          this.table[position] = void 0;
        } else {
          index = position + 1;
          while (this.table[index] === void 0 || this.table[index].key !== key) {
            if (this.table[index].key === key) {
              return this.table[index] = void 0;
            } else {
              index = index + 1;
            }
          }
          if (this.table[index].key === key) {
            return this.table[index] = void 0;
          }
        }
      }
      return void 0;
    };

    return HashTable;

  })();

  BinarySearchTree = (function() {
    var Node, root;

    function BinarySearchTree() {
      this.preOrderTraverseNode = bind(this.preOrderTraverseNode, this);
      this.inOrderTraverseNode = bind(this.inOrderTraverseNode, this);
      this.insertNode = bind(this.insertNode, this);
    }

    Node = (function() {
      function Node(key1) {
        this.key = key1;
        this.left = null;
        this.right = null;
      }

      return Node;

    })();

    root = null;

    BinarySearchTree.prototype.insert = function(key) {
      var newNode;
      newNode = new Node(key);
      if (root === null) {
        return root = newNode;
      } else {
        return this.insertNode(root, newNode);
      }
    };

    BinarySearchTree.prototype.insertNode = function(node, newNode) {
      if (newNode.key < node.key) {
        if (node.left === null) {
          return node.left = newNode;
        } else {
          return this.insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          return node.right = newNode;
        } else {
          return this.insertNode(node.right, newNode);
        }
      }
    };

    BinarySearchTree.prototype.inOrderTraverse = function(callback) {
      return this.inOrderTraverseNode(root, callback);
    };

    BinarySearchTree.prototype.inOrderTraverseNode = function(node, callback) {
      if (node !== null) {
        this.inOrderTraverseNode(node.left, callback);
        callback(node.key);
        return this.inOrderTraverseNode(node.right, callback);
      }
    };

    BinarySearchTree.prototype.preOrderTraverse = function(callback) {
      return this.preOrderTraverseNode(root, callback);
    };

    BinarySearchTree.prototype.preOrderTraverseNode = function(node, callback) {
      if (node !== null) {
        callback(node.key);
        this.preOrderTraverseNode(node.left, callback);
        return this.preOrderTraverseNode(node.right, callback);
      }
    };

    return BinarySearchTree;

  })();

  printNode = function(value) {
    return log(value);
  };

  tree = new BinarySearchTree;

  tree.insert(11);

  tree.insert(7);

  tree.insert(15);

  tree.insert(5);

  tree.insert(3);

  tree.insert(9);

  tree.insert(8);

  tree.insert(10);

  tree.insert(13);

  tree.insert(12);

  tree.insert(14);

  tree.insert(20);

  tree.insert(18);

  tree.insert(25);

  tree.insert(6);

  tree.inOrderTraverse(printNode);

  tree.preOrderTraverseNode(printNode);

}).call(this);