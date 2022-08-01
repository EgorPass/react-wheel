import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import { setTrigerStatus } from "../.././redux/actions/actions.js"

import TrigerCanvasContainer from ".././2_trigerCanvasContainer/TrigerCanvasContainer"
import TrigerStringContainer from ".././2_trigerStringContainer/TrigerStringContainer"

import { drawTriger, run } from ".././triger_methods.js"


function TrigerContainer(props) {
	
	const containerRef = useRef(null);
	const canvasContainerRef = useRef(null);
	const wheelRef = useRef(null);
	const borderRef = useRef(null);
	const stringRef = useRef(null);
	

	const { string } = props;
	const dispatch = useDispatch();

	const onTrigerClick = (e)=> {
		dispatch(setTrigerStatus(false))
	}

	useEffect (()=> {
		const param = {
			widthCanvasContainer: 0,
			widthContainer: 0,
			heightContainer: 0,
		};
		const stop = {
			containerHeightOpen: null,
			containerWidthOpen: null,
			moveWheel: null,
			drawWheelForward: null,
			drawWheelBack: null,
			borderRotate: null,
			borderOpacity: null,
			string: null,
			opacityString: null,
			containerWidthClose: null,
		};
	
		wheelRef.current.width = wheelRef.current.height = 500;
		const ctx = wheelRef.current.getContext("2d");
		drawTriger(ctx, 0);

		param.widthContainer = containerRef.current.offsetWidth;
		param.heightContainer = containerRef.current.offsetHeight;
		param.widthCanvasContainer = canvasContainerRef.current.offsetWidth;

			(
				containerRef.current.style.width = 
				containerRef.current.style.height = 
				containerRef.current.style.padding = 0
			);
				stringRef.current.innerHTML = "";

		setTimeout( ()=> {
			run( { containerRef, canvasContainerRef, wheelRef, borderRef, stringRef, param, stop, string, ctx } )

		}, 1000)

		return ()=> {

				if( !Object.keys(stop).length ) return
			
			if ( stop.containerHeightOpen )
				cancelAnimationFrame( stop.containerHeightOpen )
			
			if ( stop.containerWidthOpen )
				cancelAnimationFrame( stop.containerWidthOpen );
			
			if (stop.moveWheel)
				cancelAnimationFrame( stop.moveWheel );
			
			if (stop.drawWheelForward)
				cancelAnimationFrame( stop.drawWheelForward );
			
			if (stop.drawWheelBack)
				cancelAnimationFrame( stop.drawWheelBack );
			
			if (stop.borderRotate)
				cancelAnimationFrame( stop.borderRotate );
			
			if (stop.borderOpacity)
				cancelAnimationFrame( stop.borderOpacity );
			
			if (stop.string)
			cancelAnimationFrame( stop.string );
			
			if (stop.opacityString)
			cancelAnimationFrame( stop.opacityString );
			
			if (stop.containerWidthClose)
			cancelAnimationFrame( stop.containerWidthClose );
		}

		

	}, [])

	return (
		<div ref = {containerRef} className = "wheelFortune_trigerContainer" onClick = {onTrigerClick}>
			<TrigerCanvasContainer  canvasContainerRef = {canvasContainerRef} wheelRef = {wheelRef} borderRef = {borderRef} />
			<TrigerStringContainer string = {string} stringRef = {stringRef} />
		</div>
	)
}

export default TrigerContainer