
/**
  @param {HTMLElement} parent
  @param {Array} tagNames
*/
function domBuilder(parent, tagNames) {
    //typecheck: parent must be assigned and a valid dom node!

    var that = {
        rootNode: parent,
        currentNode: parent,
        document: parent.document,
        
        /*
         * add
         * @param {String} tag
         * @param {Object} attributes
         */
        add: function(tag, attributes) {		
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
         * @param {String} s
         */
        text: function(s) {
            this.currentNode.innerHTML = s;
            return this;
        },
        
        /*
         * end
         */
        end: function(prop) {
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