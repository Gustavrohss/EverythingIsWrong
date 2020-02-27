import React from 'react'

const AboutComponent = ({
  home: [homeLabel, homeCallback]
}) => (
  <div>
    <h1>About</h1>
    <button onClick={homeCallback}>{homeLabel}</button>
  </div>
)

export default AboutComponent
