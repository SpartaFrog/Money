'use strict';

module.exports = function(app) {
	// Expense Routes
	var expenses = require('../../app/controllers/expenses.server.controller'),
		users = require('../../app/controllers/users.server.controller');

	// Setting up the expenses api
	app.route('/expenses')
		.post(users.requiresLogin, expenses.hasAuthorization, expenses.convertExpenseViewModel,  expenses.create);

	app.route('/expenses/:month')
		.get(users.requiresLogin, expenses.hasAuthorization, expenses.list);

	app.route('/expenses/:expenseId')
		.put(users.requiresLogin, expenses.hasAuthorization, expenses.convertExpenseViewModel, expenses.update)
		.delete(users.requiresLogin, expenses.hasAuthorization, expenses.delete);

	// Finish by binding the article middleware
	app.param('expenseId', expenses.expenseByID);
	app.param('month', expenses.expenseByMonth);
};