'use strict';


var React = require('react');


/*=====================================================
*
* Props: 
*       toggle : Function to toggle item selectedness.
*       item   : The item
*       label  : The label for the item.
*
*=====================================================*/
var MenuItem = React.createClass ({

    render: function () {

        var _this = this;

        function selectItem () { _this.props.select(_this.props.itemName); }

        return (
            <li className = { this.props.isSelected ? 'disabled' : '' }
                onClick   = { selectItem                              }
                key       = { this.props.key                          } 
                role      =   "presentation"                          >

                    <a role="menuitem" 
                       tabIndex="-1" 
                       href={ undefined }> 
                            { this.props.itemName }
                    </a>
            </li>
        );
    }
});


module.exports = MenuItem;

