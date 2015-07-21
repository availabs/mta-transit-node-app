'use strict';


var React = require('react');


var thisPage = React.createClass ({


    '_init': function() {
    },
    

    'getInitialState': function () {
        return null;
    },


    'componentDidMount': function () {
    },

    
    'componentDidUpdate': function () {
    },


    'componentWillUnmount': function () {
    },

    render : function () {

        return (
                <div className='container' >
                    <div className='row top-buffer'>
                        <div ref='vizArea' className='col-md-11'>
                            <h1>Hello</h1>
                        </div>
                        
                        <div ref='sideBar' className='col-md-1 noWrap'>
                            <h1>World</h1>
                        </div>
                    </div>
                </div>
        );
    }
});

module.exports = thisPage;

