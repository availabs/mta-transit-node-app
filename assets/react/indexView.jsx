'use strict';

var React             = require('react'),
    saveSvgAsPng      = require('save-svg-as-png').saveSvgAsPng,
    jsoneditor        = require('jsoneditor'),
    _                 = require('lodash'),

    theStore          = require('../flux/stores/Store'),
    ActionsCreator    = require('../flux/actions/ActionsCreator'),
    d3Tree            = require('../d3/RT-Tree'),
    Header            = require('./components/layout/Header.react'),
    messageTypeToName = require('../utils/apiUtils').messageTypeToName;



var ThisPage = React.createClass ({

    _handleStateChange : function () {
        this.setState(theStore.getState());
    },


    _renderTree : function () {
        var vizArea = React.findDOMNode(this.refs.vizArea),
            vizSVG  = d3Tree.renderTree(this.state)[0][0];

        vizSVG.id = 'theTree';

        //FIXME: Use selection.enter/exit
        while (vizArea.firstChild) {
            vizArea.removeChild(vizArea.firstChild);
        }


        vizArea.appendChild(vizSVG);
    },


    '_showLogo' : function () {
        var img = document.createElement('img');

        img.src             = '../images/logo.png';
        img.alt             = 'AVAIL Logo';
        img.className       = 'img-responsive center-block';
        img.style.marginTop = '100px';

        React.findDOMNode(this.refs.vizArea).appendChild(img);
    },


    '_savePng': function () {
        var vizSVG   = document.getElementById('theTree'),
            theClone = vizSVG.cloneNode(true),
            fileName = messageTypeToName[this.state.selectedMessageType].replace(/\s+/g, '_');

        saveSvgAsPng(theClone, fileName);
    },


    getInitialState: function () {
        return {
            width  : window.innerWidth * 1.5,
            height : window.innerHeight * 1.5,
            editorContainer : document.createElement('div'),
        };
    },


    componentDidMount: function () {
        var ed = this.state.editorContainer;

        document.body.appendChild(ed);
        ed.style.position        = 'fixed';
        ed.style.backgroundColor = 'white';
        ed.style.height          = '400px';
        ed.style.width           = '247px';
        ed.style.top             = '-1000px';
        ed.style.left            = '-1000px';

        theStore.registerStateChangedListener(this._handleStateChange);

        this._showLogo();
    },

    
    componentDidUpdate: function () {
        var metadata = (this.state.selectedNode && this.state.selectedNode.metadata) || (this.state.mouseoveredNode && this.state.mouseoveredNode.metadata),
            ed       = this.state.editorContainer;


        //FIXME: Not very elegant, though state will be preserved in store, not editor.
        while (ed.firstChild) {
            ed.removeChild(this.state.editorContainer.firstChild);
        }

        this._renderTree();

        if (metadata) {
            ed.style.top  = '100px';
            ed.style.left = '10px';
            new jsoneditor(ed).set(metadata);
        } else {
            ed.style.top  = '-1000px';
            ed.style.left = '-1000px';
        }
    },


    render : function () {

        return (
            <div className='dontcollapse' >
                <Header 
                        selected  = { messageTypeToName[this.state.selectedMessageType] }
                        selection = { _.values(messageTypeToName)                       }
                        select    = { ActionsCreator.selectMessageTypeByName            }
                        savePng   = { this._savePng                                     } 
                        showLogo  = { !!this.state.selectedMessageType                  }/>
                        
                <div className='container dontcollapse' >

                    <div ref='vizArea' 
                         display = 'block'
                         width   = { this.state.width }
                         height  = { this.state.height } >
                    </div>

                </div>
            </div>
        );
    }
});

module.exports = ThisPage;

React.render(<ThisPage/>, document.getElementById('appContainer'));

