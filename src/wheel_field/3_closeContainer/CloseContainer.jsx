import React from "react"

function CloseContainer(props) {
	return (

		<div className = "wheelFortune_container_closeContainer">
			<button 
				className = "wheelFortune_container_close" 
				onClick = {props.closeWheel}
			>
				x
			</button>
		</div>
	)
}

export default CloseContainer