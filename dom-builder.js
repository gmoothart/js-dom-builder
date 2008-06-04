
/**
  @param {HTMLElement} parent
  @param {Array} tagNames
*/
function domBuilder(parent, tagNames) {
	//typecheck: parent must be assigned and a valid dom node!

  	var that = {
		rootElement: parent,
		currentChild: parent,
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
		
			this.currentChild.appendChild(el);
			this.currentChild = el;
			return this;
		},
		
		/*
		 * text
		 * @param {String} s
		 */
		text: function(s) {
		    this.currentChild.innerHTML = s;
			return this;
		},
		
		/*
		 * end
		 */
		end: function() {
			if (this.currentChild != this.rootElement) {
 				this.currentChild = this.currentChild.parentElement;
			}
		},
		
		/*
		 * endId
		 * ends the tag of the first parent with the specified id
		 */
		endId: function(id){		
			while(this.currentChild.id != id && this.currentChild != this.rootElement) {
				this.currentChild = this.currentChild.parentElement;
			}
		},
		
		/*
		 * endTag
		 * ends the tag of the first parent with the specified id
		 */
		endTag: function(tag) {
			while(currentChild.id != id && currentChild != rootElement) {
				currentChild = currentChild.parentElement;
			}		
		}
  	}; //that

	autotags = ['div', 'span', 'table', 'tr', 'td', 'a', 'img', 'p', 'pre', 'code', 
			    'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
	autotags = autotags.concat(tagNames);
  
	for (i in autotags) {
		// add the tags as functions on 'that'. But don't overwrite any existing properties!
		//	these are just helpers that wrap calls to 'add'
		tag = autotags[i];
		if (!that[tag]) {
			//closure bug!!!!!
			that[tag] = function(attributes){
				that.add(tag, attributes);
		  	}
		}
	}
	
	return that;
}

/*
    domCreate
    
    usage:
    
    var node = domCreate({
      tag: div
      id: ska
      style: "width: 15px;"
      children: [
        { tag: a, href: arst },
        { tag: div
          id: arst
          children: []
        }
      ]
    });
    
    
    var node = domCreate({     
      div: {
        id: ska
        style: "width: 15px;"
        children:
        [
          { div: {
             id: arst,
             class: ska,
             text: "ska never dies!"
             children: [
              { a: { href: } }
            ]
          } }
        ]
      }
    });


<table>
  <tr>
    <td>sass</td>
    <td>
      <div id="guid> ska ever dies</div>
    </td>
  </tr>
</table>

    var table = domCreate({
      table: {
	chiltren: [
	  tr: {
	    children: [
	      td: { text: sass! }
	      td: {
		children: [
		  div: {
		    id: "guid"
		    text = " ska never dies"

		  }
		]
	      }
	    ]

	  }
	]
      }
    });

var table = domCreate({
  table: [
    tr: [
      { td: "sass" }
      { td: {
	div: {
          id: "guid"
	  text: " ska never dies"
	}
      } }
    ]
  ]
});

var table = new DomNode()

table.id = "eh"
table.
  td().
    id("id3").
    tr().


<table>
  <tr>
    <td>sass</td>
    <td>
      <div id="guid> ska ever dies</div>
    </td>
  </tr>
</table>


var table = new DomTree('table', { id: ska });
table
  .add('tr', {})
    .add('td').text('sass')
    .add('td')
      .add('div' {id: 'guid'}).text('ska never dies')

var node = DomTree(parent);
node
  .table({ id: ska })
    .tr()
      .td().text('sass')
      .td()
        .div({id: 'guid'}).text('ska never dies')
          .div()
	    .text('')
	  .end()
        .endId('guid')
        .div()
    .endTag('tr')
    .tr()
      .td().text('arst')
      .td()
        .div({id: 'ska'}).text('arst')


//recursive, functional style:
var node = DomTree(parent);
node.add(
  node.table({id: ska},
    node.tr(
      node.td( node.text('sass') ),
      node.td(
	node.div({id: 'guid'}, 
	  node.text('ska never dies'),
	  node.div( node.text('') )
        )
      ) 
    ), 
    node.tr(
      node.td(
	node.text('arst')
      ),
      node.td(
        node.div({id: 'ska'}, node.text('arst'))
      )
    )
  )
);    
*/



/*
function domTree2(parent)
{
  that = {
    rootNode: parent;
    add: function(tag) {
	
      return []
    }

    text: function(s) {
	return s;
    }

  }

  return that
}
*/
