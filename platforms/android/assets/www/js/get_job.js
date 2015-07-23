var jobs = null;
function getJob(page) {

	var request = $.ajax({
		async: false, //synchronous requests
		type: "post",	
		url: "http://163.15.192.201/career/index.php/job/getJob/format/json",
		dataType:"html",
		cache: false,
		success:function(data, status){b=JSON.parse(data);}, 
		error: function(data,status){alert("error:"+data);},		
		data: {
			id:localStorage.getItem("name"),
			page:localStorage.getItem("page")
		}
	});			
//			console.log(a);
//			var b=JSON.parse(a);
//			console.log(b);
	
	//var refurl=document.referrer;
	//alert(refurl);
	
	if (b!=null)
	{
		jobs=b;
		$( "#pagenum" ).text("Page " + localStorage.getItem("page"));
//		$("#movie-table-custom").empty();
		$("#movie-table-custom tr").remove();
		for (var i=0;i<b.length;i++)
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
			
			
			$("<tr/>", {
				"class": "work",
				"text": b[i]['j_complete']
			}).appendTo("#tda_"+i);
				

				$("<tr/>", {
					"class": "work",
					"text": b[i]['j_date']
				}).appendTo("#tdb_"+i);

				$("<a/>", {
					"href": b[i]['j_url'],
					"text": b[i]['j_name']
				}).appendTo("#tdb_"+i);
				
				$("<tr/>", {
					"class": "work",
					"text": b[i]['j_cname']
				}).appendTo("#tdb_"+i);
				$("<tr/>", {
					"class": "work",
					"text": b[i]['j_address']
				}).appendTo("#tdb_"+i);
				
				$("<button/>", {
					"id":"btn."+i,
					"class": "work_btn",
					"text": "追蹤"
				}).appendTo("#tdc_"+i);
				//$("#movie-table-custom").append("<td>"+data[$i].p_date+"</td>");
		}
	}	
}

$(document).ready(function(){
		var web=localStorage.getItem("web");
		//if(localStorage.getItem("page")==null)
		localStorage.setItem('page',1);
		
		if(web=="welcome")
		{
			getJob();
//			var a = localStorage.getItem("getdata");
		} else if (web=="advance")
		{
			var a=localStorage.getItem("data");
			console.log(a);
			var b=JSON.parse(a);
			if (b!=null)
			{
				for (var i=0;i<b.length;i++)
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
					
					
					$("<tr/>", {
						"class": "work",
						"text": b[i]['j_complete']
					}).appendTo("#tda_"+i);
					

					$("<tr/>", {
						"class": "work",
						"text": b[i]['j_date']
					}).appendTo("#tdb_"+i);

					$("<a/>", {
						"href": b[i]['j_url'],
						"text": b[i]['j_name']
					}).appendTo("#tdb_"+i);
					
					$("<tr/>", {
						"class": "work",
						"text": b[i]['j_cname']
					}).appendTo("#tdb_"+i);
					$("<tr/>", {
						"class": "work",
						"text": b[i]['j_address']
					}).appendTo("#tdb_"+i);
					
					$("<button/>", {
						"id":"btn."+i,
						"class": "work_btn",
						"text": "追蹤",
						"onlick":"reply_click(this.id)"
							}).appendTo("#tdc_"+i);
				}
			}
		}
		
		$('#btnPrevious').click(function(){
			
			var page = eval(localStorage.getItem("page"));
			console.log("btnPrevious - " + page);
			if(page>1) {
				localStorage.setItem('page',page - 1);
				getJob();
			}
		
		});
		
		$('#btnNext').click(function(){
			var page = eval(localStorage.getItem("page"));
			console.log("btnNext - " + page);
			localStorage.setItem('page',page + 1);
			getJob();
		});
//		$('button').click(function(){console.log("input - " + $(this).id);});
		$('.work_btn').click(function(){
			var id=this.id;
			var splits=new Array();
			split=id.split(".");
			console.log("work_btn - " + id);
//			console.log(jobs);
			$.ajax({
				type:"post",
				url:"http://163.15.192.201/career/index.php/my_track/track",
				datatype:"html",
				cache:false,
				success:success,
				error:error,
				data:{
					s_id:localStorage.getItem("name"),
					j_name:jobs[split[1]]['j_name'],
					j_url:jobs[split[1]]['j_url'],
					j_cname:jobs[split[1]]['j_cname'],
					j_address:jobs[split[1]]['j_address'],
					j_date:jobs[split[1]]['j_date']
				}
			});
			$(this).attr("disabled",true);
				

			//alert(b[split[1]]['j_date']+","+b[split[1]]['j_name']+","+b[split[1]]['j_cname']+","+b[split[1]]['j_url']+","+b[split[1]]['j_address']);
		});
		
});

function success(data)
{
//	alert(data);
	console.log('success');
	alert('追蹤成功');
}

function error(data)
{
//	alert(data);
}