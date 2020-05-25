import React, {useEffect} from 'react'
import {
  SliderInput,
  SliderTrack,
  SliderTrackHighlight,
  SliderMarker,
  SliderHandle,
} from '@reach/slider'
import {animated, useSpring} from 'react-spring'
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
  const [sliderHandleSpring, setSliderHandleSpring] = useSpring(() => ({
    x: 0,
  }))

  useEffect(() => {
    setSliderHandleSpring({x: rating})
  }, [rating])

  return (
    <form className="face__container" onSubmit={preventDefault}>
      <div className="face__header">
        <label className="face__title" htmlFor="rating-input-label">
          How was your ride?
        </label>
        <p className="face__subtitle">
          <span
            className="face__subtitle-text"
            data-hidden={state !== 'BAD' ? 'LEFT' : ''}
            aria-hidden={state !== 'BAD'}
          >
            Hideous
          </span>
          <span
            className="face__subtitle-text"
            data-hidden={
              state === 'BAD' ? 'RIGHT' : state === 'GOOD' ? 'LEFT' : ''
            }
            aria-hidden={state !== 'NEUTRAL'}
          >
            Ok
          </span>
          <span
            className="face__subtitle-text"
            data-hidden={state !== 'GOOD' ? 'RIGHT' : ''}
            aria-hidden={state !== 'GOOD'}
          >
            Good
          </span>
        </p>
      </div>

      <div className="face__main">
        <svg
          className="face"
          viewBox="0 0 90 90"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
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

        <SliderInput
          id="rating-input-label"
          name="rating-input-label"
          className="rating-input"
          min={0}
          value={rating}
          max={100}
          onChange={onRatingChange}
        >
          <SliderTrack>
            <animated.div
              className="slider__pseudo-track"
              style={{
                transform: sliderHandleSpring.x.interpolate(
                  x => `translateX(${x}%) translateY(-50%)`,
                ),
              }}
            >
              <span className="slider__handle" />
            </animated.div>
            <SliderTrackHighlight />
            <SliderMarker value={rating} />
            <SliderHandle />
          </SliderTrack>
        </SliderInput>
      </div>
    </form>
  )
}
