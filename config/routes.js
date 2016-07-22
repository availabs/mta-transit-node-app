module.exports.routes = {

  'GET /'                             : 'HomeController.index',

  'GET /bus/stop/metadata'            : 'MetadataController.busStop',
  'GET /bus/vehicle/metadata'         : 'MetadataController.busVehicle',
  'GET /subway/gtfsrt/metadata'       : 'MetadataController.subwayGTFSrt',
  'GET /subway/siri/stop/metadata'    : 'MetadataController.subwaySiriStop',
  'GET /subway/siri/vehicle/metadata' : 'MetadataController.subwaySiriVehicle',

  'POST /update/bus/stop/metadata'            : 'MetadataController.updateBusStop',
  'POST /update/bus/vehicle/metadata'         : 'MetadataController.updateBusVehicle',
  'POST /update/subway/gtfsrt/metadata'       : 'MetadataController.updateSubwayGTFSrt',
  'POST /update/subway/siri/stop/metadata'    : 'MetadataController.updateSubwaySiriStop',
  'POST /update/subway/siri/vehicle/metadata' : 'MetadataController.updateSubwaySiriVehicle',
};
