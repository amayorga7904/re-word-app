import { Spinner } from 'react-bootstrap'

export default function MathLoader({ loadingSpot, outputContent }) {
  return (
    <div>
        <h3>Become an Expert in Solving Math Problems!</h3>
        <h6>Ask me How!</h6>
        <br />
        <p>
          {
            loadingSpot ? 
            <Spinner 
            animation="grow" 
            /> : 
            outputContent || '(ό‿ὸ)ﾉ' 
          }
        </p>
    </div>
  )
}
