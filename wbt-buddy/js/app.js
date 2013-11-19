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
    },
    ricehusk: {
      symbol: 'ricehusk',
      label: 'Rice Husk',
      heatingValue: 20934,
      note: ''
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
  
  
  console.log(wbt.equationTemplate('E_H2O = [m_H2O]'));
  
});