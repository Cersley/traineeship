app.controller("RedactCoursesController",
    function($scope, $http, $routeParams, $route, $location, $timeout, $anchorScroll) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.$on('$routeChangeSuccess', function(event, current) {
        $scope.paramId = $route.current.params.courseId;
        $http.get('/courses/' + $scope.paramId)
            .then(function successCallback(courseOne) {
                $scope.courseData = courseOne.data;
            }, function errorCallback(err) {
                console.log('error', err);
            });
    });
    $scope.go = function (hash) {
            $timeout(function () {
                $location.path(hash);
                $location.hash("topRed");
                $anchorScroll();
            }, 500);
    }
    $scope.addTypes = function(typeOfCourse, courseId) {
        if (typeOfCourse === undefined) {
            $location.url('/courses/construction');
        } else {
            $http.put('/addTypes/' + courseId, {types: typeOfCourse, courseId: courseId})
        }
    }
    $scope.addSynopsisOfCourse = function(titleOfCourse, subtitleOfCourse,
                                        whoOfCourse, whyOfCourse, whatOfCourse, courseId) {
        $http.put('/addSynopsis/' + courseId,
            {
                title: titleOfCourse,
                subtitle: subtitleOfCourse,
                who: whoOfCourse,
                why: whyOfCourse,
                what: whatOfCourse,
                courseId: courseId
            }
        )
    }
    $scope.addDiscoverOfCourse = function(purposeGoal, learningContent, activites, learningCourse,
                                   learningGoals, courseId) {
        $http.put('/addDiscover/' + courseId,
            {
                purposeGoal: purposeGoal,
                learningContent: learningContent,
                activites: activites,
                learningCourse: learningCourse,
                learningGoals: learningGoals,
                courseId: courseId
            }
        )
    }
    $http.get('/uploads')
        .then(function successCallback(img) {
            $scope.uploads = img.data;
        }, function errorCallback(err) {
            console.log('error', err);
        });
    $scope.removeResourse = function(resourseId, $index) {
        $scope.uploads.splice($index, 1);
        $http.delete('/uploads/' + resourseId);
    };
    $scope.addImg = function (uploadResourses) {
        if (Object.keys($scope.uploaded).length === 0) {
            $location.url('/redactCourse/' + paramId);
        } else {
            $http.put('/addImg/' + $scope.paramId, {upload: uploadResourses});
        }
    }
    $scope.uploaded = {};
});