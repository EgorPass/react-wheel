import React, { useLayoutEffect } from "react"
import { connect } from "react-redux"

const ErrorField = (props) => {

	const errorFieldRef = React.createRef();
	const { anchor, name }= props.errorField;

	const positionAt = (anch, el) => {
		if(!anch) return;
		
			let coords = anch.getBoundingClientRect();
			let y = coords.bottom + 10;
			let x = coords.left  + (anch.offsetWidth - el.offsetWidth) / 2

				if (y + el.offsetHeight > document.documentElement.clientHeight) y = coords.top - el.offsetHeight - 10;

			el.style.top = y + "px"
			el.style.left = x + "px";
	}

	useLayoutEffect( ()=>	positionAt(anchor, errorFieldRef.current) );

		return (
			<span ref = {errorFieldRef} className = "wheelFortune_errorContainer"> 
				{ name ? `Поле "${name}" обязательное, `: `Это обязательное поле,`}
				<br />
				его нужно правильно заполнить!"
			</span>
		)

}

export default connect(  ({errorField})=> ({ errorField}) ) (ErrorField)