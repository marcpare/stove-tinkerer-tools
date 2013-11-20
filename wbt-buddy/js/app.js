var app = app || {};
$(function(){
  
  app.tables = {};
  app.tables.fuels = {
    wood: {
      symbol: 'wood',
      label: 'Wood',
      heatingValue: 16347,
      note: 'Calculated at 10% moisture content for average hardwood'
    },
    charcoal: {
      symbol: 'charcoal',
      label: 'Charcoal',
      heatingValue: 26677,
      note: 'Calculated at 5% moisture content'
    }
  };
  
  app.quantities = {};
  app.quantities.amountWater = new app.DimensionedQuantityModel({
    dimension: app.Dimensions.amountWater.g_H2O,
    value: undefined,
    dimensions: app.Dimensions.amountWater,
    idInput: 'inputAmountWater',
    label: 'Amount Water',
    placeholder: 'Amount Water Boiled'
  });
  app.quantities.fuelUse = new app.DimensionedQuantityModel({
    dimension: app.Dimensions.mass.g,
    value: undefined,
    dimensions: app.Dimensions.mass,
    idInput: 'inputFuelUse',
    label: 'Fuel Use',
    placeholder: 'Amount Fuel Burned'
  });
  app.quantities.fuelType = new app.PillChoiceModel({
    choices: app.tables.fuels,
    value: 'charcoal',
    idInput: 'inputFuelType',
    label: 'Fuel Type',
  });  
        
  app.wbt = new app.WBTModel();  
  var inputView = new app.InputView();
  var comparisonView = new app.ComparisonView({
    model: new app.ComparisonModel({
      items: [
        {label: '3-stone fire', efficiency: 15},
        {label: 'Traditional charcoal', efficiency: 35},
        {label: 'Well-tended 3-stone', efficiency: 25},
        {label: 'Typical "Rocket" stove', efficiency: 38}
      ]
    })
  });
  var wbtView = new app.WBTView({
    el: '#js-model-calculation',
    model: app.wbt
  });  
  
});