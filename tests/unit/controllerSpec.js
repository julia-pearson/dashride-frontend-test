'use strict';

describe('BirthdayController', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('birthday.checkDate', function() {
    it('checks that input is formatted MM/DD/YYYY and is valid date', function() {
      var birthday;
      var controller = $controller('BirthdayController', { birthday: birthday });
      
      expect(birthday.checkDate('01/31/1993')).toMatch(true);
      expect(birthday.checkDate('12/31/2000')).toMatch(true);
      expect(birthday.checkDate('1/1/1953')).toMatch(true);
      expect(birthday.checkDate('22/05/2000')).toMatch(false);
      expect(birthday.checkDate('06/31/2000')).toMatch(false);
      expect(birthday.checkDate('06/15/93')).toMatch(false);
      expect(birthday.checkDate('06/15/1993/50')).toMatch(false);
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
    it('If birthday entry is correct, it receives statusText "OK" from API', function(){
      var birthday;
      var controller = $controller('BirthdayController', { birthday: birthday });

      // If birthday entry is correct, it receives statusText "OK" from API, else fact matches error message'
      birthday.entry = '07/04/1993'; 
      birthday.getFact();
      expect(statusCheck).toMatch('OK');    

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

  describe('birthday.getAge', function() {
    it('sets user\'s age based on birthday, making sure to account for upcoming birthdays within the year', function() {
      var birthday;
      var controller = $controller('BirthdayController', { birthday: birthday });
      
      expect(birthday.getAge('01/31/1993')).toMatch(23);
      expect(birthday.getAge('08/12/2000')).toMatch(15);

    });
  });  

});