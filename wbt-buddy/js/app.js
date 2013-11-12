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
  // DELTA temperatures require different conversions
  app.Dimensions.absoluteTemperature = {
    C: {
      symbol: 'C',
      label: 'C'
    }
  };
  app.Dimensions.heatCapacity = {
    'J/g-C': {
      symbol: 'J/g-C',
      label: 'J/g-C'
    }
  };
  
  app.tables = {};
  app.tables.fuels = {
    wood: {
      symbol: 'wood',
      label: 'Wood',
      heatingValue: 1000.0
    },
    charcoal: {
      symbol: 'charcoal',
      label: 'Charcoal',
      heatingValue: 2000.0
    },
    ricehusk: {
      symbol: 'ricehusk',
      label: 'Rice Husk',
      heatingValue: 3000.0
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
  var wbtView = new app.WBTView({
    el: '#js-model-calculation',
    model: wbt
  });
  //var outputView = new app.OutputView();
});