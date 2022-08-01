export function promise (func){
	return new Promise(res=>{	func(res) });
} 

export function animation({ 	name, target, size = 1, 
											stop, drawning, infinity = false,	
											res = null,	duration = 3000, }) {
				
		let start = performance.now();
		stop[name] = requestAnimationFrame(animate);

			function animate(time) {
				let step = (time - start) / duration;
	 			if (step > 1) step = 1;

					drawning({step, size, target});
		 		
		 		if(infinity && step === 1) {
		 			start = performance.now();
		 			step = 0;
		 		}
				if(step < 1) stop[name] = requestAnimationFrame(animate);
				else {
					cancelAnimationFrame(stop[name]) 
					if(res) res(target);
				}
			}
};

export function move(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

export function reverse(timing) {
  return function(x, timeFraction) {
    return 1 - timing(x, 1 - timeFraction);
  }
}

export function drawTriger(ctx, angle) {
	const colors = ["red", "yellow", "green", "orange", "blue", "lime"],
			size = 60;

	for(let i = 0; i < colors.length; i++){
			let start = angle + i * size;
			let	end = angle + i * size + size;
		
		ctx.beginPath();
		ctx.arc(250, 250, 250, (start  * Math.PI / 180), (end  * Math.PI / 180));
		ctx.lineTo(250, 250);
		ctx.fillStyle = colors[i];
		ctx.fill();
		ctx.stroke();
		ctx.closePath()

		ctx.beginPath();
		ctx.arc(250, 250, 70, (start  * Math.PI / 180), (end  * Math.PI / 180))
		ctx.lineTo(250, 250)
		ctx.fillStyle = colors[colors.length -1 - i];
		ctx.fill();
		ctx.stroke();
		ctx.closePath()
	}
}

export function moveTriger(target, x) {
	target.style.marginLeft = -20 + x + "vmin";
}

export async function run( { 
														containerRef, canvasContainerRef, 
														wheelRef, borderRef, stringRef, param, stop, string, ctx } ) {
	// set height
		await promise( res => {
					animation({
											res,
											stop,
											name: "containerHeightOpen",
											duration: 250,
											target: containerRef.current,
											size: param.heightContainer,
											drawning: ({step, size, target}) => {
												target.style.height = step * size  + "px"
												target.style.paddingTop = target.style.paddingBottom = step * 5 + "px"
											}
										})
		}) 
	// set width
		await promise( res => {
					animation({	
											res,
											stop,
											name: "containerWidthOpen",
											duration: 750,
											target: containerRef.current,
											size: param.widthContainer,
											drawning: ({step, size, target}) => {
												target.style.width = step * size  + "px"
												target.style.paddingLeft = target.style.paddingRight = step * 5 + "px"
											}
										}) 
		})
	// set string, wheel & border
		await promise( res => {
				// set move wheel
					animation({	
											size: 20,
											stop: stop,
											name: "moveWheel",
											duration: 3000,
											infinity: false,
											target: wheelRef.current,
											drawning: ({step, size, target}) => {
													let res = reverse(move)
													let dist = res(15, step) * size
													if(!dist) dist = 0;
														moveTriger(target, dist)
											}
					})

					promise( res => {

						// set rotate forward
							animation({	
													name: "drawWheelForward",
													target: ctx, 
													stop: stop, 
													size: 720,
													duration: 1200,
													infinity: false,
													res,
													drawning: ({step, size, target})=> {
															let dist = step * size
															if(!dist) dist = 0;
																drawTriger(	target, dist)
													}
							}) 
					})
						.then( target => {
							// set rotate back
								animation({	
														name: "drawWheelBack",
														target, 
														stop: stop, 
														size: 720,
														duration: 3000,
														infinity: true,
														drawning: ({step, size, target})=> {
																let dist = -step * size
																if(!dist) dist = 0;
															drawTriger(	target, dist)
														}
													})
							// // set border rotate
								animation({
										name: "borderRotate",
										target: borderRef.current,
										duration: 6000,
										size: 360,
										stop,
										infinity: true,
										drawning: ({step, target, size,})=> {
											let dist = step * size;
											target.style.transform = "rotate(" + dist + "deg)"
										}
									})
							// set border opacity
								// setTimeout( ()=> {
									animation({
										name: "borderOpacity",
										target: borderRef.current,
										duration: 1400,
										stop,
										drawning: ({step, target, size,})=> {
											target.style.opacity = step
										} 
									})
								// }, 3500)
						})

					animation({
											res,
											stop,
											name: "string",
											duration: 2000,
											target: stringRef.current,
											drawning: ({target, size, step}) => {
													target.innerHTML= string.slice(0, Math.ceil(step * string.length));
											}
					})
		})
	// set opacity => 0
		await promise( res => {
				setTimeout( () => {
						animation({
											res,
											stop,
											name: "opacityString",
											duration: 2000,
											target: stringRef.current,
											drawning: ({target, size, step}) => {
													target.style.opacity = 1 - step;
											}
						})
				}, 10)
		})
	// set close width
		await promise( res => {
					stringRef.current.style.position = "absolute"
					animation({
											res,
											stop,
											size: param.widthContainer,
											name: "containerWidthClose",
											duration: 500,
											target: containerRef.current,
											drawning: ({target, size, step}) => {	
													target.style.width = 11 + param.widthContainer - step * (param.widthContainer - param.widthCanvasContainer)  + "px";
											}
					})
		})

	containerRef.current.style.width = "auto"
	containerRef.current.style.height = "auto"		
}