$(document).ready(function(){
	$("#jobName").text(localStorage.getItem("jobName"));
	var course1,course2,course3;
	var requestURL =  "https://163.15.192.185/career/index.php/my_track/jobCompetition/format/json?s_id=" + localStorage.getItem("name") + "&j_name=" + localStorage.getItem("jobName");
	$.ajax({
			async: false, //synchronous requests
			type:"get",
			url:requestURL,
			datatype:"html",
			cache:false,
			success:function(data, status){
/*
					console.log(data[0]);
					console.log(data[1]);
					console.log(data[2]);
*/					
					console.log(data);

					course1=data[0];
					course2=data[1];
					course3=data[2];
				}, 
			error: function(data,status){alert("error:"+data);},
		});
	console.log(requestURL);
	//course1 = jQuery.parseJSON(course1);
//	console.log(course1);
	for(i = 0; i< course1.length;i++){
		$("#requireCourse").append('<li data-role="list-divider">' + course1[i] + '</li>').listview('refresh');				
	}
	$("#requireCourseP").text(i);
	for(i = 0; i< course2.length;i++){
		$("#completeCourse").append('<li data-role="list-divider">' + course2[i] + '</li>').listview('refresh');				
	}
	$("#completeCourseP").text(i);

	var j=0;
	$.each(course3 , function(i, v) {
		$("#pendCourse").append('<li data-role="list-divider">' + v + '</li>').listview('refresh');	
		j++;
     //console.log(v); // etc
	});
	$("#pendCourseP").text(j);
});