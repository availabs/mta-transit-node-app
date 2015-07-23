'use strict';


var React        = require('react'),
    DropdownMenu = require('./DropdownMenu');


/*=====================================================
*
* Props: 
*       select     : Function to select item
*       selection  : The set of selectable items.
*       selected   : Array of selected items. 
*       title      : The title of the selector.
*       dropUp     : [optional]
*       alignRight : [optional]
*
*=====================================================*/
var SingleButtonDropdown = React.createClass ( {

    'render': function () {
        
        var props    = this.props;
        
        return ( 
            <div className = {'btn-group ' + (props.dropUp ? ' dropup ' : '')} >

                <button type          = 'button'
                        className     = { 'btn btn-default dropdown-toggle' }
                        data-toggle   = 'dropdown'
                        aria-expanded = 'false' >

                            { props.title } 

                            <span className='caret'></span>
                </button>

                <DropdownMenu 
                    select     = { props.select     }
                    selection  = { props.selection  }
                    selected   = { props.selected   }
                    alignRight = { props.alignRight }
                />
            </div>
        );
    }
});


module.exports = SingleButtonDropdown;
