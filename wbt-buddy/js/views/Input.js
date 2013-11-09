var app = app || {};
(function($){
  app.InputView = Backbone.View.extend({
    el: '#js-model-inputs',
    events: {
      'shown.bs.tab .fuel-type-choice' : 'updateOnClick',
      'keyup #js-fuel-use' : 'updateOnClick',
      'keyup #js-amount-water' : 'updateOnClick'
    },
    initialize: function(){
      this.viewAmountWater = new app.DimensionedQuantityView({
        el: '#js-amount-water',
        model: app.quantities.amountWater
      });
    },
    updateOnClick: function(){
      var fuelType = $('#js-fuel-type .active').first().data().fuel;
      var fuelUse = $('#js-fuel-use').val();
      var amountWater = $('#js-amount-water').val();
    }
  });
})(jQuery);