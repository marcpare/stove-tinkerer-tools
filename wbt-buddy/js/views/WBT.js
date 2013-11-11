var app = app || {};
(function($){
  app.WBTView = Backbone.View.extend({
    template: _.template($('#model-calculation-template').html()),
    initialize: function () {
      this.render();
    },
    render: function () {
      $(this.el).html(
        this.template({
          'T_A': 30,
          'T_B': 100,
          'HV': this.model.get('HV')
        })
      );
    }
  });
})(jQuery);