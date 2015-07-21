'use strict';


var React        = require('react'),
    DropdownMenu = require('./DropdownMenu.react');


/*=====================================================
*
* Props: 
*       select     : Function to select item
*       deselect   : Function to deselect item
*       selection  : The set of selectable items. ({item                   : label})
*       selected   : Array of selected items. (The keys from 'selection'.)
*       title      : The title of the selector.
*       dropUp     : [optional]
*       alignRight : [optional]
*
*=====================================================*/
var SingleButtonDropdown = React.createClass ( {

    'render': function () {
        
        var props    = this.props,
            selected = props.selected ? 
                            ((props.selected.constructor === Array) ? 
                                props.selected : 
                                [props.selected]) : 
                            [];
        
        return ( 
            <div className = {'btn-group ' + (props.dropUp ? ' dropup ' : '')} >

                <button type          = 'button'
                        className     = { 'btn btn-default dropdown-toggle' + 
                                          (props.select ? '' : ' disabled') }
                        data-toggle   = 'dropdown'
                        aria-expanded = 'false' >

                            { props.title } 
                            <span className='caret'></span>
                </button>

                <DropdownMenu 
                    select     = { props.select }
                    deselect   = { props.deselect }
                    selection  = { props.selection }
                    selected   = { selected }
                    alignRight = { props.alignRight }
                />
            </div>
        );
    }
});


module.exports = SingleButtonDropdown;
