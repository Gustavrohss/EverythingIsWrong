import React from 'react'
import AboutButton from '../../stylingComponents/AboutButton'

// Component for the About page.
const AboutComponent = ({
  home: [homeLabel, homeCallback]
}) => (
  <div>
    <h1>About</h1>
    <AboutButton onClick={homeCallback}>{homeLabel}</AboutButton>
  </div>
)

export default AboutComponent
