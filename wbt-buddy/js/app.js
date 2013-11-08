var app = app || {};
$(function(){
  
  app.Dimensions = {
    g: {symbol: 'g', label: 'grams'},
    L: {symbol: 'L', label: 'Liters'}
  };
  
  var inputView = new app.InputView();
  var outputView = new app.OutputView();
});