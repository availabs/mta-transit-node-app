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

    toggleItem: function () { this.props.toggle(this.props.item); },

    render: function () {

        return (
            <li className = { this.props.isSelected ? 'disabled' : '' }
                onClick   = { this.toggleItem }
                role      = "presentation"
                key       = { this.props.key } >

                    <a role="menuitem" 
                       tabindex="-1" 
                       href={ undefined }> 
                        
                            { this.props.label }

                    </a>
            </li>
        );
    }
});


module.exports = MenuItem;

