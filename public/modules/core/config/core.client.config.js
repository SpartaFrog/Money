'use strict';

// Configuring the Core Module
angular.module('core').run(['Menus',
	function (Menus){
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Gastos', 'core', '', '/');
		Menus.addMenuItem('topbar', 'Ingresos', 'core', '', '/');
		Menus.addMenuItem('topbar', 'Informes', 'core', '', '/');
	}
]);