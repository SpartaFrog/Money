'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Expense Schema
 */
var ExpenseSchema = new Schema({
	ExpenseDate: {
		type: Date,
		required: 'Please fill in the date'
	},
	Amount: {
		type: Number,
		required: 'Please fill in the Amount'
	},
	Description: {
		type: String,
		required: 'Please fill in the Description',
		trim: true
	},
	IsAutomatic: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Expense', ExpenseSchema);