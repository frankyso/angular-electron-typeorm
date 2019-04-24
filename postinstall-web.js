// Allow angular using electron module (native node modules)
const fs = require('fs');
const f_angular = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';
const { getConfigs } = require('./postinstall.config');

fs.readFile(f_angular, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/target: "electron-renderer",/g, '');
  var result = result.replace(/target: "web",/g, '');
  var result = result.replace(/return \{/g, 'return {target: "web",');

  fs.writeFile(f_angular, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
}).then;

// This script change webpack-configs for "ng serve"
getConfigs()
  .then(({ webConfig }) => {

    fs.readFile(f_angular, 'utf8', function (err, data) {

      if (err) {
        return console.log(err);
      }

      var result = data.replace(/return {([\s\S]+)}[\s]+,/, 'return {');
      var result = result.replace(/target: "web",/g, '');
      var result = result.replace(/return \{/g, 'return {' + webConfig);

      fs.writeFile(f_angular, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  });
