var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(chalk.green.bold('Welcome to Boilerframe generator!'));
    this.log(chalk.gray('Simple toolbelt for frontend workflow'));

    // Prompt user for optons and settings
    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the projects name?',
      default: this.appname // Default to current folder name
    },{
      type: 'checkbox',
      name: 'tools',
      message: 'Tools of choice:',
      choices: [{
        name: 'Autprefixer',
        value: 'autoprefixer',
        checked: true
      },{
        name: 'Bourbon',
        value: 'bourbon',
        checked: false
      },{
        name: 'Neat',
        value: 'neat',
        checked: false
      }]
    },{
      type: 'list',
      name: 'reset',
      message: 'Preferred reset?',
      choices: ['Normalize', 'Eric Meyer’s reset']
    },{
      type: 'confirm',
      name: 'jade',
      message: 'Would you like to use '+ chalk.green('Jade') +'?',
      default: false
    }];

    // Process answers
    this.prompt(prompts, function (answers) {
      var features = answers.tools;

      function hasFeature(feature) {
        return features && features.indexOf(feature) !== -1;
      }

      this.projectName = answers.name;
      this.includeAutoprefixer = hasFeature('autoprefixer');
      this.includeBourbon = hasFeature('autoprefixer');
      this.includeNeat = hasFeature('neat');
      this.includeJade = answers.jade;
      this.includeNormalize = answers.reset == 'Normalize' ? true : false;
      this.includeReset = answers.reset == 'Eric Meyer’s reset' ? true : false;

      done();
    }.bind(this));
  },

  // Copy package.json through template
  packageJSON: function () {
    this.template('package.json');
  },

  // Copy Gruntfile.js through template
  gruntfile: function () {
    this.template('Gruntfile.js');
  },

  // Copy jshintrc file
  jshint: function () {
    this.copy('jshintrc', '.jshintrc');
  },

  // Create and write bower file 
  bower: function() {
    var bower = {
      name: this.projectName,
      dependencies: {}
    };

    if (this.includeBourbon) {
      bower.dependencies.bourbon = '~4.2.1';
    }

    if (this.includeNeat) {
      bower.dependencies.neat = '~1.7.2';
    }

    if (this.includeNormalize) {
      bower.dependencies['normalize-scss'] = '~3.0.2';
    }

    if (this.includeReset) {
      bower.dependencies['meyer-reset'] = '*';
    }

    if (this.includeNeat || this.includeBourbon) {
      this.write('bower.json', JSON.stringify(bower, null, 2));
    }
  },

  // Scaffold file structure and copy boilerplate
  files: function () {
    this.directory('assets');
    this.mkdir('assets/images');
    this.mkdir('assets/scripts');
    this.mkdir('assets/css');
    this.mkdir('assets/sass');

    this.template('index.html');
    this.copy('assets/scripts/main.js');
    this.template('assets/sass/main.scss');
    this.template('assets/sass/_base.scss');
    this.template('README.md');
    this.copy('assets/sass/_utils.scss');
    this.copy('assets/sass/_vars.scss');
    this.copy('assets/sass/_layouts.scss');
    this.copy('assets/sass/_modules.scss');
    this.copy('assets/sass/_states.scss');
    this.copy('robots.txt');

    if (this.includeJade) {
      this.mkdir('jade');

      this.template('jade/index.jade');
    }
  },

  install: function () {
    this.installDependencies({
      skipMessage: true,
      callback: function () {
        console.log(chalk.green.bold('Everything is ready!'));
        console.log(chalk.gray('Run grunt to get your tasks running'));
      }
    });
  }
});
