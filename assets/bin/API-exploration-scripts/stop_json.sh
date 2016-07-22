set -e


KEY="a2aef3dc-3a02-4823-96e1-3347b535fe1a"

STOP_MONITORING_DETAIL_LEVEL="&StopMonitoringDetailLevel=normal"

MONITORING_REF="&MonitoringRef=400518"

MAX_STOP_VISITS="&MaximumStopVisits=6"

#MIN_STOP_VISITS_PER_LINE="&MinimumStopVisitsPerLine=10"

FILE_NAME="bus_stop_$(date +'%F_%T').json"

wget -q -O- "http://bustime.mta.info/api/siri/stop-monitoring.json?key=${KEY}${MONITORING_REF}${STOP_MONITORING_DETAIL_LEVEL}${MAX_STOP_VISITS}${MIN_STOP_VISITS_PER_LINE}" | jq '.' > ${FILE_NAME}
