'use strict';

describe('BirthdayController', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('birthday.checkDate', function() {
    it('checks that input is formatted MM/DD and is valid date', function() {
      var birthday;
      var controller = $controller('BirthdayController', { birthday: birthday });
      
      expect(birthday.checkDate('01/31')).toMatch(true);
      expect(birthday.checkDate('12/31')).toMatch(true);
      expect(birthday.checkDate('1/1')).toMatch(true);
      expect(birthday.checkDate('22/05')).toMatch(false);
      expect(birthday.checkDate('06/31')).toMatch(false);
      expect(birthday.checkDate('06/15/93')).toMatch(false);
      expect(birthday.checkDate('06')).toMatch(false);
    });
  });

  describe('birthday.postFact', function() {
    it('Sets birthday.fact equal to funtion\'s input', function() {
      var birthday;
      var controller = $controller('BirthdayController', { birthday: birthday });
      
      birthday.postFact('apple');
      expect(birthday.fact).toMatch('apple');
    });
  });

  describe('birthday.toggleLoading', function() {
    it('Sets birthday.loading to the opposite of its previous value', function() {
      var birthday;
      var controller = $controller('BirthdayController', { birthday: birthday });
      
      var originalState = birthday.loading;
      birthday.toggleLoading();
      expect(birthday.loading).toMatch(!originalState);
    });
  });

  describe('birthday.getFact', function(){
    it('If fact was loading (fact = false), triggers loading toggle. If birthday entry is correct, it receives statusText "OK" from API, else it matches error message', function(){
      var birthday;
      var controller = $controller('BirthdayController', { birthday: birthday });
 
      // If was loading, triggers loading toggle.
      var originalToggleState = birthday.loading;
      if(birthday.fact){
        birthday.getFact();
        expect(originalToggleState).toMatch(birthday.loading);
      } else {
        birthday.getFact();
        expect(originalToggleState).toMatch(!birthday.loading);
      }

      // If birthday entry is correct, it receives statusText "OK" from API, else fact matches error message'
      birthday.entry = '07/04'; 
      birthday.getFact();
      expect(statusCheck).toMatch('OK');
        
      birthday.entry = '20/04'; 
      birthday.getFact(); 
      expect(birthday.fact).toMatch("That is not a date, it cannot be your birthday, and you should try formating it MM/DD.");     

    });
  });

  describe('birthday.clearFact', function() {
    it('Sets birthday.fact to false and runs toggleLoading', function() {
      var birthday;
      var controller = $controller('BirthdayController', { birthday: birthday });
        
      var originalToggleState = birthday.loading;
      birthday.clearFact();
      expect(birthday.fact).toMatch(false);
      expect(originalToggleState).toMatch(!birthday.loading);
    });
  });

});