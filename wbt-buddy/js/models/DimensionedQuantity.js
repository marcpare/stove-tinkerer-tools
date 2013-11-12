var app = app || {};
(function($){
  app.DimensionedQuantityModel = Backbone.Model.extend({
    convertToBase: function (value) {
      var conversion = this.get('dimension').convertToBase || _.identity;
      return conversion(value);
    },
    convertFromBase: function (value) {
      var conversion = this.get('dimension').convertFromBase || _.identity;
      return conversion(value);
    },
    displayValue: function () {
      var value = this.get('value');
      if (!value){ return undefined; }
      return this.convertFromBase(value);
    },
    setDimension: function (symbol) {
      this.set('dimension', this.get('dimensions')[symbol]);
    },
    setValue: function (value) {
      this.set('value', this.convertToBase(value));
    },
    // duplicates the current functionality of displayValue, 
    // I'm playing wiht the API, trying to see what works best
    as: function (symbol) {
      var dimension = this.get('dimensions')[symbol];
      var conversion = dimension.convertFromBase || _.identity;
      var value = this.get('value');
      if (!value){ return undefined; }
      return conversion(value);
    }
  });
})(jQuery);