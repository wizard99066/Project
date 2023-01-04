import styled from "styled-components"
import { Col, Row } from "antd"

export const StyledRowDiv = styled.div`

@media (max-width: 1800px) {
.statistics-row{
height: 535px;
}

.statistic-data-cl .center-data-statistic-row .ant-row {
    padding-top: 3.8em;
}
 }
  
  @media (max-width: 1200px) {
	.statistic-left-cl {
	display: none;
	}

	.statistic-right-cl{
	display: none;
	}

.statistic-image-cl{
    flex: 0 0 58.33333333%;
    max-width: 58.33333333%;
	}

.statistic-data-cl{
	flex: 0 0 41.66666667%;
    max-width: 41.66666667%;
}

 }
 
 @media (max-width: 1270px) {
.statistic-number{
font-size: 186%;
}
.statistic-data-cl .center-data-statistic-row .ant-row {
    padding-top: 3.5em;
}

.statistics-row{
height: 468px;
}
 }
 
   @media (max-width: 920px) {

.statistic-image-cl{
display: none;
}

.statistic-data-cl{
	flex: 0 0 100%;
    max-width: 100%;
}


//.statistics-img-res {
//display: initial;
//}

 }

   @media (max-width: 600px) {
.statistics-row{
height: 370px;
}
.statistic-data-cl .center-data-statistic-row .ant-row {
    padding-top: 2.3em;
}
 }

`