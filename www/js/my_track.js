$(document).ready(function(){
			$.ajax({
				type:"post",
				url:"http://163.15.192.201/career/index.php/my_track/tracked/format/json",
				datatype:"html",
				cache:false,
				success:success,
				error:error,
				data:{
					s_id:localStorage.getItem("name")
				}
			});
		});
		
		function success(data)
		{
//			alert(data);
			new_table(data);
		}
		
		function error(data)
		{
			alert('false');
		}
		
		function new_table(data)
		{
			console.log(data);
//			var track_data=JSON.parse(data);
			var track_data=data;
			if (track_data!=null)
			{
				for (var i=0;i<track_data.length;i++)
				{	
					//在table裡面新增tr(橫排)
					$("<tr/>", {
						"id":"tr_"+i
					}).appendTo("#movie-table-custom");
					
					$("<td/>",{
						"id":"tda_"+i
					}).appendTo("#tr_"+i);
					$("<td/>",{
						"id":"tdb_"+i
					}).appendTo("#tr_"+i);				
					$("<td/>",{
						"id":"tdc_"+i
					}).appendTo("#tr_"+i);
					$("<td/>",{
						"id":"tdd_"+i
					}).appendTo("#tr_"+i);
					

					
					$("<tr/>", {
						"class": "work",
						"text": track_data[i]['j_complete']
					}).appendTo("#tda_"+i);
						
						$("<button/>", {
						"id":"btn."+i,
						"class": "work",
						"text": "刪除",
						"onclick":"reply_click(" + track_data[i]['t_id'] + ")"
						}).appendTo("#tdd_"+i);
						
						$("<li/>", {
						"class":"ui-btn",
						"html": "<a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + b[i]['jt_name'] + "<br/>"+
						"<a href='#' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>123<a/>"
						+"</a>"
						}).appendTo("#jt");						
					
						$("<tr/>", {
							"class": "work",
							"text": track_data[i]['j_date']
						}).appendTo("#tdb_"+i);

						$("<a/>", {
							"href": track_data[i]['j_url'],
							"text": track_data[i]['j_name']
						}).appendTo("#tdb_"+i);
						
						$("<tr/>", {
							"class": "work",
							"text": track_data[i]['j_cname']
						}).appendTo("#tdb_"+i);
						$("<tr/>", {
							"class": "work",
							"text": track_data[i]['j_address']
						}).appendTo("#tdb_"+i);
						
//						console.log(track_data[i]['t_id']);
				}
			}
		}
		function saveJob(job)
		{
			console.log("jobName");
			localStorage.setItem("jobName",job);
			location.href="ability.html";
		}
		function reply_click(x)
		{
			console.log(x);
			$.ajax({
					type:"post",
					url:"http://163.15.192.201/career/index.php/my_track/delTrack/format/json",
					datatype:"html",
					cache:false,
					success:success1,
					error:error1,
					data:{
						t_id:x
					}
				});
		}
		
		function success1(data)
		{	
			alert('刪除成功');
			location.href="my_track.html";
		}
		
		function error1(data)
		{
			alert('false');
		}