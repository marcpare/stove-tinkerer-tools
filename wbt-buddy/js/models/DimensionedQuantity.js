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
    setValue: function (value) {
      this.set('value', this.convertToBase(value));
    }
  });
})(jQuery);