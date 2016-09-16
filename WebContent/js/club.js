var myModule = angular.module('ClubMembershipApplication', ['ngRoute','ngCookies']);
var block=2;
function clubController($window,$rootScope,$scope,$http,$cookieStore,$location,$cookies,$route) {
	
	//kunal Modules starts
	$scope.checkPageTransactions=function(){
		var id=$cookieStore.get("id");
		if(id!=""&&id!=null){
			$location.path("/");
		}
	}

	$scope.checkStaffTransactions=function(){
		var usr=$cookieStore.get("userType");
		console.log("chackstafftr called"+usr);
		if(usr!="Secretary"&&usr!='Staff'){
			$location.path("/");
		}
	}
	$scope.getDate=function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear()-18;
		 if(dd<10){
		        dd='0'+dd
		    } 
		    if(mm<10){
		        mm='0'+mm
		    } 

		today = yyyy+'-'+mm+'-'+dd;
		document.getElementById("dob").setAttribute("max", today);
	}
	
	$scope.fillYearandMonth=function(){
		console.log("fillYearandMonth called");
		var date=new Date();
		console.log(date.getFullYear());
		var year=date.getFullYear();
		
		console.log(date.getMonth());
		var month=date.getMonth()+2;
		
		var m=document.getElementById('month');
		
		for(var g=1;g<=12;g++){
			var option=document.createElement('option');
			option.text=g;
			option.value=g;
			m.add(option);
		}
		
		
		var y=document.getElementById('year');
		
		for(var g=year;g<=year+10;g++){
			var option=document.createElement('option');
			option.text=g;
			option.value=g;
			y.add(option);
		}
		
		
		
	}
	$scope.check=function(){
		var date=new Date();
		var year=date.getFullYear();
		var month=date.getMonth()+2;
		var y=document.getElementById('year').value;
		var m=document.getElementById('month');

		var temp=m.value;
		console.log(temp);
		var index;
		m.innerHTML="";
		if(y==year){
		var i=0;
			for(var g=month;g<=12;g++){
				var option=document.createElement('option');
				option.text=g;
				option.value=g;
				m.add(option);
				if(g==temp)
					index=i;
				i++;
			}
			m.selectedIndex = index;
		}
		else{
			var i=0;
			for(var g=1;g<=12;g++){
				var option=document.createElement('option');
				option.text=g;
				option.value=g;
				m.add(option);
				if(g==temp)
					index=i;
				i++;
			}
			m.selectedIndex = index;
	}
	}
	$scope.register= function() {
		
		var TDate=new Date();
    	var BDate=new Date($scope.dob);
		
		console.log($scope.pass);
		console.log("bdate"+BDate);
		 
		var today=new Date();
		var age=0;
		
	//	  todayDate = new Date();
		  var todayYear = today.getFullYear();
		  var todayMonth = today.getMonth();
		  var todayDay = today.getDate();
		  
		  var birthYear = BDate.getFullYear();
		  var birthMonth = BDate.getMonth();
		  var birthDay = BDate.getDate();
		  
		  var age = todayYear - birthYear; 

		  if (todayMonth < birthMonth - 1)
		  {
		    age--;
		  }

		  if (birthMonth - 1 == todayMonth && todayDay < birthDay)
		  {
		    age--;
		  }

	
		console.log(age);
		
		
		console.log("phone: "+$scope.phone+" length- "+($scope.phone+"").length); 
		console.log("tdate"+TDate);
		console.log($scope.fname);
		console.log($scope.lname);
		console.log(($scope.phone+"").length);
		console.log($scope.email+" "+BDate+""+$scope.phone+" "+$scope.occupation+" "+TDate+" "+" "+$scope.pass);
		
		if($scope.fname!=""&&$scope.fname!=null&&$scope.lname!=""&&$scope.lname!=null&&$scope.email!=""&&$scope.email!=null&&$scope.pass!=""&&$scope.pass!=null&&TDate!=""&&TDate!=null&&BDate!=""&&BDate!=null&&$scope.pass2==$scope.pass&&($scope.phone+"").length==10&&age>=18){
			console.log("inside if");
		$http({
			method : 'POST',
			url : 'http://10.20.14.83:9001/users/register',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:9000'
			},
			data : {
				 firstName:$scope.fname, 
				 lastName:$scope.lname, 
				 emailId:$scope.email, 
				 dateOfBirth:BDate, 
				 mobileNumber:$scope.phone+"", 
				 occupation:$scope.occupation, 
				 registeredDate:TDate, 
				 password:$scope.pass, 
				 status:0,
				 userType:"User", 
				 entranceFee: 1000, 
				 paymentDone: 0 
			}
		}).then(function successCallback(response) {
			bootbox.dialog({
				  message: $scope.fname+', You are Registered Successfully!!',
				  onEscape: function() { console.log("Ecsape"); },
				  backdrop: true
				});
			$location.path("/");
		}, function errorCallback(response) {
			alert("Server Error. Try After Some time: " + response);

		});

		}
		if(age<18){
			bootbox.dialog({
				  message: $scope.fname+', You are uder 18 years!',
				  onEscape: function() { console.log("Ecsape"); },
				  backdrop: true
				});
		}
	}
	
	$scope.reload = function(){
		location.reload();
	}
	
$scope.makePayment=function(){
		
		console.log($scope.name+$scope.cardno+$scope.month+$scope.year);
		if($scope.name!=null&&$scope.cardno!=null&&$scope.month!=null&&$scope.year!=null&&$scope.month!='MM'&&$scope.year!='YYYY'&&$scope.month!=''&&$scope.year!=''&&$scope.name!=''&&$scope.cardno!=''&&$scope.cvv!=''&&$scope.cvv!=null){
			
			
			var id=$cookieStore.get('id');
			console.log(id);
			$http({
				method : 'PUT',
				url : 'http://10.20.14.83:9001/users/payment/'+id+'/entry',
				headers : {
					'Content-Type' : 'application/json',
					'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'
				},
				
			}).success(function (){
				bootbox.dialog({
					  message: 'Payment done successully',
					  onEscape: function() { console.log("Ecsape"); },
					  backdrop: true
					});
				$location.path("/bill");
			})
			.error(function (){
				bootbox.dialog({
					  message: 'Payment is unsuccessfull',
					  onEscape: function() { console.log("Ecsape"); },
					  backdrop: true
					});
				$location.path("/user");
			});
		}
	}
	
	$scope.payment=function(){
		  var id=$cookieStore.get("id");
		  $http({
		    method: 'GET',
		    url:'http://10.20.14.83:9001/users/'+id,
		    headers: {
		     'Content-Type' : 'application/json',
		      'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'  
		    }
		  })
		  .then(function successCallback(response){ 
			  console.log(response.data.status);
			  
			  if(response.data.status==0){
				  bootbox.dialog({
					  message: 'Request for Temporary Membership is not approved yet',
					  onEscape: function() { console.log("Ecsape"); },
					  backdrop: true
					});
			  }
			  else{
				  if(response.data.paymentDone==1&&response.data.status>=2){
					  bootbox.dialog({
						  message: 'You are already a temporary Member',
						  onEscape: function() { console.log("Ecsape"); },
						  backdrop: true
						});
				  }
				  else{
					  $location.path("/pay");
				  }
			  }
			},
		  function errorCallback(response) {
			});
		
		
	}
	
	
	$scope.viewMembersList=function(){
		 $http({
			   method : 'GET',
			   url : 'http://10.20.14.83:9001/users/status/2',
			   headers : {
			    'Content-Type' : 'application/json',
			    'Access-Control-Allow-Origin': 'http://localhost:9000'
			   }
			   }).then(function successCallback(response) {
				   var data=response.data;
				   $scope.tempMememberList=[];
				   $scope.tempMememberList=data;
				}, function errorCallback(response) {
			   alert("Server Error. Try After Some time: " + response);

			  });
	}
	
	
	$scope.viewMember=function(id){
		var id=id;
		console.log("inside viewMember"+id);
		$http({
		    method: 'GET',
		    url:'http://10.20.14.83:9001/users/'+id,
		    headers: {
		     'Content-Type' : 'application/json',
		      'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'  
		    }
		  })
		  .then(function successCallback(response){ 
			   var data=response.data;
			   $scope.vname=data.firstName+" "+data.lastName;
			   $scope.vemail=data.emailId;
			   $scope.vrdate=new Date(data.registeredDate);
			   console.log("datardate"+data.registeredDate);
			   console.log("datadob"+data.dateOfBirth);
			  
			   var dater=[];
				var dob = new Date(data.dateOfBirth);
	    		dater[1] = dob.toString().substring(4, 7);
	    		dater[2] = dob.toString().substring(8, 10);
	    		dater[3] = dob.toString().substring(11, 16);
	    		$scope.vdob = dater.join(" ");
	    		console.log("vdob"+$scope.vdob);
	    		
			   console.log("vrdtae: "+$scope.vrdate);
			   console.log("vdob: "+$scope.vdob);
			   $scope.ventrancefee=data.entranceFee;
			   $scope.vmobile=data.mobileNumber;
			   $scope.voccupation=data.occupation;
			   console.log("in success viewMember");
			   $location.path("/viewmember/"+$scope.vname+"/"+$scope.vemail+"/"+$scope.vrdate+"/"+$scope.vdob+"/"+$scope.ventrancefee+"/"+$scope.vmobile+"/"+$scope.voccupation);
			},
		  function errorCallback(response) {
			})
  }
	
	$scope.submitContact=function(){
		
		if($scope.fcname!=null&&$scope.fcname!=""&&$scope.lcname!=""&&$scope.lcname!=null&&$scope.cemail!=""&&$scope.cemail!=null&&$scope.cphone!=""&&$scope.cphone!=null&&$scope.cmessage!=""&&$scope.cmessage!=null){
		bootbox.dialog({
			  message: 'Your Feedback Is Sent',
			  onEscape: function() { console.log("Ecsape"); },
			  backdrop: true
			});
		$location.path('/');
		}
	}
	//Kunal Modules ends
	
	
	
	
	
	//milind module starts
	$scope.add=function(email){
		 $http({
			   method : 'GET',
			   url : 'http://10.20.14.83:9001/users/request?email='+email+'&status=accept',
			   

			   headers : {
			    'Content-Type' : 'application/json',
			    'Access-Control-Allow-Origin': 'http://localhost:9000'
			   }
			   }).then(function successCallback(response) {
				   $scope.approveRegistrations();
				   bootbox.dialog({
						  message: 'Added successfully',
						  onEscape: function() { console.log("Ecsape"); },
						  backdrop: true
						});
				   
			  }, function errorCallback(response) {
			   alert("Server Error. Try After Some time: " + response);

			  });
		 $scope.approveRegistrations();
	}
	$scope.reject=function(email){
		 $http({
			   method : 'GET',
			   url : 'http://10.20.14.83:9001/users/request?email='+email+'&status=reject',
			   

			   headers : {
			    'Content-Type' : 'application/json',
			    'Access-Control-Allow-Origin': 'http://localhost:9000'
			   }
			   }).then(function successCallback(response) {
				   
				   bootbox.dialog({
						  message:'Member Rejected !!',
						  onEscape: function() { console.log("Ecsape"); },
						  backdrop: true
						});
				   $scope.approveRegistrations();
				   
				   
			  }, function errorCallback(response) {
			   alert("Server Error. Try After Some time: " + response);

			  });
		 $scope.approveRegistrations();
	}

	$scope.isStaff=function(){
		if($cookieStore.get("userType")=="Staff")
			return true;
		else false;
	}
	$scope.login= function() {
		
		
		$scope.errorMsgPassword="";
		$scope.errorMsgUserName="";
		$scope.errorMsg="";
		
		var em=$scope.email;
		var p=$scope.password;
		
		if(em==""||em==null)
			$scope.errorMsgUserName="Enter UserName";
		if(p==""||p==null)
			$scope.errorMsgPassword="Enter Password";
		
		var _mail=$scope.email;
		
		var _passwd=$scope.password;
		
		if(p!=null&&p!=""&&em!=null&&em!="")
			{
				if(block!=0){
					$http({
						method : 'POST',
						url : 'http://10.20.14.83:9001/users/login',
						headers : {
							'Content-Type' : 'application/json',
							'Access-Control-Allow-Origin': 'http://localhost:9000'
						},
						data : {
							emailId : _mail,
							password : _passwd
						 }
					}).then(function successCallback(response) {
						var data=response.data;
						if (data.id!="failure") {
							$cookieStore.put("id",data.id);
                            $cookieStore.put("loggedin",true);
                            $scope.getDetails();
                            $cookieStore.put("userType",data.userType);
							
                            if($cookieStore.get("userType")=="Secretary"){
                            	bootbox.dialog({
          						  message: 'Welcome to Club de Amigo !',
          						  onEscape: function() { console.log("Ecsape"); },
          						  backdrop: true
          						});
								$location.path("/staff");					
							}
							else{
								bootbox.dialog({
	          						  message: 'Welcome to Club de Amigo !',
	          						  onEscape: function() { console.log("Ecsape"); },
	          						  backdrop: true
	          						});
								$location.path("/");
							}//Redirect 
						} else {
						$cookieStore.put($scope.email,--block);
						$scope.mainerror="Wrong Username or Password";
					}		

				}, function errorCallback(response) {
					alert("Error " + response);

				});
				}
				else{
					bootbox.dialog({
						  message: 'You Are BLOCKED Contact Secretary For Solution !',
						  onEscape: function() { console.log("Ecsape"); },
						  backdrop: true
						});
					$location.path("/");
				}
			}
		}
	
	$scope.isLogin=function(){   						//Checks for login
		if($cookieStore.get("id")!=null)
			return true;
		return false;
	}

	$scope.getAccountDetails=function(){
		
			  var id=$cookieStore.get("id");
			  $http({
			    method: 'GET',
			    url:'http://10.20.14.83:9001/users/'+id,
			    headers: {
			     'Content-Type' : 'application/json',
			      'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'  
			    }
			  })
			  .then(function successCallback(response){ 
				   var data=response.data;
				   $scope.fname=data.firstName+" "+data.lastName;
				   $scope.email=data.emailId;
				   console.log(data.registeredDate);
				   $scope.rdate=new Date(data.registeredDate);
				   $scope.mobile=data.mobileNumber;
				   $scope.user=data.userType;
				   $scope.occupation=data.occupation;
				   
				   $cookieStore.put("fname",data.firstName);
				   
				   $scope.entrancefee=data.entranceFee;
				},
			  function errorCallback(response) {
				})
			 }

	$scope.approveRegistrations=function(){
	  
		var id=$cookieStore.get("id");
		  $http({
		    method: 'GET',
		    url:'http://10.20.14.83:9001/users/pendingrequests/'+id,
		    headers: {
		     'Content-Type' : 'application/json',
		      'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'  
		    }
		  })
		  .then(function successCallback(response){ 
			   var pendingReq = [];
			   
//			   var dater=[];
//				var dob = new Date(data.dateOfBirth);
//	    		dater[1] = dob.toString().substring(4, 7);
//	    		dater[2] = dob.toString().substring(8, 10);
//	    		dater[3] = dob.toString().substring(11, 16);
//	    		$scope.vdob = dater.join(" ");
			   
			   $scope.pendingReq=response.data; 
			   
			   for(var i=0;i<$scope.pendingReq.length;i++){
				   var dater=[];
					var dob = new Date($scope.pendingReq[i].registeredDate);
		    		dater[1] = dob.toString().substring(4, 7);
		    		dater[2] = dob.toString().substring(8, 10);
		    		dater[3] = dob.toString().substring(11, 16);
				   $scope.pendingReq[i].registeredDate=dater.join(" ");
				   
				   var dater2=[];
					var rd = new Date($scope.pendingReq[i].previousRenewalTime);
		    		dater2[1] = rd.toString().substring(4, 7);
		    		dater2[2] = rd.toString().substring(8, 10);
		    		dater2[3] = rd.toString().substring(11, 16);
				   $scope.pendingReq[i].previousRenewalTime=dater.join(" ");
			   }
			   
			   console.log(pendingReq);
			},
		  function errorCallback(response) {
			})
	}
	$scope.applyPermanent=function(){
		console.log("Entered into applypermanent");
		var id=$cookieStore.get("id");
		$http({
			  method: 'Put',
			  url:'http://10.20.14.83:9001/users/status/apply/permanent/'+id,
			  headers: {
				  'Content-Type' : 'application/json',
				   'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'  
			  }
			})
			.then(function successCallback(response) 
			{ 
				var data=response.data;
				$location.path("/user");
				bootbox.dialog({
					  message: 'Successfully Applied for Permanent Membership',
					  onEscape: function() { console.log("Ecsape"); },
					  backdrop: true
					});
			},
		 function errorCallback(response){})
	}
	$scope.addPerm=function(id){
		$http({
			   method : 'PUT',
			   url : 'http://10.20.14.83:9001/users/status/approve/permanent/'+id,
			   

			   headers : {
			    'Content-Type' : 'application/json',
			    'Access-Control-Allow-Origin': 'http://localhost:9000'
			   }
			   }).then(function successCallback(response) {
				   $scope.pendingPermReq();
				   bootbox.dialog({
						  message: 'Added as Permanent Member',
						  onEscape: function() { console.log("Ecsape"); },
						  backdrop: true
						});
				   
				   
				}, function errorCallback(response) {
			   alert("Server Error. Try After Some time: " + response);

			  });
		
	}
	$scope.checkApproval=function(){
		var rDate;
		$rootScope.check = false;
		
		var id = $cookieStore.get("id");
		console.log("id "+ id);
		$http({
		    method: 'GET',
		    url:'http://10.20.14.83:9001/users/'+id,
		    headers: {
		     'Content-Type' : 'application/json',
		      'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'  
		    }
		  })
		  .then(function successCallback(response){ 
			   var data=response.data;
			   rDate=new Date(data.registeredDate).toISOString();
			   
			   
			   if(data.status==2){
				   $rootScope.check=true;
				   $cookieStore.put("date",rDate);
				   var tDate=new Date().toISOString();
				   rDate = $cookieStore.get("date");
					var diff =  Math.floor(( Date.parse(tDate) - Date.parse(rDate) ) / 86400000);
					console.log(diff+" "+$rootScope.check);
					if(diff>89 && $rootScope.check){
						$scope.applyPermanent();
					}
					else{
						
						bootbox.dialog({
							  message: 'Should Complete 3 months as Temporary Member ',
							  onEscape: function() { console.log("Ecsape"); },
							  backdrop: true
							});//Aplly Some Modal to Display This Message
					}
				}
			   else if(data.status==0) {
				   
				   bootbox.dialog({
						  message: 'Request for Temporary Membership is not Approved Yet ',
						  onEscape: function() { console.log("Ecsape"); },
						  backdrop: true
						});//Aplly Some Modal to Display This Message
				   }
			   else if(data.status==1){
				   bootbox.dialog({
						  message: 'Request for Temporary Membership is not Approved Yet ',
						  onEscape: function() { console.log("Ecsape"); },
						  backdrop: true
						});//Aplly Some Modal to Display This Message
				 }
			   else if(data.status==3){
				  
				   bootbox.dialog({
						  message: 'Already Applied for Permanent Membesrhip',
						  onEscape: function() { console.log("Ecsape"); },
						  backdrop: true
						});//Aplly Some Modal to Display This Message
				 }
			   else if(data.status==4){
				   
				   bootbox.dialog({
						  message: 'Request Accepted For permanent Membership Proceed For Payment ',
						  onEscape: function() { console.log("Ecsape"); },
						  backdrop: true
						});//Aplly Some Modal to Display This Message
				   $location.path("/ppayment");
			   }
			   else if(data.status==5){
				   
				   bootbox.dialog({
						  message: 'Already Paid for Permanent Membership',
						  onEscape: function() { console.log("Ecsape"); },
						  backdrop: true
						});//Aplly Some Modal to Display This Message
				}
				   
		  },
		  function errorCallback(response) {
			  
		  });
		
	}
	$scope.printDiv = function(divName) {
		  var printContents = document.getElementById(divName).innerHTML;
		  var popupWin = window.open('', '_blank', 'width=300,height=300');
		  popupWin.document.open();
		  popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
		  popupWin.document.close();
		} 
	$scope.makePermanentPayment=function(){
		$http({
			method: 'PUT',
			url:'http://10.20.14.83:9001/users/payment/'+ $cookieStore.get("id") +'/1',
			headers: {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'  
			}
		})
		.then(function successCallback(response){ 
			 bootbox.dialog({
				  message: 'Payment Done',
				  onEscape: function() { console.log("Ecsape"); },
				  backdrop: true
				});//Apll
				$location.path("/pbill");
			},
			function errorCallback(response) {
			})
		}
	$scope.pendingPermReq=function(){
		var id=$cookieStore.get("id");
		$http({
		  method: 'GET',
		  url:'http://10.20.14.83:9001/users/pendingrequests/permanent/'+id,
		  headers: {
			  'Content-Type' : 'application/json',
			   'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'  
		  }
		})
		.then(function successCallback(response) 
		{ 
			var data=response.data;
			console.log("Data "+data);
			if(data!=null){
				
				$scope.pendingPermReqs=[];
				$scope.pendingPermReqs=data;
				 for(var i=0;i<$scope.pendingPermReqs.length;i++){
					   var dater=[];
						var dob = new Date($scope.pendingPermReqs[i].registeredDate);
			    		dater[1] = dob.toString().substring(4, 7);
			    		dater[2] = dob.toString().substring(8, 10);
			    		dater[3] = dob.toString().substring(11, 16);
					   $scope.pendingPermReqs[i].registeredDate=dater.join(" ");
					   
					   var dater2=[];
						var rd = new Date($scope.pendingPermReqs[i].previousRenewalTime);
			    		dater2[1] = rd.toString().substring(4, 7);
			    		dater2[2] = rd.toString().substring(8, 10);
			    		dater2[3] = rd.toString().substring(11, 16);
					   $scope.pendingPermReqs[i].previousRenewalTime=dater.join(" ");
				   }
			}
			
		},
		 
          function errorCallback(response)
		  {
		    
		  })
	}
	$scope.getStaffDetails=function(){
		var id=$cookieStore.get("id");
		$http({
		  method: 'GET',
		  url:'http://10.20.14.83:9001//users/'+id,
		  headers: {
			  'Content-Type' : 'application/json',
			   'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'  
		  }
		})
		.then(function successCallback(response) 
		{ 
			var data=response.data;
			$scope.fname=data.firstName;
			$scope.lname=data.lastName;
			$scope.email=data.emailId;
			
			var dater=[];
			var dob = new Date(data.dateOfBirth);
    		dater[1] = dob.toString().substring(4, 7);
    		dater[2] = dob.toString().substring(8, 10);
    		dater[3] = dob.toString().substring(11, 16);
    		$scope.dob = dater.join(" ");
    		
			$scope.mobile=data.mobileNumber;
			$scope.occupation=data.occupation;
			
		},
		 function errorCallback(response){
		  })
	}
		
	$scope.userList=function(){
		 $http({
			   method : 'GET',
			   url : 'http://10.20.14.83:9001/users/status/5',
			   headers : {
			    'Content-Type' : 'application/json',
			    'Access-Control-Allow-Origin': 'http://localhost:9000'
			   }
			   }).then(function successCallback(response) {
				   var data=response.data;
				   $scope.userlist=[];
				   $scope.userlist=data;
				}, function errorCallback(response) {
			   alert("Server Error. Try After Some time: " + response);

			  });
	}
	
	$scope.printDiv = function(divName) {
		  var printContents = document.getElementById(divName).innerHTML;
		  var popupWin = window.open('', '_blank', 'width=300,height=300');
		  popupWin.document.open();
		  popupWin.document.write('<html><head><link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet"><link rel="stylesheet" href="css/bootstrap.css"><link rel="stylesheet" href="css/custom.css"><link rel="stylesheet" href="css/signup.css"><link rel="stylesheet" href="assets/css/bootstrap-theme.css" media="screen"><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
		  popupWin.document.close();
		} 


		$scope.getPhone = function(){
		return $cookieStore.get('phone');
	}
	//milind module ends
	
	//sonali module starts
		
	$scope.getDetails=function(){
		
		var id=$cookieStore.get("id");
		$http({
		  method: 'GET',
		  url:'http://10.20.14.83:9001//users/'+id,
		  headers: {
			  'Content-Type' : 'application/json',
			   'Access-Control-Allow-Origin': 'http://10.20.14.83:9001'  
		  }
		})
		.then(function successCallback(response) 
		{ 
			var data=response.data;
			$scope.fname=data.firstName;
			$scope.lname=data.lastName;
			$scope.email=data.emailId;
			$scope.occupation=data.occupation;

			var dater=[];
			var dob = new Date(data.dateOfBirth);
    		dater[1] = dob.toString().substring(4, 7);
    		dater[2] = dob.toString().substring(8, 10);
    		dater[3] = dob.toString().substring(11, 16);
    		$scope.dob = dater.join(" ");
    		
	    	$scope.mobile=data.mobileNumber;
			$scope.entrancefee=data.entranceFee;
			console.log($scope.occupation+"this is called");
			$cookieStore.put("fname",data.firstName);
			$cookieStore.put("phone",data.mobileNumber);
			console.log("after login "+$cookieStore.get('fname'));
		},
		 
          function errorCallback(response)
		  {
		    
		  })
		  $location.path('/user');
		
	}
	$scope.update=function(){
		
		console.log($scope.occupation);
		 $location.path('/update');
		 console.log($scope.occupation);
		
	}
	$scope.updateData=function(){
		var id=$cookieStore.get('id');
		
		var mob=$scope.mobile+"";
		if(mob.length==10){
		$http({
			method : 'PUT',
			url : 'http://10.20.14.83:9001/users/'+id,
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:9000'
			},
			data : {

				"firstName": $scope.fname,
			  "lastName": $scope.lname,
			  "emailId": $scope.email,
			  "dateOfBirth": $scope.dob,
			  "mobileNumber": $scope.mobile,
			  "occupation": $scope.occupation,
			  "registeredDate": 1473651104289,
			  "status": 0,
			  "userType": "permanent",
			  "entranceFee": 1000,
			  "paymentDone": 0
			 }
		}).then(function successCallback(response) {
			 bootbox.dialog({
				  message: 'Profile updated Successfully',
				  onEscape: function() { console.log("Ecsape"); },
				  backdrop: true
				});//Apll					//Redirect to any page after successfull login
			$location.path('/user');	
				

		}, function errorCallback(response) {
			alert("Error " + response);

		});
		
		}
		
	};
	
	$scope.getCookie = function(){
		return $cookieStore.get('loggedin');
	}
	
	$scope.getuser = function(){
		if($cookieStore.get("userType") == "Secretary")
			{
			$location.path('/staff');
			}
		else{
			$location.path('/user');
		}
	}
	
	$scope.getName = function(){
		return $cookieStore.get('fname');
		
	}
	
	$scope.logout=function(){
		 
		  $http({
		   method : 'GET',
		   url : 'http://10.20.14.83:9001/users/logout/'+$cookieStore.get("id"),
		   headers : {
		    'Content-Type' : 'application/json',
		    'Access-Control-Allow-Origin': 'http://localhost:9000'
		   }
		   }).then(function successCallback(response) {
		    $cookieStore.remove("id");
		    $cookieStore.remove("userType");
		   $cookieStore.put("loggedin",false);
		    
		    console.log('user logged out'+$cookieStore.get('loggedin'));
		    bootbox.dialog({
				  message:'You are logged out Successfully!!',
				  onEscape: function() { console.log("Ecsape"); },
				  backdrop: true
				});
		    $location.path("/");
		  }, function errorCallback(response) {
		   alert("Server Error. Try After Some time: " + response);

		  });

		 }
	//sonali module ends
}

myModule.controller('ClubController', clubController);

myModule.config(function($routeProvider){
	$routeProvider
	
		.when('/', {
			controller: 'ClubController',
			templateUrl: 'home.html'   					//Taken just for testing/ developing purpose
		})
		.when('/register', {									// Correct it Milind
			controller: 'ClubController',
			templateUrl: 'signup.html'   					//Taken just for testing/ developing purpose
		})
		.when('/login', {
			controller: 'ClubController',
			templateUrl: 'login.html'
		})
		.when('/contact', {
			controller: 'ClubController',
			templateUrl: 'contact_details.html'
		})
		.when('/about', {
			controller: 'ClubsController',
			templateUrl: 'about.html'
		})
		.when('/user', {
			controller: 'ClubController',
			templateUrl: 'user.html'   					//Taken just for testing/ developing purpose
		})
		.when('/indoor', {
			controller: 'ClubController',
			templateUrl: 'indoor.html'   					//Taken just for testing/ developing purpose
		})
		.when('/outdoor', {
			controller: 'ClubController',
			templateUrl: 'outdoor.html'   					//Taken just for testing/ developing purpose
		})
		.when('/leisure', {
			controller: 'ClubController',
			templateUrl: 'leisure.html'   					//Taken just for testing/ developing purpose
		})
		.when('/tmember', {
			controller: 'ClubController',
			templateUrl: 'member.html'   					//Taken just for testing/ developing purpose
		})
		.when('/update', {
			controller: 'ClubController',
			templateUrl: 'update.html'   					//Taken just for testing/ developing purpose
		})
		.when('/pay', {
			controller: 'ClubController',
			templateUrl: 'makepayment.html'   					//Taken just for testing/ developing purpose
		})
		.when('/staff', {
			controller: 'ClubController',
			templateUrl: 'staff.html'   					//Taken just for testing/ developing purpose
		})
		.when('/tempMem', {
			controller: 'ClubController',
			templateUrl: 'tmember.html'   					//Taken just for testing/ developing purpose
		})
		.when('/bill', {
			controller: 'ClubController',
			templateUrl: 'billingDetails.html'   					//Taken just for testing/ developing purpose
		})
		.when('/paymentunsuccessful', {
			controller: 'ClubController',
			templateUrl: 'paymentunsuccessfull.html'   					//Taken just for testing/ developing purpose
		})
		.when('/viewmembers', {
			controller: 'ClubController',
			templateUrl: 'viewMembers.html'
		})
		.when('/ppayment', {
			controller: 'ClubController',
			templateUrl: 'ppayment.html'
		})
		.when('/pbill', {
			controller: 'ClubController',
			templateUrl: 'pbill.html'
		})
		.when('/tempMem', {
			controller: 'ClubController',
			templateUrl: 'templist.html'
		})
		.when('/permMem', {
			controller: 'ClubController',
			templateUrl: 'perlist.html'
		})
		.when('/permList', {
			controller: 'ClubController',
			templateUrl: 'viewPermanent.html'
		})
		.when('/resetPassword', {
			controller: 'ClubController',
			templateUrl: 'resetPassword.html'
		})
		.when("/viewmember/:name/:email/:rdate/:dob/:entrancefee/:mobile/:occupation", {
				controller: function($scope,$routeParams) {
					console.log("in controller myconfig of view member");
					   $scope.vname=$routeParams.name;
					   $scope.vemail=$routeParams.email;
					   
					    var dater1=[];
						var dob = new Date($routeParams.rdate);
			    		dater1[1] = dob.toString().substring(4, 7);
			    		dater1[2] = dob.toString().substring(8, 10);
			    		dater1[3] = dob.toString().substring(11, 16);
			    		$scope.vrdate = dater1.join(" ");
			    		
					   
					   var dater=[];
						var dob = new Date($routeParams.dob);
			    		dater[1] = dob.toString().substring(4, 7);
			    		dater[2] = dob.toString().substring(8, 10);
			    		dater[3] = dob.toString().substring(11, 16);
			    		$scope.vdob = dater.join(" ");
					   
					   $scope.ventrancefee=$routeParams.entrancefee;
					   console.log($scope.ventrancefee);
					   $scope.vmobile=$routeParams.mobile;
					   $scope.voccupation=$routeParams.occupation;
				},
			templateUrl: 'viewmember.html'
		})
		.otherwise({redirectTo: '/'})
});
