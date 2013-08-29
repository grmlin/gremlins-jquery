// TODO: event map exceptions


describe('gremlinjs-jquery', function () {

    it('extends Gizmo', function () {
        expect(G.Gizmo.IS_JQUERY).to.be.ok();
    });

    it('augments gremlin instances', function (done) {
        var el = document.createElement('div');
        el.setAttribute('data-gremlin', 'JQueryTest');

        document.body.appendChild(el);

        G.define('JQueryTest', function () {

            try {
                expect(this.$el[0]).to.be(el);
                done();
            } catch (e) {
                done(e);
            }

        });
    });

    it('supports element maps', function (done) {
        var el = document.createElement('div');
        el.setAttribute('data-gremlin', 'ElementMapTest');
        el.innerHTML = '<span class="foo">foo</span>'

        document.body.appendChild(el);

        G.define('ElementMapTest', function () {

                try {
                    expect(this.foo.length).to.be(1);
                    expect(this.foo.text()).to.be('foo');
                    expect(this.bar.length).to.be(0);
                    done();
                } catch (e) {
                    done(e);
                }

            },
            {

            },
            {
                elements: {
                    bar: 'bar',
                    '.foo': 'foo'
                }
            });
    });

    it('supports event maps', function (done) {
        var el = document.createElement('div');
        el.setAttribute('data-gremlin', 'EventMapTest');
        el.innerHTML = '<button class="foo">CLICK</button>'

        document.body.appendChild(el);

        var EventMapTest = G.define('EventMapTest', function () {
                $(el).mouseenter();
                $(el).find('button').click();
                $(el).append("<form></form>");
                $(el).find('form').submit();
            },
            {
                onHover: function(evt, context){
                    try {
                        expect(this).to.be.an(EventMapTest);
                        expect(evt.target).to.be(this.el);
                        expect(context).to.be(this.el);
                    } catch (e) {
                        done(e);
                    }
                },
                onClick: function (evt, context) {
                    try {
                        expect(this).to.be.an(EventMapTest);
                        expect(evt.target).to.be($(el).find('button')[0]);
                        expect(context).to.be($(el).find('button')[0]);
                    } catch (e) {
                        done(e);
                    }
                },
                onSubmit: function (evt, context) {
                    evt.preventDefault();
                    try {
                        expect(this).to.be.an(EventMapTest);
                        expect(evt.target).to.be($(el).find('form')[0]);
                        expect(context).to.be($(el).find('form')[0]);
                        done();
                    } catch (e) {
                        done(e);
                    }
                }

            },
            {
                events: {
                    'mouseenter' : 'onHover',
                    'click button': 'onClick',
                    'submit form' : 'onSubmit'
                }
            }
        );


    });

});