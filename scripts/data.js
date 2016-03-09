var Data = {
 "scopesForRole": {
   "Guest": [
     "67ee8286-6ce9-4ee6-beb5-f475658c0293"
   ],
   "Family": [
     "a78bf682-8665-4691-93bf-f484ff7ebe02",
     "67ee8286-6ce9-4ee6-beb5-f475658c0293"
   ],
   "Admin": [
     "a78bf682-8665-4691-93bf-f484ff7ebe02",
     "67ee8286-6ce9-4ee6-beb5-f475658c0293"
   ]
 },
 "accessScopes": {
   "67ee8286-6ce9-4ee6-beb5-f475658c0293": {
     "accessProfiles": [
       {
         "name": "Kitchen Lights",
         "pluginId": "org.ambientdynamix.contextplugins.hueplugin",
         "deviceProfiles": {
           "Nirandika": [
             "SWITCH"
           ],
           "Max Lifx": [
             "SWITCH",
             "DISPLAY_COLOR"
           ]
         }
       }
     ],
     "name": "Kitchen",
     "ID": "67ee8286-6ce9-4ee6-beb5-f475658c0293"
   },
   "a78bf682-8665-4691-93bf-f484ff7ebe02": {
     "accessProfiles": [
       {
         "name": "Changed profile",
         "pluginId": "org.ambientdynamix.contextplugins.hueplugin",
         "deviceProfiles": {
           "Max Lifx": [
             "SWITCH",
             "DISPLAY_COLOR"
           ]
         }
       },
       {
         "name": "Bedroom media",
         "pluginId": "org.ambientdynamix.contextplugins.ambientmedia",
         "deviceProfiles": {
           "": [
             "DISPLAY_VIDEO",
             "PLAYBACK_PLAY_PAUSE",
             "PLAYBACK_FORWARD_SEEK",
             "PLAYBACK_BACKWARD_SEEK"
           ]
         }
       }
     ],
     "name": "Bedroom",
     "ID": "a78bf682-8665-4691-93bf-f484ff7ebe02"
   }
 },
 "privileges": {
   "fancyKey": "Admin",
   "fancyKey3": "Family",
   "fancyKey2": "Guest"
 },
 "roles": [
   "Guest",
   "Family",
   "Admin"
 ]
};

AmbientControlData = {
  "server_url" : "http://192.168.1.118:8080/ControlProfileServer-1.0.0/PluginControlDescription/ids/%s?format=json",
  "plugin_ids" : ["org.ambientdynamix.contextplugins.ambientmedia",
                  "org.ambientdynamix.contextplugins.hueplugin",
                  "org.ambientdynamix.contextplugins.myoplugin",
                  "org.ambientdynamix.contextplugins.wemoplugin",
                  "org.ambientdynamix.contextplugins.spheronative",
                  "org.ambientdynamix.contextplugins.ardrone",
                  "org.ambientdynamix.contextplugins.pitchtracker",
                  "org.ambientdynamix.contextplugins.activityrecognition",
                  "org.ambientdynamix.contextplugins.ambienttwitternew",
                  "org.ambientdynamix.contextplugins.gamepadfeature",
                  "org.ambientdynamix.contextplugins.phonecontext"],

  getCommandsFor : function(pluginId){
    var that = this;
    console.log(pluginId);
    if (this.commandsMap === undefined || this.commandsMap[pluginId] === undefined) {
      var url = this.server_url.replace('%s', pluginId);
      console.log(url);
      $.ajax({
          url : url,
          success : function(data) {
            data = JSON.parse(data);
            console.log(data);
              var controls = [];

              if (that.commandsMap === undefined) {
                  that.commandsMap = {};
              }

              $.each(data.inputList, function(index, input){
                console.log(input.mandatoryControls);
                controls = controls.concat(input.mandatoryControls);
              });

              /** Remove duplicate commands **/
              /** Refer : http://stackoverflow.com/a/11455508/1239966 **/
              controls = $.grep(controls, function(v, k){
                return $.inArray(v ,controls) === k;
              });

              that.commandsMap[pluginId] = controls;
          },
          async : false, 
          cache: false
      });
    };
    return this.commandsMap[pluginId];
  }, 

  getDevicesFor : function(pluginId){

    var devices = {
      "org.ambientdynamix.contextplugins.hueplugin" : ["Max Lifx", "Nirandika Lifx"], 
      "org.ambientdynamix.contextplugins.wemoplugin" : ["WeMo Switch", "Wemo Motion"], 
      "org.ambientdynamix.contextplugins.spheronative" : ["Sphero", "Ollie"]
    };

    return devices[pluginId];
  }
};

var SharedData = {
  currentRoleName : null, 
  curentScope : null,
  currentScopeId : null
};