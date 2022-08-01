import React, {Component} from "react"

class ImageCursor extends Component {

	cursorRef = React.createRef();

	componentDidMount() {
		this.cursorRef.current.width = 600
		this.cursorRef.current.height = 300
		this.ctx = this.cursorRef.current.getContext("2d")
		this.drowCursor();
	}

	render() {

		return (
			<canvas className = "wheelFortune_canvasImage_cursor" ref = {this.cursorRef} />
		)
	}

	drowCursor() {
		let grad = this.ctx.createLinearGradient(0, 0, 0, 200);
				grad.addColorStop(0.02, 'rgba(230, 255, 255, .7)');
				grad.addColorStop(0.2, 'rgba(100, 100, 100, .8)');
				grad.addColorStop(0.4, 'rgba(31, 54, 60, .9)');
				grad.addColorStop(0.5, 'rgba(31, 54, 60, .8)');
				grad.addColorStop(0.6, 'rgba(31, 54, 60, .9)');
				grad.addColorStop(0.8, 'rgba(100, 100, 100, .8)');
				grad.addColorStop(1, 'rgba(230, 255, 255, .7)');
		
		let grad2 = this.ctx.createLinearGradient(0, 0, 600, 300)
				grad2.addColorStop(.0, "rgba(55, 155, 55, 1)")
				grad2.addColorStop(.3, "rgba(155, 55, 155, .9)")
				grad2.addColorStop(.4, "rgba(55, 155, 55, 1)")
				grad2.addColorStop(.6, "rgba(55, 155, 155, .9)")
				grad2.addColorStop(.7, "rgba(155, 155, 55, .9)")
				grad2.addColorStop(.8, "rgba(55, 155, 155, .9)")

		this.ctx.lineJoin = "bevel";
		this.ctx.lineCap = "round";
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = "gray";

			this.ctx.save()

		this.ctx.shadowOffsetX = 25;
	  this.ctx.shadowOffsetY = 30;
	 	this.ctx.shadowBlur = 5;
	 	this.ctx.shadowColor = "rgba(0, 0, 0, .5)";
	
		this.ctx.beginPath();
		this.ctx.moveTo(585, 112);
		this.ctx.lineTo(264, 10);
		this.ctx.arc(225, 102, 100, deg(-77), deg(-160) , true )
		this.ctx.lineTo(139, 80);
		this.ctx.arc(230, 117, 95, deg(190), deg(86) , true );
		this.ctx.lineTo(585, 112);
		this.ctx.moveTo(262, 102)
		this.ctx.arc(225, 103, 37, deg(0), deg(360), false)
		this.ctx.moveTo(315, 135)
		this.ctx.arc(235, 107, 85, deg(20), deg(-18), true)
		this.ctx.lineTo(475, 111)
		this.ctx.lineTo(315, 135)
		this.ctx.fillStyle = grad2
		this.ctx.stroke()	
		this.ctx.fill()
		this.ctx.closePath();

			this.ctx.restore()
		
		this.ctx.beginPath()
		this.ctx.moveTo(585, 112);
		this.ctx.lineTo(264, 23);
		this.ctx.arc(230, 112, 95, deg(-70), deg(-164) , true )
		this.ctx.arc(230, 117, 95, deg(163), deg(80) , true );
		this.ctx.lineTo(585, 112);
		this.ctx.moveTo(285, 112)
		this.ctx.arc(235, 112, 50, deg(0), deg(360), false)
		this.ctx.moveTo(300, 162)
		this.ctx.arc(235, 107, 85, deg(40), deg(-18), true)
		this.ctx.lineTo(485, 112)
		this.ctx.lineTo(300, 162)
		this.ctx.fillStyle =  grad;
		this.ctx.lineJoin = "bevel";
		this.ctx.lineCap = "round";
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = "gray";
		this.ctx.stroke()	
		this.ctx.fill()
		this.ctx.closePath();

		this.ctx.beginPath()
		this.ctx.moveTo(132, 67)
		this.ctx.lineTo(35, 67)
		this.ctx.arc(35, 97, 30, deg(-90), deg(-180), true)
		this.ctx.lineTo(2, 117);
		this.ctx.arc(35, 117, 30, deg(-180), deg(-270), true)
		this.ctx.lineTo(139, 147)
		this.ctx.lineTo(139, 80)
		this.ctx.lineTo(132, 67)
		this.ctx.fillStyle = grad2
		this.ctx.stroke();
		this.ctx.fill();
		this.ctx.closePath()
		this.ctx.beginPath()
		this.ctx.moveTo(140, 82)
		this.ctx.lineTo(35, 82)
		this.ctx.arc(35, 114.5, 32.5, deg(-90), deg(-270), true)
		this.ctx.lineTo(140, 147)
		this.ctx.fillStyle = grad
		this.ctx.fill();			
		this.ctx.stroke();
		this.ctx.closePath()

			function deg(x) {
				return x * Math.PI / 180
			}
	}

}


export default ImageCursor