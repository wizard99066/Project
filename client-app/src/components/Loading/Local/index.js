import React from "react"
import {
	Row
}from "antd"
import {
	useSelector
}from "react-redux"
import "./style.scss"
import Loading from '../../../../public/monophy.gif'

const LocalLoading = (props) => {
	const { isGlobalLoadingVisible } = useSelector((state) => state.globalReducer)
	return (
		<>
			{ !isGlobalLoadingVisible &&

        /*
         * <Row className="row-loader" justify="center" align="middle">
         *   <div className="local-loading"></div>
         *   <h4>{props.text}</h4>
         * </Row>
         */
        <div className="loader-data">
        	<div className="loader-back">
        		<div className="loader-rect">
        			<div className="loader-lines-hor">
        				<div />
        				<div />
        				<div />
        				<div />
        				<div />
        			</div>
        			<div className="loader-lines-ver">
        				<div />
        				<div />
        				<div />
        				<div />
        				<div />
        			</div>
        		</div>
        	</div>
        	<div className="loader-white">
        		<div className="loader-white-lines">
        			<div />
        			<div />
        			<div />
        			<div />
        			<div />
        		</div>
        	</div>
        	<img
        		className="loader-svg"
        		decoding="async"
        		loading="lazy"
        		src={ Loading }
        	/>
        </div> }
		</>
	)
}

export default LocalLoading
