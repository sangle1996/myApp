angular.module('starter.controllers', ['ngCordova.plugins.file', 'ngCordova.plugins.device']).controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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
  }).controller('LoginCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $http, $state) {
    $scope.loginData = {};
    $scope.login = function() {
      $scope.usernamenull = "b";
      $scope.passwordnull = "b";
      $scope.themduoc = true;
      // console.log($scope.loginData.username);
      if (!$scope.loginData.username) {
        $scope.usernamenull = "a";
        $scope.message = "Please enter your username and password.";
        $scope.themduoc = false;
      }
      if (!$scope.loginData.password) {
        $scope.passwordnull = "a";
        $scope.message = "Please enter your username and password.";
        $scope.themduoc = false;
      } else if ($scope.themduoc == true) {
        $ionicLoading.show();
        var _condigHeader = {
          headers: {
            'Authorization': 'Basic 23423432',
            'Access-Control-Allow-Headers': 'Origin; X-Requested-With; Content-Type; Accept',
            'Access-Control-Allow-Methods': 'GET; POST',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          }
        };
        var dataPost = {
          "username": $scope.loginData.username,
          "password": $scope.loginData.password
        };
        $http({
          url: 'http://api-dev.gdesk.io/v3/auth/login',
          _condigHeader,
          method: 'POST',
          data: dataPost
        }).then(function(response) {
          $scope.ListData = response;
          if (response.data.success == true) {
            $ionicLoading.hide();
            $scope.message = "success";
            $state.go("draw");
          } else {
            $scope.message = $scope.ListData.data.message;
            $ionicLoading.hide();
          }
        });
      }
    }
    $scope.create = function() {
      $state.go("signup", {}, {
        reload: true
      })
    }
  }).controller('SignupCtrl', function($scope, $ionicLoading, $ionicModal, $timeout, $state, $http) {
    $scope.data = {};
    $scope.continue = function() {
      $scope.themduoc = true;
      $scope.firstnamenull = "b";
      $scope.lastnamenull = "b";
      $scope.emailnull = "b";
      $scope.usernamenull = "b";
      $scope.passwordnull = "b";
      $scope.companynull = "b";
      if ($scope.data.firstname) {
        window.localStorage.setItem("firstname", $scope.data.firstname);
      } else {
        $scope.firstnamenull = "a";
        $scope.themduoc = false;
      }
      if ($scope.data.lastname) {
        window.localStorage.setItem("lastname", $scope.data.lastname);
      } else {
        $scope.lastnamenull = "a";
        $scope.themduoc = false;
      }
      if ($scope.data.email) {
        window.localStorage.setItem("email", $scope.data.email);
      } else {
        $scope.emailnull = "a";
        $scope.themduoc = false;
      }
      if ($scope.data.username) {
        window.localStorage.setItem("username", $scope.data.username);
        if ($scope.data.username.trim().split('').length <= 6) {
          $scope.message = "Oops! Username is too short.";
          $scope.usernamenull = "a"
          $scope.themduoc = false;
        }
      } else {
        $scope.usernamenull = "a";
        $scope.themduoc = false;
      }
      if ($scope.data.password) {
        window.localStorage.setItem("password", $scope.data.password);
        if ($scope.data.password.trim().split('').length <= 6) {
          $scope.message = "Oops! Password is too short.";
          $scope.passwordnull = "a"
          $scope.themduoc = false;
        }
      } else {
        $scope.passwordnull = "a";
        $scope.themduoc = false;
      }
      if ($scope.data.company) {
        window.localStorage.setItem("company", $scope.data.company);
      } else {
        $scope.companynull = "a";
        $scope.themduoc = false;
      }
      if ($scope.themduoc == true) {
        $ionicLoading.show();
        var _condigHeader = {
          headers: {
            'Authorization': 'Basic 23423432',
            'Access-Control-Allow-Headers': 'Origin; X-Requested-With; Content-Type; Accept',
            'Access-Control-Allow-Methods': 'GET; POST',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          }
        };
        var dataPost = {
          "username": $scope.data.username,
          "email": $scope.data.email
        };
        $http({
          url: 'http://api-stage.gdesk.io/v2/auth/profileexist',
          _condigHeader,
          method: 'POST',
          data: dataPost
        }).then(function(response) {
          $scope.ListData = response;
          if ($scope.ListData.data.success == true) {
            $ionicLoading.hide();
            $state.go("signupdetail");
          } else {
            $scope.message = $scope.ListData.data.message;
            $ionicLoading.hide();
          }
        });
      }
    }
    $scope.haveaccount = function() {
      $state.go("login")
    }
  }).controller('SignupdetailCtrl', function($scope, $http, $ionicLoading, $ionicPlatform, $ionicModal, $timeout, $state, $cordovaDevice) {
    $scope.data = {};
    document.addEventListener("deviceready", function() {
      var device = $cordovaDevice.getDevice();
      var cordova = $cordovaDevice.getCordova();
      $scope.model = $cordovaDevice.getModel();
      var platform = $cordovaDevice.getPlatform();
      $scope.uuid = $cordovaDevice.getUUID();
      var version = $cordovaDevice.getVersion();
    }, false);
    $scope.themduoc = true;
    $scope.save = function() {
      $scope.themduoc = true;
      $scope.companyphonenull = "b";
      $scope.streetaddressnull = "b";
      $scope.aptnull = "b";
      $scope.citynull = "b";
      $scope.stanull = "b";
      $scope.zipcodenull = "b";
      if (!$scope.data.companyphone) {
        $scope.companyphonenull = "a";
        $scope.themduoc = false;
      }
      if (!$scope.data.streetaddress) {
        $scope.streetaddressnull = "a";
        $scope.themduoc = false;
      }
      if (!$scope.data.apt) {
        $scope.aptnull = "a";
        $scope.themduoc = false;
      }
      if (!$scope.data.city) {
        $scope.citynull = "a";
        $scope.themduoc = false;
      }
      if (!$scope.data.sta) {
        $scope.stanull = "a";
        $scope.themduoc = false;
      }
      if (!$scope.data.zipcode) {
        $scope.zipcodenull = "a";
        $scope.themduoc = false;
      }
      if ($scope.themduoc == true) {
        var _condigHeader = {
          headers: {
            'Authorization': 'Basic 23423432',
            'Access-Control-Allow-Headers': 'Origin; X-Requested-With; Content-Type; Accept',
            'Access-Control-Allow-Methods': 'GET; POST',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
          }
        };
        var dataPost = {
          "company": {
            "address": $scope.data.streetaddress,
            "apt": $scope.data.apt,
            "city": $scope.data.city,
            "phone": $scope.data.companyphone,
            "state": $scope.data.sta,
            "zipcode": $scope.data.zipcode
          },
          "device": (!angular.isUndefined($scope.model)) ? $scope.model : ionic.Platform.platform() + ionic.Platform.version(),
          "profile": {
            "company_name": window.localStorage.getItem("company"),
            "email": window.localStorage.getItem("email"),
            "first_name": window.localStorage.getItem("firstname"),
            "last_name": window.localStorage.getItem("lastname"),
            "password": window.localStorage.getItem("password"),
            "username": window.localStorage.getItem("username")
          }
        };
        $http({
          url: 'http://api-stage.gdesk.io/v2/auth/signup',
          _condigHeader,
          method: 'POST',
          data: dataPost
        }).then(function(response) {
          $scope.ListData = response;
          if ($scope.ListData.data.success == true) {
            window.localStorage.setItem("message", $scope.ListData.data.message);
            $state.go("chucmung");
          } else {
            $scope.message = $scope.ListData.data.message;
          }
        });
      }
    }
  }).controller('ChucmungCtrl', function($scope, $http, $ionicPlatform, $ionicModal, $timeout, $state, $cordovaDevice) {
    $scope.message = window.localStorage.getItem("message");
    $scope.login = function() {
      window.localStorage.removeItem("company");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("firstname");
      window.localStorage.removeItem("lastname");
      window.localStorage.removeItem("password");
      window.localStorage.removeItem("username");
      $state.go("login", {}, {
        reload: true
      });
    }
  }).controller('DrawCtrl', function($cordovaFile, $rootScope, $scope, $http, $ionicPlatform, $ionicModal, $timeout, $state, $cordovaDevice) {
    $scope.reset = false;
    $scope.data = {};
    $scope.data.drawline = false;
    $scope.data.draw = false;
    //document.getElementById("c").width=screen.width;
    function changeObjectSelection(value) {
      canvas.forEachObject(function(obj) {
        obj.selectable = value;
      });
      var objects = canvas.getObjects('image');
      for (let i in objects) {
        objects[i].selectable = false;
      }
      canvas.renderAll();
    }

    function removeEvents() {
      canvas.isDrawingMode = false; //// can't draw the line
      canvas.selection = false; /// can't select any thing
      canvas.off('mouse:down'); /// turn off this event
      canvas.off('mouse:up');
      canvas.off('mouse:move');
    }
    $scope.value = 10; // default size off brush
    $scope.min = 5; // min size off brush
    $scope.max = 90; // max size off brush
    $scope.stylecolor = {
      'background': 'linear-gradient(to right, red ' + parseInt((($scope.value - 5) / 85) * 100) + '%, #ccc 0%)',
      'background-size': '95% 2px',
      'background-repeat': 'no-repeat',
      'background-position': 'center'
    };
    ///////// MIN MAX DRAW BRUSH
    $scope.setlevel = function(value) {
      $scope.stylecolor = {
        'background': 'linear-gradient(to right, red ' + parseInt(((value - 5) / 85) * 100) + '%, #ccc 0%)',
        'background-size': '95% 2px',
        'background-repeat': 'no-repeat',
        'background-position': 'center'
      };
      //$scope.stylecolor= {'background-size':'99% 2px'};
      $scope.value = value;
      canvas.freeDrawingBrush.width = Math.abs($scope.value); // the value on change and remake the size of brush
      // do need the renderALL(); 
    }
      //////// MIN MAX DRAW BRUSH
////////// MOUSE DOWN
var mousedown= function(){
   canvas.on('mouse:down', function(e) {
        $scope.showitext = false;
        $scope.$evalAsync();
        if(e.target){


          if(e.target.get('type')==="text") 
      {
        $scope.showitext = true;
        $scope.data.text=e.target.text;
        $scope.$evalAsync();
      }
      else{
        $scope.showitext = false;
        $scope.$evalAsync();
      }


        }
        else{
           
            changeObjectSelection(true);

        }
      

        
      
    });

}
//////////MOUSE DOWN


    //  MODE DRAW LINE, DRAW CIRCLE,...
    $scope.data.drawline = false;
    $scope.mode = function(isdraw,line,circle,arrow,text) {
   
      if (!$scope.data.draw) {

        removeEvents();
        changeObjectSelection(true);
        mousedown();
       



        $scope.data.drawline = false;
        $scope.data.drawcircle = false;
        $scope.data.arrow = false;
      }
      if ($scope.data.draw) {
         $scope.showitext = false;
        $scope.data.draw=true;
        $scope.show = false;


        if (line) {
          if($scope.data.linearrow)
          { 

            drawLinearrow();
          }else{
          drawingLine();
         $scope.data.drawline = true;
         $scope.data.drawcircle = false;
         $scope.data.arrow = false;
         }

        } else if (circle) {


          drawCircle();
        $scope.data.drawcircle = true;
        $scope.data.drawline = false;
        $scope.data.arrow = false;


        } else if (arrow) {


          drawArrow();
         $scope.data.arrow = true;
        $scope.data.drawline = false;
        $scope.data.drawcircle = false;
      

       




        }  else {
          drawSquare();
        }
      }
    }
    //  MODE DRAW LINE, DRAW CIRCLE,...
    /////  CHANGE COLOR BRUSH
    changecolor = function() {
      canvas.getActiveObject().set("stroke",document.getElementById("myColor").value); 
        
      if (canvas.getActiveObject().text) {
        canvas.getActiveObject().set("fill",document.getElementById("myColor").value);
      }
      canvas.requestRenderAll();
      if (data.drawline) {
        drawingLine();
      }
    };
    /////  CHANGE COLOR BRUSH
    var canvas = new fabric.Canvas('c', {
      selection: false
    }); ////  CREATE NEW CANVAS.









    //////// BEGIN: CLEAN-BACKGROUND
    var cleanbackground = function() {
      for (let i in canvas.getObjects('image')) {
        canvas.remove(canvas.getObjects('image')[i]);
      }
    }
    /////// END: CLEAN-BACKGROUND
    /////// BEGIN: SET BACKGROUND
    $scope.background;
    var copbg = $rootScope.$on("uploadbg", function(event, opt) {
      cleanbackground();
      fabric.Image.fromURL(opt.a, function(img) {
        // add background image
        $scope.background = img;
        console.log(canvas.width,canvas.height);
        var center = canvas.getCenter(); ///get center value
        if (img.width < img.height) { //////// check size to fit image
          img1 = img.set({
            scaleX: canvas.width / (img.width + (img.height - (canvas.height + (img.width - canvas.width)))),
            scaleY: canvas.height / img.height,
            top: center.top,
            left: center.left,
            originX: 'center',
            originY: 'center',
            selectable: false
          });
          canvas.add(img1);
        }
        if (img.width >= img.height) {
          img1 = img.set({
            scaleX: canvas.width / img.width,
            scaleY: canvas.height /(img.height + (img.width - (canvas.width + (img.height - canvas.height)))),
            top: center.top,
            left: center.left,
            originX: 'center',
            originY: 'center',
            selectable: false
          });
          canvas.add(img1);
        }
        for (let i in canvas.getObjects('image')) //// send to back when created
        {
          canvas.sendToBack(canvas.getObjects('image')[i]);
        }
      });
    });
    $scope.$on('$destroy', function() {
      copbg();
    });
    /////// END: SET BACKGROUND
    /// BEGIN: BACKGROUND COLOR
    changecolorbg = function() {
      canvas.backgroundColor = document.getElementById("myColorbg").value;
      canvas.renderAll();
    };
    //// END: BACKGROUND COLOR
    //// BEGIN: EVENT CLICK TO EDIT COLOR
    canvas.on('before:transform', function() {
      document.getElementById("myColor").value = canvas.getActiveObject().stroke;
      if (canvas.getActiveObject().get('type')=='itext') {
        document.getElementById("myColor").value = canvas.getActiveObject().fill;

        
      }
    });

    

    //// END: EVENT CLICK TO EDIT COLOR
    // BEGIN: CONSOLE OBJECT
    $scope.show = false;
    $scope.objects = function() {
      changeObjectSelection(true);
      $scope.data.draw = 0;
      $scope.show = !$scope.show;
      $scope.paraobjects = [];
      
      for (let i in canvas.getObjects()) {
        var obj={};
        obj["image"]=canvas.getObjects()[i].toDataURL('png');
        obj["type"]=canvas.getObjects()[i].get('type');
        $scope.paraobjects.push(obj);
      }

    }

    $scope.selectobject = function(index,istext) { 


      if (canvas.item(index).get('type')!='image') {
        canvas.setActiveObject(canvas.item(index));
        canvas.item(index).bringToFront();
         
          console.log(istext);
        if(istext=='text'){
        
          $scope.showitext=true;

        }else{

          $scope.showitext=false;
        }
       
        document.getElementById('myColor').value = canvas.item(index).stroke;
        removeEvents();
        changeObjectSelection(false);
          $scope.mode();
      }


    }
    //END : CONSOLE OBJECT







    /// BEGIN: DRAWING LINE
    var drawingLine = function() {
      canvas.discardActiveObject();
      removeEvents();
      changeObjectSelection(false);
      canvas.selection = false;
      canvas.isDrawingMode = true;
      if ($scope.data.drawline && !$scope.data.hide) {
        canvas.freeDrawingBrush.color = document.getElementById("myColor").value;
      } else if ($scope.data.drawline && $scope.data.hide) {
        canvas.freeDrawingBrush.color = "transparent";
        canvas.on('mouse:move', function(o) {
          canvas.freeDrawingBrush.color = document.getElementById("myColor").value;
        });
        canvas.on('mouse:up', function(o) {
          canvas.freeDrawingBrush.color = "transparent";
        });
      }
    }
    /// END: DRAWING LINE\

/////BEGIN: DRAW LINE ARROW
var drawLinearrow= function(){
                removeEvents();
                changeObjectSelection(false);
                function drawArrow(fromx, fromy, tox, toy) {
                    var angle = Math.atan2(toy - fromy, tox - fromx);
                    var headlen = 5;  // arrow head size
                    // bring the line end back some to account for arrow head.
                    tox = tox - (headlen) * Math.cos(angle);
                    toy = toy - (headlen) * Math.sin(angle);
                    // calculate the points.
                    var points = [
                        {
                            x: fromx, // start point
                            y: fromy
                        }, {
                            x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2),
                            y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
                        }, {
                            x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2),
                            y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
                        }, {
                            x: tox - (headlen) * Math.cos(angle - Math.PI / 2),
                            y: toy - (headlen) * Math.sin(angle - Math.PI / 2)
                        }, {
                            x: tox + (headlen) * Math.cos(angle), // tip
                            y: toy + (headlen) * Math.sin(angle)
                        }, {
                            x: tox - (headlen) * Math.cos(angle + Math.PI / 2),
                            y: toy - (headlen) * Math.sin(angle + Math.PI / 2)
                        }, {
                            x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
                            y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
                        }, {
                            x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
                            y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
                        }, {
                            x: fromx,
                            y: fromy
                        }
                    ];
                    var colors = document.getElementById("myColor").value;
                    var pline = new fabric.Polyline(points, {

                        fill: colors,
                        stroke: colors,
                        opacity: 1,
                        strokeWidth: 1,
                        originX: 'left',
                        originY: 'top',
                        selectable: false
                    });
                    canvas.add(pline);
                    canvas.renderAll();
                }

                canvas.on('mouse:down', function () {
                    var pointer = canvas.getPointer(event.e);
                    startX = pointer.x;
                    startY = pointer.y;
                });
                canvas.on('mouse:move', function () {

                });
                canvas.on('mouse:up', function () {
                    var pointer = canvas.getPointer(event.e);
                    endX = pointer.x;
                    endY = pointer.y;
                    drawArrow(startX, startY, endX, endY);


                });
            



}

///// END: DRAW LINE ARROW







    //// BEGIN: DRAWING TEXT
    $scope.Addtext = function() {
      removeEvents();
      changeObjectSelection(false);
      $scope.data.draw=false;
      var itext = new fabric.Text('This is a IText object', {
        left: 100,
        top: 150,
        fill: '#000000',
        strokeWidth: 1,
        fontFamily: 'Helvetica'
      });
      canvas.add(itext);
       /*canvas.on('text:editing:entered', function(e) {

        $scope.showitext = true;
        $scope.data.text=canvas.getActiveObject().text;
        $scope.$evalAsync();
      });
       canvas.on('text:changed', function(e) {
        $scope.data.text=canvas.getActiveObject().text;
        $scope.$evalAsync();
      }); 
     
       
      canvas.on('text:editing:exited', function(e) {
        $scope.showitext = false;
        $scope.$evalAsync();
      });*/
       
      $scope.data.draw = false;
      $scope.mode();
    
    };
    ///// END: DRAWING TEXT





      

    /////BEGIN: OPTION ITEXT
    $scope.font = ["Helvetica", "Times New Roman", "Verdana"];
    $scope.update = function(item) {

      canvas.getActiveObject().set("fontFamily", item);
      canvas.requestRenderAll();
    }
    $scope.dtEditText = function(action) {
      var a = action;
      var o = canvas.getActiveObject();
      var t;
      console.log(o);
      // If object selected, what type?
      if (o) {
        t = o.get('type');
      }
      if (o && t === 'text') {
        switch (a) {
          case 'bold':
            var isBold = dtGetStyle(o, 'fontWeight') === 'bold';
            dtSetStyle(o, 'fontWeight', isBold ? '' : 'bold');
            break;
          case 'italic':
            var isItalic = dtGetStyle(o, 'fontStyle') === 'italic';
            dtSetStyle(o, 'fontStyle', isItalic ? '' : 'italic');
            break;
          case 'underline':
            var isUnderline = dtGetStyle(o, 'textDecoration') === 'underline';
            dtSetStyle(o, 'textDecoration', isUnderline ? '' : 'underline');
            break;
            canvas.renderAll();
        }
      }
    }
    // Get the style
    function dtGetStyle(object, styleName) {
      return object[styleName];
    }
    // Set the style
    function dtSetStyle(object, styleName, value) {
      object[styleName] = value;
      object.set({
        dirty: true
      });
      canvas.renderAll();
    }

   $scope.input=function(){
          


           canvas.renderAll();


    }
  /*   $scope.blurr=function(){
      if(canvas.getActiveObject()){
          canvas.getActiveObject().isEditing=true;
           canvas.renderAll();
         }


    }*/

    $scope.textedit=function(text){
     
      canvas.getActiveObject().set("text",text);
      canvas.renderAll();

    }
    



    /////END: OPTION ITEXT
    ////// BEGIN: ADD THE RULER
    canvas.renderAll(); //reset
    $scope.data.zoom = 30; // default zoom
    $scope.zoomless = 30; // min zoom
    $scope.zoommax = 120; // max zoom
    $scope.ruler = function() {
      $scope.setzoom = function(intzoom) { /////// ALL CHANGE ZOOM WITH FUNCTION:"setzoom" 
        if ($scope.data.ruler) {
          var xobj = {};
          var xtext = {};
          var yobj = {};
          var ytext = {};
          var ytext = {};
          var xs = [];
          var ys = [];
          for (var i = parseInt(intzoom); i <= 500; i += parseInt(intzoom)) {
            ///////////// stripe  AND RULER X
            var text = new fabric.Text(i.toString(), { ///rulerx
              fontFamily: 'Comic Sans',
              fontSize: 15,
              width: 1,
              height: 1000,
              left: i - 10,
              top: 0,
              selectable: false
            });
            xtext = text;
            xs.push(xtext);
            var texty = new fabric.Text(i.toString(), { ///rulery
              fontFamily: 'Comic Sans',
              fontSize: 15,
              width: 1000,
              height: 1,
              left: 0,
              top: i - 10,
              selectable: false
            });
            ytext = texty;
            xs.push(ytext);
            x = new fabric.Rect({ //// caro line
              width: 1,
              height: 1000,
              left: i,
              top: 15,
              fill: 'rgba(204, 204, 204, 1)',
              selectable: false
            });
            xobj = x;
            xs.push(xobj);
            y = new fabric.Rect({
              width: 1000,
              height: 1,
              left: 15,
              top: i,
              fill: 'rgba(204, 204, 204, 1)',
              selectable: false
            });
            yobj = y;
            xs.push(yobj);
          }
          var alltogetherObj = new fabric.Group(xs);
          canvas.setBackgroundImage(alltogetherObj);
          canvas.renderAll();
        } else {
          canvas.backgroundImage = false;
          canvas.renderAll();
        }
      }
    }

    ////// END: ADD THE RULER



    var objects = canvas.getObjects();




    ///BEGIN: UPLOAD object 
    var cop = $rootScope.$on("upload", function(event, opt) {
      $scope.loadJson(opt.a);
    });
    $scope.$on('$destroy', function() {
      cop();
    });
    ///END: UPLOAD object 
    //////BEGIN: DRAWING RULER
    var drawArrow = function() {
      removeEvents();
      changeObjectSelection(false);
      var point1;
      var line = null;
      var lines = [];
      canvas.on('mouse:down', function(o) {
        var pointer = canvas.getPointer(o.e);
        point1 = new fabric.Point(pointer.x, pointer.y);
        if (line) {
            console.log(line);
          line = new fabric.Line([line.get('x2'), line.get('y2'), pointer.x, pointer.y], {
            stroke: '#0000ff',
            lockMovementX: true,
            lockMovementY: true,
            strokeWidth: 3,
            selectable: true,
            hoverCursor: 'default'
          });
          canvas.add(line);
        } else {
          line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
            stroke: '#0000ff',
            lockMovementX: true,
            strokeWidth: 3,
            lockMovementY: true,
            selectable: true,
            hoverCursor: 'default'
          });
          canvas.add(line);
        }
      });
      canvas.on('mouse:move', function(o) {
        var pointer = canvas.getPointer(o.e);
        line.set({
          x2: pointer.x,
          y2: pointer.y
        });
        canvas.renderAll();
        // console.log(canvas.getObjects().length);
        //console.log(canvas.getObjects().pop());
      });
    };
    /////END: DRAWING RULER

    /////BEGIN FILL
    $scope.fill=function(){
      console.log( canvas.getActiveObject());
      canvas.getActiveObject().set("fill",document.getElementById("myColor").value)
      canvas.renderAll(); 

    }
    //////END FILL



    //////BEGIN: DRAW SQUARE
    function drawSquare() {
      canvas.discardActiveObject();
      removeEvents();
      changeObjectSelection(false);
      canvas.selection = false;
      var square, isDown, origX, origY;
      canvas.on('mouse:down', function(o) {
        $scope.reset = true;
        var colors = document.getElementById("myColor").value;
        isDown = true;
        var pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        square = new fabric.Rect({
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          width: pointer.x - origX,
          height: pointer.y - origY,
          angle: 0,
          strokeWidth: Math.abs($scope.value),
          fill: 'transparent',
          stroke: colors,
          selectable: false,
          hasRotatingPoint: false
        });
        canvas.add(square);
      });
      canvas.on('mouse:move', function(o) { //// THIS IS ALREADY CHANGE PER MOVE
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);
        if (origX > pointer.x) {
          square.set({
            left: Math.abs(pointer.x)
          });
        }
        if (origY > pointer.y) {
          square.set({
            top: Math.abs(pointer.y)
          });
        }
        square.set({
          width: Math.abs(origX - pointer.x)
        });
        square.set({
          height: Math.abs(origY - pointer.y)
        });
        canvas.renderAll();
      });
      canvas.on('mouse:up', function(o) {
       
        isDown = false;
        square.setCoords(); // WHEN CLICK OFF  'circle.setCoords()'  with set the location correct when the current RECT just make
      });
    }
    //////END: DRAW SQUARE
    //////BEGIN: DRAW SIRCLE
    function drawCircle() {
      canvas.discardActiveObject();
      removeEvents();
      changeObjectSelection(false);
      var colors = document.getElementById("myColor").value;
      canvas.on('mouse:down', function(o) {
        isDown = true;
        var pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;
        ellipse = new fabric.Ellipse({
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          rx: pointer.x - origX,
          ry: pointer.y - origY,
          angle: 0,
          stroke: colors,
          strokeWidth: Math.abs($scope.value),
          fill: '',
          selectable: false
        });
        canvas.add(ellipse);
      });
      canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);
        var rx = Math.abs(origX - pointer.x) / 2;
        var ry = Math.abs(origY - pointer.y) / 2;
        if (rx > ellipse.strokeWidth) {
          rx -= ellipse.strokeWidth / 2;
        }
        if (ry > ellipse.strokeWidth) {
          ry -= ellipse.strokeWidth / 2;
        }
        ellipse.set({
          rx: rx,
          ry: ry
        });
        if (origX > pointer.x) {
          ellipse.set({
            originX: 'right'
          });
        } else {
          ellipse.set({
            originX: 'left'
          });
        }
        if (origY > pointer.y) {
          ellipse.set({
            originY: 'bottom'
          });
        } else {
          ellipse.set({
            originY: 'top'
          });
        }
        canvas.renderAll();
      });
      canvas.on('mouse:up', function() {
        ellipse.setCoords();
        isDown = false;
      });
    }
    //////END: DRAW SIRCLE
    ////// BEGIN: BACKWARD
    var isRedoing = false;
    var h = [];
    $scope.Undo = function() {
      if (canvas._objects.length > 0) {
        h.push(canvas._objects.pop());
        canvas.renderAll();
      }
    };
    $scope.Redo = function() {
      if (h.length > 0) {
        // console.log(h);
        isRedoing = true;
        canvas.add(h.pop());
      }
    };
    /// SAVE IMAGE
    $scope.saveImg = function() {
      if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
      } else {
        // console.log(canvas.toDataURL('png'));
      }
    }
    /// SAVE IMAGE
    ////SAVE JSON AS TEXT
    $scope.saveJson = function() {
      canvas.backgroundImage = false;
      saveText(JSON.stringify(canvas.toJSON()), "test.txt");
    }

    function saveText(text, filename) {
      var a = document.createElement('a');
      a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
      a.setAttribute('download', filename);
      a.click()
      document.addEventListener('deviceready', function() {
        $cordovaFile.writeFile(cordova.file.externalRootDirectory, "file.txt", text, true).then(function(success) {
          alert('success');
        }, function(error) {
          alert('error');
          // error
        });
      });
    }
    ////SAVE JSON AS TEXT
    ///LOAD JSON
    $scope.loadJson = function(obj) {
      var allObjects = [];
      $scope.data.ruler = 0;
      canvas.loadFromDatalessJSON(obj, function() {
        allObjects = canvas.getObjects('image');
        allObjects.selectable = false;
        for (let i in allObjects) {
          allObjects[i].selectable = false;
        }
      });
      removeEvents();
      canvas.renderAll();
    };
    ///LOAD JSON
    ///DELETE 
    $scope.clear = function() {
      for (var i = 0; i <= canvas.getActiveObjects().length; i++) {
        h.push(canvas.getActiveObjects()[i]);
        canvas.remove(canvas.getActiveObjects()[i]);
      }
    }
    $scope.delete=function(){
      canvas.clear();
      for(let i in canvas.getObjects())
      {
        canvas.remove(canvas.getObjects()[i])
      }

    }
    ///DELETE 
  }).controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
      title: 'Reggae',
      id: 1
    }, {
      title: 'Chill',
      id: 2
    }, {
      title: 'Dubstep',
      id: 3
    }, {
      title: 'Indie',
      id: 4
    }, {
      title: 'Rap',
      id: 5
    }, {
      title: 'Cowbell',
      id: 6
    }];
  }).controller('PlaylistCtrl', function($scope, $stateParams) {})
  /////////////BEGIN: UPLOAD OBJECT
  .factory('readFile', function($window, $rootScope, $q) {
    'use strict';
    var readFile = function(file) {
      var deferred = $q.defer(),
        reader = new $window.FileReader();
      reader.onload = function(ev) {
        var content = ev.target.result;
        deferred.resolve(content);
      };
      reader.readAsText(file);
      return deferred.promise;
    };
    return readFile;
  }).directive('fileHandler', function(readFile) {
    'use strict';
    return {
      link: function(scope, element) {
        element.on('change', function(event) {
          var file = event.target.files[0];
          readFile(file).then(function(content) {
            // console.log(content);
          });
        });
      }
    };
  }).directive('fileBrowser', function(readFile, $rootScope) {
    'use strict';
    return {
      template: '<input  type="file" accept="json/*" style="display: none;" />' + '<ng-transclude></ng-transclude>',
      transclude: true,
      link: function(scope, element) {
        var fileInput = element.children('input[file]');
        fileInput.on('change', function(event) {
          var file = event.target.files[0];
          readFile(file).then(function(content) {
            $rootScope.$broadcast("upload", {
              a: content
            });
          });
        });
        element.on('click', function() {
          fileInput[0].click();
        });
      }
    };
  })
  ///////////// END: UPLOAD OBJECT
  /////////////UPLOAD IMAGE BG
  .factory('readFilebg', function($window, $rootScope, $q) {
    'use strict';
    var readFilebg = function(file) {
      var deferred = $q.defer(),
        reader = new $window.FileReader();
      reader.onload = function(ev) {
        var content = ev.target.result;
        deferred.resolve(content);
      };
      reader.readAsDataURL(file);
      return deferred.promise;
    };
    return readFilebg;
  }).directive('fileHandlerbg', function(readFilebg) {
    'use strict';
    return {
      link: function(scope, element) {
        element.on('change', function(event) {
          var file = event.target.files[0];
          readFilebg(file).then(function(content) {
            // console.log(content);
          });
        });
      }
    };
  }).directive('fileBrowserbg', function(readFilebg, $rootScope) {
    'use strict';
    return {
      template: '<input  type="file" accept="image/*" style="display: none;" />' + '<ng-transclude></ng-transclude>',
      transclude: true,
      link: function(scope, element) {
        var fileInput = element.children('input[file]');
        fileInput.on('change', function(event) {
          var file = event.target.files[0];
          readFilebg(file).then(function(content) {
            $rootScope.$broadcast("uploadbg", {
              a: content
            });
          });
        });
        element.on('click', function() {
          fileInput[0].click();
        });
      }
    };
  });
/////////////UPLOAD IMAGE BEGIN