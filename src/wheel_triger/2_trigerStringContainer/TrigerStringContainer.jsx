import React from "react"

const TrigerStringContainer = ({ string,  stringRef })=>(
		<div className = "wheelFortune_trigerStringContainer">
			<div ref = {stringRef} className = "wheelFortune_trigerString">{string}</div>
		</div>
)

export default TrigerStringContainer;