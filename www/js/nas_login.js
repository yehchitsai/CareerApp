var HostURL = "http://163.15.192.205/~yehchitsai/vany/index.php/RESTAPI/auth/format/json";
//var NASURL = "http://" + $(location).attr('host')+ "/nas/index.php/rest_auth";

	$(document).ready(function(){	
		$("#login").click(function(){
			if($("#username").val() == "" && $("#psw").val() == "" ){
				alert( "請輸入完整資料!!");
			} else {
				window.sessionStorage["id"] = $("#username").val();
				var request = $.ajax({
					url: HostURL,
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
		});	//http://127.0.0.1/nas/index.php/RESTAPI/auth/format/json
		
		$("#callAjaxForm").submit(function(){
	//		alert("#callAjaxForm");
			select();
			return false;
		});
	});
function debug(a)
{
	console.log(a);
}

function onError(data, status)
{
	alert(data);
} 

function onSuccess(data, status)
{
//	var str = data+"}}}";
	data = jQuery.parseJSON(data);
	debug(data);
	var acc = []
	$.each(eval(data), function(index, value) { 
		acc.push(index + ': ' + value); 
	});
	debug(acc);
	
	$.post("http://163.15.192.205/~hlg1988/gcm_post2.php",{message:data.username+" login",submit:"Send"});

	$('#result').text(acc.toString());
	//debug(data.tenant);
/*
	data = jQuery.parseJSON(data);
	if(data.auth =='success'){
		switch($("#select").val())
		{
			case '1':
				url_str="teacher_query.html";
				break;
			case '2':
				url_str="student_query.html";
				break;
			case '3':
				window.sessionStorage["id"] = data.id;
				url_str="employer_query.html";
				break;
		}
		window.location = url_str;
		
//		href_load('search.html');
	} else {
		alert("login fail");
	}
	debug(data);
*/
}
