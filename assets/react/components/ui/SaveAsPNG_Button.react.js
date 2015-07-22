/* global $ */
'use strict';


var React        = require('react'),
    saveSvgAsPng = require('save-svg-as-png').saveSvgAsPng;


/*===========================================
 * 
 * props:
 *          svgID -- id of the SVG to export
 *          enabled
 *          [pre_process]
 *          [padding]
 *          [defaultFileName]
 *          [text]
 */
var SaveSVGAsPNG_Button = React.createClass({


    '_savePng': function () {

        var theSVG   = document.getElementById(this.props.svgID),
            theClone = theSVG.cloneNode(true),
        
            padding  = this.props.padding,

            boundingRecs,

            cloneWidth,
            cloneHeight;


        if (this.props.pre_process) {
            this.props.pre_process(theClone);
        }

        boundingRecs = $(theSVG).children()
                                .map(function() { 
                                    return this.getBoundingClientRect(); })
                                .toArray();


        cloneWidth  = Math.max.apply(null, 
                                     boundingRecs.map(function (br) { return br.right; } ));
        cloneHeight = Math.max.apply(null, 
                                     boundingRecs.map(function (br) { return br.bottom; } ));


        if (this.props.padding) {
            cloneWidth  += ((padding.left || 0) + (padding.right  || 0));
            cloneHeight += ((padding.top  || 0) + (padding.bottom || 0)); 
        }

        theClone.setAttribute('width' , cloneWidth  );
        theClone.setAttribute('height', cloneHeight );

        saveSvgAsPng(theClone, (this.props.defaultFileName || 'exportedPNG' ));
    },



    'render' : function () {
        return  (
            <button className={'btn btn-default ' + (this.props.enabled ? '' : ' disabled')} 
                    onClick={this._savePng}>
                        { this.props.text || 'Export as PNG' }
            </button>
        );
    },
});

module.exports = SaveSVGAsPNG_Button;
