'use strict';



var React   = require('react'),

    Logo    = require('./Logo.react'),
    VizMenu = require('./VizMenu.react');



var Header = React.createClass({

    render: function() {

        return (
            <div className='page-header noWrap'>
                <div className='row'>
                    <div className='col-sm-1'>
                        <Logo />
                    </div>
                    <div className='col-sm-10'>
                        <h1 className='text-center availGrey'>
                            MTA Subway and Bus Realtime Feeds Metadata
                        </h1>
                    </div>
                    <div className='col-sm-1'>
                        <VizMenu routes={ this.props.routes } />
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Header;
