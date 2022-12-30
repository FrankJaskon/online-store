import { Container, Spinner } from 'react-bootstrap'
import { HEIGHTHEADER } from '../utils/helper'

interface Props {
    border?: boolean
    grow?: boolean
    fullWindow?: boolean
}

function CenteredSpinner( { border, fullWindow }: Props ) {
    return (
        <Container
            style={{ minHeight: fullWindow ? window.innerHeight - HEIGHTHEADER : 'auto' }}
            className='d-flex align-items-center justify-content-center'>
            <Spinner animation={ border ? 'border' : 'grow' } />
        </Container>
    )
}

export default CenteredSpinner