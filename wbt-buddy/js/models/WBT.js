var app = app || {};
(function(){
  app.WBTModel = Backbone.Model.extend({
    events: {},
    initialize: function () {  
      this.listenTo(app.quantities.amountWater, 'change:value', this.calculate);
      this.listenTo(app.quantities.fuelUse, 'change:value', this.calculate);    
      this.listenTo(app.quantities.fuelType, 'change:value', this.calculate)
    },
    calculate: function () {
      console.log('running through the WBT calculation');
      console.log(app.quantities.amountWater.get('value'));
      console.log(app.quantities.fuelUse.get('value'));
      console.log(app.quantities.fuelType.get('value'));
    }
  });
})();