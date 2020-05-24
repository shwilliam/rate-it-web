import React from 'react'
import {getTweenedHSL} from '../utils'
import {colorSmile, colorNeutral, colorFrown} from '../colors'

export const Layout = ({rating, children}) => {
  const backgroundColor = getTweenedHSL(
    rating < 50 ? colorFrown : colorNeutral,
    rating < 50 ? colorNeutral : colorSmile,
    (rating < 50 ? rating : rating - 50) / 50,
  )

  return (
    <main
      className="layout"
      style={{
        backgroundColor,
      }}
    >
      <header className="layout__header">
        <button className="layout__close">
          <span role="img" aria-label="Close">
            ✕
          </span>
        </button>
        <h1 className="layout__title">Ride finished</h1>
      </header>

      <div className="layout__content">{children}</div>
    </main>
  )
}
