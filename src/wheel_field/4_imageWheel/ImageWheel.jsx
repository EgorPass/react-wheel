import React from "react";

class ImageWheel extends React.Component {

	constructor(props) {
		super(props)

		this.startAngle = props.startAngle

		this.data = props.measures;
		this.wheelRef = React.createRef();

		this.width = 1500;
		this.height = 1500;

		this.outLineOuterArc = .499 * this.width;
		this.outLineInnerArc = .494 * this.width;
		this.innerLineInnerArc = .484 * this.width;

		this.k = .009;
		this.heightWall =  this.k * this.width;

		this.outLineCenterArc = (.04 )  * this.width;
		this.startPoint = this.outLineCenterArc - (this.outLineInnerArc - this.innerLineInnerArc) * 1.2;
		this.positionForText = this.width /3.5

		this.size = 360 / (this.data.length || 6);
		this.halfSize = this.size / 2;
		this.length = 360  / this.size;

		this.stepForGradiantOutArc = 3;
		this.countForGradientOutArc = 0;
		this.colorForOuterArc = [];
	
		this.measureStepForGradientOutArc = 360 / this.stepForGradiantOutArc / this.data.length;
		this.colorForMesure = this.data.map( (it,i)=> it.background ? it.background: "white" );
		this.shadowMeasure = this.data.map( (it, i)=> it.shadowMeasure);
		this.shadowLengthForMeasure = this.data.map((it, i)=> it.shadowMeasureLength ? (this.innerLineInnerArc / 4): 0 );	
		this.offsetShadowForMeasure = this.data.map((it, i)=> it.shadowMeasureLength !== 0 ? it.offsetShadowMeasure * .1: it.offsetShadowMeasure * .01);
		this.innerWallColorClothest = this.data.map((it, i)=> it.innerWallColorClothest );
		this.stringForText = this.data.map((it, i)=> (" #" + (i + 1)) + " " + it.price  || ("string #" + i) );
		this.colorForText = this.data.map((it, i)=> it.color ? it.color: !(i % 2) ? "black": "white");
		this.colorWallCenterArc = this.data.map((it, i)=> it.colorWallCenterArc)	
	}

	componentDidMount() {		
		this.wheelRef.current.width = this.width;
		this.wheelRef.current.height = this.height;
		this.ctx = this.wheelRef.current.getContext("2d");
		this.renderWheel();
	}

	componentDidUpdate() {
		this.startAngle = this.props.startAngle
		this.renderWheel();
	}

	render () {
		return (
			<canvas 
				className = "wheelFortune_canvasImage_wheel"
				id = "wheelFortune_canvasImage_wheel"
				ref = {this.wheelRef}
			></canvas>
		)
	}


	renderWheel() {
		this.colorForMeasuresOutArc()
		this.createOuterArc();
			for(let i = 0; i < this.length; i++) {
				this.createMesures(i)
			}
		this.createCenter()
	}

	colorForMeasuresOutArc() {
		let outArcColor = 0;
		for(let i = 0; i < 360; i += this.stepForGradiantOutArc) {
			if(i % 2) {
				this.colorForOuterArc.push( this.data[outArcColor].outArcColorTwo )
			
					if(++this.countForGradientOutArc >= this.measureStepForGradientOutArc) {
						outArcColor++;
						this.countForGradientOutArc = 0
					}
			}
			else {
				this.colorForOuterArc.push( this.data[outArcColor].outArcColorOne )
			
					if(++this.countForGradientOutArc >= this.measureStepForGradientOutArc) {
						outArcColor++;
						this.countForGradientOutArc = 0
					}
			}
		}
	}

	createMeasuresForOuterArc() {
		let count = 0;
		let self = this
			for(let i = 0/*, len = this.colorForOuterArc.length*/; i < 360; i+= this.stepForGradiantOutArc) {
				let start = i - self.startAngle
				let end = i + this.stepForGradiantOutArc - this.startAngle

				this.ctx.beginPath();
				this.ctx.arc(this.width / 2, this.height / 2, this.outLineOuterArc, this.deg( start ), this.deg(end), false);
				this.ctx.arc(this.width / 2, this.height / 2,	this.outLineInnerArc,	this.deg(end), this.deg(start), true)
				this.ctx.fillStyle = this.colorForOuterArc[count++];
				this.ctx.fill();
				this.ctx.stroke()
			}
	}

	createOuterArc() {
		this.createMeasuresForOuterArc()

		this.ctx.beginPath();
		this.ctx.arc(this.width / 2, this.height / 2, this.outLineInnerArc,	this.deg(0), this.deg(360), false);
		this.ctx.arc(this.width / 2, this.height / 2, this.outLineCenterArc, this.deg(360), this.deg(0), true)
		this.ctx.fillStyle = "gray";
		this.ctx.fill();
		this.ctx.closePath()
	}

	createMesures(i) {
			let start = i * this.size- this.startAngle;
			let end = i * this.size + this.size - this.startAngle;
			// let step = 360 / 3 / this.length;
			// let odd = true;
			// let offset = 5;

		// measure ---------- ok ---------- varibal ------------
			let measureGrad = this.ctx.createRadialGradient(this.width / 2, this.height / 2, this.shadowLengthForMeasure[i], this.width / 2, this.height / 2, this.width / 2 );
					measureGrad.addColorStop(0, this.colorForMesure[i]);
					measureGrad.addColorStop(1 - this.offsetShadowForMeasure[i], this.colorForMesure[i]);
					measureGrad.addColorStop(1, this.shadowMeasure[i]);
		// inner arc -------- OK ---------- varibal ------------
			let innerArcGrad = this.ctx.createRadialGradient(this.width /2, this.height /2, this.innerLineInnerArc,	this.width /2, this.height /2, this.outLineInnerArc);	
					innerArcGrad.addColorStop(0, this.colorWallCenterArc[i]);
					innerArcGrad.addColorStop(.9, this.innerWallColorClothest[i]);

		// center arc ------- Ok ---------- varibal ------------
			let centerArcGrad = this.ctx.createRadialGradient(this.width /2, this.height /2, this.startPoint,	this.width /2, this.height /2, this.outLineCenterArc);
					centerArcGrad.addColorStop(0, this.colorWallCenterArc[i]);
					centerArcGrad.addColorStop(1, this.innerWallColorClothest[i]);

		// wall --------------Ok ---------- varibal ------------
			let wallGrad = this.ctx.createLinearGradient(0, 0 , this.width / 2, 0);	
					wallGrad.addColorStop(0, this.innerWallColorClothest[i]);
					wallGrad.addColorStop(0 + this.offsetShadowForMeasure[i], this.colorForMesure[i]);
					wallGrad.addColorStop(.85, this.colorWallCenterArc[i]);
					wallGrad.addColorStop(1, this.innerWallColorClothest[i]);

 		// measure ---------- OK -----------------------
			this.ctx.beginPath();
			this.ctx.arc(this.width / 2, this.height / 2, this.innerLineInnerArc,	this.deg(start), this.deg(end), false);
			this.ctx.arc(this.width / 2, this.height / 2, this.outLineCenterArc, this.deg(end), this.deg(start), true)
			this.ctx.lineWidth = 1;
			this.ctx.fillStyle =  measureGrad;
			this.ctx.fill();
			this.ctx.stroke();
			
		// inner arc -------- OK -----------------------
			this.ctx.beginPath();
			this.ctx.arc(this.width / 2, this.height / 2,	this.outLineInnerArc, this.deg(start), this.deg(end), false);
			this.ctx.arc(this.width / 2, this.height / 2, this.innerLineInnerArc, this.deg(end), this.deg(start), true);
			this.ctx.fillStyle = innerArcGrad;
			this.ctx.fill();
			this.ctx.stroke();

		// center arc ------- OK -----------------------
				this.ctx.beginPath();
				this.ctx.arc(this.width / 2, this.height / 2,	0, this.deg(start), this.deg(end), false);
				this.ctx.arc(this.width / 2, this.height / 2,	this.outLineCenterArc, this.deg(end), this.deg(start), true);
				this.ctx.fillStyle = centerArcGrad;
				this.ctx.fill();

		// text ------------- Ok -----------------------
		  this.ctx.save()
			this.ctx.translate(this.width/2, this.height/2)
			this.ctx.rotate( this.deg(start + this.halfSize))
			this.ctx.beginPath();
			this.ctx.fillStyle = this.colorForText[i]
			this.ctx.textBaseline = "middle";
			this.ctx.textAlign = "center";
			this.ctx.font = `normal bold ${45}px Time`;
			this.ctx.fillText(this.stringForText[i], this.positionForText, 0);
			// this.ctx.strokeText(strinForText[i], pos, 0);
			this.ctx.closePath();
			this.ctx.restore();

		// wall ------------- Ok -----------------------
			this.ctx.save()		

			this.ctx.translate(this.width/2, this.height/2)
			this.ctx.rotate(this.deg(this.size * i + this.size - this.startAngle)) 
			this.ctx.beginPath();	
			this.ctx.moveTo(this.startPoint, 0);
			this.ctx.lineTo(this.outLineInnerArc, 0);
			this.ctx.lineTo(this.innerLineInnerArc, -this.heightWall);
			this.ctx.lineTo(this.outLineCenterArc - (this.outLineCenterArc - this.startPoint) *.3, -this.heightWall + (this.outLineCenterArc - this.startPoint) *.3);
			this.ctx.lineTo(this.startPoint,0);
			this.ctx.fillStyle = wallGrad;
			this.ctx.fill();
			this.ctx.stroke();
			this.ctx.closePath();
			this.ctx.restore();
	}

	createCenter() {
		this.ctx.beginPath();
		this.ctx.arc(this.width / 2, this.height / 2 - 5,	this.startPoint / 3, this.deg(0), this.deg(360), false);
		this.ctx.fillStyle = "rgba(31, 54, 60, .8)"
		this.ctx.fill()
		this.ctx.stroke()
	}

	deg(x) {
		return x * Math.PI / 180
	}
}

export default ImageWheel