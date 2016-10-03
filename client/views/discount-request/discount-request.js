// ALOL

var isCardNumberValid = function (cardNumber) {
	cardNumber = cardNumber.trim();
	return (cardNumber.length == 16 && /\d+/g.test(cardNumber));
};

var getCardNumber = function () {
	var cardNumber = '';

	var $input = document.querySelectorAll('input[type=tel]');
	[].forEach.call($input, function (input) {
		cardNumber += input.value.trim();
	});

	return cardNumber;
};

var handleInputEvents = function () {
	// get all inputs
	var $input = document.querySelectorAll('input[type=tel]');

	// add event listeners
	[].forEach.call($input, function (input) {
		input.addEventListener('input', function (event) {

			// get input text
			var inputText = event.target.value;

			// get input parent -> sibling
			var sibling = input.parentElement.nextElementSibling;

			// focus next input if available
			if (inputText.length == 4 && sibling) sibling.querySelector('input').focus();
		})
	});
};


var handleApplyDiscountButtonEvents = function () {
	// get button element
	var $applyDiscountButton = document.querySelector('button[name=apply-discount-button]');

	// add event listener
	$applyDiscountButton.addEventListener('click', function (event) {

		// get card number
		var cardNumber = getCardNumber();

		// validate card number
		if (!isCardNumberValid(cardNumber)) return false;

		// Request discount by card number
		console.warn('Make HTTP request');

		var response = {
			status: 0,
			items: [{
				percent: 10
			}]
		};

		if (response.status == 0) {
			// get discount percent
			var discountPercent = response.items[0].percent;

			// Apply discount
			// context.data.receipt.applyDiscount(discountPercent);

			// Go to next page
			// context.navigation.pushNext();
		}
	})
};


// Initialize or update logic
var update = function () {
	handleInputEvents();
	handleApplyDiscountButtonEvents();
};

// Initial scripts
window.onload = update;