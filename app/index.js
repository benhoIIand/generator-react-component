var path = require('path');
var generators = require('yeoman-generator');

var ComponentGeneartor = generators.Base.extend({
    initializing: function() {
        this.log('Welcome to Rightmove Component Generator');
        this.pkg = require('../package.json');
    },
    prompting: function() {
        var done = this.async();

        this.prompt({
            type: 'input',
            name: 'moduleName',
            message: 'The component name',
            store: true
        }, function(answers) {
            this.answers = answers;
            done();
        }.bind(this));
    },
    writing: function() {
        this._processDirectory('./', './', {
            capitalisedName: this._.titleize(this._.humanize(this.answers.moduleName)),
            moduleName: this._.capitalize(this._.camelize(this.answers.moduleName))
        });
    },
    install: function() {
        var done = this.async();
        this.log('Installing dependencies');
        this.spawnCommand('npm', ['install']);
    },
    end: function() {
        this.spawnCommand('npm', ['test']);
        this.log("\n All is done\n");
    }
});

ComponentGeneartor.prototype._processDirectory = function(source, destination, data) {
    var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
    var files = this.expandFiles('**', {
        dot: true,
        cwd: root
    });

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var src = path.join(root, file);

        if (path.basename(file).indexOf('_') == 0) {
            var dest = path.join(destination, path.dirname(file), path.basename(file).replace(/^_/, '')).replace(/<\%\= ([a-zA-Z0-9]) \%>/, function(variable) {
                return data[variable] ? data[variable] : variable;
            });
            this.template(src, dest, data);
        } else {
            var dest = path.join(destination, file);
            this.copy(src, dest);
        }
    }
};

module.exports = ComponentGeneartor;
