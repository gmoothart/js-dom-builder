// yui-functional v.0.2.0
// Provides common functional methods for working with collections
// Copyright 2008 Christian Romney 
// Licensed under the terms of the BSD license
YAHOO.util.Functional = function () {
  return {    
    /** 
      Function: each
      
      Iterates over a collection, yielding each item
      and its index to the supplied function.
      
      Parameters:
      
      enumerable - a collection to iterate over
      block - a function that will receive each item in the collection and its index
      
      Returns:
      
      The enumerable passed into each.
      
      Example:
      
      YAHOO.util.Functional.each([1, 2, 3], function (item, index) {
        console.log("Position " + index + ": " + item);  
      });     
      
    */
    each: function (enumerable, block) {
      for (var i = 0; i < enumerable.length; i++) {
        block(enumerable[i], i);
      }
      return enumerable;
    },    
    
    /** 
      Function: collect
    
      Parameters:
      
      enumerable - a collection to iterate over
      block - a function that will receive each item in the collection and its index
    
      Returns:  
      
      A new array containing the values obtained by applying the function to 
      each item in the collection. 
      
      Example:
      
      var nums = YAHOO.util.Functional.collect([1, 2, 3], function (item) {
        return item * 2;
      });
     
      => [2, 4, 6]
     
     */
    collect: function (enumerable, block) {
      var results = [];
      this.each(enumerable, function (item, index) {
        results.push(block(item, index));
      });
      return results;
    },
    
    /** 
      Function: inject
      
      Parameters:
      
      initial - an initial value used to seed the accumulator
      enumerable - a collection to iterate over
      block - a function that will receive the accumulator, each item in the collection, and its index
      
      Returns: 
      
      A scalar value that is computed by passing in an accumulator and the 
      each item of the collection to the function. The last value returned from 
      the block will be returned by inject. 
      
      Example:
     
      var sum = YAHOO.util.Functional.inject(0, [1, 2, 3], function (sum, item) {
        return sum + item;
      });
     
      => 6
     
     */
    inject: function (enumerable, initial, block) {
      var result = initial;
      this.each(enumerable, function (item, index) {
        result = block(result, item, index);
      });
      return result;
    },
    
    /** 
      Function: detect
      
      Parameters:
      
      enumerable - a collection to iterate over
      block - a function that will receive each item in the collection and its index
      
      Returns:
      
      The first item in the collection for which the function returns a non-null, 
      non-false result. If no item is found, it returns null.
     
      Example:
     
      var even = YAHOO.util.Functional.detect([1, 2, 3, 4], function (item) {
        return item % 2 == 0;
      });
     
      => 2
     
     */
    detect: function (enumerable, block) {
      var result = null;
      try {
        this.each(enumerable, function (item, index) {
          if (block(item, index)) throw item;
        });
      }
      catch (e) {
        result = e;
      }
      return result;
    },
    
    /** 
      Function: select
      
      Parameters:
      
      enumerable - a collection to iterate over
      block - a function that will receive each item in the collection and its index
      
      Returns: 
      
      All the items in the collection for which the function returns a non-null, 
      non-false result. If no items are found, it returns an empty array.
           
      Example:
     
      var even = YAHOO.util.Functional.select([1, 2, 3, 4], function (item) {
        return item % 2 == 0;
      });
     
      => [2, 4]
     
     */
    select: function (enumerable, block) {
      var results = [];
      this.each(enumerable, function (item, index) {
        if (block(item, index)) results.push(item);
      });
      return results;
    },
    
    /** 
      Function: reject
      
      Parameters:
      
      enumerable - a collection to iterate over
      block - a function that will receive each item in the collection and its index
    
      Returns: 
      
      All the items in the collection for which the function returns null or 
      false. If no items are found, it returns an empty array.
      
      Example:
     
      var odd = YAHOO.util.Functional.reject([1, 2, 3, 4], function (item) {
        return item % 2 == 0;
      });
     
      => [1, 3]
     
     */
    reject: function (enumerable, block) {
      return this.select(enumerable, function (item, index) {
        return !(block(item, index));
      });            
    },
    
    /** 
      Function: grep
      
      Parameters:
      
      enumerable - a collection to iterate over
      pattern - The regular expression to test against each item
    
      Returns: 
      
      All the items in the collection that produce a match against the
      supplied regular expression. If no items match, an empty array is returned.
      
      Example:
     
      var matches = YAHOO.util.Functional.grep(['Chris', 'Dan', 'Diego'], /^D.+$/);

      => ['Dan', 'Diego']

     */
    grep: function (enumerable, pattern) {
      return this.select(enumerable, function (item, index) {
        return pattern.test(item);
      });
    },
    
    /** 
      Function: partition
      
      Parameters:
      
      enumerable - a collection to iterate over
      block - a function that will receive each item in the collection and its index
    
      Returns:
      An object with two members, 'matches' and 'rejects', that are arrays 
      continaing the items that were selected or rejected by the test function 
      (or an empty array). 
      
      Example:
     
      var nums = YAHOO.util.Functional.partition([1, 2, 3, 4], function (item) {
        return item % 2 == 0;
      });
      
      nums.matches => [2, 4]
      nums.rejects => [1, 3]
     
     */
    partition: function (enumerable, block) {
      var results = {matches: [], rejects: []};
      this.each(enumerable, function (item, index) {
        var set = block(item, index) ? results.matches : results.rejects;
        set.push(item);
      });
      return results;
    },
    
    /** 
      Function: zip
      
      Parameters:
      
      enumerable - a collection to iterate over
      companion - another collection whose members will be paired with members of the first parameter
    
      Returns:
      
      An array of arrays formed by pairing each element of the first collection 
      with an item in the second collection having the corresponding index.

      Example:
     
      var pairs = YAHOO.util.Functional.zip([1, 2, 3], ['a', 'b', 'c']);
      
      => [[1, 'a'], [2, 'b'], [3, 'c']]     
     
     */
    zip: function (enumerable, companion) {
      var results = [];
      this.each(enumerable, function (item, index) {
        results.push([item, companion[index]]);
      });
      return results;
    },
    
    /**
      Function: contains
      
      Parameters: 
      
      enumerable - The collection to check for the item
      value - The item to find in the collection
      
      Returns:
      
      A boolean indicating whether or not the item is contained in the collection
      
      Example: 
      
      var bool = YAHOO.util.Functional.contains([1, 2, 3], 2);
      
      => true
      
    */
    contains: function (enumerable, value) {
      return this.detect(enumerable, function (item) {return item == value}) ? true : false;
    }
  };
}();

//  see <collect>
YAHOO.util.Functional.map = YAHOO.util.Functional.collect;

// see <inject>
YAHOO.util.Functional.reduce = YAHOO.util.Functional.inject;

// see <detect>
YAHOO.util.Functional.find = YAHOO.util.Functional.detect;

// see <select>
YAHOO.util.Functional.find_all = YAHOO.util.Functional.select;