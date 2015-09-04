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



$(document).bind( "pagebeforechange", function(e, data) {
	// We only want to handle changePage() calls where the caller is
	// asking us to load a page by URL.
	if (typeof data.toPage === "string") {
		// We only want to handle a subset of URLs.
		var u = $.mobile.path.parseUrl(data.toPage);
//		console.log("data.toPage = " + data.toPage);
//		console.log(u);
		var login = "#login";// /^#login_1/;
		var menu = 	"#menu";
		var jobs = 	"#job";
		var track = "#track";
		var push = 	"#push";
		console.log(login);

		if (u.hash.search(login) !== -1) {
			// Display a list of URLs.
			showPage(login, u, data.options);
			e.preventDefault();
		}
		else if (u.hash.search(menu) !== -1) {
			// Display QR code for the selected URL.
			showPage(menu, u, data.options);
			e.preventDefault();
		}
		else if (u.hash.search(jobs) !== -1) {
			// Display QR code for the selected URL.
			showPage(jobs, u, data.options);
			e.preventDefault();
		}
		else if (u.hash.search(track) !== -1) {
			// Display QR code for the selected URL.
			showPage(track, u, data.options);
			e.preventDefault();
		}
		else if (u.hash.search(push) !== -1) {
			// Display QR code for the selected URL.
			showPage(push, u, data.options);
			e.preventDefault();
		}

	}
});

function showPage(screen, urlObj, options) {
	var $page = $(screen);
	var $url = CILocation + "career/" + screen.replace(/^#/, "");
	var $content = $page.children(":jqmData(role=content)");
	console.log($url);
	// Inject the list markup into the content element.
	$.get($url, function(data){
		$content.html(data);
		$page.enhanceWithin();
		$.mobile.changePage($page, options);
	});
}

$(document).ready(function(){
//	alert(WEBURL);
//	alert("after connect");
	$.mobile.changePage("#login");

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
//		$("#content").load(CILocation+"career/mainPage");		
		console.log("Login click");
		$.mobile.changePage("#menu");
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
function debug(msg)
{
	console.log(msg);
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
