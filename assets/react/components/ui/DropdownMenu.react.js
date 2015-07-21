'use strict';


var React    = require('react'),
    MenuItem = require('./MenuItem.react');


/*=====================================================
*
* Props: 
*       select    : Function to select item
*       deselect  : Function to deselect item
*       selection : The set of selectable items. ({item: label})
*       selected  : Array of selected items. (The keys from 'selection'.)
*
*=====================================================*/
var DropdownMenu = React.createClass ({

    _generateMenuItems: function () {
        var props = this.props;

        return Object.keys(props.selection).map(function (item, i) {

            var isSelected = props.selected.indexOf(item) !== -1;

            return (<MenuItem
                        key        = { i }
                        toggle     = { isSelected ? props.deselect : props.select }
                        item       = { item }
                        label      = { props.selection[item] }
                        isSelected = { isSelected }
                    />);
        });
    },

    render: function () {

        return (<ul className = { 'dropdown-menu ' +
                                  'dropdown-menu-' + (this.props.alignRight ? 'right ' : 'left ') +
                                  'scrollable-menu ' }

                    role      = 'menu' > 

                        { this._generateMenuItems() } 
                </ul> );
    },
});


module.exports = DropdownMenu;
