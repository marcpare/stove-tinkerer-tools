var app = app || {};
$(function(){
  
  app.Dimensions = {};
  app.Dimensions.mass = {
    g: { 
      symbol: 'g', 
      label: 'grams' 
    }
  };
  app.Dimensions.amountWater = {
    g_H2O: { 
      symbol: 'g_H2O', 
      label: 'grams' 
    },
    L: { 
      symbol: 'L', 
      label: 'Liters',
      convertToBase: function (L) { return L * 1000.0; },
      convertFromBase: function (g_H2O) { return g_H2O / 1000.0 }
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
    choices: ['Wood', 'Charcoal', 'Rice Hull'],
    idInput: 'inputFuelType',
    label: 'Fuel Type',
  });
        
  var wbt = new app.WBTModel();
  
  var inputView = new app.InputView();
  var outputView = new app.OutputView();
});