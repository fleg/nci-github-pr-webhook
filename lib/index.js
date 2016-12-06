'use strict';

exports.register = function(app) {
	var GithubScm = require('./scm')(app),
		GithubPrWebhook = require('./webhook'),
		githubPrWebhook = new GithubPrWebhook();

	githubPrWebhook.register(app);
	app.lib.scm.register('github-pr', GithubScm);
};
