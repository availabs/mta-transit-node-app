module.exports.routes = {

    'GET /'                             : 'HomeController.index'                ,

    'GET /subway/metadata'              : 'MetadataController.subway'           ,
    'GET /bus/stop/metadata'            : 'MetadataController.busStop'          ,
    'GET /bus/vehicle/metadata'         : 'MetadataController.busVehicle'       ,

    'POST /update/subway/metadata'      : 'MetadataController.updateSubway'     ,
    'POST /update/bus/stop/metadata'    : 'MetadataController.updateBusStop'    ,
    'POST /update/bus/vehicle/metadata' : 'MetadataController.updateBusVehicle' ,

  };
