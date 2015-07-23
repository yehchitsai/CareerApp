	  //檢查網路
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
    function onDeviceReady() {
//		alert('device ready...');
        checkConnection();
    }
$(document).ready(function(){
	var WEBURL = "http://163.15.192.201/career/index.php/rest_auth/student/format/json";
//	alert(WEBURL);
//	checkConnection();
//	alert("after connect");
/*
	if(localStorage.getItem('re_account')=='on'){
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
		
		if($("#username").val() == "" || $("#psw").val() == "" ){
			alert( "請輸入完整資料!!");
		} else {
			window.sessionStorage["id"] = $("#username").val();
			$.ajax({
				url: WEBURL,
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
	});
});

function onError(data, status)
{
	alert(data);
} 

function onSuccess(data, status)
{
	localStorage.setItem('name',$("#username").val());
	localStorage.setItem('password',$("#psw").val());
	localStorage.setItem('re_account',$('#re_account').val());
	data = jQuery.parseJSON(data);
	if(data.auth =='success'){
			url_str="welcome.html";
			window.location= url_str;
//		href_load('search.html');
	} else {
		alert("login fail");
	}

//	debug(data);
}
