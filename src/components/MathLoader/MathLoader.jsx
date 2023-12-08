import { Spinner } from 'react-bootstrap'

const MathLoader = ({ loadingSpot, outputContent }) => {
  return (
    <div>
        <h3>Become an Expert in Solving Math Problems!</h3>
        <h6>Get Your Problems Solved!</h6>
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

export default MathLoader