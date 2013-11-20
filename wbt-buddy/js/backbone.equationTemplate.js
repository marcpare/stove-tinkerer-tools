/*

For fun, add equationTemplate to Backbone.

E_H2O = m_H2O
[E_H2O] = m_H2O
[E_H2O C] = m_H2O
[E_H2O C -s] = m_H2O // don't show the unit string 'silent'

*/
(function(){
  
  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  Backbone.equationTemplateEngine = {
    emptyString: 'EMPTY',
    equationTemplate: function(text) {
      var render;

      // Combine delimiters into one regular expression via alternation.
      templateSettings = {
        evaluate : /\[([a-zA-Z0-9_/%,\.\- ]+)\]/g,
        sub : /_([^\s]+)(\s?)/g  
      };
  
      var matcher = new RegExp([
        (templateSettings.evaluate || noMatch).source,
        (templateSettings.sub || noMatch).source
      ].join('|') + '|$', 'g');

      // Compile the template source, escaping string literals appropriately.
      var index = 0;
      var source = "";
      text.replace(matcher, function(match, evaluate, sub, subWhitespace, offset) {
        source += text.slice(index, offset)
          .replace(escaper, function(match) { return '\\' + escapes[match]; });

        if (evaluate) {
          source += this.evaluateQuantityCommand(evaluate);
        }
        if (sub) {
          source += "<sub>" + sub + "</sub>" + subWhitespace;
        }
        index = offset + match.length;
        return match;
      }.bind(this));

      return source;
    },
    // expects to be mixed into to a Backbone Model
    evaluateQuantityCommand: function (command) {
      var sp = command.split(" ");
      var command = sp[0];
      var options = [];
      var optionMap = {};
      if (!this.get(command) || !this.get(command).get('value')){
        return this.emptyString;
      }
      
      if (sp.length === 1){
        return this.get(command).get('value');
      } else {
        options = sp.slice(2);
        var optionArgs = [];
        var i, n, option;
        for(i = 0, n = options.length; i < n; i++){
          option = options[i];
          if (option.charAt(0) === '-') {
            optionArgs = [];
            optionMap[option] = optionArgs;
          }else{
            optionArgs.push(option);
          }
        }
        var formatNumber = _.identity;
        if(optionMap['-f']){
          formatNumber = function (number) {
            return numeral(number).format(optionMap['-f'][0]);
          }
        }
        var number = formatNumber(this.get(command).as(sp[1]))
        if(optionMap['-s']){
            return number;
        }else{
          return number + " " + sp[1];
        }
      }
    }
  }
  
})();
