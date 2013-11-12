var app = app || {};
(function($){
  app.WBTView = Backbone.View.extend({
    template: _.template($('#model-calculation-template').html()),
    initialize: function () {
      this.listenTo(this.model, 'recalculated', this.render);
      this.render();
    },
    render: function () {
      var emptyMessage = function (quantity) {
        return quantity.get('value') ?
          quantity : 
          {'as': function () { return '<span class="badge">INPUT</span>'; }};
      };
      
      $(this.el).html(
        this.template({
          'T_A': this.model.get('T_A'),
          'T_B': this.model.get('T_B'),
          'HV': this.model.get('HV'),
          'c_pH2O': this.model.get('c_pH2O'),
          'm_H2O': emptyMessage(this.model.get('m_H2O'))
        })
      );
    }
  });
})(jQuery);