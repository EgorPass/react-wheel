import React from "react"

const FormHeader = (props)=> (
	<div className = "wheelFortune_formGridContainer_header">
		<h2 className = "wheelFortune_formGridContainer_header_head">
			{props.head ? props.head: "Поздравляем!"}
		</h2>
		<p className = "wheelFortune_formGridContainer_header_text">
				{props.text ? props.text: "Вы можете получить бонус от нашей компании"}
			
			{ props.span && 	(<span	
														className = "wheelFortune_formGridContainer_header_company"
													>
														{ props.span }
													</span>)
			}
		</p>
	</div>
)

export default FormHeader;