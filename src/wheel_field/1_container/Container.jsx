import React, {Component, } from "react";
import { connect } from "react-redux"
import { setWhellRotate, setWhellStop, setTrigerStatus, setCloseWheel, setErrorField } from "../../redux/actions/actions.js"

import WheelContext from "../.././wheel_context/wheelContext"

import TextContainer from ".././3_textContainer/TextContainer"
import ImageWheel from ".././4_imageWheel/ImageWheel"
import ImageCursor from ".././4_imageCursor/ImageCursor"
import CloseContainer from ".././3_closeContainer/CloseContainer"


class Container extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			inputs: {
				name: "",
				tel: "",
				email: "",
				accept: true,
			},
			win: "",
			prize: "",
			promo: "",
			startAngle: 0,
		}

		this.inputsRefs = {
			name: React.createRef(),
			tel: React.createRef(),
			email: React.createRef(),
			accept: React.createRef(),
		}
		this.buttonRef = React.createRef()
		this.fieldFormRef = React.createRef();
		this.fieldPrizeRef = React.createRef();
		this.fieldsContainerRef = React.createRef();

		this.elems = props.elems
		this.perc = props.elems.lucky
		this.deg = 360 / props.elems.measures.length

		this.regExp = {
			name: /.{3,30}/i,
			tel: /\d \(\d{3}\) \d{3} \d{2} \d{2}/,
			email: /^\w+?\.??\w*?@\w+?\.??\w*?\.\w{2,}$/i,
		}

		this.inputChange = this.inputChange.bind(this)
		this.buttonClick = this.buttonClick.bind(this)
		this.closeWheel = this.closeWheel.bind(this)
		this.onFocusInput = this.onFocusInput.bind(this)
		this.onResizeWindow = this.onResizeWindow.bind(this)
		this.onScroll = this.onScroll.bind(this)
	}

	inputChange({target}) {
		if(this.props.wheelRotate) return;

		let name = target.name;
		let value = target.value;
		let {inputs} = this.state;
		
		if(name === "tel") {

			value = value.replace(/\D/gi, '')
			
			let len = value.length;

				if(len > 1 && len < 5) 
					value = value.replace(/(\d)(\d{1,3})/, "$1 ($2");
				
				else if(len > 4 && len < 8) value = value.replace(/(\d)(\d{3})(\d{1,3})/, "$1 ($2) $3")
			
				else if(len > 7 && len < 10)
					value = value.replace(/(\d)(\d{3})(\d{3})(\d{1,2})/, "$1 ($2) $3 $4")
			
				else if(len > 9 && len < 12)
					value = value.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{1,2})/, "$1 ($2) $3 $4 $5")
			
				else if(len > 11)
					value = value.match(/^\d{11}/g).join("").replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{1,2})/, "$1 ($2) $3 $4 $5")
		}

		if(name === "name") {
			let string = value.match(/[a-zа-я0-9@'"_+^$\s-]{3,30}/gi) || []
			if(string.length) value = string[0]
		}

		inputs[name] = value;
		this.setState( {inputs,} )
	}

	onFocusInput(e) {
		const node = e.target
		const placeholder = node.getAttribute("placeholder")


		if(this.error) {	
			if(node.classList.contains("wheelFortune_errorClass"))
					node.classList.remove("wheelFortune_errorClass");
				
			this.anch = null;
		}
		else if(placeholder) {
				if(this.state.inputs[node.name]) return;
			
			node.setAttribute("placeholder", "")
			node.addEventListener("blur", onBlur)
		} 

			function onBlur(e) {
				this.setAttribute("placeholder", placeholder)
				this.style.width = ""
				this.removeEventListener("blur", onBlur)
			}

		this.error = false;
		this.props.setErrorField({status: false, anchor: null, content: null,})
	}

	closeButtonForClick(target) {
		this.props.setWhellRotate(true)
		target.className = "wheelFortune_FormGridButton_Passive"
	}

	buttonClick(e) {
		e.preventDefault();
		if(this.props.wheelRotate) return;
			
		let state = false;

		const {inputs} = this.state;
		const {forms} = this.elems

		const stateClickforStart = forms.map(({name})=> {
			return {
				name: name,
				state: this.regExp[name].test(inputs[name])
			} 
		})

		stateClickforStart.push({
			name: "accept",
			state: this.inputsRefs.accept.current.checked
		})

			if(!this.error)	
				state = !this.validatorForInput(stateClickforStart).includes(false) 
			
			if(!state) return;

		let x = this.generatorForSpiner(this.perc)
		let step = this.spin(x)
		let promo = this.generatorPromo();
		
			this.setState(prevState=>({promo,}))
			this.closeButtonForClick(this.buttonRef.current)

		new Promise((res)=> {
			this.animation({
				step,
				res,
			})
		})
			.then( ()=> {
				this.changeField() 
				this.props.setWhellStop(true)
			})
	}

	animation({ res, step : {step, offset}, duration = 10000}) {
		let self = this;
	  let start = performance.now();
  	let totalDist  = -Math.ceil(offset/2)* 360 +  step 
    let rotate = (step)=> 1 - Math.pow ((1 - step),2)

   	setTimeout(()=>	requestAnimationFrame(animate), 100);

		function animate(time) {
			 let step = (time - start) / duration;
   		 if (step > 1) step = 1;

				let startAngle = rotate(step) * totalDist ;
						self.setState(prevState=> ({startAngle,}))

	    if (step < 1) {
	      requestAnimationFrame(animate);
	    }
			else {
				res()
			}
		}
	}

	spin(x) {
		return {
			step: ((x - 6) * this.deg - this.deg /2 ),
			offset: x 
		}
	}

	generatorForSpiner( perc) {
		function rundomNumber(min, max) {
		  return  Math.round( min - 0.5 + Math.random() * (max - min + 1)  );
		}

			let min = 7,
					max = min - 1 + (360 / this.deg ),
					arr = [],
					i = 0,
					win,
					x;

				for(i; i < perc; i++) arr.push(true);
				for(i = perc + 1; i < 100; i++) arr.push(false);
				
			win = arr[rundomNumber(0, 99)]
			x = rundomNumber(min, max);
			x = !win ? (!(x % 2) ? x: x + 1) : ( (!(x % 2) ? x -1: x) );

				this.setWiner({win: win, x: (x - 7)})

		return x			
	}

	generatorPromo() {
		let date = new Date();
		let month = ["JN", "FB", "MR", "AP", "MA", "IN", "IU", "AV", "SN", "OC", "NV", "DC"]

			return ( "" + month[date.getMonth()] + ( "00" + date.getDate()).slice(-2) + "-" + ("" + Date.now()).slice(-8, -2) )
	}

	setWiner({win, x}) {
		let prize = this.elems.measures[x].price
		this.setState( (prevState) => ({ win,	prize, }) )
	}

	validatorForInput(arr) {

		return arr.map((it)=> {
			if(!it.state && !this.error) {
					this.error = true;

					const name = this.inputsRefs[it.name].current.placeholder
					this.node = this.inputsRefs[it.name].current;
					this.node.classList.add("wheelFortune_errorClass");
					this.props.setErrorField({status: true, anchor: this.node.parentNode, name, })
					return false;
			} 
			return true;
		})
	}

	onScroll(e) {
		if(this.props.errorStatus && this.node) 
			this.props.setErrorField({status: true, anchor: this.node.parentNode})
	}

	closeWheel(e) {
		const { wheelRotate, rotateComplite, setCloseWheel, setTrigerStatus } = this.props;

			if(wheelRotate) return;
		
		this.fieldsContainerRef.current.style.marginLeft = "-100vmax"
		setTimeout(()=> {
				if(rotateComplite) setCloseWheel(true);
				else {
					setTrigerStatus(true)
					if(this.props.errorStatus) 	this.props.setErrorField({status: false, anchor: null, })
				}
		}, 650)		
	}

	changeField() {
		this.fieldFormRef.current.style.transform = "rotateY(180deg)"
		this.fieldPrizeRef.current.style.transform = "rotateY(360deg)"
	}

	onResizeWindow() {
		if(!this.props.errorStatus) return;

			this.props.setErrorField({status: false,})
			this.props.setErrorField({status: true, anchor: this.node.parentNode })
	}

	componentDidMount() {
		this.fieldsContainerRef.current.style.marginLeft = "0"
		window.addEventListener("resize", this.onResizeWindow)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onResizeWindow)
	}

	render() {

		return (
			<WheelContext.Provider 
				value = {{
									status: "fuck",
									inputRefs: this.inputsRefs,
									buttonRef: this.buttonRef,
									buttonClick: this.buttonClick,
									onFocusInput: this.onFocusInput,
									inputData: this.state.inputs,
									inputChange: this.inputChange,
									forms: this.elems.forms,
									button: (this.elems.fieldForm.fieldFormButton || undefined),
									label: (this.elems.fieldForm.fieldFormLabel || undefined),
							}} 
			>
				<div 
					className = "wheelFortune_container" 
					id = "wheelFortune_container"
					ref = {this.fieldsContainerRef}
				>
					
					<div 
						className = "wheelFortune_staticBox"
						onScroll = {this.onScroll}
					>
						<CloseContainer 
							closeWheel = {this.closeWheel}
						/>
						<TextContainer 
							elem = {this.elems}
							fieldFormRef = {this.fieldFormRef}
							fieldPrizeRef = {this.fieldPrizeRef}
							win = {this.state.win}
							promo = {this.state.promo}
							prize = {this.state.prize}
						/>
						
						<div className = "wheelFortune_wheelContainer">
							<ImageWheel 
								measures = {this.elems.measures} 
								startAngle = {this.state.startAngle}
							/>
							<ImageCursor />
						</div>

					</div>
				</div>
			</WheelContext.Provider>	
		)
	}
}

export default connect(({ trigerOn, wheelRotate, rotateComplite, closeWheel, errorField, errorStatus })=> ({
	wheelRotate,
	rotateComplite,
	closeWheel,
	errorField,
	errorStatus
}), { setWhellRotate, setWhellStop, setTrigerStatus, setCloseWheel, setErrorField })(Container);