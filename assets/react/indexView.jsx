'use strict';


var React        = require('react'),
    apiUtils     = require('../utils/apiUtils'),
    d3Tree       = require('../d3/RT-Tree'),
    Header       = require('./components/layout/Header.react'),
    saveSvgAsPng = require('save-svg-as-png').saveSvgAsPng;


var dataDict = {
        'nyct_gtfsr_metadata'           : { title: 'NYCT Subway GTFS-R Metadata'   , path: '/subway/metadata'     } ,
        'mta_bus_stop_siri_metadata'    : { title: 'MTA Bus Stop SIRI Metadata'    , path: 'bus/stop/metadata/'   } ,
        'mta_bus_vehicle_siri_metadata' : { title: 'MTA Bus Vehicle SIRI Metadata' , path: 'bus/vehicle/metadata' } ,
    },

    entities = Object.keys(dataDict);


var ThisPage = React.createClass ({

    _renderTree : function () {

        var theSVG    = React.findDOMNode(this.refs.theSVG),
            treeProps = {
                width  : this.state.width,
                height : this.state.height,
            };

        function renderer (data) {
            var vizSVG;
            
            treeProps.data = apiUtils.prepDataForViz(data);
            vizSVG         = d3Tree.renderTree(treeProps);

            while (theSVG.firstChild) {
                theSVG.removeChild(theSVG.firstChild);
            }
            theSVG.appendChild(vizSVG[0][0]);
        } 

        apiUtils.getData(dataDict[this.state.entity].path, renderer);
    },


    '_savePng': function () {
        var theSVG       = React.findDOMNode(this.refs.theSVG),
            theClone     = theSVG.cloneNode(true),
            fileName     = dataDict[this.state.entity].title.replace(/\s+/g, '_'),
            rightPadding = 5;

        saveSvgAsPng(theClone, fileName);
    },


    _selectEntity : function (entity) {
        this.setState({ entity: entity });
    },


    getInitialState: function () {
        return {
            entity    : 'nyct_gtfsr_metadata',
            width     : 1200,
            height    : 2000,
            selection : entities,
        }
    },


    componentDidMount: function () {
        this._renderTree();
    },

    
    componentDidUpdate: function () {
        this._renderTree();
    },


    render : function () {

        return (
            <div>
                <Header 
                        title     = { dataDict[this.state.entity].title }
                        selection = { this.state.selection              }
                        selected  = { this.state.entity                 }
                        select    = { this._selectEntity                } 
                        savePng   = { this._savePng                     } />
                        
                <div className='container'>

                    <div ref='vizArea' 
                         className='col-md-12'
                         width={ this.state.width }
                         height={ this.state.height } >

                        <svg width     = { this.state.width }
                             height    = { this.state.height }
                             ref       = 'theSVG'
                             className = 'chart' >
                        </svg>
                    </div>
                
                    <div ref='sideBar' className='col-md-2 noWrap'>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ThisPage;

React.render(<ThisPage/>, document.getElementById('appContainer'));

