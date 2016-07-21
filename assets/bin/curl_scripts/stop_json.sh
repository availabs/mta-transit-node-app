set -e


#/*
#+-----------------------------+-----------------------------------------------------------------------+
#| key                         |  your MTA Bus Time developer API key (required).  Go here to get one. |
#+-----------------------------+-----------------------------------------------------------------------+
#| OperatorRef                 |  the GTFS agency ID to be monitored (optional).  Currently,           |
#|                             |  all stops have operator/agency ID of MTA. If left out,               |
#|                             |  the system will make a best guess. Usage of the OperatorRef          |
#|                             |  is suggested, as calls will return faster when populated.            |
#+-----------------------------+-----------------------------------------------------------------------+
#| MonitoringRef               |  the GTFS stop ID of the stop to be monitored (required).             |
#|                             |  For example, 308214 for the stop at 5th Avenue                       |
#|                             |  and Union St towards Bay Ridge.                                      |
#+-----------------------------+-----------------------------------------------------------------------+
#| LineRef                     |  A filter by 'fully qualified' route name,                            |
#|                             |  GTFS agency ID + route ID (e.g. MTA NYCT_B63).                       |
#+-----------------------------+-----------------------------------------------------------------------+
#| DirectionRef                |  A filter by GTFS direction ID (optional).  Either 0 or 1.            |
#+-----------------------------+-----------------------------------------------------------------------+
#| StopMonitoringDetailLevel   |  Determines whether or not the response will include the stops        |
#|                             |  ("calls" in SIRI-speak) each vehicle is going to make *after*        |
#|                             |  it serves the selected stop (optional). To get calls data,           |
#|                             |  use value calls, otherwise use value normal (default is normal).     |    
#+-----------------------------+-----------------------------------------------------------------------+
#| MaximumNumberOfCallsOnwards |  Limits the number of OnwardCall elements returned in the query.      |
#| ----------------------------+-----------------------------------------------------------------------|
#| MaximumStopVisits           |  an upper bound on the number of buses to return in the results.      |
#+-----------------------------+-----------------------------------------------------------------------+
#| MinimumStopVisitsPerLine    |  A lower bound on the number of buses to return in the results        |
#|                             |  per line/route (assuming that many are available)                    |
#+ ----------------------------+-----------------------------------------------------------------------+
#*/

KEY="a2aef3dc-3a02-4823-96e1-3347b535fe1a"

STOP_MONITORING_DETAIL_LEVEL="&StopMonitoringDetailLevel=normal"

MONITORING_REF="&MonitoringRef=400518"

MAX_STOP_VISITS="&MaximumStopVisits=6"

#MIN_STOP_VISITS_PER_LINE="&MinimumStopVisitsPerLine=10"

FILE_NAME="bus_stop_$(date +'%F_%T').json"

wget -q -O- "http://bustime.mta.info/api/siri/stop-monitoring.json?key=${KEY}${MONITORING_REF}${STOP_MONITORING_DETAIL_LEVEL}${MAX_STOP_VISITS}${MIN_STOP_VISITS_PER_LINE}" | jq '.' > ${FILE_NAME}
