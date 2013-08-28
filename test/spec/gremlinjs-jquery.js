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
                $(el).find('button').click();
            },
            {
                onClick: function (evt, context) {
                    try {
                        expect(this).to.be.an(EventMapTest);
                        expect(evt.target).to.be($(el).find('button')[0]);
                        expect(context).to.be($(el).find('button')[0]);
                        done();
                    } catch (e) {
                        done(e);
                    }
                }
            },
            {
                events: {
                    'click button': 'onClick'
                }
            }
        );


    });

});