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
  }).controller('DrawCtrl', function($cordovaFile, $ionicLoading, $rootScope, $scope, $http, $ionicPlatform, $ionicModal, $timeout, $state, $cordovaDevice) {
    var canvas = new fabric.Canvas('c', {
      selection: false,
      backgroundColor: "white",
    }); ////  CREATE NEW CANVAS.
    $scope.reset = false;
    $scope.data = {};
    $scope.data.drawline = false;
    $scope.data.draw = false;
    $scope.data.valueo = 1;
    var a = function() {
      document.addEventListener('deviceready', function() {
        if (ionic.Platform.isAndroid()) {
          window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);
        }

        function successFunction() {}

        function errorFunction(error) {}
      });
    }
    document.addEventListener('deviceready', function() {
      window.addEventListener("orientationchange", function() {
        if (ionic.Platform.isAndroid()) {
          window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);
        }

        function successFunction() {}

        function errorFunction(error) {}
      }, false);
    });
    a();
    /* document.getElementById("c").setAttribute('width', screen.width-40+'!important');*/
    // document.getElementById("c").width=screen.width-40;
    function changeObjectSelection(value) {
      canvas.forEachObject(function(obj) {
        obj.selectable = value;
      });
      var objects = canvas.getObjects('image');
      for (let i in objects) {
        if (objects[i].get('id') == 'background') {
          objects[i].selectable = false;
        }
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
    $scope.data.value = 1; // default size off brush
    $scope.min = 1; // min size off brush
    $scope.max = 20; // max size off brush
    $scope.sizebrush = {
      'width': $scope.data.value,
      'height': $scope.data.value
    }
    $scope.stylecolor = {
      'background': 'linear-gradient(to right, red ' + parseInt((($scope.data.value - 1) / 20) * 100) + '%, #ccc 0%)',
      'background-size': '95% 2px',
      'background-repeat': 'no-repeat',
      'background-position': 'center'
    };
    ///////// MIN MAX DRAW BRUSH
    $scope.setlevel = function(value) {
      $scope.stylecolor = {
        'background': 'linear-gradient(to right, red ' + parseInt(((value - 1) / 20) * 100) + '%, #ccc 0%)',
        'background-size': '95% 2px',
        'background-repeat': 'no-repeat',
        'background-position': 'center'
      };
      $scope.sizebrush = {
        'width': value + 'px',
        'height': value + 'px',
        'top': 'auto',
        'left': (285 - value / 2) + 'px',
      }
      //$scope.stylecolor= {'background-size':'99% 2px'};
      $scope.data.value = value;
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("strokeWidth", Math.abs(value));
        canvas.requestRenderAll();
      }
      canvas.freeDrawingBrush.width = Math.abs($scope.data.value); // the value on change and remake the size of brush
    }
    //////// MIN MAX DRAW BRUSH
    ////////// MOUSE DOWN
    var mousedown = function() {
      canvas.on('mouse:down', function(e) {
        $scope.showitext = false;
        $scope.$evalAsync();
        if (e.target) {
          if (e.target.get('type') === "text") {
            $scope.showitext = true;
            $scope.data.text = e.target.get('text');
            $scope.$evalAsync();
          } else {
            if (e.target.get('id') != "img" ) {
            $scope.showitext = false;
            if (window.angular.isString(e.target.get('fill'))) {
              $scope.data.fill = true;
              $scope.data.colorfill = e.target.get('fill');
            } else {
              $scope.data.fill = false;
            }
            
            
              $scope.data.valueo = e.target.get('opacity');
              $scope.isdashed = e.target.strokeDashArray;
              $scope.data.value = e.target.strokeWidth;
              console.log(e.target);
              $scope.data.colorbrush = e.target.get('stroke');
              e.target.set('padding', 20);
              e.target.set('cornerSize', 20);
              e.target.set('borderColor', '#E8E8E8');
              e.target.set('cornerColor', '#44444487');
              e.target.set('transparentCorners', true);
              e.target.set('cornerStyle', 'circle'); //or rect
            }
            $scope.stylecolor = {
              'background': 'linear-gradient(to right, red ' + parseInt((($scope.data.value - 1) / 20) * 100) + '%, #ccc 0%)',
              'background-size': '95% 2px',
              'background-repeat': 'no-repeat',
              'background-position': 'center'
            };
            $scope.$evalAsync();
          }
        } else {
          changeObjectSelection(true);
        }
      });
    }
    //////////MOUSE MOVE
    /*    var blue = new fabric.Rect({
       id:1,top: 60, left: 240, width: 10, height: 10, fill: 'blue',opacity :false,selectable:false });
        canvas.add(blue);
        canvas.renderAll();
       var mousemove = function() {
       canvas.on('mouse:move', function(e) {
       var pointer = canvas.getPointer(event.e);

       if(pointer.x>230){
          
           for(let i in canvas.getObjects()){
             if(canvas.getObjects()[i].id==1)
             {
               canvas.getObjects()[i].set('opacity',true);
             }
           }
           canvas.renderAll();  
       }
      


       });
     }*/
    //////////MOUSE MOVE
    ////LIST SHAPE
    $scope.listshape = ["square", "circle", "multi"];
    $scope.liststraight = ["arrow", "arrows", "straight"];
    ////LIST SHAPE
    //  MODE DRAW LINE, DRAW CIRCLE,...
    $scope.mode = function(isdraw, shape) {
      if (!isdraw) {
        removeEvents();
        changeObjectSelection(true);
        mousedown();
        $scope.showshape=false;
        $scope.showstraight=false;
      } else if (isdraw) {
        console.log(shape);
        $scope.data.draw = true
        $scope.showitext = false;
        $scope.shapes = shape;
        if (shape == "square") {
          drawSquare();
        } else if (shape == "circle") {
          drawCircle();
        } else if (shape == "multi") {
          drawArrow();
        } else if (shape == "straight") {
          drawStraight();
        } else if (shape == "arrow") {
          drawLinearrow();
        } else if (shape == "arrows") {
          drawArrows();
        } else {
          drawingLine();
        }
      }
    }
    //  MODE DRAW LINE, DRAW CIRCLE,...
    /////  CHANGE COLOR BRUSH
    changecolor = function() {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("stroke", document.getElementById("myColor").value);
        if (canvas.getActiveObject().get("type") == "polyline") {
          canvas.getActiveObject().set("fill", document.getElementById("myColor").value);
        }
      }
      canvas.freeDrawingBrush.color = document.getElementById("myColor").value;
      canvas.requestRenderAll();
    };
    /////  CHANGE COLOR BRUSH
    //////// BEGIN: CLEAN-BACKGROUND

    /////// END: CLEAN-BACKGROUND
    /////// BEGIN: SET BACKGROUND

    var copbg = $rootScope.$on("uploadbg", function(event, opt) {
      fabric.Image.fromURL(opt.a, function(img) {
        // add background image
       
        var center = canvas.getCenter(); ///get center value
        if (img.width < img.height) { //////// check size to fit image
          img1 = img.set({
            scaleX: canvas.width / (img.width + (img.height - (canvas.height + (img.width - canvas.width)))),
            scaleY: canvas.height / img.height,
            top: center.top,
            left: center.left,
            originX: 'center',
            originY: 'center',
          });
          
        }
        if (img.width >= img.height) {
          img1 = img.set({
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / (img.height + (img.width - (canvas.width + (img.height - canvas.height)))),
            top: center.top,
            left: center.left,
            originX: 'center',
            originY: 'center',
          });
          
        }

       canvas.setBackgroundImage(img1);
       canvas.renderAll();
      });

    });
    $scope.$on('$destroy', function() {
      copbg();
    });
    /////// END: SET BACKGROUND
    /////// BEGIN: IMPORT IMAGE
    var copimage = $rootScope.$on("images", function(event, opt) {
      $scope.mode(false, "");
      $scope.data.draw = false;
      fabric.Image.fromURL(opt.a, function(img) {
        var center = canvas.getCenter(); ///get center value
        if (img.width < img.height) { //////// check size to fit image
          img1 = img.set({
            id: 'img',
            scaleX: canvas.width / (img.width + (img.height - (canvas.height + (img.width - canvas.width)))) - 0.1,
            scaleY: canvas.height / img.height - 0.1,
           top: center.top/2,
            left: center.left/2,
            originX: 'left',
            originY: 'top',
            padding: 20,
            cornerSize: 20,
            borderColor: '#E8E8E8',
            cornerColor: '#44444487',
            transparentCorners: true,
            cornerStyle: 'circle', //or rect
          });
          canvas.add(img1);
        }
        if (img.width >= img.height) {
          img1 = img.set({
            id: 'img',
            scaleX: canvas.width / img.width - 0.1,
            scaleY: canvas.height / (img.height + (img.width - (canvas.width + (img.height - canvas.height)))) - 0.1,
            top: center.top/2,
            left: center.left/2,
            originX: 'left',
            originY: 'top',
            padding: 20,
            cornerSize: 20,
            borderColor: '#E8E8E8',
            cornerColor: '#44444487',
            transparentCorners: true,
            cornerStyle: 'circle', //or rect
          });
          canvas.add(img1);
        }
        canvas.renderAll();
      });
    });
    $scope.$on('$destroy', function() {
      copimage();
    });
    /////// END: IMPORT IMAGE
    ////// BEGIN: SET LEVEL OPANCITY
    $scope.setlevelo = function(value) {
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set('opacity', value);
        canvas.renderAll();
      }
      
       console.log(canvas.freeDrawingBrush);
      canvas.requestRenderAll();

      $scope.opanlevel = {    /* CSS */
        'opacity': value
      };
    }
    ////// END: SET LEVEL OPANCITY
    /// BEGIN: BACKGROUND COLOR
    changecolorbg = function() {
      canvas.backgroundColor = document.getElementById("myColorbg").value;
      canvas.renderAll();
    };
    //// END: BACKGROUND COLOR
    ///////BEGIN:COPY
    $scope.Pass = function() {
      _clipboard = "";
      // clone again, so you can do multiple copies.
      canvas.getActiveObject().clone(function(cloned) {
        _clipboard = cloned;
      });
      _clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true
        });
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = canvas;
          clonedObj.forEachObject(function(obj) {
            obj.set('id', 'square');
            canvas.add(obj);
          });
          // this should solve the unselectability
          clonedObj.setCoords();
        } else {
          clonedObj.set('id', 'square');
          canvas.add(clonedObj);
        }
        _clipboard.top += 10;
        _clipboard.left += 10;
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
      });
    };
    ///////END:COPY
    ///// BEGIN: HAVE DASHED
    $scope.isdashed = false;
    $scope.Dashed = function() {
      console.log($scope.isdashed)
      if ($scope.isdashed == false) {
        $scope.isdashed = [10, 10];
        canvas.freeDrawingBrush.strokeDashArray = $scope.isdashed;
      } else if ($scope.isdashed != false) {
        $scope.isdashed = false;
        canvas.freeDrawingBrush.strokeDashArray = false;
      }
      if (canvas.getActiveObject()) {
        if (canvas.getActiveObject().get('id') != 'img' && canvas.getActiveObject().get('type') != 'text') {
          canvas.getActiveObject().set('strokeDashArray', $scope.isdashed);
          canvas.renderAll();
        }
      }
    }
    ////// END : HAVE DASHED
    //// BEGIN: EVENT CLICK TO EDIT COLOR
    canvas.on('before:transform', function() {
      if (canvas.getActiveObject().get('id') != 'img') document.getElementById("myColor").value = canvas.getActiveObject().stroke;
      if (canvas.getActiveObject().get('type') == 'itext') {
        document.getElementById("myColor").value = canvas.getActiveObject().fill;
      }
    });
    //// END: EVENT CLICK TO EDIT COLOR
    // BEGIN: CONSOLE OBJECT
    $scope.show = false;
    $scope.objects = function() {
      changeObjectSelection(true);
      $scope.show = !$scope.show;
      $scope.paraobjects = [];
      for (let i in canvas.getObjects()) {
        var obj = {};
        obj["image"] = canvas.getObjects()[i].toDataURL('png');
        obj["type"] = canvas.getObjects()[i].get('type');
        $scope.paraobjects.push(obj);
      }
    }
    $scope.selectobject = function(index, istext) {
      if (canvas.item(index).get('id') != 'background') {
        canvas.setActiveObject(canvas.item(index));
        canvas.item(index).bringToFront();
        console.log(istext);
        if (istext == 'text') {
          $scope.showitext = true;
        } else {
          $scope.showitext = false;
        }
        document.getElementById('myColor').value = canvas.item(index).stroke;
        removeEvents();
        changeObjectSelection(false);
        $scope.mode();
      }
    }
    //END : CONSOLE OBJECT
    $scope.size = function() {
      return ($scope.data.value > 5) ? $scope.data.value : 5;
    }

    /* Hexto RBG 
   function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+$scope.data.valueo+')';
    }
    throw new Error('Bad Hex');
}

     Hexto RBG */
    /// BEGIN: DRAWING LINE
    var drawingLine = function() {
      canvas.discardActiveObject();
      removeEvents();
      changeObjectSelection(false);
      canvas.selection = false;
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = document.getElementById("myColor").value;

      console.log(canvas.freeDrawingBrush);
    
      canvas.on('mouse:down', function(o) {
        canvas.freeDrawingBrush.color = document.getElementById("myColor").value;
      });
      canvas.on('mouse:move', function(o) {
        canvas.freeDrawingBrush.color = document.getElementById("myColor").value;
      });
    }
    /// END: DRAWING LINE\
    ////// BEGIN: DRAW ARROWSSSSSSSSSS
    var drawArrows = function() {
      removeEvents();
      changeObjectSelection(false);
      const LineWithArrow = fabric.util.createClass(fabric.Line, {
        _getCacheCanvasDimensions() {
          var dim = this.callSuper('_getCacheCanvasDimensions');
          dim.width += 100; // found by trial and error
          dim.height += 100; // found by trial and error
          return dim;
        },
        _render(ctx) {
          this.callSuper('_render', ctx);
          ctx.save();
          const xDiff = this.x2 - this.x1;
          const yDiff = this.y2 - this.y1;
          this.callSuper('_render', ctx);
          ctx.save();
          const xDif = this.x2 - this.x1;
          const yDif = this.y2 - this.y1;
          const angles = Math.atan2(yDif, xDif);
          ctx.translate((xDiff) / 2, (yDiff) / 2);
          ctx.rotate(angles);
          ctx.beginPath();
          // Move 5px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
          ctx.moveTo($scope.size(), 0);
          ctx.lineTo(-$scope.size(), $scope.size());
          ctx.lineTo(-$scope.size(), -$scope.size());
          ctx.closePath();
          ctx.fillStyle = this.stroke;
          ctx.fill();
          ctx.restore();
          //create arrow down
          const angle = Math.atan2(yDiff, xDiff);
          ctx.translate((xDiff) / -2, (yDiff) / -2);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(-$scope.size(), 0);
          ctx.lineTo($scope.size(), -$scope.size());
          ctx.lineTo($scope.size(), $scope.size());
          ctx.closePath();
          ctx.fillStyle = this.stroke;
          ctx.fill();
          ctx.restore();
        }
      });
      const drawLineWithArrow = (points) => (new LineWithArrow(points, {
        stroke: document.getElementById("myColor").value,
        strokeWidth: Math.abs($scope.data.value),
        cornerSize: 20,
        borderColor: '#E8E8E8',
        cornerColor: '#44444487',
        transparentCorners: true,
        cornerStyle: 'circle', //or rect
        opacity: $scope.data.valueo,
        strokeDashArray: $scope.isdashed,
        selectable: false,
        padding: 20, // hasRotatingPoint: false,
        cornerSize: 20,
        borderColor: '#E8E8E8',
        cornerColor: '#CFCFCF',
        transparentCorners: true,
        cornerStyle: 'circle' //or rect
        //                                hasBorders: false,
        //                                hasControls: false
      }));
      const selectLine = (points) => {
        return drawLineWithArrow(points);
      };
      let line;
      let isDown;
      canvas.on('mouse:down', (options) => {
        isDown = true;
        const pointer = canvas.getPointer(options.e);
        const points = [$scope.standard(pointer.x,'x'), $scope.standard(pointer.y,'y'), $scope.standard(pointer.x,'x'),$scope.standard(pointer.y,'y')];
        line = selectLine(points);
        canvas.add(line).renderAll();
      });
      canvas.on('mouse:move', (options) => {
        if (!isDown) return;
        const pointer = canvas.getPointer(options.e);
        line.set({
          x2: $scope.standard(pointer.x,'x'),
          y2: $scope.standard(pointer.y,'y')
        });
        canvas.renderAll();
      });
      canvas.on('mouse:up', () => {
        isDown = false;
        line.setCoords();
        canvas.renderAll();
      });
    }
    ////// END: DRAW AROWSSSSSSSSSSSSSSS
    /////BEGIN: DRAW LINE ARROW
    var drawLinearrow = function() {
      removeEvents();
      changeObjectSelection(false);
      const LineWithArrow = fabric.util.createClass(fabric.Line, {
        _getCacheCanvasDimensions() {
          var dim = this.callSuper('_getCacheCanvasDimensions');
          dim.width += 100; // found by trial and error
          dim.height += 100; // found by trial and error
          return dim;
        },
        _render(ctx) {
          this.callSuper('_render', ctx);
          ctx.save();
          const xDiff = this.x2 - this.x1;
          const yDiff = this.y2 - this.y1;
          this.callSuper('_render', ctx);
          ctx.save();
          const xDif = this.x2 - this.x1;
          const yDif = this.y2 - this.y1;
          const angles = Math.atan2(yDif, xDif);
          ctx.translate((xDiff) / 2, (yDiff) / 2);
          ctx.rotate(angles);
          ctx.beginPath();
          // Move 5px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
          ctx.moveTo($scope.size(), 0);
          ctx.lineTo(-$scope.size(), $scope.size());
          ctx.lineTo(-$scope.size(), -$scope.size());
          ctx.closePath();
          ctx.fillStyle = this.stroke;
          ctx.fill();
          ctx.restore();
        }
      });
      const drawLineWithArrow = (points) => (new LineWithArrow(points, {
        strokeWidth: Math.abs($scope.data.value),
        cornerSize: 20,
        borderColor: '#E8E8E8',
        cornerColor: '#44444487',
        transparentCorners: true,
        cornerStyle: 'circle', //or rect
        opacity: $scope.data.valueo,
        strokeDashArray: $scope.isdashed,
        stroke: document.getElementById('myColor').value,
        selectable: false,
        padding: 20, // hasRotatingPoint: false,
        cornerSize: 20,
        borderColor: '#E8E8E8',
        cornerColor: '#CFCFCF',
        transparentCorners: true,
        cornerStyle: 'circle' //or rect
        //                                hasBorders: false,
        //                                hasControls: false
      }));
      const selectLine = (points) => {
        return drawLineWithArrow(points);
      };
      let line;
      let isDown;
      canvas.on('mouse:down', (options) => {
        isDown = true;
        const pointer = canvas.getPointer(options.e);
        const points = [$scope.standard(pointer.x,'x'), $scope.standard(pointer.y,'y'), $scope.standard(pointer.x,'x'), $scope.standard(pointer.y,'y')];
        line = selectLine(points);
        canvas.add(line).renderAll();
      });
      canvas.on('mouse:move', (options) => {
        if (!isDown) return;
        const pointer = canvas.getPointer(options.e);
        line.set({
          x2: $scope.standard(pointer.x,'x'),
          y2: $scope.standard(pointer.y,'y')
        });
        canvas.renderAll();
      });
      canvas.on('mouse:up', () => {
        isDown = false;
        line.setCoords();
        canvas.renderAll();
      });
    }
    ///// END: DRAW LINE ARROW
    //// BEGIN:DRAW STRAIGHT
    var drawStraight = function() {
      removeEvents();
      changeObjectSelection(false);
      canvas.on('mouse:down', function(o) {
        isDown = true;
        var pointer = canvas.getPointer(o.e);
        var points = [$scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y'), $scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y')];
        line = new fabric.Line(points, {
          strokeWidth: Math.abs($scope.data.value),
          fill: document.getElementById("myColor").value,
          stroke: document.getElementById("myColor").value,
          originX: 'left',
          originY: 'top',
          selectable: false,
          padding: 20,
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
          strokeDashArray: $scope.isdashed,
          opacity: $scope.data.valueo,
        });
        canvas.add(line);
      });
      canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);
        line.set({
          x2: $scope.standard(pointer.x, 'x'),
          y2: $scope.standard(pointer.y, 'y'),
        });
        canvas.renderAll();
        line.setCoords();
      });
      canvas.on('mouse:up', function(o) {});
    }
    /// END: DRAW STRAIGHT
    //// BEGIN: DRAWING TEXT
    $scope.Addtext = function() {
      removeEvents();
      changeObjectSelection(false);
      $scope.data.draw = false;
      var itext = new fabric.Text('Text', {
        originX: 'left',
        originY: 'top',
        left: 100,
        top: 150,
        fill: document.getElementById("myColor").value,
        strokeWidth: 1,
        fontSize: 30,
        fontFamily: 'Helvetica',
        padding: 20,
        cornerSize: 20,
        borderColor: '#E8E8E8',
        cornerColor: '#44444487',
        transparentCorners: true,
        cornerStyle: 'circle', //or rect
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
    $scope.input = function() {
      canvas.renderAll();
    }
    /*   $scope.blurr=function(){
        if(canvas.getActiveObject()){
            canvas.getActiveObject().isEditing=true;
             canvas.renderAll();
           }


      }*/
    $scope.textedit = function(text) {
      canvas.getActiveObject().set("text", text);
      canvas.renderAll();
    }
    /////END: OPTION ITEXT
    ////// BEGIN: ADD THE RULER
    canvas.renderAll(); //reset
    $scope.data.zoom = 30; // default zoom
    $scope.zoomless = 15; // min zoom
    $scope.zoommax = 60; // max zoom
    $scope.setzoom = function(intzoom) {$scope.ruler(intzoom)}
    $scope.ruler = function(intzoom) {
      
        /////// ALL CHANGE ZOOM WITH FUNCTION:"setzoom" 
        if ($scope.data.ruler) {
          var xobj = {};
          var xtext = {};
          var yobj = {};
          var ytext = {};
          var ytext = {};
          var xs = [];
          var ys = [];
          $scope.standardx = [];
          $scope.standardy = [];
          for (var i = parseInt(intzoom); i <= 500; i += parseInt(intzoom)) {
            ///////////// stripe  AND RULER X
            var standardcolorx = '#000000';
            var standardcolory = '#000000';
            var sizex = 0.1;
            var sizey = 0.1;
            var text = new fabric.Text(i.toString(), { ///rulerx
              fontFamily: 'Comic Sans',
              fontSize: 1 + $scope.data.zoom / 2,
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
              fontSize: 1 + $scope.data.zoom / 2,
              width: 1000,
              height: 1,
              left: 0,
              top: i - 10,
              selectable: false
            });
            ytext = texty;
            xs.push(ytext);
            x = new fabric.Rect({ //// caro line
              width: sizex,
              height: 1000,
              left: i,
              top: 15,
              fill: standardcolorx,
              selectable: false,
            });
            $scope.standardx.push(x.left)
            xobj = x;
            xs.push(xobj);
            y = new fabric.Rect({
              width: 1000,
              height: sizey,
              left: 15,
              top: i,
              fill: standardcolory,
              selectable: false,
            });
            $scope.standardy.push(y.top)
            yobj = y;
            xs.push(yobj);
          }
          var alltogetherObj = new fabric.Group(xs);
          canvas.setOverlayImage(alltogetherObj);
          canvas.renderAll();
        } else {
          $scope.standardx = [];
          $scope.standardy = [];
          canvas.overlayImage = false;
          canvas.renderAll();
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
    //////BEGIN: DRAWING arrow
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
          line = new fabric.Line([line.get('x2'), line.get('y2'), $scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y')], {
            stroke: document.getElementById("myColor").value,
            lockMovementX: true,
            lockMovementY: true,
            strokeWidth: Math.abs($scope.data.value),
            selectable: false,
            hoverCursor: 'default',
            cornerSize: 20,
            borderColor: '#E8E8E8',
            cornerColor: '#44444487',
            transparentCorners: true,
            cornerStyle: 'circle', //or rect
            strokeDashArray: $scope.isdashed,
            opacity: $scope.data.valueo,
          });
          canvas.add(line);
        } else {
          line = new fabric.Line([$scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y'), $scope.standard(pointer.x, 'x'), $scope.standard(pointer.y, 'y')], {
            stroke: document.getElementById("myColor").value,
            lockMovementX: true,
            strokeWidth: Math.abs($scope.data.value),
            lockMovementY: true,
            selectable: false,
            hoverCursor: 'default',
            cornerSize: 20,
            borderColor: '#E8E8E8',
            cornerColor: '#44444487',
            transparentCorners: true,
            cornerStyle: 'circle', //or rect
            strokeDashArray: $scope.isdashed,
            opacity: $scope.data.valueo,
          });
          canvas.add(line);
        }
      });
      canvas.on('mouse:move', function(o) {
        var pointer = canvas.getPointer(o.e);
        line.set({
          x2: $scope.standard(pointer.x, 'x'),
          y2: $scope.standard(pointer.y, 'y')
        });
        canvas.renderAll();
        // console.log(canvas.getObjects().length);
        //console.log(canvas.getObjects().pop());
      });
      canvas.on('mouse:up', function(o) {
        canvas.renderAll();
      });
    };
    /////END: DRAWING arrow
    /////BEGIN FILL
    fill = function() {
      console.log(canvas.getActiveObject());
      if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("fill", document.getElementById("myColorfill").value)
        canvas.renderAll();
        $scope.data.fill = true;
        $scope.$evalAsync()
      }
    }
    //////END FILL
    ///////BEGIN: SET FILL
    $scope.sf = false;
    $scope.data.fill = false
    $scope.setfill = function(values) {
      var value = !values
      $scope.sf = value;
      if (canvas.getActiveObject()) {
        if (canvas.getActiveObject().id == 'square' || canvas.getActiveObject().id == 'circle') {
          if (value) {
            canvas.getActiveObject().set('fill', document.getElementById('myColorfill').value);
          } else if (!value) {
            canvas.getActiveObject().set('fill', false);
          }
          canvas.renderAll();
        }
      }
    }
    $scope.colorfill = function(value) {
      if (value) {
        return document.getElementById("myColorfill").value;
      } else {
        return false;
      }
    }
    ///////END:SET FILL
    //////BEGIN: FUNTION() GET STANDARD XY
    var moving=function(){
      canvas.on('object:moving', function(event) {
     

      for (let i in $scope.standardx) {
        if (event.target.left >= $scope.standardx[i] - $scope.data.zoom / 2 && event.target.left < $scope.standardx[i] + $scope.data.zoom / 2) {
          event.target.left = $scope.standardx[i];
          canvas.renderAll();
        }
      }
      for (let i in $scope.standardy) {
        if (event.target.top >= $scope.standardy[i] - $scope.data.zoom / 2 && event.target.top < $scope.standardy[i] + $scope.data.zoom / 2) {
          event.target.top = $scope.standardy[i];
          canvas.renderAll();
        }
      }
    });
    }
     var unmoving=function(){
      canvas.off('object:moving');
    }
    $scope.autosnap=function(issnap){
     $scope.data.autosnap=!issnap;
        if($scope.data.autosnap){

        
    moving();
    $scope.standard = function(value, xy) {
      if (xy == 'x') {
        for (let i in $scope.standardx) {
          if (value >= $scope.standardx[i] - $scope.data.zoom / 2 && value < $scope.standardx[i] + $scope.data.zoom / 2) {
            value = $scope.standardx[i];
          }
        }
        return value;
      }
      if (xy == 'y') {
        for (let i in $scope.standardy) {
          if (value >= $scope.standardy[i] - $scope.data.zoom / 2 && value < $scope.standardy[i] + $scope.data.zoom / 2) {
            value = $scope.standardy[i];
          }
        }
        return value;
      }
    }
        } else {

          unmoving();
          $scope.standard = function(value, xy) {
      if (xy == 'x') {
       
        return value;
      }
      if (xy == 'y') {
      
        return value;
      }
    }
        

    
    }
    }
    $scope.standard = function(value, xy) {
      if (xy == 'x') {
       
        return value;
      }
      if (xy == 'y') {
      
        return value;
      }
    }
   
  
    //////END: FUNTION() GET STANDARD XY
    $scope.rangeruler=false;
    $scope.showrangeruler=function(){
        $scope.rangeruler=!$scope.rangeruler;
    }
    //////BEGIN: DRAW SQUARE
    function drawSquare() {
      canvas.discardActiveObject();
      removeEvents();
      changeObjectSelection(false);
      canvas.selection = false;
      var square, isDown, origX, origY;
      canvas.on('mouse:down', function(o) {
        $scope.reset = true;
        isDown = true;
        var pointer = canvas.getPointer(o.e);
        origX = $scope.standard(pointer.x, 'x');
        origY = $scope.standard(pointer.y, 'y');
        square = new fabric.Rect({
          id: 'square',
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          padding: 20,
          strokeWidth: Math.abs($scope.data.value),
          fill: $scope.colorfill($scope.sf),
          stroke: document.getElementById("myColor").value,
          selectable: false,
          hasRotatingPoint: false,
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
          opacity: $scope.data.valueo,
          strokeDashArray: $scope.isdashed,
        });
        canvas.add(square);
      });
      canvas.on('mouse:move', function(o) { //// THIS IS ALREADY CHANGE PER MOVE
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);
        if (origX > pointer.x) {
          square.set({
            left: $scope.standard(pointer.x, 'x')
          });
        }
        if (origY > pointer.y) {
          square.set({
            top: $scope.standard(pointer.y, 'y')
          });
        }
        square.set({
          width: Math.abs(origX - $scope.standard(pointer.x, 'x'))
        });
        square.set({
          height: Math.abs(origY - $scope.standard(pointer.y, 'y'))
        });
        canvas.renderAll();
      });
      canvas.on('mouse:up', function(o) {
        isDown = false;
        square.setCoords();
        // WHEN CLICK OFF  'circle.setCoords()'  with set the location correct when the current RECT just make
      });
    }
    //////END: DRAW SQUARE
    //////BEGIN: DRAW SIRCLE
    function drawCircle() {
      canvas.discardActiveObject();
      removeEvents();
      changeObjectSelection(false);
      canvas.on('mouse:down', function(o) {
        isDown = true;
        var pointer = canvas.getPointer(o.e);
        origX = $scope.standard(pointer.x, 'x')
        origY = $scope.standard(pointer.y, 'y')
        ellipse = new fabric.Ellipse({
          id: 'circle',
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          padding: 20,
          rx: $scope.standard(pointer.x, 'x') - origX,
          ry: $scope.standard(pointer.y, 'y') - origY,
          angle: 0,
          stroke: document.getElementById("myColor").value,
          strokeWidth: Math.abs($scope.data.value),
          fill: $scope.colorfill($scope.sf),
          selectable: false,
          hasRotatingPoint: false,
          cornerSize: 20,
          borderColor: '#E8E8E8',
          cornerColor: '#44444487',
          transparentCorners: true,
          cornerStyle: 'circle', //or rect
          strokeDashArray: $scope.isdashed,
          opacity: $scope.data.valueo,
        });
        canvas.add(ellipse);
      });
      canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);
        var rx = Math.abs(origX - $scope.standard(pointer.x, 'x')) / 2;
        var ry = Math.abs(origY - $scope.standard(pointer.y, 'y')) / 2;
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
    ////END: BACKWARD
    /////BEGIN: DELETE BG
    $scope.deletebg = function() {
     console.log(canvas.backgroundImage);
     canvas.backgroundImage=false;
     canvas.renderAll();
           }
    /////END: DELETE BG
    //// BEGIN: ZOOM CANVAS
    var canvasScale = 1;
    var SCALE_FACTOR = 1.2;
    $scope.Zoomin = function() {
      canvasScale = canvasScale * SCALE_FACTOR;
      canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
      canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
        canvas.backgroundImage.scaleX = canvas.backgroundImage.scaleX * SCALE_FACTOR;
        canvas.backgroundImage.scaleY =  canvas.backgroundImage.scaleY * SCALE_FACTOR;
        canvas.backgroundImage.left = canvas.backgroundImage.left* SCALE_FACTOR;
        canvas.backgroundImage.top =  canvas.backgroundImage.top* SCALE_FACTOR;
           

      var objects = canvas.getObjects();
      for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
        var tempScaleX = scaleX * SCALE_FACTOR;
        var tempScaleY = scaleY * SCALE_FACTOR;
        var tempLeft = left * SCALE_FACTOR;
        var tempTop = top * SCALE_FACTOR;
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        objects[i].setCoords();
      }
      canvas.renderAll();
    };
    $scope.Zoomout = function() {
      canvasScale = canvasScale / SCALE_FACTOR;
      canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
      canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));
      var objects = canvas.getObjects();
      for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
        var tempScaleX = scaleX * (1 / SCALE_FACTOR);
        var tempScaleY = scaleY * (1 / SCALE_FACTOR);
        var tempLeft = left * (1 / SCALE_FACTOR);
        var tempTop = top * (1 / SCALE_FACTOR);
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        objects[i].setCoords();
      }
      canvas.renderAll();
    };
    $scope.ResetZoom = function() {
      canvas.setHeight(canvas.getHeight() * (1 / canvasScale));
      canvas.setWidth(canvas.getWidth() * (1 / canvasScale));
        canvas.backgroundImage.scaleX = canvas.backgroundImage.scaleX * (1 / canvasScale);
        canvas.backgroundImage.scaleY =  canvas.backgroundImage.scaleY * (1 / canvasScale);
        canvas.backgroundImage.left = canvas.backgroundImage.left* (1 / canvasScale);
        canvas.backgroundImage.top =  canvas.backgroundImage.top* (1 / canvasScale);
      var objects = canvas.getObjects();
      for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
        var tempScaleX = scaleX * (1 / canvasScale);
        var tempScaleY = scaleY * (1 / canvasScale);
        var tempLeft = left * (1 / canvasScale);
        var tempTop = top * (1 / canvasScale);
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        objects[i].setCoords();
      }
      canvas.renderAll();
      canvasScale = 1;
    };
    ///// END: ZOOM CANVAS
    /// SAVE IMAGE
    $scope.saveImg = function() {
      $ionicLoading.show();
      if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
      } else {
        $timeout(function() {
          canvas.overlayImage = false;
          $scope.data.ruler = false;
          canvas.renderAll();
          for (var i = 0; i < 3; i++) {
            $scope.Zoomin();
          
          }
          console.log(canvas.toDataURL('image/jpeg'));
          document.addEventListener('deviceready', function() {
            var params = {
              data: canvas.toDataURL('jpg'),
              prefix: 'myPrefix_',
              format: 'JPG',
              quality: 100,
              mediaScanner: true
            };
            window.imageSaver.saveBase64Image(params, function(filePath) {
              console.log('File saved on ' + filePath);
              alert("success save file:" + filePath);
            }, function(msg) {
              console.error(msg);
            });
            $scope.ResetZoom();
          });
          $scope.ResetZoom();
          $ionicLoading.hide()
        }, 100);
      }
    }
    /// SAVE IMAGE
    ////SAVE JSON AS TEXT
    $scope.saveJson = function() {
      canvas.overlayImage = false;
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
      $scope.data.ruler = 0;
      canvas.loadFromDatalessJSON(obj, function() {
        for(let i in canvas.getObjects()){
          canvas.getObjects()[i].set('cornerSize', 20);
           canvas.getObjects()[i].set('borderColor', '#E8E8E8');
            canvas.getObjects()[i].set('cornerColor', '#44444487');
             canvas.getObjects()[i].set('transparentCorners', true);
              canvas.getObjects()[i].set('cornerStyle', 'circle');
               canvas.getObjects()[i].set('cornerSize', 20);
               canvas.getObjects()[i].set('padding', 20); 
        

        }
            
      });
      removeEvents();
      canvas.renderAll();
      a();
    };
    ///LOAD JSON
    ///DELETE 
    $scope.clear = function() {
      h.push(canvas.getActiveObject());
      canvas.remove(canvas.getActiveObject());
      canvas.renderAll();
    }
    $scope.delete = function() {
      canvas.clear();
      $scope.data.ruler = false;
      canvas.backgroundColor = "white"
      canvas.renderAll();
    }
    ///DELETE 
    var c = function(value) {
      return console.log(value);
    }
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
          element.children('input[file]').val(null);
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
          console.log(file);
          readFilebg(file).then(function(content) {
            $rootScope.$broadcast("uploadbg", {
              a: content
            });
          });
          element.children('input[file]').val(null);
        });
        element.on('click', function() {
          fileInput[0].click();
        });
      }
    };
  })
  /////////////UPLOAD IMAGE BG
  /////////////UPLOAD IMAGE BG
  .directive('image', function(readFilebg, $rootScope) {
    'use strict';
    return {
      template: '<input  type="file" accept="image/*" style="display: none;" />' + '<ng-transclude></ng-transclude>',
      transclude: true,
      link: function(scope, element) {
        var fileInput = element.children('input[file]');
        fileInput.on('change', function(event) {
          var file = event.target.files[0];
          console.log(file);
          readFilebg(file).then(function(content) {
            $rootScope.$broadcast("images", {
              a: content
            });
          });
          element.children('input[file]').val(null);
        });
        element.on('click', function() {
          fileInput[0].click();
        });
      }
    };
  });
/////////////UPLOAD IMAGE BG