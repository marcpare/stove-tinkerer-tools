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
        value: 4.184,
        dimensions: app.Dimensions.heatCapacity
      }));
      this.set('E_H2O', new app.DimensionedQuantityModel({
        value: undefined,
        dimension: 'J',
        dimensions: app.Dimensions.energy
      }));   
      this.set('E_fuel', new app.DimensionedQuantityModel({
        value: undefined,
        dimension: 'J',
        dimensions: app.Dimensions.energy
      }));
      this.set('OTE', new app.DimensionedQuantityModel({
        value: undefined,
        dimension: '%',
        dimensions: app.Dimensions.dimensionless
      }));      
      
      this.listenTo(app.quantities.amountWater, 'change:value', this.calculate);
      this.listenTo(app.quantities.fuelUse, 'change:value', this.calculate);    
      this.listenTo(app.quantities.fuelType, 'change:value', this.calculate)
      this.calculate();
    },
    hasQuantities: function () {
      var that = this;
      return _.every(_.map(arguments, function(arg){
        return that.get(arg).get('value');
      }));
    },
    calculate: function () {
      var fuelSymbol = app.quantities.fuelType.get('value');
      var fuel = app.tables.fuels[fuelSymbol];
      this.set('HV', new app.DimensionedQuantityModel({
        value: fuel.heatingValue,
        dimension: 'kJ/kg',
        dimensions: app.Dimensions.energyContent
      }));
      this.set('fuelNote', fuel.note);
      
      this.set('m_H2O', app.quantities.amountWater);
      this.set('FC', app.quantities.fuelUse);
      
      var that = this;
      var q = function (quantitySymbol) {
        if (that.hasQuantities(quantitySymbol)){
          return that.get(quantitySymbol).get('value');
        }else{
          return undefined;
        }
      }
      
      if(this.hasQuantities('m_H2O')){
        var E_H2O = q('m_H2O')*q('c_pH2O')*(q('T_B')-q('T_A'));
        this.get('E_H2O').setValue(E_H2O);
      }else{
        this.get('E_H2O').setValue(undefined);
      }
      
      if(this.hasQuantities('FC', 'HV')){
        var E_fuel = q('FC')*q('HV');
        this.get('E_fuel').setValue(E_fuel);
      }else{
        this.get('E_fuel').setValue(undefined);
      }
      
      if(this.hasQuantities('E_H2O', 'E_fuel')){
        var OTE = q('E_H2O')/q('E_fuel');
        this.get('OTE').setValue(OTE);
      }else{
        this.get('OTE').setValue(undefined);
      }
      
      
      this.trigger('recalculated');
    }
  });

  // mix in equation rendering engine
  app.WBTModel = app.WBTModel.extend(Backbone.equationTemplateEngine);
})();