var app = app || {};
(function($){
  app.DimensionedQuantityView = Backbone.View.extend({
    events: {
      'click .unit': 'updateUnitOnClick'
    },
    initialize: function () {
      this.dimensionsTemplate = _.template($('#dimensions-template').html());
      this.render();
      this.setUnit('g');
    },
    updateUnitOnClick: function (event) {
      this.setUnit($(event.target).data('dimension'));
    },
    setUnit: function (unit) {
      $('.unit', this.el).each(function(i, e){
        var $e = $(e);
        $e.toggleClass('unit-selected', $e.data('dimension') == unit);
      });      
    },
    render: function () {
      $('#js-amount-water').html(this.dimensionsTemplate({
        idInput: 'inputAmountWater',
        label: 'Amount Water',
        placeholder: 'Amount Water Boiled',
        dimensions: this.model.get('dimensions')
      }));
    }
  });
})(jQuery);