import React from "react"
import { connect } from "react-redux"

import Field from "./wheel_field/1_container/Container";
import Triger from "./wheel_triger/1_container/TrigerContainer"
import ErrorField from "./error_field/ErrorField"

const App = (props)=> {

	return (
		 <React.Fragment>
      {  !props.closeWheel && props.trigerOn && <Triger string = {props.domForWheel.trigerString}/> }
      {  !props.closeWheel && !props.trigerOn && <Field elems = {props.domForWheel}/> }
      { props.errorStatus && <ErrorField dataError />}
    </React.Fragment>
	)

}

export default connect( ({closeWheel, trigerOn, errorField, errorStatus}) => ({
	closeWheel, trigerOn, errorField, errorStatus
}))(App);