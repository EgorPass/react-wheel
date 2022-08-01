import React, {Fragment} from "react"
import FormHeader from ".././6_formHeader/FormHeader"
import FormGrid from ".././6_formGrid/FormGrid"


function TextContainer({
		elem: {fieldForm}, 
		win, prize,	promo,
		fieldFormRef, fieldPrizeRef
}) {


		let headForPrizeField = win ? (fieldForm.prizeHeadWin ? fieldForm.prizeHeadWin : "Ура :)" ): (fieldForm.prizeHeadLoss ? fieldForm.prizeHeadLoss : "Увы :(" )

	
		let textForPrizeField = win ? (
					fieldForm.prizeTextWin ? fieldForm.prizeTextWin : "Вы выиграли" ) : (
					fieldForm.prizeTextLoss ? fieldForm.prizeTextLoss : "Фортуна оказалась не на Вашей стороне.") 

	return (
			<div className = "wheelFortune_textContainer">
				
				<div className = "wheelFortune_fieldForm" ref = {fieldFormRef}>
					<div className = "wheelFortune_formGridContainer">
						<FormHeader 
							head = {fieldForm.fieldFormHeader} 
							text = {fieldForm.fieldFormText}
							span = {fieldForm.company}
						/>
						<FormGrid />
					</div>
				</div>

				<div className = "wheelFortune_fieldPrize" ref = {fieldPrizeRef} >
					<div className = "wheelFortune_prizeGridContainer">
						<FormHeader 
							head = {headForPrizeField} 
							text = {textForPrizeField}
							span = {win ? prize : ""}
						/>
						{win ? (promo && (
							<Fragment>
								<span className = "wheelFortune_prizeContent_text">
									Чтобы воспользоваться удачае, укажите промо код, при обращении в нашу компанию
								</span>
								
								<div className = "wheelFortune_prizeContent_promo">
									{promo}
								</div>
							</Fragment>
						) ): null
					}
					</div>
				</div>

			</div>
	)
}

export default TextContainer
