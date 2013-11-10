var app = app || {};
(function($){
  app.InputView = Backbone.View.extend({
    el: '#js-model-inputs',
    initialize: function(){
      this.viewFuelType = new app.PillChoiceView({
        el: '#js-fuel-type',
        model: app.quantities.fuelType
      });
      this.viewAmountWater = new app.DimensionedQuantityView({
        el: '#js-amount-water',
        model: app.quantities.amountWater
      });
      this.viewFuelUse = new app.DimensionedQuantityView({
        el: '#js-fuel-use',
        model: app.quantities.fuelUse
      });
    }
  });
})(jQuery);