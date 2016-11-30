var app = angular.module ('App', ['ui.router']);

app.config ([
    '$stateProvider',

    function ($stateProvider) {
        console.log ('state loaded...');

        $stateProvider
            .state ('home', {
                url: '/',
                templateUrl: 'templates/partials/home.html',
                controller: 'App.homeController',
                controllerAs: 'homeController'
            })
            .state ('contact', {
                url: '/contact',
                templateUrl: 'templates/partials/contact.html',
                controller: 'App.contactController',
                controllerAs: 'contactController'
            })
            .state ('about', {
                url: '/about',
                templateUrl: 'templates/partials/about.html',
                controller: 'App.aboutController',
                controllerAs: 'aboutController'
            })
        ;
    }
]);


app.controller ('App.homeController', ['$scope', '$http', function ($scope, $http) {
    console.log ('- Home Controller loaded...');

    var controller = this;

    // Use the angular http service object to
    // make a call to our server.
    // $http.deafults.headers.common ['Content-Type'] = 'application/json';
    $http ({
        method: 'GET',
        url: '/product',
        headers: {
            'Content-Type': 'application/json'
        },
        // Send empty data for headers to be set.
        data: {}
    })
    // Check for the success of the call.
    .success (function (response) {
        console.log ('The call was successful.');
        console.log ('This is the response: ', response);
        controller.productList = response;
        // console.log ('This is the response message: ', response.message);
    })
    // Check for the failure of the call.
    .error (function () {
        console.error ('The call failed.');
    });
}]);

app.controller ('App.contactController', ['$scope', function ($scope) {
    console.log ('- Contact Controller loaded...');
}]);

app.controller ('App.aboutController', ['$scope', function ($scope) {
    console.log ('- About Controller loaded...');
}]);
