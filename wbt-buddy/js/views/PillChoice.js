var app = app || {};
(function($){
  app.PillChoiceView = Backbone.View.extend({
    template: _.template($('#pill-choice-template').html()),
    initialize: function () {
      this.render();
    },
    render: function () {
      $(this.el).html(this.template({
        idInput: this.model.get('idInput'),
        label: this.model.get('label'),
        choices: this.model.get('choices')
      }));
    }
  });
})(jQuery);