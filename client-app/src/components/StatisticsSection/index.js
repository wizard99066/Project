import React, {
	memo
} from 'react'
import {
	Row, Col
} from 'antd'
import {
	useSelector
} from 'react-redux'

import i18n from './localization'

import HomePart from '../HomePart'
import { StyledRowDiv } from './statisticsSsectionStyled'
import './style.css'
import StatisticsImg from "../../../public/statistics-img-a.png"
import Bowser from "bowser"
import useWindowSize from "../../hooks/useWindowSize"
import objectFitImages from "object-fit-images"

const StatisticsSection = memo(({
	usersQuantity,
	orgsQuantity,
	appealsQuantity
}) => {
	const isRu = useSelector((state) => state.globalReducer.isRu)
	const windowS = useWindowSize(990)
	objectFitImages('img.statistics-img')
	return (
		<HomePart
			className='section-statistics'
			title={ i18n.statisticsHeaderText[isRu] }>
			<StyledRowDiv>
				<Row
					align='top'
					className='statistics-row'
				>
					<Col className="statistic-left-cl" span={ 2 }/>

					<Col className="statistic-image-cl" span={ 11 }>
						<img
							decoding='async'
							loading='lazy'
							className='statistics-img'
							src={ StatisticsImg }
							alt='fds'
						/>
					</Col>
					<Col className="statistic-data-cl" span={ 7 }>
						{ windowS?.width < 920 ?
							<>
							<div
								className='statistics-img-res'
								style={ { backgroundImage : `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url("${ StatisticsImg }")` } }
							>
								{/*<img*/ }
								{/*	className='statistics-img-res'*/ }
								{/*	decoding='async'*/ }
								{/*	loading='lazy'*/ }
								{/*	src={ StatisticsImg }*/ }
								{/*	alt='fds'*/ }
								{/*/>*/ }

								<Row className="center-data-statistic-row">
									<Row>
										<div className="statistic-number"><p>{ usersQuantity }</p></div>
										<div className="statistic-number-name">{ i18n.usersHeaderText[isRu] }</div>
									</Row>
									<Row>
										<div className="statistic-number">{ orgsQuantity }</div>
										<div className="statistic-number-name">{ i18n.orgsHeaderText[isRu] }</div>
									</Row>
									<Row>
										<div className="statistic-number">{ appealsQuantity }</div>
										<div className="statistic-number-name">{ i18n.appealsHeaderText[isRu] }</div>
									</Row>
								</Row>
							</div>
							</>
						:
							<>
							<Row className="center-data-statistic-row">
							<Row>
								<div className="statistic-number">{ usersQuantity }</div>
								<div className="statistic-number-name">{ i18n.usersHeaderText[isRu] }</div>
							</Row>
							<Row>
								<div className="statistic-number">{ orgsQuantity }</div>
								<div className="statistic-number-name">{ i18n.orgsHeaderText[isRu] }</div>
							</Row>
							<Row>
								<div className="statistic-number">{ appealsQuantity }</div>
								<div className="statistic-number-name">{ i18n.appealsHeaderText[isRu] }</div>
							</Row>
						</Row>
							</>
						}



					</Col>
					<Col className="statistic-right-cl" span={ 4 }/>
				</Row>

			</StyledRowDiv>
		</HomePart>
	)
})

export default StatisticsSection