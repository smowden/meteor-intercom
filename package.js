Package.describe({
  summary: "Basic intercom integration",
  version: "1.0.0",
  git: "https://github.com/smowden/meteor-intercom"
});

Package.on_use(function (api, where) {
  api.use(['session', 'deps', 'underscore'], 'client');
  api.add_files('intercom_server.js', 'server');
  api.add_files(['intercom_loader.js', 'intercom_client.js'], 'client');
  
  api.export('IntercomSettings');
  api.export('IntercomHash', 'server');
});