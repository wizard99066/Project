import styled from 'styled-components'
import {
	Col, Layout
} from 'antd'



const {
	Header
} = Layout

export const StyledHeader = styled(Header)`
  ${ props => props.propp.isHome ? `

    @media (max-width: 730px) {
    //height: 60vh;
  }
    @media (max-width: 900px) {
  //  height: 80vh;
  }
   @media (max-width: 700px) {
   // height: 60vh;
  ` : '' };
    
`

export const StyledMenuCol_1 = styled(Col)`
  @media (max-width: 1200px) {
    display: none;
  }
`

export const StyledMenuCol_2 = styled(Col)`
  @media (max-width: 1200px) {
  .main-nav{
  display: block;
  margin: auto;
  }
  
    display: block;
    flex: 0 0 79.16666667%;
    max-width: 79.16666667%;
  }
`

export const StyledMenuCol_3 = styled(Col)`
    @media (max-width: 560px) {
  .main-nav-3 {
     position: fixed; 
}

 .main-nav-2 ul{
    position: absolute;
    left: 40%;
}
}
`

export const StyledSubMenuDiv = styled.div`
  
  @media (max-width: 1200px) {
  .hiddenLogoText{
  display: block;
  }
.custom-col-right .image-div {
//right: 3%;
//top: 30%;
}
  //.custom-col-right{
  // display: none;
  // }
   .custom-col-left {
   .header-text-box{
   //top:35%;
   //margin-right: 7%;
   //font-size: 70%;
   }
   //display: block;
   //flex: 0 0 100%;
   //max-width: 100%;
  }
  }
   
     @media (max-width: 1100px) {
   .custom-col-left {
   .header-text-box{font-size: 75%}
  }
    .custom-col-right .image-div {
//top: 26%;
    height: 455px;
}
  }
        @media (max-width: 992px) {
.custom-col-right .image-div{
    width: 362px;
    height: 445px;
    top: 28%;
}
  }
   
           @media (max-width: 944px) {
 .custom-col-left {
   .header-text-box{font-size: 60%}
  }
.custom-col-right .image-div{
    width: 270px;
    height: 332px;
    //top: 30%;

}
  .button-row{
flex: 0 0 25em;
flex-flow: row;
 }
  }
   
   
//           @media (max-width: 768px) {
// .custom-col-left {
//   .header-text-box{font-size: 60%}
//  }
//.custom-col-right .image-div{
//    width: 270px;
//    height: 332px;
//    top: 30%;
//
//}
//  }
   
   
   @media (max-width: 735px) {
 .custom-col-right{
   display: none;
   }
  .custom-col-left {
   flex: 0 0 100%;
   max-width: 100%;
   padding-left: 0%;
    .header-text-box{
 position: initial;
 display: table;
 margin: 0 auto;
 padding-top: 0%;
 .image-div{
 //width: 270px;
 //height: 332px;
 
 width: 222px;
    height: 252px;
 }
 .button-row{
 justify-content: center;
 }
 
 }
  .custom-col-right-adapt {
  display: table;
  margin: 0 auto;
  }
 
 h1{
   padding-left: 5%;
   font-size: 165%;
   }
  }

 
 
  }
   
   
   
   

        @media (max-width: 700px) {
   .custom-col-left {
   .custom-apply-bt{
    padding: 12.4px 20px;
   }
   .custom-register-bt {
   padding: 12.4px 20px;
   }
   }
  }
   
        @media (max-width: 610px) {
     .custom-col-left {
      .header-text-box {
    font-size: 50%;
     }  
}
//.hiddenMenuCenterText{
//display: none;
//}
//   .custom-col-left {
//   .header-text-box{top: 35%}
//  }
  }
   
   
      
        @media (max-width: 500px) {
   .custom-col-left{
    
   .header-text-box{
   padding-top: 7%;
   padding-right: 2%;
   h1{
   padding-left: 10%;
   font-size: 165%;
   }
   .hiddenMenuCenterText{
   padding-bottom: 0%;
   }
    .button-row {
   display: table;
   margin: 0 auto;
   .fix-register-bt-div {
   text-align: center;
   }
   }
   .image-div {
    width: 162px;
    height: 174px;
}
    } 
  }
  }
`





