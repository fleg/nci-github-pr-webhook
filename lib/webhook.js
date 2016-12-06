'use strict';

var BaseWebhook = require('nci-base-webhook').BaseWebhook,
	inherits = require('util').inherits;

var GithubPrWebhook = function() {
	BaseWebhook.call(this, {name: 'github-pr'});
};

inherits(GithubPrWebhook, BaseWebhook);

GithubPrWebhook.prototype.check = function(req, project) {
	return project.scm.type === 'github-pr' &&
		req.headers['x-github-event'] === 'pull_request' &&
		(req.body.action === 'synchronize' || req.body.action === 'opened');
};

GithubPrWebhook.prototype.createBuild = function(req, project, app) {
	app.builds.create({
		projectName: project.name,
		withScmChangesOnly: false,
		initiator: {type: this.name + '-webhook'},
		buildParams: {
			scmRev: 'pull/' + req.body.number + '/head'
		}
	});
};

module.exports = GithubPrWebhook;
