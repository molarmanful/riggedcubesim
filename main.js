$(function () {
	cube.shuffle(25);
	start();
	$('.playagain').click(function () {
		$('.modal').modal('hide');
		cube.shuffle(25);
		start();
	});
});

function start() {
	var started = false,
		timer, move;
	cube.addEventListener('onShuffleComplete', function () {
		cube.addEventListener('onTwistComplete', function () {
			if (!started) {
				started = true;
				removeEventListener('onTwistComplete');
				var startingtime = new Date();
				timer = setInterval(function () {
					$('.time').text((new Date - startingtime) / 1000);
					if (cube.isSolved()) {
						clearInterval(timer);
						cube.showStickers();
						cube.mouseControlsEnabled = true;
						$('g-cube').attr('class', '');
						$('.modal').modal('show');
					} else {
						var tricks = [
								'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
								'cube.hideStickers()',
								'cube.showStickers()',
								'$("g-cube").attr("class",["transparent","white","yellow","green","blue","orange","red","neon"][Math.floor(Math.random()*9)])',
								'cube.mouseControlsEnabled=false',
								'cube.mouseControlsEnabled=true'
							];
						eval(tricks[Math.floor(Math.random() * tricks.length)]);
						if (Math.floor(Math.random() * 1000000) == 1) {
							var moves = ["r", "u", "l", "b", "d", "f", "m", "e", "s", "x", "y", "z"],
								twist = moves[Math.floor(Math.random() * moves.length)];
							if (Math.round(Math.random())) {
								twist = twist.toUpperCase();
							}
							cube.twist(twist);
						}
					}
				});
			}
		});
	});
}