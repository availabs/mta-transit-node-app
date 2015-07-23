'use strict';

var React             = require('react'),
    saveSvgAsPng      = require('save-svg-as-png').saveSvgAsPng,
    jsoneditor        = require('jsoneditor'),
    _                 = require('lodash'),

    theStore          = require('../flux/stores/Store'),
    ActionsCreator    = require('../flux/actions/ActionsCreator'),
    d3Tree            = require('../d3/RT-Tree'),
    Header            = require('./components/layout/Header'),
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


    '_getNewMetadata' : function () { 
        ActionsCreator.changeMessageMetadata(this._editor.get()); 
    },


    'getInitialState': function () {
        var ed     = document.createElement('div'),
            config = {
                change   : this._getNewMetadata,
                search   : false,
                editable : function(node) { return {field:false, value:(node.field !== 'path')}; },
            };

        this._editor = new jsoneditor(ed, config );

        return {
            width           : window.innerWidth * 1.5,
            height          : window.innerHeight * 1.5,
            editorContainer : ed,
        };
    },


    componentDidMount: function () {
        var ed = this.state.editorContainer;

        document.body.appendChild(ed);

        ed.style.overflow        = 'hidden';
        ed.style.position        = 'fixed';
        ed.style.backgroundColor = 'white';
        ed.style.height          = '300px';
        ed.style.width           = '485px';
        ed.style.top             = '-1000px';
        ed.style.left            = '-1000px';

        theStore.registerStateChangedListener(this._handleStateChange);

        this._showLogo();
    },

    
    componentDidUpdate: function (prevProps, prevState) {
        var state    = this.state,
            metadata = (state.selectedNode && state.selectedNode.metadata) || 
                        (state.mouseoveredNode && state.mouseoveredNode.metadata),
            ed       = state.editorContainer;

        this._renderTree();

        if (metadata) {
            ed.style.top  = '100px';
            ed.style.left = '10px';
            if (!state.selectedNode || (state.selectedNode !== prevState.selectedNode)) {
                this._editor.set(metadata);
            }
        } else {
            ed.style.top  = '-1000px';
            ed.style.left = '-1000px';
        }
    },


    render : function () {
        var state = this.state;

        return (
            <div className='dontcollapse' >
                <Header 
                        selected      = { messageTypeToName[this.state.selectedMessageType] }
                        selection     = { _.values(messageTypeToName)                       }
                        select        = { ActionsCreator.selectMessageTypeByName            }
                        savePng       = { this._savePng                                     }
                        showLogo      = { !!state.selectedMessageType                       }
                        hasDirtyNodes = { !!(state.dirtyNodes && state.dirtyNodes.length)   }/>
                        
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

