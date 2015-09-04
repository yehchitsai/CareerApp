var CILocation = "http://127.0.0.1/CareerCI/";
function debug(msg)
{
	console.log(msg);
}

$(document).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
});

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
		var jobDetail =	"#detailJob";
		var score = "#score";
		var track = "#track";
		var push = 	"#push";
		//console.log(login);

		if (u.hash.search(login) !== -1) {
			// Display a list of URLs.
			showPage(login, u, data.options);
			checkConnection();
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
		else if (u.hash.search(jobDetail) !== -1) {
			// Display QR code for the selected URL.
			showPage(jobDetail, u, data.options);
			e.preventDefault();
		}
		else if (u.hash.search(score) !== -1) {
			// Display QR code for the selected URL.
			showPage(score, u, data.options);
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
	//console.log("url = " + $url);
	// Inject the list markup into the content element.
	$.get($url, function(data){
		$content.html(data);
//		$page.page();
		$page.enhanceWithin();
		$.mobile.changePage($page, options);
	});
}

$(document).ready(function(){
	$.mobile.changePage("#login");
	$(document).on("click" , "#loginBtn", function(e, data) {
		$.mobile.changePage("#menu");			
		return false;
	});	
});

/*
 *	 https://github.com/apache/cordova-plugin-network-information
 *	 檢查網路狀態
*/
function checkConnection() {
	var networkState;
	if(navigator.network)
	{
		debug("check connection");
		networkState = navigator.network.connection.type;
	} else {
		debug("not check connection");
		return false;
	}
	 
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

