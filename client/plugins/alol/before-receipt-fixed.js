// Imports
var navigation = require('navigation');

// View to be shown within handleMoment function.
var view = 'discount-request.html';

// Function to be invoked on evo.receipt.items.fixed moment (declared in client.yaml file).
function handleMoment(context, navigation) {
	navigation.pushView(view);
}