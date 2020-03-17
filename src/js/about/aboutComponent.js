import React from 'react'

// Component for the About page.
const AboutComponent = ({
  home: [homeLabel, homeCallback]
}) => (
  <div>
    <h1>About</h1>
    <button onClick={homeCallback}>{homeLabel}</button>
  </div>
)

export default AboutComponent
