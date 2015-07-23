
        var pushNotification;

        function onDeviceReady() {

            try {
                pushNotification = window.plugins.pushNotification;
                $("#result").append("device.platform = " + device.platform);
                if (device.platform == 'android' || device.platform == 'Android') {
                    pushNotification.register(successHandler, errorHandler, { "senderID": "1019987702717", "ecb": "onNotification" });		// required!
                } else if (device.platform == "windows8") {
                    pushNotification.register(
                        channelHandler,
                        errorHandler,
                        {
                            "channelName": "http://msdn.microsoft.com/en-us/library/windows/apps/xaml/hh868263.aspx",
                            "ecb": "onNotificationWP8",
                            "uccb": "channelHandler",
                            "errcb": "jsonErrorHandler"
                        });
                } else { // iOS
                    pushNotification.register(tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" });	// required!
                }
            }
            catch (err) {
                txt = "There was an error on this page.\n\n";
                txt += "Error description: " + err.message + "\n\n";
                alert(txt);
            }
        }

        //handle MPNS notifications for WP8
        function onNotificationWP8(e) {

            if (e.type == "toast" && e.jsonContent) {
                pushNotification.showToastNotification(successHandler, errorHandler,
                {
                    "Title": e.jsonContent["wp:Text1"], "Subtitle": e.jsonContent["wp:Text2"], "NavigationUri": e.jsonContent["wp:Param"]
                });
            }

            if (e.type == "raw" && e.jsonContent) {
                alert(e.jsonContent.Body);
            }
        }
        /*
        errcb (WP8 only)
        Event callback that gets called when server error occurs when receiving notification from the MPNS server (for example invalid format of the notification).
        */
        function channelHandler(e)
        {
            $("#result").append('<li>push-notification(channelHandler): ' + e.alert + '</li>');
        }
        function jsonErrorHandler(error) {
            $("#result").append('<li style="color:red;">error:' + error.code + '</li>');
            $("#result").append('<li style="color:red;">error:' + error.message + '</li>');
        }
        // handle APNS notifications for iOS
        function onNotificationAPN(e) {
            if (e.alert) {
                $("#result").append('<li>push-notification: ' + e.alert + '</li>');
                // showing an alert also requires the org.apache.cordova.dialogs plugin
                navigator.notification.alert(e.alert);
            }

            if (e.sound) {
                // playing a sound also requires the org.apache.cordova.media plugin
                var snd = new Media(e.sound);
                snd.play();
            }

            if (e.badge) {
                pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
            }
        }
        // handle GCM notifications for Android
        function onNotification(e) {
            $("#result").append('<li>EVENT from GCM push server(2)-> RECEIVED:' + e.event + getCurrentTime() + '</li>');

            switch (e.event) {
                case 'registered':
                    if (e.regid.length > 0) {
                        $("#result").append('<li>REGISTERED -> REGID:' + e.regid + getCurrentTime() + "</li>");
                        // Your GCM push server needs to know the regID before it can push to this device
                        // here is where you might want to send it the regID for later use.
                        /*
                                                    $.post("http://163.15.192.205/~hlg1988/regid.php",{regId:e.regid},function(){
                                                        $("#result").append('<li>REGISTERED -> OK' + "</li>");
                                                    });
                        */
                        //							HostURL = "http://163.15.192.205/~hlg1988/regid.php";
                        
						localStorage.setItem("deviceID", e.regid);
                        var request = $.ajax({
                            url: "https://163.15.192.185/career/index.php/mobile/regid",
                            type: "POST",
                            cache: false,
                            crossDomain: true,
                            success:
                                function () {
                                    $("#result").append('<li>Send regid to proxy server -> OK(3)' + getCurrentTime() + "</li>");
                                },
                            error:
                                function () {
                                    $("#result").append('<li>Send regid to proxy server -> Error(3)' + getCurrentTime() + "</li>");
                                },
                            data: {
                                regId: e.regid,
								platform: 'android'
                            },
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            dataType: "html"
                        });
                    } else
                        $("#result").append('<li>No REGID: - in emulator</li>');

                    break;

                case 'message':
                    // if this flag is set, this notification happened while we were in the foreground.
                    // you might want to play a sound to get the user's attention, throw up a dialog, etc.
 /*
					if (e.foreground) {
                        $("#result").append('<li>--INLINE NOTIFICATION(b)--' + getCurrentTime() + '</li>');

                        // on Android soundname is outside the payload.
                        // On Amazon FireOS all custom attributes are contained within payload
                        var soundfile = e.soundname || e.payload.sound;
                        // if the notification contains a soundname, play it.
                        var my_media = new Media("/android_asset/www/beep.wav");

                        my_media.play();
                    }
                    else {	// otherwise we were launched because the user touched a notification in the notification tray.
                        if (e.coldstart)
                            $("#result").append('<li>--COLDSTART NOTIFICATION(b)--' + getCurrentTime() + '</li>');
                        else
                            $("#result").append('<li>--BACKGROUND NOTIFICATION(b)--' + getCurrentTime() + '</li>');
                    }
*/
					$("#result").append('<li><a href="#"  data-ajax="false">' + e.payload.sender + ' : ' 
						+  e.payload.level + ' : ' + e.payload.message + ' : ' + e.payload.info 
						+ '</a></li>');
                   // $("#result").append('<li>MESSAGE(b) -> MSG: ' + e.payload.message + getCurrentTime() + '</li>');
                    //android only
                    //$("#result").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                    //amazon-fireos only
                   // $("#result").append('<li>MESSAGE(b) -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
                    break;

                case 'error':
                    $("#result").append('<li>ERROR -> MSG:' + e.msg + getCurrentTime() + '</li>');
                    break;

                default:
                    $("#result").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
            }
        }

        function tokenHandler(result) {
            $("#result").append('<li>token: ' + result + getCurrentTime() + '</li>');
            
			localStorage.setItem("deviceID", result);
            var request = $.ajax({
                url: "https://163.15.192.185/career/index.php/mobile/regid",
                type: "POST",
                cache: false,
                crossDomain: true,
                success:
                function () {
                    $("#result").append('<li>Send regid to proxy server -> OK(3)' + getCurrentTime() + "</li>");
                },
                error:
                function () {
                    $("#result").append('<li>Send regid to proxy server -> Error(3)' + getCurrentTime() + "</li>");
                },
                data: {
                    regId: result,
					platform: 'iphone'
                },
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "html"
            });

            // Your iOS push server needs to know the token before it can push to this device
            // here is where you might want to send it the token for later use.
        }
        function getCurrentTime(delimiter) {
            var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
            if (!delimiter)
                myDate = " " + myDate;
            else
                myDate = delimiter + myDate;
            return myDate;
        }

        function successHandler(result) {
            $("#result").append('<li>success to GCM server(1):' + result + getCurrentTime() + '</li>');
        }

        function errorHandler(error) {
            $("#result").append('<li> ' + device.platform + ' error to GCM server(1):' + error + getCurrentTime() + '</li>');
        }
		function msgAlert(text1, text2) {
			$("#sure .sure-1").text(text1);
			$("#sure .sure-2").text(text2);
			$.mobile.changePage("#sure", {transition: 'pop', role: 'dialog'});
		}
		
		if(localStorage.getItem('deviceID')===null)
			document.addEventListener('deviceready', onDeviceReady, true);