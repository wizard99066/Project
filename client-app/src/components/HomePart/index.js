// import React, { 
//   memo 
// } from 'react'
// import './style.css'

// const HomePart = memo(({ 
//   className, title, children 
// }) => {
//   return (
//     <section
//       className={ 'home_part ' + className }
//     >
//       <h2 className='title_home_part'>{ title }</h2>
//       { children }
//     </section>
//   )
// })

import React, {
  memo
} from 'react'
import {
  Row, Col
} from 'antd'
import {StyledColDiv} from './homePartStyled'
import './style.css'

const HomePart = memo(({
  className,
  title,
  children
}) => {

  return (
    <section className={ 'home_part ' + className }
    style={{
      paddingTop: "0px",
      paddingBottom: "0px",
      padding: "0px 0px 0px 0px",
    }}
    >
      { children }
    </section>
  )
})

export default HomePart