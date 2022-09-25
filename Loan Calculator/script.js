// Get spinner and results
let load = document.getElementById('loading');
let results = document.getElementById('results');

// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Show loader
  load.style.display = 'block';
  // Hide results
  results.style.display = 'none';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults() {
  // Get form values
  let amount = document.getElementById('amount').value;
  let interest = document.getElementById('interest').value;
  let repaymentYears = document.getElementById('years').value;

  //Calculations
  let months = repaymentYears * 12;
  let monthlyInterestRate = interest / 12 / 100;

  let r = Math.pow(1 + monthlyInterestRate, months);
  //monthlyPayment
  let monthlyPayment = (amount * monthlyInterestRate * r) / (r - 1);
  //totalPayment
  let totalPayment = monthlyPayment * months;
  //totalInterest
  let totalInterest = totalPayment - amount;

  // Check if finite
  if (isFinite(monthlyPayment)) {
    //Use localestring to give comma seperated (money) format: 234,567,657
    monthlyPayment = Number(monthlyPayment.toFixed(2)).toLocaleString();

    totalPayment = Number(totalPayment.toFixed(2)).toLocaleString();

    totalInterest = Number(totalInterest.toFixed(2)).toLocaleString();

    // put values in HTML
    document.getElementById('monthly-payment').value = `$ ${monthlyPayment}`;
    document.getElementById('total-payment').value = `$ ${totalPayment}`;
    document.getElementById('total-interest').value = `$ ${totalInterest}`;

    // Hide loader
    load.style.display = 'none';
    // Show results
    results.style.display = 'block';
  }
  // if not finite, display error for 2 seconds
  else {
    showError('Please enter valid numbers');
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 2000);
  }
}

// Show error function
function showError(err) {
  // Hide loader
  load.style.display = 'none';
  // Hide results
  results.style.display = 'none';
  let div = document.createElement('div');

  // Get elements
  let card = document.querySelector('.card');
  let heading = document.querySelector('.heading');

  // Bootstrap alert class
  div.className = 'alert alert-danger';
  div.appendChild(document.createTextNode(err));

  //insert error above heading
  card.insertBefore(div, heading);
}
