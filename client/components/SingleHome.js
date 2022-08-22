import React from 'react'
import {connect} from 'react-redux'
import Data from "../dummydata.js"

const test = 'this is testing'
/**
 * COMPONENT
 */
export const SingleHome = () => {

  return (
    <div>
      <h3>{Data}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */

export default connect(SingleHome)