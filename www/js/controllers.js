angular.module('starter.controllers', ['ngCordova','ngCordova.plugins.device'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
 /* $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };*/
})
.controller('LoginCtrl', function($scope, $ionicModal, $timeout,$http,$state) {
$scope.loginData={};
 $scope.login=function(){
   $scope.usernamenull="b";
   $scope.passwordnull="b";
   console.log($scope.loginData.username);
  if(!$scope.loginData.username){
   $scope.usernamenull="a";
   $scope.message="Please enter your username and password."
  }
   if(!$scope.loginData.password){
   $scope.passwordnull="a";
   $scope.message="Please enter your username and password."
  }
    else{
  var _condigHeader = {
    headers: {
        'Authorization': 'Basic 23423432',
        'Access-Control-Allow-Headers':'Origin; X-Requested-With; Content-Type; Accept',
        'Access-Control-Allow-Methods':'GET; POST',
        'Access-Control-Allow-Origin':'*',
       'Accept': 'application/json; charset=utf-8',
       'Content-Type': 'application/json; charset=utf-8'
   }
};  
                var dataPost = {
                    
                        "username": $scope.loginData.username,
                         "password": $scope.loginData.password


                        
                    
                };
               
                $http({
                    url:'http://api-dev.gdesk.io/v3/auth/login',
                     _condigHeader,
                    method: 'POST',
                    data: dataPost
                }).then(function (response) {
                    
                    $scope.ListData = response;
                    if(response.data.success==true){
                      $scope.message="success";
                    }
                    else{ $scope.message=$scope.ListData.data.message;}

                   
                   
                });
              }

}
$scope.create=function(){
  $state.go("signup")
}

 
})
.controller('SignupCtrl', function($scope, $ionicModal, $timeout,$state,$http) {
$scope.data={};

 $scope.continue=function(){
    $scope.themduoc=true;
        $scope.firstnamenull="b";
        $scope.lastnamenull="b";
        $scope.emailnull="b";
        $scope.usernamenull="b";
        $scope.passwordnull="b";
        $scope.companynull="b";
    if ($scope.data.firstname){ window.localStorage.setItem("firstname", $scope.data.firstname);}
    else{$scope.firstnamenull="a";$scope.themduoc=false;
  }
       
         if ($scope.data.lastname){ window.localStorage.setItem("lastname", $scope.data.lastname);}
    else{$scope.lastnamenull="a";$scope.themduoc=false;}
        
         if ($scope.data.email){ window.localStorage.setItem("email", $scope.data.email);}
    else{$scope.emailnull="a";$scope.themduoc=false;}
       
         if ($scope.data.username){ window.localStorage.setItem("username", $scope.data.username);
       if($scope.data.username.trim().split('').length<=6){
      $scope.message="Oops! Username is too short.";
      $scope.usernamenull="a"
      $scope.themduoc=false;
    }}
    else{$scope.usernamenull="a";$scope.themduoc=false;}
        
         if ($scope.data.password){ window.localStorage.setItem("password", $scope.data.password);
         if($scope.data.password.trim().split('').length<=6){
      $scope.message="Oops! Password is too short.";
      $scope.passwordnull="a"
      $scope.themduoc=false;
    }}
    else{$scope.passwordnull="a";$scope.themduoc=false;}


       if ($scope.data.company){ window.localStorage.setItem("company", $scope.data.company);}
    else{$scope.companynull="a";$scope.themduoc=false;}

    if($scope.themduoc==true){



var _condigHeader = {
    headers: {
        'Authorization': 'Basic 23423432',
        'Access-Control-Allow-Headers':'Origin; X-Requested-With; Content-Type; Accept',
        'Access-Control-Allow-Methods':'GET; POST',
        'Access-Control-Allow-Origin':'*',
       'Accept': 'application/json; charset=utf-8',
       'Content-Type': 'application/json; charset=utf-8'
   }
};  
                var dataPost = {
                    
                        "username": $scope.data.username,
                         "email": $scope.data.email


                        
                    
                };
               
                $http({
                    url:'http://api-stage.gdesk.io/v2/auth/profileexist',
                     _condigHeader,
                    method: 'POST',
                    data: dataPost
                }).then(function (response) {
                    
                    $scope.ListData = response;
                    if($scope.ListData.data.success==true){
                   $state.go("signupdetail");
                 
                    }
                    else{ $scope.message=$scope.ListData.data.message}
                });

     
     

    }

 }




$scope.haveaccount=function(){

  $state.go("login")
}

 
})
.controller('SignupdetailCtrl', function($scope,$http, $ionicPlatform,$ionicModal, $timeout,$state,$cordovaDevice) {
  
  $scope.data={}; 
  document.addEventListener("deviceready", function () {

    var device = $cordovaDevice.getDevice();

    var cordova = $cordovaDevice.getCordova();

    var model = $cordovaDevice.getModel();

    var platform = $cordovaDevice.getPlatform();

    $scope.uuid=$cordovaDevice.getUUID();

    var version = $cordovaDevice.getVersion();
  
  }, false);


$scope.themduoc=true;
    $scope.save=function(){
      $scope.themduoc=true;
      $scope.companyphonenull="b";
      $scope.streetaddressnull="b";
      $scope.aptnull="b";
      $scope.citynull="b";
      $scope.stanull="b";
      $scope.zipcodenull="b";

    if (!$scope.data.companyphone){$scope.companyphonenull="a";$scope.themduoc=false;}

       
         if (!$scope.data.streetaddress){$scope.streetaddressnull="a";$scope.themduoc=false;}
  
        
         if (!$scope.data.apt){$scope.aptnull="a";$scope.themduoc=false;}
       
         if (!$scope.data.city){$scope.citynull="a";$scope.themduoc=false;}

        
         if (!$scope.data.sta){$scope.stanull="a";$scope.themduoc=false;}



       if (!$scope.data.zipcode){$scope.zipcodenull="a";$scope.themduoc=false;}
   

    if($scope.themduoc==true){

      var _condigHeader = {
    headers: {
        'Authorization': 'Basic 23423432',
        'Access-Control-Allow-Headers':'Origin; X-Requested-With; Content-Type; Accept',
        'Access-Control-Allow-Methods':'GET; POST',
        'Access-Control-Allow-Origin':'*',
       'Accept': 'application/json; charset=utf-8',   
       'Content-Type': 'application/json; charset=utf-8'
   }
};  

                var dataPost = {
                    
                        "company":{"address":$scope.data.streetaddress,
                        "apt":$scope.data.apt,
                        "city":$scope.data.city,
                        "phone":$scope.data.companyphone,
                        "state":$scope.data.sta,
                        "zipcode":$scope.data.zipcode},
                        "device":(!angular.isUndefined($scope.uuid)) ? $scope.uuid : ionic.Platform.platform()+ionic.Platform.version(),
                        "profile":{"company_name":window.localStorage.getItem("company"),
                        "email":window.localStorage.getItem("email"),
                        "first_name":window.localStorage.getItem("firstname"),
                        "last_name":window.localStorage.getItem("lastname"),
                        "password":window.localStorage.getItem("password"),
                        "username":window.localStorage.getItem("username")}


                        
                    
                };
               
                $http({
                    url:'http://api-stage.gdesk.io/v2/auth/signup',
                     _condigHeader,
                    method: 'POST',
                    data: dataPost
                }).then(function (response) {
                    
                    $scope.ListData = response;
                    if($scope.ListData.data.success==true){
                        window.localStorage.setItem("message",$scope.ListData.data.message);
                   $state.go("chucmung");
                  
                    }
                    else{ $scope.message=$scope.ListData.data.message
                     }
                });



     
     

    }
  }



})

.controller('ChucmungCtrl', function($scope,$http, $ionicPlatform,$ionicModal, $timeout,$state,$cordovaDevice) {

$scope.message=window.localStorage.getItem("message");
 $scope.login=function(){
                    window.localStorage.removeItem("company");
                    window.localStorage.removeItem("email");
                    window.localStorage.removeItem("firstname");
                    window.localStorage.removeItem("lastname");
                    window.localStorage.removeItem("password");
                    window.localStorage.removeItem("username");
  $state.go("login");
 }


})


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
