angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', '$state', '$cordovaGeolocation', '$locationProperties',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $state, $cordovaGeolocation, $locationProperties) {
 var options = {timeout: 10000, enableHighAccuracy: true};
  var marker;
  var latLng;
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    $scope.checkMarker = "opencheck";
	$scope.closeMarker = "closeclose";
    latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      center: latLng,
      zoom: 15,
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
	  disableDefaultUI: false,
	  mapTypeControl: false,
	  streetViewControl: false,
      styles:[{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#1e7185"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"lightness":"44"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"lightness":"-89"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#95ff00"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#9cd7da"}]}]
      
    };
    $scope.map = new google.maps.Map(document.getElementById("homemap"), mapOptions);
	$locationProperties.setLoc($scope.map.getCenter());
	google.maps.event.addListener($scope.map, 'dragstart', function(event) {
	});
	google.maps.event.addListener($scope.map, 'idle', function(event) {
		placeMarker($scope.map.getCenter());
	});
	function placeMarker(location) {
	 /**if ( marker ) {*/
		  $locationProperties.setLoc(location);
	 /**}else{
	    marker = new google.maps.Marker({
		position: location,
		map: $scope.map,
	  });
	  }*/
	}
	/**google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
	      marker = new google.maps.Marker({
		  map: $scope.map,
		  animation: google.maps.Animation.DROP,
		  position: latLng
	  });      
	 
	  var infoWindow = new google.maps.InfoWindow({
		  content: "Here I am!"
	  });
	 
	  google.maps.event.addListener(marker, 'click', function () {
		  infoWindow.open($scope.map, marker);
	  });
	 
	});*/
 
  }, function(error){
    console.log("Could not get location");
  });
  
  myLocation = function(){
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
    coord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $scope.map.panTo(coord);
  }, function(error){
    console.log("Could not get location");
  });
		
  };
}])
   
.controller('referCtrl', ['$scope', '$state', '$cordovaGeolocation', '$locationProperties', '$http', '$infoProperties', 'Camera', '$ionicPlatform',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $cordovaGeolocation, $locationProperties, $http, $infoProperties, Camera, $ionicPlatform) {
 var options = {timeout: 10000, enableHighAccuracy: true};
  var marker;
  var latLng;
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    latLng = $locationProperties.getLoc();
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
	  disableDefaultUI: false,
	  mapTypeControl: false,
	  streetViewControl: false,
      styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#1e7185"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"lightness":"44"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"lightness":"-89"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#95ff00"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#9cd7da"}]}]
        
    };
    $scope.map = new google.maps.Map(document.getElementById("refermap"), mapOptions);
	google.maps.event.addListener($scope.map, 'click', function(event) {
		placeMarker($scope.map.getCenter());
	});
	function placeMarker(location) {
	  /**if ( marker ) {*/
		  $locationProperties.setLoc(location);
	 /**}else{
	   marker = new google.maps.Marker({
		position: location,
		map: $scope.map,
	  });
	  }*/
	}
	/**google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
	      marker = new google.maps.Marker({
		  map: $scope.map,
		  animation: google.maps.Animation.DROP,
		  position: latLng
	  });      
	 
	  var infoWindow = new google.maps.InfoWindow({
		  content: "Here I am!"
	  });
	 
	  google.maps.event.addListener(marker, 'click', function () {
		  infoWindow.open($scope.map, marker);
	  });
	 
	});*/
 
  }, function(error){
    console.log("Could not get location");
  });
  $scope.submitPrompt = "submithidden";
  $scope.submitForm = function(){
	var latlng = $locationProperties.getLoc();
	var nm = $infoProperties.getNm();
	var lat = latlng.lat();
	var lng = latlng.lng();
    console.log(lat);
	console.log(lng);
	var method = 'POST';
	  var url = 'http://test.appkauhale.com/postReferral.php';
	  $scope.codeStatus = "";
		var data = {
		  lat: lat,
		  lng: lng,
		  nm: nm
		};
		$http({
		  method: method,
		  url: url,
		  data: data,
		  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		}).
		success(function(response) {
			$scope.codeStatus = response.data;
			$scope.submitPrompt = "submitprompt";
		}).
		error(function(response) {
			$scope.codeStatus = response || "Request failed";
		});
  };
  myLocation = function(){
	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
    coord = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $scope.map.panTo(coord);
  }, function(error){
    console.log("Could not get location");
  });
  };
  $scope.saveInput = function(e){
	  $infoProperties.setNm(e);
  };
  
  // Camera Functions
  $scope.takePic = function (options) {
    options = {
      quality : 25,
      targetWidth: 1024,
      targetHeight: 1024,
      sourceType: 1, // 0:PHOTOLIBRARY, 1:CAMERA, 2:SAVEDPHOTOALBUM
      correctOrientation: true,
      destinationType: 1, // 0:DATA_URL, 1:FILE_URI, 2:NATIVE_URI
      encodingType: 0, // 0:JPEG, 1:PNG
      allowEdit: false
    };
    
    $ionicPlatform.ready(function() {
      if (!navigator.camera) {
        // Load image if unable to get camera
        $scope.picture='http://community.wdfiles.com/local--files/404/404.jpg';
      } else {
        Camera.getPicture(options).then(function(imagePath) {
          $scope.picture = imagePath;
          console.log(imagePath);
        }, function(err) {
          console.log("Camera Failed: " + err);
        });
      }
    });
  };
  
  $scope.sendPic = function(imageName) {
    
    $ionicPlatform.ready(function() {
      var uploadURI = "http://test.appkauhale.com/postimage.php";
      
      var filename = imageName;
      
      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "image/jpg",
        params : {'directory':'images', 'fileName':filename}
      };
      
      var ft = new FileTransfer();
      ft.upload($scope.picture, encodeURI(uploadURI), uploadSuccess, uploadError, options);
    });
    
    function uploadSuccess(r) {
      /**
      Object r {
        bytesSent: NUMBER,
        responseCode: HTTP_RESPONSE_CODE,
        response: ECHO_STRING_RESPONSE,
        objectId: "" }
      **/
      console.log(JSON.stringify(r));
    }
    
    function uploadError(error) {
      console.log("Error: " + error);
    }
    
  };
  
  $scope.itens = [
      { title: "an Individual", checked: false },
      { title: "a Group", checked: false },
  ];
  
  $scope.updateSelection = function(position, itens, title) {
      angular.forEach(itens, function(subscription, index) {
          if (position != index)
              subscription.checked = false;
              $scope.selected = title;
          }
      );
  };


}])

.controller('kauhaleCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
 
}])
      
.controller('resourcesCtrl', ['$scope', '$stateParams', '$cordovaGeolocation','$compile', 'Markers',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaGeolocation, $compile, Markers) {
	var gmarkers1 = [];
	var apiKey = false;
	
	  function initMap(){
		var options = {timeout: 10000, enableHighAccuracy: true};
	 
		$cordovaGeolocation.getCurrentPosition(options).then(function(position){
	 
		  var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	 
		  var mapOptions = {
			center: latLng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		  disableDefaultUI: false,
		  mapTypeControl: false,
		  streetViewControl: false,
          styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#1e7185"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"lightness":"44"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"lightness":"-89"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#95ff00"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#9cd7da"}]}]
            
          };
	 
		  $scope.map = new google.maps.Map(document.getElementById("resourcemap"), mapOptions);
	 
		  //Wait until the map is loaded
		  google.maps.event.addListenerOnce($scope.map, 'idle', function(){
	 
			//Load the markers
			loadMarkers();
	 
		  });
	 
		}, function(error){
		  console.log("Could not get location");
	 
			//Load the markers
			loadMarkers();
		});
	 
	  }
	 
	  function loadMarkers(){
		  //Get all of the markers from our Markers factory
		  Markers.getMarkers().then(function(markers){
			console.log("Markers: ", markers);
			var records = markers.data.markers;
			var iconDir = "/img/map/";
			var icons = {
			  food: {
				icon: iconDir + 'food.png'
			  },
			  medicine: {
				icon: iconDir + 'medical.png'
			  },
			  shelter: {
				icon: iconDir + 'shelters.png'
			  },
			  misc: {
				icon: iconDir + ''
			  }
			};
			for (var i = 0; i < records.length; i++) {
			  var record = records[i];   
			  var markerPos = new google.maps.LatLng(record.lat, record.lng);
			  // Add the markerto the map
			  var marker = new google.maps.Marker({
				  category: record.cat,
				  map: $scope.map,
				  icon: icons[record.cat].icon,
				  animation: google.maps.Animation.DROP,
				  position: markerPos
			  });
	          angular.element(document.getElementById('listContainer')).append($compile("<li class='listviewstyle'><span>"+record.name+"</span><p>"+record.address+"</p><p>Hours of Operation:"+record.hour+"</p><p><a href='"+record.website+"'>Visit Website</a><button ng-click='toggleList()' onclick='gotoLocation("+record.lat+","+record.lng+")' class='listmapbutton'>View on Map</button></p></li>")($scope));
			  var infoWindowContent = "<h4>" + record.name + "</h4>";          
	          gmarkers1.push(marker);
			  addInfoWindow(marker, infoWindowContent, record);
	 
			}
	 
		  }); 
	  }
	 
	  function addInfoWindow(marker, message, record) {
	 
		  var infoWindow = new google.maps.InfoWindow({
			  content: message
		  });
	 
		  google.maps.event.addListener(marker, 'click', function() {
			  infoWindow.open($scope.map, marker);
		  });
	 
	  }
	  filterMarkers = function (e) {
		   var category = e;
           console.log(gmarkers1.length);
		   for (i = 0; i < gmarkers1.length; i++) {
			   if(category == "All"){
				   marker = gmarkers1[i];
				   marker.setVisible(true);
			   }else{
					marker = gmarkers1[i];
					// If is same category or category not picked
					if (marker.category.toLowerCase().indexOf(category.toLowerCase()) > -1 || category.length === 0) {
						marker.setVisible(true);
					}
					// Categories don't match 
					else {
						marker.setVisible(false);
					}
			   }
        }
      };
      initMap();
    
    // Instantiate map filter bars as hidden
    $scope.resourceBar = "closedanimateresources";
    $scope.searchBar = "closedanimatesearch";
    
    $scope.toggleResources = function () {
        if ($scope.resourcesBar === "openanimate") {
            hideResources();
        }
        else {
          if ($scope.searchBar === "openanimate") {
            hideSearch();
          }
		  if ($scope.listBar === "openanimate") {
            hideList();
          }
          showResources();
        }
    };
    
    hideResources = function () {
      $scope.resourcesButton="hidden-resource-button";
      $scope.resourcesBar="closedanimate";
    };
    
    showResources = function () {
      $scope.resourcesButton="dark-resource-button";
      $scope.resourcesBar="openanimate";
    };
    gotoLocation = function (lat,lng){
		coord = new google.maps.LatLng(lat, lng);
        $scope.map.panTo(coord);
	};
    $scope.toggleSearch = function () {
        
        if ($scope.searchBar === "openanimate") {
            hideSearch();
        }
        else {
          if ($scope.resourcesBar === "openanimate") {
            hideResources();
          }
		  if ($scope.listBar === "openanimate") {
            hideList();
          }
          showSearch();
        }
    };
    
    hideSearch = function () {
      $scope.searchButton="hidden-resource-button";
      $scope.searchBar="closedanimate";
    };
    
    showSearch = function () {
      $scope.searchButton="dark-resource-button";
      $scope.searchBar="openanimate";
    };
	
	$scope.toggleList = function () {
        if ($scope.listBar === "openanimate") {
            hideList();
        }
        else {
          if ($scope.searchBar === "openanimate") {
            hideSearch();
          }
		  if ($scope.resourcesBar === "openanimate") {
            hideResources();
          }
          showList();
        }
    };
    
    hideList = function () {
	  console.log($scope);
      $scope.listButton="hidden-resource-button";
      $scope.listBar="closedanimate";
    };
    
    showList = function () {
      $scope.listButton="dark-resource-button";
      $scope.listBar="openanimate";
    };
	
	$scope.toggleMap = function () {
          if ($scope.searchBar === "openanimate") {
            hideSearch();
          }
		  if ($scope.resourcesBar === "openanimate") {
            hideResources();
          }
		  if ($scope.listBar === "openanimate"){
			hideList();
		  }
    };
    
}])

.factory('Markers', function($http) {
	
  var markers = [];
 
  return {
    getMarkers: function(){
		
      return $http.get("http://test.appkauhale.com/allmarkers.php").then(function(response){
          markers = response;
          return markers;
      });
    }
  };
})

.controller('foodCtrl', ['$scope', '$stateParams', 'FoodMaps',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, FoodMaps) {
    FoodMaps.init();

}])

.controller('medicalCtrl', ['$scope', '$stateParams', 'MedicineMaps',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, MedicineMaps) {
    
	 MedicineMaps.init();

}])

.controller('shelterCtrl', ['$scope', '$stateParams', 'shelMaps',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, shelMaps) {
    
	 shelMaps.init();

}])

.controller('volunteerCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('getinvolvedCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('eventsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('eventsCtrl', function($scope) {
  $scope.items = [{
      time: '9:30AM',
      title: 'Summer Fun Events',
      date: 'August 25, 2016',
      location: 'Kaʻaahi Women & Family Shelter',
      text: 'For the past five years, IHS has collaborated with local business and community members to host Summer Fun programs for homeless keiki, including a wide range of activities from working in a fish pond to learning how to surf.  Each event is an opportunity to teach life-long lessons and values, including responsibility, leadership, caring, collaboration, and the pursuit of excellence, giving keiki a break from the day-to-day stress of living in a shelter.'},{
      time: '11:30AM',
      title: 'Mens Bible Study',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '2:30PM',
      title: 'Serve with Us',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '5:30PM',
      title: 'Orientation',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '11:30AM',
      title: 'Mens Bible Study',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '11:30AM',
      title: 'Mens Bible Study',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '11:30AM',
      title: 'Mens Bible Study',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'},{
      time: '11:30AM',
      title: 'Mens Bible Study',
      date: 'August 25, 2016',
      location: 'At this Shelter',
      text: 'We host a mens only study from 11:30am to 1:00pm. The kitchen will be serving a hot meal.'
          

  }];

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleItem= function(item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function(item) {
    return $scope.shownItem === item;
  };
    

})

.controller("aboutCtrl", function($http, $scope) {

    $scope.init = function() {
        $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "num":"100", "q": "http://fetchrss.com/rss/57cf1b9e8a93f83b347b23c657313113082.xml" } })
            .success(function(data) {
                $scope.rssTitle = data.responseData.feed.title;
                $scope.rssUrl = data.responseData.feed.feedUrl;
                $scope.rssSiteUrl = data.responseData.feed.link;
                $scope.entries = data.responseData.feed.entries;
                window.localStorage.entries = JSON.stringify(data.responseData.feed.entries);
            })
            .error(function(data) {
                console.log("ERROR: " + data);
                if(window.localStorage.entries !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage.entries);
                }
            });
    };

    $scope.browse = function(v) {
        window.open(v, "_system", "location=yes");
    };
    
    $scope.getPhoto = function(entry) {
    return entry.content.match(/src="([^"]*)/)[1];
    };

});


