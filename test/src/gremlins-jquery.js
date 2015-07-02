var $              = require('jquery'),
    gremlins       = require('gremlins'),
    gremlinsJquery = require('../../index');

describe('gremlinjs-jquery', function () {

  it('augments gremlin instances', function (done) {
    gremlins.create('jquery-gremlin', {
      mixins: [gremlinsJquery],
      initialize() {
        try {
          expect(this.$el[0]).to.be(el);
          done();
        } catch (e) {
          done(e);
        }
      }
    });

    var el = document.createElement('jquery-gremlin');
    document.body.appendChild(el);
  });

  it('supports element maps', function (done) {
    gremlins.create('jquery2-gremlin', {
      mixins: [gremlinsJquery],
      elements: {
        bar: 'bar',
        '.foo': 'foo'
      },
      initialize() {
        try {
          expect(this.$el[0]).to.be(el);
          expect(this.foo.length).to.be(1);
          expect(this.foo.text()).to.be('foo');
          expect(this.bar.length).to.be(0);
          done();
        } catch (e) {
          done(e);
        }
      }
    });

    var el       = document.createElement('jquery2-gremlin');
    el.innerHTML = '<span class="foo">foo</span>';
    document.body.appendChild(el);
  });

  it('supports event maps', function (done) {

    var G3 = gremlins.create('jquery3-gremlin', {
      mixins: [gremlinsJquery],
      events: {
        'mouseenter': 'onHover',
        'click button': 'onClick',
        'submit form': 'onSubmit'
      },
      initialize() {
        $(el).mouseenter();
        $(el).find('button').click();
        $(el).find('form').submit();
      },
      onHover: function (evt, context) {
        try {
          expect(this.name).to.equal('jquery3-gremlin');
          expect(evt.target).to.be(this.el);
          expect(context).to.be(this.el);
        } catch (e) {
          done(e);
        }
      },
      onClick: function (evt, context) {
        try {
          expect(this.name).to.equal('jquery3-gremlin');
          expect(evt.target).to.be($(el).find('button')[0]);
          expect(context).to.be($(el).find('button')[0]);
        } catch (e) {
          done(e);
        }
      },
      onSubmit: function (evt, context) {
        evt.preventDefault();
        try {
          expect(this.name).to.equal('jquery3-gremlin');
          expect(evt.target).to.be($(el).find('form')[0]);
          expect(context).to.be($(el).find('form')[0]);
          done();
        } catch (e) {
          done(e);
        }
      }
    });

    var el       = document.createElement('jquery3-gremlin');
    el.innerHTML = '<button class="foo">CLICK</button><form onsubmit="return false;"></form> ';
    document.body.appendChild(el);

  });
});
