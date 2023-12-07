import React, { useRef, useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'

export const ExpendableText = ({ maxHeight, children }) => {

const MAX_POSSIBLE_HEIGHT = 10000

const styles = {
  container: {
    width: 300,
    margin: '0 auto'
  },
  card: {
    borderRadius: 55,
    padding: '3rem'
  }
}

  const ref = useRef()
  const [shouldShowExpand, setShouldShowExpand] = useState(false)
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    if (ref.current.scrollHeight > maxHeight) {
      setShouldShowExpand(true)
      setExpanded(false)
    }
  }, [maxHeight])

  return (
    <Card.Text as='h4' style={styles.cardText} ref={ref}>
      <div
        className='inner'
        style={
          { 
            maxHeight: expanded ? 
            MAX_POSSIBLE_HEIGHT 
            : maxHeight 
          }
        }
      >
        {children}
      </div>
      {shouldShowExpand && (
        <Button 
          variant='dark' 
          onClick={() => setExpanded(!expanded)}
        >
          Expand
        </Button>
      )}
    </Card.Text>
  )
}