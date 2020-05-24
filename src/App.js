import React, {useState} from 'react'
import {Face, Layout} from './components'

export const App = () => {
  const [rating, setRating] = useState(50)

  return (
    <Layout rating={rating}>
      <Face rating={rating} onRatingChange={setRating} />
    </Layout>
  )
}
