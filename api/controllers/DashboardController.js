/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		
		var navItems = [];

		res.view({
			currentUser: undefined,
			currentAccount: undefined,
			wwConfig: sails.wwConfig,
			navItems: navItems,
			isLoggedIn: false,
			stripePublish: sails.config.stripe.public,
			mode: sails.config.env.mode
		});
	}
};

