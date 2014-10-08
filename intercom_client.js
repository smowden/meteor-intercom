Meteor.subscribe('intercomHash');

var minimumUserInfo = function(user) {
  var info = {
    app_id: Meteor.settings.public.intercom.id,
    
    user_id: user._id,
    
    created_at: Math.round(Meteor.user().createdAt/1000)
  };
  
  // they actually need to have this but it can be useful for testing
  if (user.intercomHash)
    info.user_hash = user.intercomHash;
  
  return info;
};



IntercomSettings = {
  // if you want to manually call it
  minimumUserInfo: minimumUserInfo
};

var booted = false;

// send data to intercom
Meteor.startup(function(){
    Deps.autorun(function() {
        var user = Meteor.user(),
            ready,
            info,
            type;


        if (!user) // "log out"
            return window.Intercom("shutdown");

        info = IntercomSettings.minimumUserInfo(user);
        if (IntercomSettings.userInfo && info.user_hash) {
            ready = IntercomSettings.userInfo(user, info);
            if (ready === false)
                return;
        }else{
            return false;
        }


        if (info) {
            type = booted ? 'update': 'boot';

            // console.log(type, info)
            window.Intercom(type, info);

            booted = true;
        }
    });
});
