import React from "react"

const TrigerCanvasContainer = ({ canvasContainerRef, wheelRef, borderRef }) => (
	<div ref = {canvasContainerRef} className = "wheelFortune_trigerCanvasContainer">
		<canvas width = {500}	height = {500} ref = {wheelRef}	className = "wheelFortune_trigerCanvas"	/>
		<div ref = {borderRef} className = "wheelFortune_canvasAnimateBorder" />
	</div>
)

export default TrigerCanvasContainer;