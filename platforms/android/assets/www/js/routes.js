angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.about', {
    url: '/about',
    views: {
      'side-menu21': {
        templateUrl: 'pages/about.html',
        controller: 'aboutCtrl'
      }
    }
  })
  
  
  .state('menu.resources', {
    url: '/resources',
    views: {
      'side-menu21': {
        templateUrl: 'pages/resources.html',
        controller: 'resourcesCtrl'
      }
    }
  })
  
  .state('menu.food', {
    url: '/resources',
    views: {
      'side-menu21': {
        templateUrl: 'pages/resources.html',
        controller: 'foodCtrl'
      }
    }
  })
  .state('menu.medical', {
    url: '/resources',
    views: {
      'side-menu21': {
        templateUrl: 'pages/resources.html',
        controller: 'medicalCtrl'
      }
    }
  })
  .state('menu.shelter', {
    url: '/resources',
    views: {
      'side-menu21': {
        templateUrl: 'pages/resources.html',
        controller: 'shelterCtrl'

      }
    }
  })
  
  .state('menu.volunteer', {
    url: '/volunteer',
    views: {
      'side-menu21': {
        templateUrl: 'pages/volunteer.html',
        controller: 'volunteerCtrl'
      }
    }
  })
  
    .state('menu.getinvolved', {
    url: '/getinvolved',
    views: {
      'side-menu21': {
        templateUrl: 'pages/getinvolved.html',
        controller: 'getinvolvedCtrl'
      }
    }
  })
  
  .state('menu.events', {
    url: '/events',
    views: {
      'side-menu21': {
        templateUrl: 'pages/events.html',
        controller: 'eventsCtrl'
      }
    }
  })
  
  .state('menu.contact', {
    url: '/contact',
    views: {
      'side-menu21': {
        templateUrl: 'pages/contact.html',
        controller: 'contactCtrl'
      }
    }
  })
  
  .state('menu.refer', {
    url: '/refer',
    views: {
      'side-menu21': {
        templateUrl: 'pages/refer.html',
        controller: 'referCtrl'
      }
    }
  })
  
  

  .state('menu', {
    url: '/kauhale',
    templateUrl: 'pages/menu.html',
    abstract:true
  })
  
    .state('resource-menu', {
    url: '/resources/menu',
    templateUrl: 'pages/menu.html',
    abstract:true
  });
  
  
  
 
$urlRouterProvider.otherwise('/kauhale/home');

  

});