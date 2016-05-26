/*Angular component:Module
**Author:
**name:developerMaze
**desc:
**dep:
*/

angular.module('developerMaze',['ngRoute','ui.bootstrap','ui.codemirror','angularTrix']);

angular.module('developerMaze').config(function($routeProvider){

	$routeProvider.when('/',{
		templateUrl:'templates/views/home.html',
		controller:'homeCtl'
	})

	.when('/questions',{
		templateUrl:'templates/views/questions.html',
		controller:'questionsCtl'
	})

	.when('/question',{
		templateUrl:'templates/views/question.html',
		controller:'questionCtl'
	})

	.when('/course',{
		templateUrl:'templates/views/course.html',
		controller:'courseCtl'
	})
	

	

})