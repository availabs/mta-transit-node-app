'use strict';

                                //<Link to={routes[routeName]}

var React = require('react'),
    Link  = require('react-router').Link;
    


var VizMenu = React.createClass({

    'render': function () {

        var routes = this.props.routes,

            links  = Object.keys(routes).map(function (routeName, i) {
                        return (
                            <li>
                                <Link to={routeName}
                                      key={i} >
                                    <span className='name'>{routeName}</span>
                                </Link>
                            </li>
                        );
                    });


        return (

            <div className='btn-group'>
                <button type='button' 
                        className='btn btn-default dropdown-toggle' 
                        data-toggle='dropdown' 
                        aria-expanded='false' >
                            Visualizations 
                            <span className='caret'></span>
                </button>

                <ul className='dropdown-menu dropdown-menu-right' role='menu'>
                    {links}
                </ul>
            </div>
        );
    }
});

module.exports = VizMenu;
