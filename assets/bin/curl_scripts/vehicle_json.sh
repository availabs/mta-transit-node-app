set -e

#+-----------------------------+-----------------------------------------------------------------------+
#| key                         |  your MTA Bus Time developer API key (required).  Go here to get one. |
#+-----------------------------+-----------------------------------------------------------------------+
#| OperatorRef                 |  the GTFS agency ID to be monitored (optional).  Currently,           |
#|                             |  all stops have operator/agency ID of MTA. If left out,               |
#|                             |  the system will make a best guess. Usage of the OperatorRef          |
#|                             |  is suggested, as calls will return faster when populated.            |
#+-----------------------------+-----------------------------------------------------------------------+
#| VehicleRef                  |  The ID of the vehicle to be monitored (optional).                    |
#|                             |  This is the 4-digit number painted on the side of the bus,           |
#|                             |  for example 7560. Response will include all buses if not included.   |
#+-----------------------------+-----------------------------------------------------------------------+
#| LineRef                     |  A filter by 'fully qualified' route name,                            |
#|                             |  GTFS agency ID + route ID (e.g. MTA NYCT_B63).                       |
#+-----------------------------+-----------------------------------------------------------------------+
#| DirectionRef                |  A filter by GTFS direction ID (optional).  Either 0 or 1.            | //TODO
#+-----------------------------+-----------------------------------------------------------------------+
#| VehicleMonitoringDetailLevel|  Determines whether or not the response will include the stops        |
#|                             |  ("calls" in SIRI-speak) each vehicle is going to make (optional).    |
#|                             |  To get calls data, use value calls, otherwise use value normal       |
#|                             |  (default is normal).                                                 |
#+-----------------------------+-----------------------------------------------------------------------+
#| MaximumNumberOfCallsOnwards |  Limits the number of OnwardCall elements returned in the query.      |
#| ----------------------------+-----------------------------------------------------------------------|
#| MaximumStopVisits           |  an upper bound on the number of buses to return in the results.      |
#+-----------------------------+-----------------------------------------------------------------------+
#| MinimumStopVisitsPerLine    |  A lower bound on the number of buses to return in the results        |
#|                             |  per line/route (assuming that many are available)                    |
#+ ----------------------------+-----------------------------------------------------------------------+

KEY="a2aef3dc-3a02-4823-96e1-3347b535fe1a"

#VEHICLE_REF="&MTA NYCT_4405"

VEHICLE_MONITORING_DETAIL_LEVEL="&VehicleMonitoringDetailLevel=normal"

MAX_STOP_VISITS="&MaximumStopVisits=1"

#MIN_STOP_VISITS_PER_LINE="&MinimumStopVisitsPerLine=2"

FILE_NAME="bus_vehicle_$(date +'%F_%T').json"

#wget -q -O- "http://bustime.mta.info/api/siri/vehicle-monitoring.json?key=${KEY}${VEHICLE_REF}${VEHICLE_MONITORING_DETAIL_LEVEL}${MAX_STOP_VISITS}${MIN_STOP_VISITS_PER_LINE}" | jq '.' > ${FILE_NAME}
echo "http://bustime.mta.info/api/siri/vehicle-monitoring.json?key=${KEY}${VEHICLE_REF}${VEHICLE_MONITORING_DETAIL_LEVEL}${MAX_STOP_VISITS}${MIN_STOP_VISITS_PER_LINE}"
