$(document).ready(function(){

			$("#button").click(function(){
				//var c=localStorage.setItem('city',$("#city").val());
				//var a=localStorage.setItem('area',$("#area").val());
				var request = $.ajax({
					type: "post",
					url: "http://163.15.192.185/career/index.php/area_controll/search",
					dataType:"html",	
					//dataType:'json',
					cache: false,
					success:onSuccess, 
					error: onError,		
					data: {
						id:localStorage.getItem("name"),
						city:$("#city").val(),
						area:$("#area").val()
					}
					//contentType: "application/x-www-form-urlencoded; charset=utf-8"
				});
			});
		});
		

		function onError(data, status)
		{
			alert(data);
			console.log(data);
		} 

		function onSuccess(data, status)
		{	
			if ($("#city").val()=="" && $("#area").val()=="")
			{
				alert("請輸入縣市或地區");
			}
			else
			{
				localStorage.setItem("web",null);
				localStorage.setItem("web","advance");
				
				localStorage.setItem("data",data);
				//alert(data);
				document.location.href="get_job.html";
				//alert(localStorage.getItem("data"));
				/*
				alert('OK_1');
				console.log(data);
				//data = $.trim(data);
				url_str="get_job.html";
				location.herf=url_str;
				
				$("#notification").text(data);
				*/
			}
		}
