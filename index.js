#! /usr/bin/env node
var dir = require("node-dir");
var path = require("path");
var fs = require("fs");
var argv = require('yargs').argv

function upgradeNodeVersionInFiles(version, files, callback) {
	callback = callback || function(){};
	if(!version) {
		callback(err);
		return;
	}
	//package.json is upgraded by default
	fs.readFile("package.json", "utf-8", function(err, data){
		if(err) {
			callback(err);
			return;
		}
		var package = JSON.parse(data);
		if(!package || !package.engines || !package.engines.node) {
			callback(new Error("the package.json does not specify a node version"));
			return;
		}
		var currentNodeVersion = package.engines.node;
		package.engines.node = version;
		var stringifiedPackage = JSON.stringify(package, null, 2);
		fs.writeFile("package.json", stringifiedPackage, "utf-8", function(err) {
			if(err) {
				callback(err);
				return;
			}
			console.log("upgraded package.json");
			dir.readFiles(__dirname, {recursive: false}, function(err, content, filename, next) {
				if(err) {
					callback(err);
					return;
				}
				var fileName = filename.split("/")[filename.split("/").length -1];
				if((files.indexOf(fileName) !== -1 && fileName !== "package.json") || !files) {
					var newNodeVersion = content.replace(currentNodeVersion, version);
					fs.writeFile(filename, newNodeVersion, "utf-8", function(err){
						if(err) {
							callback(err);
							return;
						}
						console.log("upgraded " + fileName);
					});
				}
				next();
			});
		});
	});
}

upgradeNodeVersionInFiles(argv.version, argv.files.split(",")); 
