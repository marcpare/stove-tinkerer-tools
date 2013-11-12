var app = app || {};
(function(){
  app.WBTModel = Backbone.Model.extend({
    events: {},
    initialize: function () {  
      this.set('T_A', new app.DimensionedQuantityModel({
        value: 21,
        dimensions: app.Dimensions.absoluteTemperature
      }));
      this.set('T_B', new app.DimensionedQuantityModel({
        value: 99.8,
        dimensions: app.Dimensions.absoluteTemperature
      }));
      this.set('c_pH2O', new app.DimensionedQuantityModel({
        value: 4.1855,
        dimensions: app.Dimensions.heatCapacity
      }));
      
      this.listenTo(app.quantities.amountWater, 'change:value', this.calculate);
      this.listenTo(app.quantities.fuelUse, 'change:value', this.calculate);    
      this.listenTo(app.quantities.fuelType, 'change:value', this.calculate)
      this.calculate();
    },
    calculate: function () {
      var fuelSymbol = app.quantities.fuelType.get('value');
      var fuel = app.tables.fuels[fuelSymbol];
      this.set('HV', fuel.heatingValue);
      this.set('m_H2O', app.quantities.amountWater);
      this.trigger('recalculated');
    }
  });
})();