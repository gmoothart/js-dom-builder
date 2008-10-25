
/**
  @param {HTMLElement} parent
  @param {Array} tagNames
*/
function domBuilder(parent, tagNames) {
    var $get = YAHOO.util.Dom.get;
    var parent_el = $get(parent);
    
    
    //private state variables
    var context_stack;

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
            if (YAHOO.lang.isFunction(attributes) {
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
            if (YAHOO.lang.isFunction(s) {
              s = s();               
            }
            
            if (!YAHOO.lang.isString(s)) raise 'argument to text() must be a string or a function that returns a string!'
                
            this.currentNode.innerHTML = s;
            return this;
        },
        
        /*
         * end
         */
        end: function(prop) {
            if (YAHOO.lang.isFunction(prop)) {
                prop = prop();       
            }
              
            /*
             * close parent by id
             */
            if (prop && prop.id) {
                //find the node we need to close
                while(this.currentNode.id !== prop.id && this.currentNode.parentNode !== this.rootNode) {
                    this.currentNode = this.currentNode.parentNode;
                }
                
                //set the current node to its parent to 'close' it
                this.currentNode = this.currentNode.parentNode;
                
            }
            /*
             * Close parent by tag name
             */
            else if (prop && prop.tag) {
                while(this.currentNode.tagName.toLowerCase() !== prop.tag.toLowerCase() && this.currentNode.parentNode !== this.rootNode) {
                    this.currentNode = this.currentNode.parentNode;
                }
                this.currentNode = this.currentNode.parentNode;
            }
            /*
             * Close first parent
             */
            else {
                if (this.currentNode !== this.rootNode) {
                    this.currentNode = this.currentNode.parentNode;
                }
            }
        
            return this;
        },
        
        on: function(evt, fn) {
            YAHOO.util.Event.addListener(this.currentNode, evt, fn);
            return this;
        }
        
        each: function(collection) {
                 
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