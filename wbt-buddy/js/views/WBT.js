var app = app || {};
(function($){
  app.WBTView = Backbone.View.extend({
    template: _.template($('#model-calculation-template').html()),
    initialize: function () {
      this.model.emptyString = '<span class="badge">INPUT</span>';
      this.listenTo(this.model, 'recalculated', this.render);
      this.render();
    },
    render: function () {
      var emptyBadge = '<span class="badge">INPUT</span>';
      var emptyMessage = function (quantity) {
        return quantity.get('value') ?
          quantity : 
          {'as': function () { return emptyBadge; }};
      };
      
      var model = this.model;
      var haveQuantities = function () {
        return _.every(_.map(arguments, function(arg){
          return model.get(arg).get('value');
        }));
      };
      
      //if (this.model.hasQuantities('m_H2O', 'HV')){
      //  return this.model.equationTemplate('E_H2O = [m_H2O]');
      //}
      
      var equations = {
        'Energy Water Step 2': function () {
          return model.equationTemplate("E_H2O = ([m_H2O]) * [c_pH2O] * ([T_B] - [T_A])");
          // Improves on this:
          // return "E<sub>H2O</sub> = (" + q('m_H2O') + ") * "+q('c_pH2O') + " * (" +  q('T_B') + " - " + q('T_A') + ")";
        },
        'Energy Water Step 3': function () {
          return model.equationTemplate("E_H2O = [E_H2O kJ -f 0,0.00]");
        },
        'Energy Fuel Step 2': function () {
          return model.equationTemplate("E_fuel = [FC kg] * [HV kJ/kg -f 0,0.0]");
        },
        'Energy Fuel Step 3': function () {
          return model.equationTemplate("E_fuel = [E_fuel kJ -f 0,0.0]");
        },
        'OTE Step 2': function () {
          return model.equationTemplate("OTE = [E_H2O kJ -f 0.0] / [E_fuel kJ -f 0.0]");
        },
        'OTE Step 3': function () {
          return model.equationTemplate("OTE = [OTE % -f 0.00]");
        }
      };
      
      $(this.el).html(
        this.template({
          'T_A': this.model.get('T_A'),
          'T_B': this.model.get('T_B'),
          'HV': this.model.get('HV'),
          'c_pH2O': this.model.get('c_pH2O'),
          'm_H2O': emptyMessage(this.model.get('m_H2O')),
          'FC': emptyMessage(this.model.get('FC')),
          'equations': equations,
          'fuelNote': this.model.get('fuelNote')
        })
      );
    }
  });
})(jQuery);