var app = app || {};
$(function(){
  
  app.Dimensions = {
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
    dimension: app.Dimensions.g_H2O,
    value: undefined,
    dimensions: [app.Dimensions.g_H2O, app.Dimensions.L]
  });
        
  var wbt = new app.WBTModel();
  
  var inputView = new app.InputView();
  var outputView = new app.OutputView();
});