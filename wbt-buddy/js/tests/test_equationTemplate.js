describe('equation template', function () {
  var ModelWithEquationTemplate = Backbone.Model.extend(Backbone.equationTemplateEngine);
  var model = new ModelWithEquationTemplate();
  before(function (done) {
    model.set('everything', new app.DimensionedQuantityModel({
      value: 1000,
      dimensions: app.Dimensions.amountWater
    }));
    done();
  });
  it('replaces subscript token', function (done) {
    model.equationTemplate('foo_bar').should.equal('foo<sub>bar</sub>');
    done();
  });
  it('preserves whitespace following', function (done) {
    model.equationTemplate('foo_bar ').should.equal('foo<sub>bar</sub> ');
    done();
  });
  it('replaces inside of a string', function (done) {
    model.equationTemplate('baz foo_bar baz').should.equal('baz foo<sub>bar</sub> baz');
    done();
  });
  it('inserts variable value', function (done) {
    model.equationTemplate('[everything]').should.equal('1000');
    done();
  });
  it('converts the variables unit', function (done) {
    model.equationTemplate('[everything L]').should.equal('1 L');
    done();
  });
  it('can be silent', function (done) {
    model.equationTemplate('[everything L -s]').should.equal('1');
    done();
  });
});