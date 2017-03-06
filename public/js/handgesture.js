window.onload = function() {

		var smoother = new Smoother([0.9995, 0.9995], [0, 0], 0),
			canvas = document.getElementById('canvas'),
			context = canvas.getContext('2d'),
			video = document.createElement('video'),
			detector, timeoutHandle;
	
		try {
			compatibility.getUserMedia({video: true}, function(stream) {
				try {
					video.src = compatibility.URL.createObjectURL(stream);
				} catch (error) {
					video.src = stream;
				}
				compatibility.requestAnimationFrame(play);
			}, function (error) {
				alert("WebRTC not available");
			});
		} catch (error) {
			alert(error);
		}
	
		var fist_pos_old, angle = [0, 0];
		var count = 2;
		var lock1 = false, lock2 = false;
		function play() {
			compatibility.requestAnimationFrame(play);
			if (video.paused) video.play();
	        
	        // Draw video overlay:
			canvas.width = window.innerWidth;//~~(600 * video.videoWidth / video.videoHeight);
			canvas.height = window.innerHeight;
			context.scale(-1,1);
			context.drawImage(video,0,0, -canvas.width, canvas.height);
			
			if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
			
				// Prepare the detector once the video dimensions are known:
	          	if (!detector) {
		      		var width = ~~(100 * video.videoWidth / video.videoHeight);
					var height = 100;
		      		detector = new objectdetect.detector(width, height, 1.1, objectdetect.handfist);
		      	}
	
          		// Perform the actual detection:
				var coords = detector.detect(video, 1);
				
				// If find fist
				if (coords[0]) {
					var coord = coords[0];
					
					// Rescale coordinates from detector to video coordinate space:
					coord[0] *= video.videoWidth / detector.canvas.width;
					coord[1] *= video.videoHeight / detector.canvas.height;
					coord[2] *= video.videoWidth / detector.canvas.width;
					coord[3] *= video.videoHeight / detector.canvas.height;
	
					var fist_pos = [coord[0] + coord[2] / 2, coord[1] + coord[3] / 2];
					
					if (fist_pos_old) {
						var dx = (fist_pos[0] - fist_pos_old[0]) / video.videoWidth,
				            dy = (fist_pos[1] - fist_pos_old[1]) / video.videoHeight;
						//console.log(fist_pos[0]);
						
						if (fist_pos[0]>video.videoWidth*0.75 &&fist_pos[1]>video.videoHeight*0.75){
						   console.log("PREV!!!!");
						} else if (fist_pos[0]<video.videoWidth*0.25 &&fist_pos[1]>video.videoHeight*0.75){
						   console.log("NEXT!!!!");
						} else {
							var playing = document.getElementById('playBtn');

						    console.log("play button display: " + playing.style.display);
						    if ((count--) <= 0) {
						   		if (playing.style.display != 'none') {
							   		if (!lock1) {
							   			lock1 = true;
							   			$('#playBtn').trigger('click');
							   			count = 2;
							   			lock1 = false;
							   		}
							   	} else {
							   		if (!lock2) { 
							   			lock2 = true;
							   			$('#pauseBtn').trigger('click');
							   			count = 2;
							   			lock2 = false;
							   		}
							   	}
						    }
						}
						fist_pos_old = fist_pos;
					} else if (coord[4] > 2) {
						fist_pos_old = fist_pos;						
					} else {
					    count = 2;
					}
				
					// Draw coordinates on video overlay:
					context.beginPath();
					context.lineWidth = '2';
					context.fillStyle = fist_pos_old ? 'rgba(0, 255, 255, 1)' : 'rgba(255, 0, 0, 0)';
					context.fillRect(
						coord[0] / video.videoWidth * canvas.clientWidth-video.videoWidth*2.5,
						coord[1] / video.videoHeight * canvas.clientHeight,
						coord[2] / video.videoWidth * canvas.clientWidth,
						coord[3] / video.videoHeight * canvas.clientHeight);
					context.stroke();
				} else {
					fist_pos_old = null;
				}
			}
		}
	};
