//var HostURL = "https://163.15.192.205/vany/index.php/mobile/readMsg";
//localStorage.setItem("deviceID", "APA91bG7K40qCCcnMubA9KliRAETTy1rc-hBViCOUgHfSRpw6lsPcj8mo-1bMYZh93AX3D7UwOCjFKxX6RKMyYDi8-a5m02jY-61w_rQYlBSdPb3pqx7kLk7NKESBNZ1s8JXasl9g1rsUGVwLyPqVXYWb2xKyRgxkppS7TIxk4xvZkIqb1J3RJQ");
var request = $.ajax({
	url: "https://163.15.192.185/career/index.php/mobile/readMsg/format/json",
	type: "POST",	
	cache: false,
	crossDomain: true,
	success: 
		function (data, status) {
			debug(data);
			res = jQuery.parseJSON(data);
			for($i = 0; $i< res.length;$i++){
				if(res[$i]['level'] == 'course'){
					$("#course").append('<li data-role="list-divider">' + res[$i]['timestamp'] + '</li>'
						+'<li data-icon="false"><a href="#"  data-ajax="false"><label id="sender">寄件者 : ' 
						+ res[$i]['sender'] + '</label><label id="message">'+ res[$i]['message'] + '</label>' 
						+ '<label id="info">' + res[$i]['info'] + '</label></a></li>').listview('refresh');				
				}
				else if(res[$i]['level'] == 'job'){
					$("#job").append('<li data-role="list-divider">' + res[$i]['timestamp'] + '</li>'
						+'<li data-icon="false"><a href="#"  data-ajax="false"><label id="sender">寄件者 : ' 
						+ res[$i]['sender'] + '</label><label id="message">'+ res[$i]['message'] + '</label>' 
						+ '<label id="info">' + res[$i]['info'] + '</label></a></li>').listview('refresh');				
				}
				else {
					$("#other").append('<li data-role="list-divider">' + res[$i]['timestamp'] + '</li>'
						+'<li data-icon="false"  title=' + res[$i]["info"] + '><a href="#"  data-ajax="false"><label id="sender">寄件者 : ' 
						+ res[$i]['sender'] + '</label><label id="message">'+ res[$i]['message'] + '</label>' 
						+ '<label id="info">' + res[$i]['info'] + '</label></a></li>').listview('refresh');					
				}			
			}
		},
	error: 
		function () {
			console.log(data);
		},			
	data: {
		deviceID:localStorage.getItem('deviceID')
	},
	contentType: "application/x-www-form-urlencoded; charset=utf-8",
	dataType: "html"
});
function debug(a)
{
	console.log(a);	
}	

$(document).ready(function(){
	$(this).click(function(){
		var msg = $(this).attr(title);
		alert('msg:'+msg);
	});
});
		