'use strict';


var React = require('react');


var AVAILHome = React.createClass ({

    render : function () {
        return (
            <div className='page'>
                <img className='img-responsive center-block' 
                     src='../../images/logo.png' 
                     alt='AVAIL Logo'/>
            </div>
        );
    }
});


module.exports = AVAILHome;
