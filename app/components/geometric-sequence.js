import Ember from 'ember';

export default Ember.Component.extend({

  init: function(){
    this.initializeSequence();
    this._super();
  },

  initializeSequence: function(){
    //geometric sequence of ^2: 1, 2, 4, 8, 16, etc...
    this.set("geometricSequence", Ember.A([1, 2, 4]));
  },

  didRender() {
    this._super(...arguments);
  },

  classNames: ["geometric-sequence"],

  //set in component initializer
  geometricSequence: null,

  //reverse sequence is rendered in geometric-sequence.hbs
  reverseSequence: Ember.computed('geometricSequence', 'geometricSequence.@each', function() {
    let reverse = [];
    let seq = this.get('geometricSequence');

    seq.forEach(function(num) {
      reverse.unshift(num);
    })

    return reverse;
  }),

  actions:{
    updateSequence: function(){
      let sequence = this.get('geometricSequence');
      let last = sequence[sequence.length-1];

      if (sequence.length === 10) {
        sequence.shift()
      }

      if (sequence.length < 10) {
        sequence.push(last*2);
        this.set('geometricSequence', sequence);
        this.notifyPropertyChange('geometricSequence');
        this.didRender('reverseSequence');
      }

      if (last >= 32767) {
        this.set('geometricSequence', [1, 2, 4]);
        this.notifyPropertyChange('geometricSequence');
        this.didRender('reverseSequence');
      }
    }
  }
});
