'use strict';

angular.module('app',['ui.router','ngCookies']);
'use strict';
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:'/main',
		templateUrl:'view/main.html',
		controller:'mainCtrl'
	})
	.state('details',{
		url:'/details/:id',
		templateUrl:'view/details.html',
		controller:'detailsCtrl'
	})
	.state('post',{
		url:'/post',
		templateUrl:'view/post.html',
		controller:'postCtrl'
	})
	.state('search',{
		url:'/search',
		templateUrl:'view/search.html',
		controller:'searchCtrl'
	})
	.state('me',{
		url:'/me',
		templateUrl:'view/me.html',
		controller:'meCtrl'
	})
	.state('login',{
		url:'/login',
		templateUrl:'view/login.html',
		controller:'loginCtrl'
	})
	.state('regist',{
		url:'/regist',
		templateUrl:'view/regist.html',
		controller:'registCtrl'
	})
		.state('deliver',{
		url:'/deliver',
		templateUrl:'view/deliver.html',
		controller:'deliverCtrl'
	}).state('collect',{
		url:'/collect',
		templateUrl:'view/collect.html',
		controller:'collectCtrl'
	});
	
	$urlRouterProvider.otherwise('main');	
}])

	
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('collectCtrl', ['$scope','$http','$state',function($scope,$http,$state){
	
		$http.get("data/myFavorite.json")
		.then((resp)=>{
			$scope.data=resp.data;
		});
		$scope.imgUrl="image/star-active.png";
		$scope.star=false;
		$scope.f=true;
		$scope.doStar=function($event){
			$event.stopPropagation();
			if ($scope.f) {
				$scope.imgUrl="image/star.png";
				$scope.f=false;
			}else{
				$scope.imgUrl="image/star-active.png";
				$scope.f=true;
			}
		}
		

}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('deliverCtrl', ['$scope','$http', function($scope,$http){
	//定义一个tabList列表用来在页面遍历
	$scope.tabList = [{
		id:'all',
		name:'全部'
	},{
		id:'pass',
		name:'面试邀请'
	},{
		id:'fail',
		name:'不合适'
	}];

	//获取myPost.json数据传到页面展示
	$http.get('data/myPost.json').then(function(resp){
		console.log(resp.data);
		$scope.data = resp.data;
	})

	//拿到过滤器对象
	$scope.filterObj = [];

	//对tabList进行事件绑定以及内容筛选
	$scope.Tclick = function(id,name){
		console.log(id,name);
		
		switch(id){
			case 'all':
				delete $scope.filterObj.state;
			break;
			case 'pass':
				$scope.filterObj.state = '1';
			break;
			case 'fail':
				$scope.filterObj.state = '-1';
			break;
		}
	}

}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('detailsCtrl', ['$scope','$http', '$rootScope','$state',function($scope,$http,$rootScope,$state){
	
	$http.get("data/position.json")
		.then((resp)=>{
			$scope.data=resp.data;
		});
	$http.get("data/company.json")
	.then((resp)=>{
		$scope.data1=resp.data;
	});
	
	$scope.flag=true;
	$scope.flag1=false;
	$scope.flag2=true;
	$scope.imgUrl="image/star.png";
	if ($rootScope.state==2) {
		
		$scope.flag=false;
		$scope.flag1=true;
		$scope.flag2=false;

	}
	$scope.deliver="投个简历";
	$scope.doDeliver=function(){
		$scope.deliver="已投递";
	}
	$scope.f=true;
	$scope.doStar=function(){
		if ($scope.f) {
		$scope.imgUrl="image/star-active.png";
		$scope.f=false;
	}else{
		$scope.imgUrl="image/star.png";
		$scope.f=true;
	}
	}


}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('loginCtrl', ['$scope','$http','$cookies','$state','$rootScope', function($scope,$http,$cookies,$state,$rootScope){
	$scope.span=true;
	$scope.doLogin=function(){
		if ($scope.phone==$cookies.getObject('register').phone&&$scope.pwd==$cookies.getObject('register').pwd) {
			$state.go('main');
			$rootScope.state=2;
		}else{
			$scope.span=false;
		}
	}
	

		

}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('mainCtrl', ['$scope','$http','$state','$rootScope', function($scope,$http,$state,$rootScope){
	$scope.star=true;
	$http.get("data/positionList.json")
		.then((resp)=>{
			$scope.data=resp.data;
		})
	
	$http.get("data/regist.json")
		.then((resp)=>{
			$scope.data1=resp.data;
		})
		$scope.flag1=false;
		$scope.flag2=false;
		$scope.flag3=true;
	if ($rootScope.state==2) {
		$scope.flag1=true;
		$scope.flag2=true;
		$scope.flag3=false;
	}

		

}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('meCtrl', ['$scope','$http','$rootScope','$state', function($scope,$http,$rootScope,$state){
	$http.get("data/regist.json")
	.then((resp)=>{
		$scope.data1=resp.data;
	});
	$scope.flag1=true;
	$scope.flag2=false;
	if ($rootScope.state==2) {
		$scope.flag1=false;
	$scope.flag2=true;
	}


	

}])
angular.module('app').controller('postCtrl', ['$scope','$http', '$state',function($scope,$http,$state){
	
	$http.get("data/company.json")
		.then((resp)=>{
			$scope.data1=resp.data;
		});
		$scope.sty1='on';
		$scope.sty2='';
		$scope.flag1=true;
		$scope.flag2=false;
	$scope.doChange1=function(){
		$scope.sty1='on';
		$scope.sty2='';
		$scope.flag1=true;
		$scope.flag2=false;
	}
	$scope.doChange2=function(){
		$scope.sty1='';
		$scope.sty2='on';
		$scope.flag1=false;
		$scope.flag2=true;
	}
		


}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('registCtrl', ['$scope','$http','$interval','$cookies','$state', function($scope,$http,$interval,$cookies,$state){
	
	$scope.flag1=false;
	$scope.flag2=false;
	$scope.doCheckPhone1=function(){
		if (/^1[3|4|5|8][0-9]{9}$/.test($scope.phone)) {
			$scope.check1='✅';
			$scope.flag1=true;

		}else{
			$scope.check1='❌';
			$scope.flag1=false;
		}
	};
	$scope.doCheckPhone2=function(){
		if (/^[0-9a-zA-Z]{6,}$/.test($scope.pwd)) {
			$scope.check2='✅';
		$scope.flag2=true;
		}else{
			$scope.check2='❌';
			$scope.flag2=false;
		}
	};
	$scope.message="发送短信";
	$scope.doMess=function(){
		$scope.message=10;
		var timer=$interval(doTime,1000);
		function doTime(){
			$scope.message--;
			if ($scope.message==0) {
				$interval.cancel(timer);
				$scope.message="重新发送";
			}
		}
	}
	$scope.doRegist=function(){
		if ($scope.flag1==true&&$scope.flag2==true) {
			$cookies.putObject('register',{phone:$scope.phone,pwd:$scope.pwd});
			$state.go('login');
		}
		
	}

}])
'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('searchCtrl', ['$scope','$http','$rootScope', '$state',function($scope,$http,$rootScope,$state){
	$http.get("data/positionList.json")
		.then((resp)=>{
			$scope.data=resp.data;
		});
	
	$scope.tabList = [{
		id:'city',
		name:'城市'
	},{
		id:'salary',
		name:'薪水'
	},{
		id:'scale',
		name:'公司规模'
	}];

	
	//拿到过滤器对象
	$scope.filterObj = [];

	//对tabList进行事件绑定以及内容筛选
	$scope.Tclick = function(id,name){
		
	$scope.selectList=$rootScope.selects[id]; //获取选择列表
	console.log($scope.selectList);
   	$scope.tabId=id; //当前选中tab的索引
   	$scope.visible=true;
		
	}
	$scope.selectClick=function(id,name){ //c1,南京  c2,上海  s1,3000以下
   	 // console.log(id);
   
   	 if(id){ //点击具体选择
   	 	//设置搜索条件
   	 	$scope.filterObj[$scope.tabId+'Id']=id; //cityId c1
   	 	//修改tab选项中当前选中项的名称 
   	 	angular.forEach($scope.tabList,function(item){
   	 		if(item.id==$scope.tabId){
   	 			item.name=name;
   	 		}
   	 	});
   	 }else{ //点击“全国”或"不限"
   	 	delete $scope.filterObj[$scope.tabId+'Id'];
   	 	//修改tab选项中当前选中项的名称 
   	 	angular.forEach($scope.tabList,function(item){
   	 		if(item.id==$scope.tabId){
   	 			switch(item.id){
   	 				case 'city':
   	 					item.name='城市';
   	 					break;
   	 				case 'salary':
   	 					item.name='薪水';
   	 					break;
   	 				case 'scale':
   	 					item.name='公司规模';
   	 					break;		
   	 			}
   	 		}
   	 	})
   	 }
   };
  


}])
'use strict';
//定义一个叫做filterByObj的过滤器
angular.module('app').filter('filterByObj',[function(){

	//它会返回一个函数，并且接收两组数据，第一组数据是需进行过滤的数据，第二组数据是过滤条件，
	return function(data,filterObj){

		var result=[];//定义一个空的数组

		//对需要过滤的数据进行forEach（）遍历（逐条进行遍历‘筛选’）
		angular.forEach(data,function(item){

			var flag=true;//定义一个遍历用来判断是否符合过滤条件
			
			//下面的for循环就是用来循环过滤条件的每一个条件
			for(var index in filterObj){ 

				//判断过滤数据中是否有符合过滤条件的数据，如果有就添加到result数组中
				if(item[index]!=filterObj[index]){
					flag=false;
				}
			}
			if(flag){
				result.push(item);
			}
		});
		return result;
	}
}]);
'use strict';

angular.module('app').directive('appTabb', [function(){
	return {
		restrict: 'AE',
		replace:true, 
		templateUrl: 'view/apptab.html',
		scope:{
			list: ' = ',
			tabClick: '&',

		},
		link:function($scope){
			$scope.click = function(tab){
				$scope.selectId = tab.id;
				$scope.tabClick(tab);
			}
		}
	};
}]) 
 
'user strict';

angular.module('app').directive('appBackground', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/background.html'
	};
}])
'user strict';

angular.module('app').directive('appCompany', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/company.html'
	};
}])
'user strict';

angular.module('app').directive('appFooter', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/footer.html'
	};
}])

'user strict';

angular.module('app').directive('appFooter1', [function () {
	return {
		
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/footer1.html'
	};
}])

'use strict';

angular.module('app').run(['$rootScope','$http',function($rootScope,$http){
	$rootScope.selects={};
	$http.get('data/city.json').then(function(reps){
		$rootScope.selects.city=reps.data;
	});
	$http.get('data/salary.json').then(function(reps){
		$rootScope.selects.salary=reps.data;
	});
	$http.get('data/scale.json').then(function(reps){
		$rootScope.selects.scale=reps.data;
	});
}]);

'user strict';

angular.module('app').directive('appHead', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/head.html'
	};
}])

'user strict';

angular.module('app').directive('appHead1', [function () {
	return {
		scope:{
			title:"@appHead1",
		},
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/head1.html'
	};
}])

'user strict';

angular.module('app').directive('appHead2', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/head2.html'
	};
}])

'user strict';

angular.module('app').directive('appLogin', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/mylogin.html'
	};
}])
'user strict';

angular.module('app').directive('appMe', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/main-me.html'
	};
}]) 
'user strict';

angular.module('app').directive('appPositionDetails', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/position-details.html'
	};
}])
'user strict';

angular.module('app').directive('appPositionList', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/position-list.html',
		scope:{
			data : ' = ',
			filterObj: ' = '
		}
	};
}])

'user strict';

angular.module('app').directive('appPost', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/mypost.html'
	};
}])
'user strict';

angular.module('app').directive('appRegist', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/myregist.html'
	};
}])
'use strict';
angular.module('app').directive('appTab', [function() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
           tabList:'=',
           tabClick:'&',
           tabId:'='
        },
        templateUrl: 'view/apptab.html',
    };
	
        
}]).directive('appAlert',[function(){
	return {
        restrict: 'A',
        replace: true,
        scope: {
           selectList:'=',
           visible:'=',
           selectClick:'&'
        },
        templateUrl: 'view/template/alert.html'
       };
}])
