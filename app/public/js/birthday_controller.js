myApp.controller('BirthdayController', BirthdayController);

BirthdayController.$inject = ['$http'];

function BirthdayController($http) {
  var birthday = this;

  birthday.entry = "07/04/1993";
  birthday.fact = "July 4th marks the birthday of both the United States and Julia Pearson.";

  birthday.date;
  birthday.age = 23;

  birthday.loading = false;

  birthday.errorMessage = "That is either not a date or you should try formating it MM/DD/YYYY.";

  birthday.checkDate = function(input){
    // [03,02,1995]
    var month_day = input.split('/');
    birthday.date = { month: parseInt(month_day[0]), day: parseInt(month_day[1]), year:parseInt(month_day[2])};
    var maxDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // checking that input is formatted MM/DD/YYYY, M/DD/YYYY, MM/D/YYYY, or M/D/YYYY
    if(month_day.length != 3 || month_day[0].length > 2 || month_day[1].length > 2 || month_day[2].length != 4){
      return false;
    } 
    else if (birthday.date.month > 12){
      return false;
    } 
    else if (maxDays[birthday.date.month-1] < birthday.date.day){
      return false;
    }
    else if (birthday.date.year > 2016){
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
    $http
        .get('http://numbersapi.com/'+birthday.date.month+'/'+birthday.date.day)
        .then(function(response){
          var statusCheck = response.statusText;
          birthday.postFact(response.data);
        });     
  };

  birthday.clearFact = function(){
    birthday.fact = false;
    birthday.toggleLoading();
  };

  birthday.getAge = function(){
    var currentDate = new Date();
    if(currentDate.getMonth()+1 < birthday.date.month){
      birthday.age = currentDate.getFullYear() - birthday.date.year - 1;
    }else if (currentDate.getMonth()+1 == birthday.date.month && currentDate.getDate() < birthday.date.day){
      birthday.age = currentDate.getFullYear() - birthday.date.year - 1;
    }
    else{
      birthday.age = currentDate.getFullYear() - birthday.date.year;
    }
  }

  birthday.inquiry = function(){
    // stops toggle if user hasn't clicked input box and triggered toggleLoading
    // for when user is asking for more facts for the same birthday
    if(!birthday.fact){
      birthday.toggleLoading();
    };
    var validDate = birthday.checkDate(birthday.entry);
    
    if(validDate){
      birthday.getAge();
    };

    if(validDate){
      birthday.getFact();    
    } else {
      birthday.postFact(birthday.errorMessage);
    };
  };

};






