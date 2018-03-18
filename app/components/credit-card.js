import Ember from 'ember';

export default Ember.Component.extend({

  setCurrentDate: Ember.on('init', function(){
    //override `today` property for integration tests
    if (!this.get("today")) {
      this.set('today', new Date());
    }
  }),

  today: null,
  card: null,
  classNames: ['credit-card', 'text-left'],

  //binds class name of 'is-expire' when the `isExpired` property is true.
  classNameBindings: ["isExpired"],

  //returns true if `card` is expired, otherwise returns false.
  isExpired: Ember.computed("card.expirationMonth", "card.expirationYear", function() {
    let expMonth = this.get("card.expirationMonth");
    let expYear = this.get("card.expirationYear");

    var today = new Date();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if (expYear < yyyy || (expYear === yyyy && expMonth < mm) )  {
      return true
    }
    else {
      return false;
    }
  }),

/*

  exampleCard: {
    type: "Visa",
    accountNumber: 1234567890123456,
    name: "Jeremy Smith",
    expirationMonth: "12",
    expirationYear: "2016"
  },

*/
});
