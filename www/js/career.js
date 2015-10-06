//var CILocation = "http://163.15.192.201/CareerCI/";
var version='0.0.1';//版本編號
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
		var id_tag = $.mobile.path.parseUrl(data.toPage).hash.toString();
//		console.log("data.toPage = " + data.toPage);
//		console.log(u);

		switch(id_tag){
			case"#login":
				checkversion();
				checkConnection();
				showPage(id_tag, data.options);
				e.preventDefault();
				changelan("#lan_1");
			case"#menu":
				showPage(id_tag, data.options);
				e.preventDefault();
			case"#job":
				showPage(id_tag, data.options);
				e.preventDefault();
			case"#jobDetail":
				localStorage.setItem('action_jt',$('.ui-btn-active').attr('rel'));
				showPage(id_tag, data.options);
				e.preventDefault();
			case"#score":
				localStorage.setItem('action_jt',$('.ui-btn-active').next().attr('id'));
				showPage(id_tag, data.options);
				e.preventDefault();
			case"#track":
				showPage(id_tag, data.options);
				e.preventDefault();
			case"#push":
				showPage(id_tag, data.options);
				e.preventDefault();
		}

	}
});
function urlmaker(target,value){
	var lan=localStorage.getItem("language");
}
function showPage(screen, options) {
	var $page = $(screen);
	var $url ="";
	switch(screen){
		case"#login":
		$url = CILocation + "career/" + screen.replace(/^#/, "");
		console.log($url);
		break;
		case"#menu":
		$url = CILocation + "career/" + screen.replace(/^#/, "")+"/"+localStorage.getItem("stu_id");
		console.log($url);
		break;
		case"#job":
		$url = CILocation + "career/" + screen.replace(/^#/, "")+"/"+localStorage.getItem("stu_id");
		console.log($url);
		break;
		case"#detailJob":
		$url = CILocation + "career/" + screen.replace(/^#/, "")+"/"+localStorage.getItem("action_jt");
		console.log($url);
		break;
		case"#score":
		var polymer=localStorage.getItem("stu_id")+"%7C"+localStorage.getItem("action_jt");
		$url = CILocation + "career/" + screen.replace(/^#/, "")+"/"+polymer;
		console.log($url);
		break;
		case"#track":
		$url = CILocation + "career/" + screen.replace(/^#/, "")+"/"+localStorage.getItem("stu_id");
		console.log($url);
		break;
		case"#push":
		$url = CILocation + "career/" + screen.replace(/^#/, "");
		console.log($url);
		break;
	}
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
		if($("#username").val() == "" || $("#psw").val() == "" ){
			alert( "請輸入完整資料!!");
		} else {
//			localStorage.setItem("s_id",$("#username").val());
			$.ajax({
				url: CILocation+"rest_auth/student/format/json",
				type: "POST",	
				cache: false,
				crossDomain: true,
				success: function(data, status){
						debug(data);
						//data = jQuery.parseJSON(data);
						if(data.auth =='success'){
							localStorage.setItem('stu_id',$("#username").val());
							localStorage.setItem('keepLogin',$('#keepLogin').val());
							$.mobile.changePage("#menu");
						} else {
							alert("login fail");
						}
					} ,
				error: function (data, status){
						alert("connection error --- " + data);
					} ,			
				data: {
					user_id:$("#username").val(),
					password:$("#psw").val()
				},
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				dataType: "json"
			});	// end of ajax
		} // end of else
		return false;
	});	// end of on event
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
//向伺服器進行版本驗證
function checkversion(){ 
	var hash=btoa(version);
	hash=encodeURIComponent(hash);
	$.get(CILocation+'career/chkversion/'+hash,function(data){
			if (!data){
				alert('此APP版本不是最新的，請更新到最新版本');
				window.open('https://play.google.com', '_system');
				navigator.app.exitApp();
			}
			else
			{
				console.log('version is up to date');
			}
	});
}
function settrack(){
	var url = CILocation + "career/gettrack/"+localStorage.getItem("stu_id");
	$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				$("#track"+data[i]["jt_id"]).addClass("istrack");
				console.log(data[i]["jt_id"]+"istrack");
			};
	});
	console.log('set track done!');
}
function addtrack(dom){
	if (!$(dom).hasClass('istrack')) {
		url=CILocation + "career/addtrack/"+localStorage.getItem("stu_id")+"/"+$(dom).attr('id').replace("track","");
		$.get(url,function(data){
			if(data){
				alert('成功加入追蹤!');
				$(dom).addClass("istrack");
			}
			else{
				alert('失敗!');
			}
		});
	}
	else{
		alert('這項已經追蹤囉!');
	}
}
function deltrack(dom){
	url=CILocation + "career/deltrack/"+localStorage.getItem("stu_id")+"/"+$(dom).attr('id').replace("deltrack","");
	$.get(url,function(data){
			if(data){
				alert('成功取消追蹤!');
				$(dom).parent().parent().parent().remove();
			}
			else{
				alert('失敗!');
			}
	});
}
function jobload(dom){
	var page=$(dom).attr('rel');
	var name=$('#job_name').attr('rel');
	url=CILocation + "career/joblistappend/"+name+"/"+page;
	$.get(url,function(data){
			$('.keepload').remove();
			$('.list-group').append(data);
	});
}
function changelan(dom){
	var lan_temp=lan_config[$(dom).attr('rel')];
	for(var key in lan_temp){ 
		$(".lan_"+key).text(lan_temp[key]);
	}
	localStorage.setItem('language',$(dom).attr('rel'));
}
function loadlan(){	
	if(localStorage.getItem("language")=="undefined"||localStorage.getItem("language")==""){
		changelan("#lan_1");
	}
	else{
		var lan=localStorage.getItem("language");
		switch(lan){
			case"zh_TW":
				changelan("#lan_1");
			break;
			case"en_US":
				changelan("#lan_2");
			break;
		}
	}
}