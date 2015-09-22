'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Expense = mongoose.model('Expense'),
	errorHandler = require('../../app/controllers/errors.server.controller'),
	validator = require('validator'),
	moment = require('moment');


/**
 * Create a Expense
 */
exports.create = function(req, res) {
	try{
		var expense = new Expense(req.model);

		expense.save(function(err){
			if (err) {
				return res.status(409).send(errorHandler.getError(409));
			}else{
				res.json({
					code: 200,
					message: 'Se ha añadido el gasto correctamente.',
					name: 'OK',
					data: { id: expense._id }
				});
			}
		});
 
	} catch(err){
		return res.status(500).send(errorHandler.getError(500));
	}
};

/**
 * Show the current Expense
 */
exports.read = function(req, res) {
	
};

/**
 * Update a Expense
 */
exports.update = function(req, res) {
	try{
		var expense = req.expense;

		expense = _.extend(expense, req.model);

		expense.save(function(err){
			if (err) {
				return res.status(409).send(errorHandler.getError(409));
			}else{
				res.json({
					code: 200,
					message: 'Se ha modificado el gasto correctamente.',
					name: 'OK',
					data: { id: expense._id }
				});
			}
		});
 
	} catch(err){
		return res.status(500).send(errorHandler.getError(500));
	}
};

/**
 * Delete an Expense
 */
exports.delete = function(req, res) {
	try{
		var expense = req.expense;

		expense.remove(function(err){
			if (err) {
				return res.status(409).send(errorHandler.getError(409));
			}else{
				res.json({
					code: 200,
					message: 'Se ha eliminado el gasto correctamente.',
					name: 'OK',
					data: { id: expense._id }
				});
			}
		});
 
	} catch(err){
		return res.status(500).send(errorHandler.getError(500));
	}
};

/**
 * List of Expenses
 */
exports.list = function(req, res) {
	try {
		Expense.find({
			ExpenseDate: {
				$gte: req.from,
				$lt: req.to
			}
		}).exec(function(err, expenses){
			if (err) {
				return res.status(409).send(errorHandler.getError(409));
			} else {
				res.json({
					code: 200,
					message: '',
					name: 'OK',
					data: expenses
				});
			}
		});
	} catch (error) {
		return res.status(500).send(errorHandler.getError(500));
	}
};

/**
 * Expense middleware
 */
exports.expenseByID = function(req, res, next, id) {
	Expense.findById(id).populate('user', 'displayName').exec(function(err, expense){
		if (err || !expense){
			return res.status(400).send(errorHandler.getError(400));
		}
		req.expense = expense;
		next();
	});
};

/**
 * Expense middleware
 */
exports.expenseByMonth = function(req, res, next, month) {
	if (!validator.isNumeric(month) || month.length !== 6){
		return res.status(400).send(errorHandler.getError(400));
	}
		
	var dateString = month.substring(0, 4) + '-' + month.substring(4, 6) + '-15';
	
	req.from = moment(dateString).startOf('month').subtract(1, 'seconds');
	req.to = moment(dateString).endOf('month').add(1, 'seconds');
	
	next();
};

/**
 * Expense authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (_.intersection(req.user.roles, ['user', 'admin']).length) {
		return next();
	} else {
		return res.status(403).send(errorHandler.getError(403));
	}
};

/**
 * Expense convertion middleware
 */
exports.convertExpenseViewModel = function(req, res, next) {

	// Date
	if (!req.body.expenseDate || req.body.expenseDate.toString().trim().length <= 0){
		return res.status(400).send(errorHandler.getError(400, 'El campo fecha es obligatorio'));
	}

	if (validator.isDate(req.body.expenseDate) !== true){
		return res.status(400).send(errorHandler.getError(400, 'El campo fecha no tiene un formato correcto'));
	}

	// Amount
	if (!req.body.amount || req.body.amount.toString().trim().length <= 0){
		return res.status(400).send(errorHandler.getError(400, 'El campo cantidad es obligatorio'));
	}

	if (validator.isDecimal(req.body.amount) !== true || req.body.amount <= 0){
		return res.status(400).send(errorHandler.getError(400, 'El campo cantidad no tiene un formato correcto'));
	}

	//Description
	if(!req.body.description || req.body.description.trim().length <= 0){		
		return res.status(400).send(errorHandler.getError(400, 'El campo concepto es obligatorio'));
	}

	var selectedDate = req.body.expenseDate;
	req.model = {
		ExpenseDate: moment().utc().year(moment(selectedDate).year()).month(moment(selectedDate).month()).date(moment(selectedDate).date()).hour(0).minute(0).second(0),
		Amount: req.body.amount,
		Description: req.body.description,
		IsAutomatic: req.body.isAutomatic || false
	};

	next();
};
