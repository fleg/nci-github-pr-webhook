'use strict';

var inherits = require('util').inherits;

module.exports = function(app) {
	var ParentScm = app.lib.scm.GitScm;

	function GithubScm(params) {
		ParentScm.call(this, params);
	}
	inherits(GithubScm, ParentScm);

	GithubScm.prototype.getChanges = function(rev1, rev2, callback) {
		// always without changes
		return callback(null, []);
	};

	GithubScm.prototype.pull = function(rev, callback) {
		this._run({cmd: 'git', args: [
			'fetch', 'origin', rev
		]}, callback);
	};

	GithubScm.prototype.getRev = function(rev, callback) {
		ParentScm.prototype.getRev.call(this, 'FETCH_HEAD', callback);
	};

	GithubScm.prototype.update = function(rev, callback) {
		ParentScm.prototype.update.call(this, 'FETCH_HEAD', callback);
	};

	return GithubScm;
};