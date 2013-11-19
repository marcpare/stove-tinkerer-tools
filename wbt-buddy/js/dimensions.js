var app = app || {};
(function(){
  app.Dimensions = {};
  app.Dimensions.mass = {
    g: { 
      symbol: 'g', 
      label: 'grams' 
    },
    'kg': {
      symbol: 'kg',
      label: 'kg',
      convertToBase: function (kg) { return kg * 1000.0; },
      convertFromBase: function (g) { return g / 1000.0; }
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
  app.Dimensions.energyContent = {
    'kJ/kg': {
      symbol: 'kJ/kg',
      label: 'kJ/kg'
    }
  };
  app.Dimensions.energy = {
    'J': {
      symbol: 'J',
      label: 'J'
    },
    'kJ': {
      symbol: 'kJ',
      label: 'kJ',
      convertToBase: function (kJ) { return kJ * 1000.0; },
      convertFromBase: function (J) { return J / 1000.0; }
    }
  };
  app.Dimensions.dimensionless = {
    '-': {
      symbol: '-',
      label: ' '
    },
    '%': {
      symbol: '%',
      label: '%',
      convertToBase: function (percent) { return percent / 100.0; },
      convertFromBase: function (unit) { return unit * 100.0; }
    }
  };
})();