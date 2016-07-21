set -e

KEY="a2aef3dc-3a02-4823-96e1-3347b535fe1a"

STOP_MONITORING_DETAIL_LEVEL="&StopMonitoringDetailLevel=normal"

MONITORING_REF="&MonitoringRef=401579"

FILE_NAME="bus_stop_$(date +'%T').xml"

wget -q -O- "http://bustime.mta.info/api/siri/stop-monitoring.xml?key=${KEY}${MONITORING_REF}${STOP_MONITORING_DETAIL_LEVEL}" | xmllint -format - > ${FILE_NAME}
