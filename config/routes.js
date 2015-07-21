module.exports.routes = {

    'get /'                 : 'HomeController.index',
    '/subway/metadata'      : 'MetadataController.subway',
    '/bus/stop/metadata'    : 'MetadataController.busStop',
    '/bus/vehicle/metadata' : 'MetadataController.busVehicle',

  };
