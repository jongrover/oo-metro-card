function MetroCardCalc() {
  this.view = new MetroCardCalcView(this);
}
MetroCardCalc.prototype.cost_per_single_ride = 2.75;
MetroCardCalc.prototype.remaining_amount = 0.0;
MetroCardCalc.prototype.number_of_rides = 0;
MetroCardCalc.prototype.rides_left = 0;
MetroCardCalc.prototype.left_over = 0.0;
MetroCardCalc.prototype.amount_to_add = 0.0;
MetroCardCalc.prototype.calc = function () {
  this.remaining_amount = parseFloat(this.remaining_amount),
  this.number_of_rides = parseInt(this.number_of_rides),
  this.rides_left = this.remaining_amount / this.cost_per_single_ride,
  this.left_over = this.remaining_amount % this.cost_per_single_ride,
  this.amount_to_add = (this.cost_per_single_ride * this.number_of_rides) - this.remaining_amount;
};

function MetroCardCalcView(model) {
  this.model = model;
  this.el = {
    $metro_card_calculator: $('#metro_card_calculator'),
    $remaining_amount: $('#remaining_amount'),
    $number_of_rides: $('#number_of_rides'),
    $result: $('#result'),
    $more_rides: $('#more_rides'),
    $rides_remaining: $('#rides_remaining'),
    $balance_remaining: $('#balance_remaining')
  };
  this.initialize();
}
MetroCardCalcView.prototype.get_values = function () {
  this.model.remaining_amount = this.el.$remaining_amount.val();
  this.model.number_of_rides =  this.el.$number_of_rides.val();
};
MetroCardCalcView.prototype.display = function () {
  this.el.$rides_remaining.text(Math.round(this.model.rides_left));
  this.el.$balance_remaining.text(accounting.formatMoney(this.model.left_over));
  this.el.$result.text(accounting.formatMoney(this.model.amount_to_add));
  this.el.$more_rides.text(this.model.number_of_rides);
};
MetroCardCalcView.prototype.initialize = function () {
  var self = this;
  this.el.$metro_card_calculator.submit(function (event) {
    self.get_values();
    self.model.calc();
    self.display();
    event.preventDefault();
  });
};

$(function(){
  var metro_calc = new MetroCardCalc();
});