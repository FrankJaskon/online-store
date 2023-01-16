import { Container, Spinner } from 'react-bootstrap'
import { HEADER_HEIGHT } from '../utils/helper'

interface Props {
    border?: boolean
    grow?: boolean
    fullWindow?: boolean
}

function CenteredSpinner( { border, fullWindow }: Props ) {
    return (
        <Container
            style={{ minHeight: fullWindow ? window.innerHeight - HEADER_HEIGHT : 'auto' }}
            className='d-flex align-items-center justify-content-center'>
            <Spinner animation={ border ? 'border' : 'grow' } />
        </Container>
    )
}

export default CenteredSpinner