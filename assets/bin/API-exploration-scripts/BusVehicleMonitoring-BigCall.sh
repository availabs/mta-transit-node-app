#!/usr/bin/env bash

# Because the feed reader doesn't work for big requests...
# Prob need to use streams.

wget http://api.prod.obanyc.com/api/siri/vehicle-monitoring.json?key=a2aef3dc-3a02-4823-96e1-3347b535fe1a -O bus-vehicle-$(date +"%Y-%m-%d-%H%M%S").json
