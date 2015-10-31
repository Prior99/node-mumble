/*
 * Imports
 */
var Winston = require('winston');
var MySQL = require('mysql');
var FS = require("fs");

/*
 * Code
 */

/**
 * Handles the connection to a MySQL-Database.
 * @constructor
 * @param options - Options for connecting to the database.
 * @param callback - Called once the connection is up and running.
 */
var Database = function(options, callback) {
	this.pool = MySQL.createPool({
		host : options.host,
		user : options.user,
		password : options.password,
		database : options.database,
		multipleStatements : true,
		connectTimeout : options.connectTimeout ? options.connectTimeout : 4000
	});
	Winston.info("Connecting to database mysql://" + options.user + "@" + options.host + "/" + options.database + " ... ");
	this.pool.getConnection(function(err, conn) {
		if(err) {
			Winston.error("Connecting to database failed!");
			if(callback) { callback(err); }
			else { throw err; }
		}
		else {
			conn.release();
			Winston.info("Successfully connected to database!");
			this._setupDatabase(callback);
		}
	}.bind(this));
};

require("./quotes.js")(Database);
require("./ttscache.js")(Database);
require("./users.js")(Database);
require("./permissions.js")(Database);
require("./mumbleUsers.js")(Database);
require("./bass.js")(Database);
require("./autocomplete.js")(Database);
require("./sounds.js")(Database);
require("./records.js")(Database);
require("./settings.js")(Database);
require("./log.js")(Database);
require("./rss.js")(Database);
require("./dialogs.js")(Database);

/**
 * Executes the query and checks for errors.
 * If an error occured, then throw it, of use callback (if supplied).
 * If no error occured, then continue with callback, or, if a dedicated
 * success handler has been passed, use that one.
 */
Database.prototype.queryAndCheck = function(query, params, callErr, callSucc) {
	this.pool.query(query, params, function(err, result) {
		if(err) {
			if(callErr) { callErr(err); }
			else { throw err; }
		} 
		else if(callSucc) {	callSucc(null, result);	}
		else if(callErr) { callErr(null, result); }
		
	}.bind(this));
};

Database.prototype._checkError = function(err, callback) {
	if(err) {
		if(callback) { callback(err); }
		else { throw err; }
		return false;
	}
	else {
		return true;
	}
};

Database.prototype._setupDatabase = function(callback) {
	FS.readFile("schema.sql", {encoding : "utf8"}, function(err, data) {
		if(err) {
			throw err;
		}
		else {
			this.pool.query(data, function(err) {
				if(err) {
					Winston.error("An error occured while configuring database:", err);
					if(callback) { callback(err); }
					else { throw err; }
				}
				else  if(callback) { callback(); }
			});
		}
	}.bind(this));
};

/**
 * Stops the database by disconnecting gently.
 * @param callback - Called once disconnected.
 */
Database.prototype.stop = function(callback) {
	this.pool.end(callback);
};

module.exports = Database;
