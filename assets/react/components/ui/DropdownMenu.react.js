'use strict';


var React    = require('react'),
    MenuItem = require('./MenuItem');


/*=====================================================
*
* Props: 
*       select    : Function to select item
*       selection : The set of selectable items. ({item: label})
*       selected  : The selected item.
*
*=====================================================*/
var DropdownMenu = React.createClass ({

    _generateMenuItems: function () {
        var props = this.props;

        return props.selection.map(function (itemName, i) {

            var isSelected = props.selected === itemName;

            return (<MenuItem
                        key        = { i            }
                        select     = { props.select }
                        itemName   = { itemName     }
                        isSelected = { isSelected   }
                    />);
        });
    },

    render: function () {

        return (<ul role = 'menu'
                    className = { 'dropdown-menu ' +
                                  'dropdown-menu-right ' +
                                  'scrollable-menu ' } > 

                        { this._generateMenuItems() } 

                </ul> );
    },
});


module.exports = DropdownMenu;
