import { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer, { ToastPosition } from 'react-bootstrap/ToastContainer'
import { HEADER_HEIGHT } from '../utils/helper'

interface Props {
    text: string
    callback: () => void
    position?: ToastPosition | undefined
}

const AppToast = ({ text, callback, position = 'top-end' }: Props) => {
    const date = new Date().toTimeString().split( ' ' )[ 0 ]

    return (
        <ToastContainer position={ position }>
            <Toast onClose={ callback } autohide delay={ 2000 }>
                <Toast.Header>
                    <strong className='me-auto'>Online store</strong>
                    <small className='text-muted'>{ date }</small>
                </Toast.Header>
                <Toast.Body>{text}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default AppToast