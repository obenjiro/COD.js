#!/usr/bin/env node
var fs = require('fs'),
    path = require('path'),
    config = require('./config'),
    handlebars = require('handlebars'),
    program = require('commander');

handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

program
    .version(config.version);

program
    .command('gen <name>')
    .description('Generates Controller, Index, Store, View, ViewModel files and link them together')
    .action(function(name, options){
        console.log('generates %s files', name);

        var sourceDir = __dirname + '/templates/standart_block';
        var targetDir = __dirname + '/public/src/app/'

        copyFolderRecursiveSync(sourceDir, targetDir, function(source) {
            var template = handlebars.compile(source);

            return template({
                name: name
            })
        }, name.toLowerCase());

        console.log('done');
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}


function copyFileSync( source, target, modifier ) {
    var targetFile = target;
    var fileName = path.basename( source );

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    if (fileName[0] === '.') {
        return; // skiping files that starts with .
    }

    var source = fs.readFileSync(source, 'utf-8');
    var modifiedSource = modifier(source);

    fs.writeFileSync(targetFile, modifiedSource);
}

function copyFolderRecursiveSync( source, target, modifier, targetName ) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join( target, targetName || path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder, modifier );
            } else {
                copyFileSync( curSource, targetFolder, modifier );
            }
        } );
    }
}
