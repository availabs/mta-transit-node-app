'use strict';



var React        = require('react'),
    Router       = require('react-router'),
    Route        = Router.Route,
    DefaultRoute = Router.DefaultRoute,

    App          = require('./pages/layout.react'),

    AVAILHome          = require('./pages/AVAILHome.react'),
    SubwayMetadata     = require('./pages/NYCT_Subway_GTFS-R_Metadata.react'),
    BusStopMetadata    = require('./pages/MTA_Bus_Stop_SIRI_Metadata.react'),
    BusVehicleMetadata = require('./pages/MTA_Bus_Vehicle_SIRI_Metadata.react');



//TODO: Try this...  http://stackoverflow.com/a/29319612
var vizualizationRoutes = {
    'NYCT Subway GTFS-R Metadata'   : 'nyct_gtfsr_metadata',
    'MTA Bus Stop SIRI Metadata'    : 'mta_bus_stop_siri_metadata',
    'MTA Bus Vehicle SIRI Metadata' : 'mta_bus_vehicle_siri_metadata',
};

var AppWrapper = React.createClass({
    'render': function () {
        return (
            <App routes={ vizualizationRoutes } />
        );
    },
});



var routes = (
    <Route name='app' path='/' handler={ AppWrapper }>

        <Route  name='AVAILHome' 
                path='home'  
                handler={ AVAILHome } />

        <Route  name='NYCT Subway GTFS-R Metadata' 
                path='nyct_gtfsr_metadata'  
                handler={ SubwayMetadata } />

        <Route  name='MTA Bus Stop SIRI Metadata' 
                path='mta_bus_stop_siri_metadata'  
                handler={ BusStopMetadata } />

        <Route  name='MTA Bus Vehicle SIRI Metadata' 
                path='mta_bus_vehicle_siri_metadata'  
                handler={ BusVehicleMetadata } />

        <DefaultRoute handler={ AVAILHome }/>
    </Route>
);



Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});

