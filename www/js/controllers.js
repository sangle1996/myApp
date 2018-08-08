angular.module('starter.controllers', ['ngCordova.plugins.file','ngCordova.plugins.device'])

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
.controller('LoginCtrl', function($scope, $ionicModal,$ionicLoading, $timeout,$http,$state) {
$scope.loginData={};
 $scope.login=function(){
   $scope.usernamenull="b";
   $scope.passwordnull="b";
   $scope.themduoc=true;
   console.log($scope.loginData.username);
  if(!$scope.loginData.username){
   $scope.usernamenull="a";
   $scope.message="Please enter your username and password.";
   $scope.themduoc=false;
  }
   if(!$scope.loginData.password){
   $scope.passwordnull="a";
   $scope.message="Please enter your username and password.";
   $scope.themduoc=false;
  }
    else if($scope.themduoc==true){
      $ionicLoading.show();
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
                       $ionicLoading.hide();
                      $scope.message="success";
                      $state.go("draw");
                    }
                    else{ $scope.message=$scope.ListData.data.message;$ionicLoading.hide();}

                   
                   
                });
              }

}
$scope.create=function(){
  $state.go("signup", {}, { reload: true })
}

 
})
.controller('SignupCtrl', function($scope,$ionicLoading, $ionicModal, $timeout,$state,$http) {
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
      $ionicLoading.show();



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
                        $ionicLoading.hide();
                   $state.go("signupdetail");
                 
                    }
                    else{ $scope.message=$scope.ListData.data.message;$ionicLoading.hide();}
                });

     
     

    }


 }




$scope.haveaccount=function(){

  $state.go("login")
}

 
})
.controller('SignupdetailCtrl', function($scope,$http,$ionicLoading, $ionicPlatform,$ionicModal, $timeout,$state,$cordovaDevice) {
  
  $scope.data={}; 
  document.addEventListener("deviceready", function () {

    var device = $cordovaDevice.getDevice();

    var cordova = $cordovaDevice.getCordova();

     $scope.model = $cordovaDevice.getModel();

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
                        "device":(!angular.isUndefined($scope.model)) ? $scope.model : ionic.Platform.platform()+ionic.Platform.version(),
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
                    else{ $scope.message=$scope.ListData.data.message;
                   
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
  $state.go("login",{}, { reload: true });
 }


})

.controller('DrawCtrl', function($cordovaFile,$rootScope,$scope,$http, $ionicPlatform,$ionicModal, $timeout,$state,$cordovaDevice) {

$scope.data={};
$scope.data.drawline=false;
$scope.data.draw=false;
function changeObjectSelection(value) {
 
  canvas.forEachObject(function (obj) {
    obj.selectable = value;
  });
  canvas.renderAll();
}

function removeEvents() {
  
  canvas.isDrawingMode = false;//// can't draw the line
  canvas.selection = false;/// can't select any thing
  canvas.off('mouse:down');/// turn off this event
  canvas.off('mouse:up');
  canvas.off('mouse:move');
}


$scope.value = 10;// default size off brush
$scope.min = 5;  // min size off brush
$scope.max = 90;// max size off brush
$scope.stylecolor= {'background':'linear-gradient(to right, red '+ parseInt((($scope.value-5)/85)*100)+'%, #ccc '+ parseInt(1-(($scope.value-5)/85))*100+'%)','background-size':'99% 2px','background-repeat': 'no-repeat','background-position': 'center'};
///////// MIN MAX DRAW
$scope.setlevel=function(value){
  $scope.stylecolor= {'background':'linear-gradient(to right, red '+ parseInt(((value-5)/85)*100)+'%, #ccc '+ parseInt(1-((value-5)/85))*100+'%)','background-size':'99% 2px','background-repeat': 'no-repeat','background-position': 'center'};
    //$scope.stylecolor= {'background-size':'99% 2px'};
$scope.value=value;
canvas.freeDrawingBrush.width=Math.abs($scope.value);// the value on change and remake the size of brush
// do need the renderALL();

console.log($scope.stylecolor);
}



///////// MIN MAX DRAW


// MODE DRAW LINE, DRAW CIRCLE,...
$scope.data.drawline=false;
 $scope.mode=function(){


if($scope.data.draw==0){
  removeEvents();
  changeObjectSelection(true);
  canvas.selection = true;
     $scope.data.drawline=false;
     $scope.data.drawcircle=false;
     $scope.data.drawtext=false;
}
   if($scope.data.draw==1){

     if($scope.data.drawline&&!$scope.data.drawcircle&&!$scope.data.drawtext){
        
          drawingLine();
         
           $scope.data.drawline=true;

            }
            else if($scope.data.drawcircle&&!$scope.data.drawtext)
            {
             
              drawCircle();
            }
             else if($scope.data.drawtext)
            {
              drawText();
            }
            else{ 
              drawSquare();
            }

 
}
}
// MODE DRAW LINE, DRAW CIRCLE,...



changecolor= function() {
    drawingLine();
  };




var canvas = new fabric.Canvas('c',  {selection: false}  );




/// BEGIN DRAWING LINE
var drawingLine= function(){
        canvas.discardActiveObject();
      removeEvents();
      changeObjectSelection(false);
       canvas.selection=false;
        canvas.isDrawingMode=true;
       // get hide=false cause undifine in first call with ng-if of drawline=false
        
        if($scope.data.drawline&&!$scope.data.hide){
          canvas.freeDrawingBrush.color=document.getElementById("myColor").value;
          }
else if($scope.data.drawline&&$scope.data.hide)
 
{

     canvas.freeDrawingBrush.color="transparent";
     canvas.on('mouse:move', function(o){
       canvas.freeDrawingBrush.color=document.getElementById("myColor").value;
     });
     canvas.on('mouse:up', function(o){
       canvas.freeDrawingBrush.color="transparent";
     });

}


}
/// BEGIN DRAWING LINE


/// BEGIN DRAWING TEXT


       $scope.Addtext = function () {

                removeEvents();
                changeObjectSelection(false);
                var colors = document.getElementById("myColor").value;
             
// create a rectangle object
                        var itext = new fabric.IText('This is a IText object', {
                         left: 100,
                         top: 150,
                         fill: '#D81B60',
                         strokeWidth: 1,
                          stroke: "#880E4F",
                        });

                     

                canvas.add(itext).setActiveObject(itext);
                
                canvas.on('mouse:down', function(e) {console.log("donotthing")});
               
                 canvas.on('text:selection:changed', function(e) {
                  console.log('change', e.target, e);
                  canvas.setActiveObject(itext);
                 
});             
                $scope.data.draw=false;
                $scope.mode();








            };



/// BEGIN DRAWING TEXT



////// BEGIN: ADD THE RULER
 

    canvas.renderAll();//reset
    $scope.data.zoom=30;// default zoom
    $scope.zoomless=30;// min zoom
    $scope.zoommax=120;// max zoom
$scope.ruler=function(){
  /////// ALL CHANGE ZOOM WITH FUNCTION:"setzoom" 
 $scope.setzoom=function(intzoom){

  if($scope.data.ruler){
var xobj = {};
var xtext = {};
var yobj = {};
var ytext = {};
var ytext = {};
var xs=[];
var ys=[];


for(var i=parseInt(intzoom);i<=500;i+=parseInt(intzoom)){
 
///////////// stripe  AND RULER X
  

///rulerx
   var text = new fabric.Text(i.toString(), {
      fontFamily: 'Comic Sans',
      fontSize: 15,
      width: 1, 
      height: 1000 , 
      left: i-10,
      top: 0,
    });
   xtext=text;
   xs.push(xtext);
///rulerx


///rulery
   var texty = new fabric.Text(i.toString(), {
      fontFamily: 'Comic Sans',
      fontSize: 15,
      width: 1000, 
      height: 1 , 
      left: 0,
      top: i-10,
    });
   ytext=texty;
   xs.push(ytext);
///rulery
  
   
   x = new fabric.Rect({ 
         width: 1, 
         height: 1000 , 
         left: i,
         top: 15,
         fill :'rgba(204, 204, 204, 1)'
    });
   xobj=x;
   xs.push(xobj);
///////////// stripe  AND RULER X

     y = new fabric.Rect({ 
         width: 1000, 
         height: 1 , 
         left: 15,
         top: i,
         fill :'rgba(204, 204, 204, 1)'
    });
    yobj=y;
    xs.push(yobj);

   
}

var alltogetherObj = new fabric.Group(xs);

 canvas.setBackgroundImage(alltogetherObj);
 canvas.renderAll(); 
}
else{ canvas.backgroundImage = false;
canvas.renderAll(); }
    }
  }

////// END: ADD THE RULER
var objects = canvas.getObjects();
//var numb=0;
//  $scope.left=[];
//
/*
 $scope.setzoomobject=function(intzoom){

for (var i in objects) {
  
 //    numb=numb+1;
  //   $scope.left[numb]= objects[i].left;
  //   $scope.top[numb]=objects[i].top;
    // console.log(objects[i].left,$scope.left[1]+(intzoom-30));
  //  culeftnew-culeftcu=intzoom-30
   // var tempLeft = $scope.left[1]+(intzoom-30);
  //  var tempTop = $scope.top[1]+(intzoom-30);
    objects[i].scaleX = intzoom/30;
    objects[i].scaleY = intzoom/30;
  //  objects[i].left = tempLeft;
 //   objects[i].top = tempTop; 
    
  
}

canvas.renderAll();
canvas.calcOffset();


} 
*/
///UPLOAD object ( CAN EDIT THE CANVAS THAT SAVED )
 var cop=$rootScope.$on("upload",function(event, opt){
                     $scope.loadJson(opt.a); 
                      });
                 $scope.$on('$destroy', function() {
    cop();
});
  ///UPLOAD object ( CAN EDIT THE CANVAS THAT SAVED )


  ////// DRAW SQUARE
function drawSquare() { 

 canvas.discardActiveObject();
  removeEvents();
  changeObjectSelection(false);
   canvas.selection=false;

var square, isDown, origX, origY;


canvas.on('mouse:down', function(o){
  var colors = document.getElementById("myColor").value;

  isDown = true;
  var pointer = canvas.getPointer(o.e);
  origX = pointer.x;
  origY = pointer.y;
     square = new fabric.Rect({ 
         width:  0, 
         height: 0, 
         left: pointer.x,
         top: pointer.y,
         strokeWidth:Math.abs($scope.value),
         fill: 'transparent',
         stroke: colors,
         selectable: false,
        originX: 'center', originY: 'center',
        hasRotatingPoint : false
    });

  canvas.add(square);
});

canvas.on('mouse:move', function(o){ //// THIS IS ALREADY CHANGE PER MOVE



 if (!isDown) return;

    var mouse = canvas.getPointer(o.e);

    var w = Math.abs(origX- mouse.x),///// MATH.ABS CAN MAKE 1,2=1
    h = Math.abs(origY- mouse.y);

    if (!w || !h) {
        return false;
    }


    square.set('width', w).set('height', h);
    canvas.renderAll(); 

});
  
canvas.on('mouse:up', function(o){
  
    isDown = false;
     square.setCoords();// WHEN CLICK OFF  'circle.setCoords()'  with set the location correct when the current RECT just make
 
});


}

  ////// DRAW SQUARE

  ////// DRAW SIRCLE

  function drawCircle() { 
 canvas.discardActiveObject();
  removeEvents();
  changeObjectSelection(false);
   canvas.selection=false;

  var circle, isDown, origX, origY;

canvas.on('mouse:down', function(o){
   var colors = document.getElementById("myColor").value;
  isDown = true;
  var pointer = canvas.getPointer(o.e);
  origX = pointer.x;
  origY = pointer.y;
  circle = new fabric.Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 1,
    strokeWidth: Math.abs($scope.value),
    stroke: colors,
    fill: 'transparent',
    selectable: false,
    originX: 'center', originY: 'center',
    hasRotatingPoint : false
  });
  canvas.add(circle);
});

canvas.on('mouse:move', function(o){
  if (!isDown) return;
  var pointer = canvas.getPointer(o.e);
  circle.set({ radius: Math.abs(origX - pointer.x) });
  canvas.renderAll();
});

canvas.on('mouse:up', function(o){
  
  isDown = false;
  circle.setCoords();
});
}
  ////// DRAW SIRCLE


/// SAVE IMAGE
$scope.saveImg=function(){    
console.log('export image');
 if (!fabric.Canvas.supports('toDataURL')) {
  alert('This browser doesn\'t provide means to serialize canvas to an image');
}
else {
  console.log(canvas.toDataURL('png'));
}
}
/// SAVE IMAGE




////SAVE JSON AS TEXT
$scope.saveJson=function(){    
 canvas.backgroundImage = null;
saveText(JSON.stringify(canvas.toJSON()), "test.txt" );
}

function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
   document.addEventListener('deviceready', function () {
  $cordovaFile.writeFile(cordova.file.externalRootDirectory, "file.txt", text, true)
      .then(function (success) {
        alert('success');
      }, function (error) {
         alert('error');
        // error
      });
    });

}

////SAVE JSON AS TEXT




///LOAD JSON

$scope.loadJson=function(obj){
   $scope.data.ruler=0;
   //obj.set({ hasRotatingPoint : false})
  canvas.loadFromJSON(obj);

  changeObjectSelection(true);
  canvas.renderAll();

};

///LOAD JSON




///DELETE 
 $scope.clear=function(){
  for(var i=0; i<=canvas.getActiveObjects().length;i++){
    canvas.remove(canvas.getActiveObjects()[i]);}
    }
    ///DELETE 
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
})
/////////////UPLOAD OBJECT
.factory('readFile', function ($window,$rootScope, $q) {
    'use strict';

    var readFile = function (file) {
       
        var deferred = $q.defer(),  
            reader = new $window.FileReader();

        reader.onload = function (ev) {
            var content = ev.target.result;
            deferred.resolve(content);
        };
     
        reader.readAsText(file);
         

        return deferred.promise;
    };

    return readFile;
})
.directive('fileHandler', function (readFile) {
    'use strict';

    return {
        link: function (scope, element) {
            element.on('change', function (event) {
                var file = event.target.files[0];
                readFile(file).then(function (content) {
                    console.log(content);
                });
            });
        }
    };
})
.directive('fileBrowser', function (readFile,$rootScope) {

    'use strict';


    return {
        template: '<input  type="file" accept="json/*" style="display: none;" />' +
            '<ng-transclude></ng-transclude>',
        transclude: true,
        link: function (scope, element) {
            var fileInput = element.children('input[file]');
          
            fileInput.on('change', function (event) {
                var file = event.target.files[0];
               
                readFile(file).then(function (content) {
                 $rootScope.$broadcast("upload", { a: content});
                 
                });
            });
            
            element.on('click', function () {
                fileInput[0].click();
            });
        }
    };
});

/////////////UPLOAD OBJECT

