
/**
  @param {HTMLElement} parent
  @param {Array} tagNames
*/
function domBuilder(parent, tagNames) {
    var $get = YAHOO.util.Dom.get;
    var parent_el = $get(parent);
    
    
    //private state variables
    var context_stack = [];

    var that = {
        rootNode: parent_el,
        currentNode: parent_el,
        document: parent_el.document,
        
        /*
         * add
         * @param {String} tag
         * @param {Object|Function} attributes
         */
        add: function(tag, attributes) {		
            if (YAHOO.lang.isFunction(attributes)) {
              attributes = attributes();               
            }
            
            var el = document.createElement(tag);
            for (name in attributes) {
                el.setAttribute(name, attributes[name]);
            }
        
            this.currentNode.appendChild(el);
            this.currentNode = el;
            return this;
        },
        
        /*
         * text
         * @param {String|Function} s
         */
        text: function(s) {
            if (YAHOO.lang.isFunction(s)) {
              s = s();               
            }
            
            if (!YAHOO.lang.isString(s)) throw 'argument to text() must be a string or a function that returns a string!';
                
            this.currentNode.innerHTML = s;
            return this;
        },
        
        /*
         * end
         */
        end: function() {
            /*
             * Close first parent
             */
            if (this.currentNode !== this.rootNode) {
                    this.currentNode = this.currentNode.parentNode;
            }
            return this;
        },
        
        on: function(evt, fn) {
            YAHOO.util.Event.addListener(this.currentNode, evt, fn);
            return this;
        },
        
        each: function(collection) {
            context_stack.push({
                node: this.currentNode,
                collection: collection
            });
            
            return this;
        }
    }; //that

    autotags = ['div', 'span', 'table', 'tr', 'td', 'a', 'img', 'p', 'pre', 'code', 
                'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'input'];
    if (tagNames && tagNames.length > 0) {
        autotags = autotags.concat(tagNames);
    }
  
    for (i in autotags) {
        // add the tags as functions on 'that'. But don't overwrite any existing properties!
        // these are just helpers that wrap calls to 'add'
        tag = autotags[i];
        if (!that[tag]) {

            (function() {
                //need extra function and var to capture the current value of tag, b/c of closures.
                var t = tag;
                that[t] = function(attributes) {
                    return that.add(t, attributes);
                }
            })();
        }
    }
    
    return that;
}