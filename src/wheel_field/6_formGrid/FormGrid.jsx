import React from "react"
import WheelContext from "../.././wheel_context/wheelContext"

const FormGrid = ()=> (

		<WheelContext.Consumer>
			{({inputRefs, buttonRef, buttonClick, 
				onFocusInput, inputData, inputChange, forms, label, button = "Старт" })=>(

				<form className = "wheelFortune_formGridContainer_formGrid">
					{forms.map( ({type, name, placeholder}, i)=> {
						return (
							<div 
								key = {`${i}-in-${name}`}
								className = "wheelFortune_FormGridInput_over"
							>
								<input 
									onChange = {inputChange}
									type = {type} 
									name = {name} 
									ref = {inputRefs[name]}
									value = {inputData[name]}
									placeholder = {placeholder} 
									className = "wheelFortune_FormGridInput"
									onFocus = {onFocusInput}
								/>
							</div>
						)
					})}

					<div>
						<input 
							onClick = {buttonClick}
							ref = {buttonRef}
							type = "button" 
							name = "button"
							className = "wheelFortune_FormGridButton"
							value = {button}
						/>
					</div>

					{label && (
						<div className = "wheelFortune_FormGrid_accept">
							<input 
								ref = {inputRefs.accept}
								type = "checkbox"
								id = "wheelFortune_FormGrid_accept_input"
								className = "wheelFortune_FormGrid_accept_input"
								defaultChecked = "true"
								onFocus = {onFocusInput}
							/>
							<label 
								htmlFor = "wheelFortune_FormGrid_accept_input"
								className = "wheelFortune_FormGrid_accept_label"
							>
							&nbsp;{label}
							</label>
						</div>
					)}

				</form>

			)}
		</WheelContext.Consumer>
)

export default FormGrid;