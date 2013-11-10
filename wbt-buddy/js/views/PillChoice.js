var app = app || {};
(function($){
  app.PillChoiceView = Backbone.View.extend({
    events: {
      'shown.bs.tab .fuel-type-choice' : 'updateOnClick'
    },
    template: _.template($('#pill-choice-template').html()),
    initialize: function () {
      this.render();
    },
    updateOnClick: function () {
      // very much tied to the DOM...
      var selected = $(event.target).parent().data('symbol');
      this.model.set('value', selected);
      this.toggleSelected();
    },
    toggleSelected: function () {
      var selected = this.model.get('value');
      var $fuelChoice;
      $('.fuel-type-choice', this.el).each(function (i, fuelChoice){
        $fuelChoice = $(fuelChoice);
        $fuelChoice.toggleClass('active', $fuelChoice.data('symbol') === selected);
      });
    },
    render: function () {
      $(this.el).html(this.template({
        idInput: this.model.get('idInput'),
        label: this.model.get('label'),
        choices: this.model.get('choices')
      }));
      this.toggleSelected();
    }
  });
})(jQuery);