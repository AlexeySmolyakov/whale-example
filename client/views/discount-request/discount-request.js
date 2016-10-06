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

var showError = function () {
	document.querySelector('.error').classList.add('has-error');

	setTimeout(function () {
		document.querySelector('.error').classList.remove('has-error')
	}, 1000)
}


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
		var path = 'customer-discountcard?_method=discountcardPercent&cardnumber=' + cardNumber;
		var response = {};

		try {
			response = http.send({
				method: 'GET',
				path: path
			});
			response = JSON.parse(response);
		}
		catch (error) {
			console.log(error);
		}

		if (response.status == 0) {

			// get discount percent
			var discountPercent = response.data.percent;

			// apply discount
			if (receipt && receipt.applyReceiptDiscountPercent) {
				receipt.applyReceiptDiscountPercent(discountPercent);
			}

			// go to EvoPos
			if (navigation) navigation.pushNext();
		}
		else {
			showError();
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