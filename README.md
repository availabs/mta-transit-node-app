# mta-transit-node-app


This Node/Sails app was used for data exploration of the MTA Bus Siri feed and the MTA Subway GTFS-Realtime feed.

It also was used to ensure the fidelity of the MTA GTFS-Realtime to Siri conversion server.

There are scripts in `/assets/bin/` that will pull messages from the APIs. You will need to add your API keys to the `/assets/keys/` files and remove the `.template` extension from the file name.

The scripts in `/assets/bin/API-structure-mapping-scripts/` will continually pull from the APIs and map out the structure of the responses. Visualizations of these response structures are available in the app. You can alter the URLs in those files to point the scripts at a given server. (Note, sample mappings are included in the repo. No `SituationExchangeDelivery` occurred for the Subway system during the observation time.)

##Deployment
+ `npm install -g sails //May require sudo`
+ `npm install --production`
+ `bower install`
+ `sails lift --prod`
