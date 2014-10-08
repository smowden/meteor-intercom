Package.describe({
  summary: "Basic intercom integration",
  version: "1.0.1",
  git: "https://github.com/smowden/meteor-intercom"
});

Package.on_use(function (api, where) {
  api.use(['session@1.0.0', 'deps@1.0.0', 'underscore@1.0.0'], 'client');
  api.add_files('intercom_server.js', 'server');
  api.add_files(['intercom_loader.js', 'intercom_client.js'], 'client');
  
  api.export('IntercomSettings');
  api.export('IntercomHash', 'server');
});
