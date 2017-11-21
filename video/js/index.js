$(function(){
			// 出现和隐藏
			$(".box").hover(function(){
				// $(".items").fadeIn(200);
				$(".items").animate({width:"100%"},500);
			},function(){
				// $(".items").fadeOut(200);
				$(".items").animate({width:"0"},500)
			})


			// 开启/暂停
			let video = $('.video')[0];
			$(".controlss").click(function(){
				if(video.paused) {
        			video.play();
        			$(".control img").attr({"src":"icon/start.png"});
    			}
   				else {
       				video.pause();
       				$(".control img").attr({"src":"icon/stop.png"});
				}
			})
			// 时间和进度条
			function dataSet(time) {
				let h = Math.floor(time/3600);
				let m = Math.floor(time%3600/60);
				let s=  Math.floor(time%60);
				h= h < 10? `0${h}`:h;
				m= m < 10? `0${m}`:m;
				s= s < 10? `0${s}`:s;
				return {h,m,s};
			}
			video.oncanplay = function(){
				let duration = video.duration;
				let time = dataSet(duration);
				$(".progressTime .duration").text(`${time.h}:${time.m}:${time.s}`);
				$(".progressTime .current").text(`00:00:00`);
			}
			video.ontimeupdate = function(){
				let currentTime = video.currentTime;
				let duration = video.duration;
				let progress = currentTime/duration*100;
				let time = dataSet(currentTime);
				$(".timeBar").css({"width":`${progress}%`});
				$(".progressTime .current").text(`${time.h}:${time.m}:${time.s}`);
			};

			// 进度条控制
			var timeDrag = false;   /* Drag status */
			$('.progressBar').mousedown(function(e) {
  			 		timeDrag = true;
				   updatebar(e.pageX);
				});
			$('.progressBar').mouseup(function(e) {
			   if(timeDrag) {
			      timeDrag = false;
			      updatebar(e.pageX);
			   }
			});
			$('.progressBar').mousemove(function(e) {
			   if(timeDrag) {
			      updatebar(e.pageX);
			   }
			});


			function updatebar(x) {
				let left = $('.progressBar').offset().left;
				let width = $('.progressBar').width();
				let progress = (x - left)/width*100;
				let duration = video.duration;
				let current = duration * progress/100;
				video.currentTime = current;
				$(".timeBar").css({"width":`${progress}%`});
			};

			// 缓存控制
			function buffer(){
				let duration = video.duration;
				let buffer = video.buffered.end(0);
				// console.log(buffer);
				let progress = buffer/duration*100;
				$(".bufferBar").css({"width":`${progress}%`});
				if(progress == 1) {
					clearInterval(timer);
				}
			}
			let timer = setInterval(buffer,500);

			// 音量控制
			$('.muted').click(function() {
				if(video.muted){
					video.muted = false;
					$(this).find('img').attr({'src':'icon/mstart.png'});
				}else{
					video.muted = true;
					$(this).find('img').attr({'src':'icon/mstop.png'});
				}
			   
			   
			});
			 
			//Volume control clicked
			$('.volumeBar').on('mousedown', function(e) {
			   let position = e.pageX - $(this).offset().left;
			   let percentage = 100 * position / $(this).width();
			   $('.volume').css('width', percentage+'%');
			   video.volume = percentage / 100;
			});

			// 全屏控制
			$('.fullScreenss').click(function(event) {
				  video.webkitRequestFullScreen();
			});

			// 开关灯
			$('.light').click(function() {
			   if($(this).hasClass('on')) {
			      $(this).removeClass('on');
			      $('body').append('<div class="overlay"></div>');
			      $('.overlay').css({
			         'position':'absolute',
			         'width':100+'%',
			         'height':$(document).height(),
			         'background':'#000',
			         'opacity':0.7,
			         'top':0,
			         'left':0,
			         'z-index':999
			      });
			      $('.video').css({
			         'z-index':1000
			      });
			      $(".light img").attr({
			      	src: 'icon/lightstop.png'
			      });
			   }
			   else {
			      $(this).addClass('on');
			      $('.overlay').remove();
			      $(".light img").attr({
			      	src: 'icon/lightstart.png'
			      });
			   }
			});

		})