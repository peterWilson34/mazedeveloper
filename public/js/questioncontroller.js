angular.module('developerMaze').controller('questionCtl',function( $scope ,sessionService ,$rootScope ,$http, server,$routeParams){

		$scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'xml',
    };

	 console.log($routeParams.id);
	$rootScope.question_id=$routeParams.id;
	$rootScope.user_id = sessionService.get('user');

	/*** get question data **/

	$scope.get_question_data=function(){
		$http({
			method:'POST',
			url: 'http://localhost:8000/questiondata',
			data: {
				'id':$rootScope.question_id,
				'user_id': sessionService.get('user'),
				'type': sessionService.get('type')
			}
		}).success(function(res){

			console.log(res);

			$rootScope.question = res.question[0];
			$rootScope.answers = res.answer;
			$rootScope.comments = res.comments;
			$rootScope.replies = res.replies[0];



		}).error(function(err){
			console.log(err);
		});
	};
	$scope.get_question_data();

	


	$scope.acceptAnswer = function(answer_id,index){

		//this block of code will be in http request success function

		$http({
			method: 'POST',
			url: 'http://localhost:8000/accept',
			data: {
				//'id':1

				'id':answer_id,
				'user_id': sessionService.get('user'),
				'type': sessionService.get('type')


			}
		}).success(function(res){
			console.log(res);
			$scope.answers[index]['accepted'] = 1;
			$scope.question['solved'] = 1;
		}).error(function(err){
			console.log(err);
		});

	};

	$scope.unacceptAnswer = function(answer_id,index){

		//this block of code will be in http request success function

		$http({
			method:'POST',
			url: 'http://localhost:8000/unaccept',
			data: {
				//'id':1
				'id':answer_id,
				'user_id': sessionService.get('user'),
				'type': sessionService.get('type')


			}
		}).success(function(res){
			console.log(res);
			$scope.answers[index]['accepted'] = 0;
			$scope.question['solved'] = 0;
		}).error(function(err){
			console.log(err);
		});

	};


	$scope.addAnswer=function(valid){
		console.log($scope.image_path.name);

		if(valid) {
			if (sessionService.get('type') == 'student') {
				arr = {
					'content': $scope.answer_content,
					'image': $scope.image_path.name,
					'question_id': $rootScope.question_id,
					'id': sessionService.get('user'),
					'type': 'student'
				};
			}
			else {
				arr = {
					'content': $scope.answer_content,
					'image': $scope.image_path.name,
					'question_id': $rootScope.question_id,
					'id': sessionService.get('user'),
					'type': 'instructor'
				};
			}
			//console.log(arr);
			$http({
				method: 'POST',
				url: 'http://localhost:8000/addanswer',
				data: {
					answer: arr
				}
			}).success(function (res) {
				console.log(res);
				
			}).error(function (err) {
				console.log(err);
			});
		}
		
	};

	$scope.editAnswer=function(answer_id){
		//console.log($scope.image_path);

			if (sessionService.get('type') == 'student') {
				arr = {
					'content': $scope.answer_content,
					'image': $scope.image_path.name,
					'question_id': $rootScope.question_id,
					'answer_id':answer_id,
					'id': sessionService.get('user'),
					'type': 'student'
				};
			}
			else {
				arr = {
					'content': $scope.answer_content,
					'image': $scope.image_path.name,
					'question_id': $rootScope.question_id,
					'id': sessionService.get('user'),
					'type': 'instructor'
				};
			}
			console.log(arr);
			//$http({
			//	method: 'POST',
			//	url: 'http://localhost:8000/editanswer',
			//	data: {
			//		answer: arr
			//	}
			//}).success(function (res) {
			//	console.log(res);
			//}).error(function (err) {
			//	console.log(err);
			//});

	};

	$scope.addComment=function(){

		if (sessionService.get('type') == 'student') {
			arr = {
				'content': $scope.comment,
				'question_id': $rootScope.question_id,
				'user_id': sessionService.get('user'),
				'type': 'student'
			};
		}
		else {
			arr = {
				'content': $scope.comment,
				'question_id': $rootScope.question_id,
				'user_id': sessionService.get('user'),
				'type': 'instructor'
			};
		}
		//console.log(arr);
		$http({
			method: 'POST',
			url: 'http://localhost:8000/questioncomment',
			data: {
				comment: arr
			}
		}).success(function (res) {
			console.log(res);
			$scope.comment = '';
			

		}).error(function (err) {
			console.log(err);
		});

	};

	$scope.editQuestion = function(valid){
		console.log($scope.selected_tags);
		if(valid){
			$http({
				method: 'POST',
				url: 'http://localhost:8000/editquestion',
				data: {
					'title':$scope.question.title,
					'content':$scope.question.content,
					'image':'',
					//'course_id':$scope.question.course,
					//'tag_id':$scope.question.tag,
					'course_id':1,
					'tag_id':[2,1],
					'student_id':sessionService.get('user')
				}
			}).success(function(res){
				$('#askModal').modal('hide');
				console.log(res);

			}).error(function(err){
				console.log(err);
			});
			$scope.question = {
				'title':'',
				'content':'',
				'image':'',
				'student_id':''
			};
		}
	};

	$scope.addReply=function(answer_id,reply){
		//data={
		//	'content': reply,
		//	'answer_id': answer_id,
		//	'user_id': sessionService.get('user'),
		//	'type': sessionService.get('type')
		//};
		//console.log(data);
		$http({
			method: 'POST',
			url: 'http://localhost:8000/answerreply',
			data: {
				'reply': {
					'content': reply,
					'answer_id': answer_id,
					'user_id': sessionService.get('user'),
					'type': sessionService.get('type')
				}
			}
		}).success(function(res){
			console.log(res);
			reply = '';

		}).error(function(err){
			console.log(err);
		});
	};


	$scope.like=function(answer_id){
		// data={
		// 	'answer_id': answer_id,
		// 		'user_id': sessionService.get('user'),
		// 		'type': sessionService.get('type')
		// };
		// console.log(data);
		$http({
			method: 'POST',
			url: 'http://localhost:8000/likeaction',
			data: {
					'answer_id': answer_id,
					'user_id': sessionService.get('user'),
					'type': sessionService.get('type')
			}
		}).success(function(res){
			console.log(res);
        
		}).error(function(err){
			console.log(err);
		});
	};

	$scope.dislike=function(answer_id){

		$http({
			method: 'POST',
			url: 'http://localhost:8000/dislikeaction',
			data: {
				'answer_id': answer_id,
				'user_id': sessionService.get('user'),
				'type': sessionService.get('type')
			}
		}).success(function(res){
			console.log(res);

		}).error(function(err){
			console.log(err);
		});
	};



});



