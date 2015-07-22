'use strict';



var React                = require('react'),
    Logo                 = require('./Logo.react'),
    SingleButtonDropdown = require('../ui/SingleButtonDropdown.react');



var Header = React.createClass({

    render: function() {

        return (
            <div className='page-header noWrap'>
                <div className='row'>

                    <div className='col-sm-1'>
                        <Logo />
                    </div>

                    <div className='col-sm-10'>
                        <h1 className='text-center title'>
                            { this.props.title }
                        </h1>
                    </div>


                    <div className='col-sm-1'>
                        <SingleButtonDropdown
                            title     = { 'Message Type' }
                            selection = { this.props.selection }
                            selected  = { this.props.selected  }
                            select    = { this.props.select    } />

                        <button className={'btn btn-default '}
                                onClick={this.props.savePng}>
                                    'Save Image'
                        </button>
                    </div>

                </div>
            </div>
        );
    }
});


module.exports = Header;
