import { Spinner } from 'react-bootstrap'

const CodeLoader = ({ loadingArea, explanationContent }) => {
  return (
    <div>
        <h3>Explain Code like a Pro!</h3>
        <h6>Ask me How!</h6>
        <br />
        <p>
          {
            loadingArea ? 
            <Spinner 
            animation='grow'
            /> : 
            explanationContent || 'ᕙ(▀̿̿Ĺ̯̿̿▀̿ ̿) ᕗ' 
          }
        </p>
    </div>
  )
}

export default CodeLoader