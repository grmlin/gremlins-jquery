var $ = require('jquery'),
  gremlins = require('gremlins'),
  gremlinsJquery = require('../../lib/index');

describe('gremlinjs-jquery', function () {

  it('augments gremlin instances', function (done) {
    var el = document.createElement('jquery-gremlin');
    document.body.appendChild(el);

    gremlins.create('jquery-gremlin', {
      mixins: [gremlinsJquery],
      created() {
        try {
          expect(this.$el[0]).to.be(el);
          el = null;
          done();
        } catch (e) {
          done(e);
        }
      }
    });
  });

  it('supports element maps', function (done) {
    var el = document.createElement('jquery2-gremlin');
    el.style.visibility = 'hidden';
    el.innerHTML = '<span class="foo">foo</span>';
    document.body.appendChild(el);

    gremlins.create('jquery2-gremlin', {
      mixins: [gremlinsJquery],
      elements: {
        bar: 'bar',
        '.foo': 'foo'
      },
      created() {
        try {
          expect(this.$el[0]).to.be(el);
          expect(this.foo.length).to.be(1);
          expect(this.foo.text()).to.be('foo');
          expect(this.bar.length).to.be(0);
          el = null;
          done();
        } catch (e) {
          done(e);
        }
      }
    });

  });

  it('supports event maps', function (done) {
    var el = document.createElement('jquery3-gremlin');
    el.style.visibility = 'hidden';
    el.innerHTML = '<button class="foo">CLICK</button><form onsubmit="return false;"></form> ';
    document.body.appendChild(el);

    var G3 = gremlins.create('jquery3-gremlin', {
      mixins: [gremlinsJquery],
      events: {
        'mouseenter': 'onHover',
        'click button': 'onClick',
        'submit form': 'onSubmit',
        'custom': 'onCustom'
      },
      created() {
        $(el).mouseenter();
        $(el).find('button').click();
        $(el).find('form').submit();
        $(el).trigger('custom', ['foo', { bar: 'bar' }]);
      },
      onHover: function (evt) {
        try {
          expect(this.name).to.equal('jquery3-gremlin');
          expect(evt.target).to.be(this.el);
        } catch (e) {
          done(e);
        }
      },
      onClick: function (evt) {
        try {
          expect(this.name).to.equal('jquery3-gremlin');
          expect(evt.target).to.be($(el).find('button')[0]);
        } catch (e) {
          done(e);
        }
      },
      onSubmit: function (evt) {
        evt.preventDefault();
        try {
          expect(this.name).to.equal('jquery3-gremlin');
          expect(evt.target).to.be($(el).find('form')[0]);
        } catch (e) {
          done(e);
        }
      },
      onCustom: function (evt, foo, bar) {
        try {
          expect(this.name).to.equal('jquery3-gremlin');
          expect(evt.target).to.be(this.el);
          expect(foo).to.be('foo');
          expect(bar).to.be.an('object');
          expect(bar.bar).to.be('bar');
          el = null;
          done();
        } catch (e) {
          done(e);
        }
      }
    });

  });
});
