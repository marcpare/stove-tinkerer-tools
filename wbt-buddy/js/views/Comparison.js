var app = app || {};
(function($){
  app.ComparisonView = Backbone.View.extend({
    template: _.template($('#comparison-template').html()),
    el: '#js-comparison',
    initialize: function () {
      this.render();
      this.listenTo(app.wbt, 'recalculated', this.render);
    },
    render: function () {
      var items = this.model.get('items');
      var ote = app.wbt.get('OTE').as('%');
      if (ote){
        items = items.concat({
          label: 'Your result',
          efficiency: ote.toFixed(0)
        });
      }
      
      $(this.el).html(this.template({
        items: _.sortBy(items, function (item) {
          return item.efficiency;
        })
      }));
    }
  });
})(jQuery);