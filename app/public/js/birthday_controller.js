myApp.controller('BirthdayController', BirthdayController);

BirthdayController.$inject = ['$http'];

function BirthdayController($http) {
  var birthday = this;

  birthday.entry = "07/04";
  birthday.fact = "July 4th marks the birthday of both the United States and Julia Pearson.";

  birthday.loading = false;

  birthday.checkDate = function(input){
    var month_day = input.split('/');
    var date = { month: parseInt(month_day[0]), day: parseInt(month_day[1])};
    var maxDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // checking that input is formatted xx/xx or X/XX or XX/X
    if(month_day.length != 2 || month_day[0].length > 2 || month_day[0].length > 2){
      return false;
    } 
    else if (0 > date.month || date.month > 12){
      return false;
    } 
    else if (maxDays[date.month-1] < date.day){
      return false;
    }
    else {
      return true
    };
  }

  birthday.postFact = function(fact){
    birthday.fact = fact;
  }

  birthday.toggleLoading = function(){
    birthday.loading = !birthday.loading;
  }

  birthday.getFact = function(){
    // stops toggle if user hasn't clicked input box and triggered toggleLoading
    // for when user is asking for more facts for the same birthday
    if(!birthday.fact){
      birthday.toggleLoading();
    };

    var newFact;
    if(birthday.checkDate(birthday.entry)){
      $http
          .get('http://numbersapi.com/'+birthday.entry)
          .then(function(response){
            var statusCheck = response.statusText;
            birthday.postFact(response.data);
          });     
    } else {
      birthday.fact = "That is not a date, it cannot be your birthday, and you should try formating it MM/DD.";
    }
  };

  birthday.clearFact = function(){
    birthday.fact = false;
    birthday.toggleLoading();
  };
};