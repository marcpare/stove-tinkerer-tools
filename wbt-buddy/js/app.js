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
  
  app.tables = {};
  app.tables.fuels = {
    wood: {
      symbol: 'wood',
      label: 'Wood',
      value: 1000.0
    },
    charcoal: {
      symbol: 'charcoal',
      label: 'Charcoal',
      value: 2000.0
    },
    ricehusk: {
      symbol: 'ricehusk',
      label: 'Rice Husk',
      value: 3000.0
    },
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
  
        
  var wbt = new app.WBTModel();
  
  var inputView = new app.InputView();
  var outputView = new app.OutputView();
});