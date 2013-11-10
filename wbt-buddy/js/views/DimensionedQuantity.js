var app = app || {};
(function($){
  app.DimensionedQuantityView = Backbone.View.extend({
    events: {
      'click .unit': 'updateUnitOnClick',
      'keyup input': 'updateModelValue'
    },
    initialize: function () {
      this.listenTo(this.model, 'change:dimension', this.toggleSelected);
      this.dimensionsTemplate = _.template($('#dimensions-template').html());

      this.render();      
      this.$field = $($('input', this.el)[0]);
    },
    updateModelValue: function () {
      var trimmedValue = this.$field.val().trim();
      var value = undefined;
      if (trimmedValue) { value = parseFloat(trimmedValue); }
      this.model.setValue(value);
    },
    updateUnitOnClick: function (event) {
      var unit = $(event.target).data('dimension')
      this.model.setDimension(unit);
      this.$field.val(this.model.displayValue());
    },
    toggleSelected: function () {
      var unit = this.model.get('dimension').symbol;
      $('.unit', this.el).each(function(i, e){
        var $e = $(e);
        $e.toggleClass('unit-selected', $e.data('dimension') == unit);
      });
    },
    render: function () {
      $(this.el).html(this.dimensionsTemplate({
        idInput: this.model.get('idInput'),
        label: this.model.get('label'),
        placeholder: this.model.get('placeholder'),
        dimensions: this.model.get('dimensions')
      }));
      this.toggleSelected();
    }
  });
})(jQuery);