/*
 *	 https://github.com/apache/cordova-plugin-network-information
 *	 檢查網路狀態
*/
function checkConnection() {
	var networkState = navigator.network.connection.type;
	 
	//定義網路名稱類型
	var states = {};
	states[Connection.UNKNOWN]  = '未知的網路型態';
	states[Connection.ETHERNET] = '乙太網路';
	states[Connection.WIFI]     = 'WiFi';
	states[Connection.CELL_2G]  = '行動網路-2G';
	states[Connection.CELL_3G]  = '行動網路-3G';
	states[Connection.CELL_4G]  = '行動網路-4G';
	states[Connection.NONE]     = '無網路';
	if(states[networkState]=='無網路')
		$('#login').attr('disabled',true);
	else
		$('#login').attr('disabled',false);

//	alert('Connection type: ' + states[networkState]);
	$('#status').append("network status: " + states[networkState]);
}
document.addEventListener("deviceready", onDeviceReady, false);
$(document).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
});
function onDeviceReady() {
	checkConnection();
}
var CILocation = "http://127.0.0.1/CareerCI/";
$(document).ready(function(){
	    $.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
//	alert(WEBURL);
//	alert("after connect");
/*
	if(localStorage.getItem('keepLogin')=='on'){
		$.mobile.changePage("welcome.html");

		$("#username").val(localStorage.getItem('name'));
		$("#psw").val(localStorage.getItem('password'));
		$("#re_account").val("on").flipswitch("refresh");
		
	}
	
	else{
			$("#username").val('');
			$("#psw").val('');
		}
*/	
	$("#login").click(function(){	
//		console.log($(':mobile-pagecontainer').pagecontainer('getActivePage')[0].id);
/*
	$.mobile.loadPage(CILocation+"career/mainPage", 
			{
				allowSamePageTransition:true, 
				reloadPage:true,
				role :"page",
				type: "get"
			});
*/			
		$("#content").load(CILocation+"career/mainPage");		
		$.mobile.changePage($("#mainPage"));
//		console.log($(':mobile-pagecontainer').pagecontainer('getActivePage')[0].id);
	/*	
		if($("#username").val() == "" || $("#psw").val() == "" ){
			alert( "請輸入完整資料!!");
		} else {
			window.sessionStorage["id"] = $("#username").val();
			$.ajax({
				url: CILocation+"rest_auth/student/format/json",
				type: "POST",	
				cache: false,
				crossDomain: true,
				success: onSuccess,
				error: onError,			
				data: {
					user_id:$("#username").val(),
					password:$("#psw").val()
				},
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				dataType: "html"
			});				

		}
		*/
	});
});

function onError(data, status)
{
	alert(data);
} 

function onSuccess(data, status)
{
	localStorage.setItem('name',$("#username").val());
//	localStorage.setItem('password',$("#psw").val());
	localStorage.setItem('keepLogin',$('#keepLogin').val());
	data = jQuery.parseJSON(data);
	if(data.auth =='success'){
		//alert(CILocation+"career/mainPage");
//		$("#content").load(CILocation+"career/mainPage");
//		$.mobile.changePage($("#mainPage"));
		
		$.mobile.loadPage(CILocation+"career/mainPage", true, 
			{type: "get"});
//		$.mobile.changePage($("#mainPage"));
//			url_str="welcome.html";
//			window.location= url_str;
//		href_load('search.html');
	} else {
		alert("login fail");
	}

//	debug(data);
}
