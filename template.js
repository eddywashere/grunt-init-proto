/**
 * grunt-init-proto
 * https://github.com/eddywashere/grunt-init-proto
 */

'use strict';

// Basic template description.
exports.description = 'Create a static site with Jekyll';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '';

// Template-specific notes to be displayed after question prompts.
exports.after = '';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('version', '1.0.0'),
    init.prompt('username', 'eddywashere'),
    init.prompt('description'),
    init.prompt('author_name', 'Eddy Hernandez'),
    init.prompt('author_url', 'https://github.com/eddywashere'),
    init.prompt('licenses'),
    init.prompt('repository_name'),
    init.prompt('main', 'Grunt.js'),
    init.prompt('node_version', '>= 0.10.0'),
    {
      name: 'foundation',
      message: 'Want to use foundation?',
      default: 'Y/n'
    }
  ], function(err, props) {

    var repoName = props.repository_name ? props.repository_name : props.name;

    props.repository = 'https://github.com/' + props.username + '/' + repoName + '.git';
    props.homepage   = 'https://github.com/' + props.username + '/' + repoName;
    props.bugs       = 'https://github.com/' + props.username + '/' + repoName + '/issues';
    props.scripts = {
      "start": "node node_modules/grunt-cli/bin/grunt",
      "postinstall": "node node_modules/bower/bin/bower install"
    };
    props.devDependencies = {
      "grunt-contrib-watch": "*",
      "grunt": "*",
      "grunt-cli": "*",
      "grunt-contrib-connect": "*",
      "grunt-contrib-compass": "*",
      "grunt-exec": "*",
      "grunt-contrib-copy": "*",
      "bower": "*"
    };
    props.keywords = [
      "jekyll",
      "grunt",
      "prototyping"
    ];

    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    props.foundation = /y/i.test(props.foundation);

    var bower = {};
    bower.name = props.name;
    bower.main = 'Gruntfile.js';

    if (props.foundation) {
      bower.dependencies = {
        'foundation': '*'
      };
    }

    // Generate bower.json file.
    init.writePackageJSON('bower.json', bower);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};