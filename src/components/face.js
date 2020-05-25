import React from 'react'
import Slider from '@reach/slider'
import {
  eyeLeftSmile,
  eyeLeftNeutral,
  eyeLeftFrown,
  mouthSmile,
  mouthNeutral,
  mouthFrown,
} from '../shapes'
import {preventDefault, getTweenedPath} from '../utils'

import '@reach/slider/styles.css'

export const Face = ({rating, onRatingChange}) => {
  const state = rating < 25 ? 'BAD' : rating > 75 ? 'GOOD' : 'NEUTRAL'
  const isNegative = rating < 50
  const mouthPath = getTweenedPath(
    isNegative ? mouthFrown : mouthNeutral,
    isNegative ? mouthNeutral : mouthSmile,
    isNegative ? rating / 50 : (rating - 50) / 50,
  )
  const leftEyePath = getTweenedPath(
    isNegative ? eyeLeftFrown : eyeLeftNeutral,
    isNegative ? eyeLeftNeutral : eyeLeftSmile,
    isNegative ? rating / 50 : (rating - 50) / 50,
  )
  const activeEmotion =
    state === 'BAD' ? 'Hideous' : state === 'GOOD' ? 'Good' : 'Ok'

  return (
    <form className="face__container" onSubmit={preventDefault}>
      <div className="face__header">
        <label className="face__title" htmlFor="rating-input-label">
          How was your ride?
        </label>
        <p className="face__subtitle">{activeEmotion}</p>
      </div>

      <div className="face__main">
        <svg
          className="face"
          viewBox="0 0 90 90"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            className="face__group"
            data-vibrate={rating < 15 ? 'AGGRESSIVE' : ''}
          >
            <path
              className="face__mouth"
              d={mouthPath}
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              className="face__eye -left"
              d={leftEyePath}
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              className="face__eye -right"
              d={leftEyePath}
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <g
              className="face__pupil-group"
              data-glance={rating > 15 ? true : ''}
            >
              <circle className="face__pupil -left" cx="1" cy="1" r="2" />
              <circle className="face__pupil -right" cx="1" cy="1" r="2" />
            </g>
          </g>
        </svg>

        <Slider
          id="rating-input-label"
          name="rating-input-label"
          className="rating-input"
          type="range"
          min={0}
          max={100}
          value={rating}
          onChange={onRatingChange}
        />
      </div>
    </form>
  )
}
