import { observer } from 'mobx-react-lite'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Device } from '../store/types'
import { DEVICE_ROUTE } from '../utils/consts'
import Rating from './rating'

interface Props {
    device: Device
    className?: string
    style?: React.CSSProperties
}

const BasketDevice = observer(({ device: { id, name, rating, price, img, }, className, style }: Props ) => {
    const navigation = useNavigate()

    const handleClick = () => {
        navigation( DEVICE_ROUTE + '/' + id )
    }
    return <Card
        border='light'
        className={ className ? className : '' }
        style={ style ? style : undefined }>
        <Card.Body className='d-flex justify-content-between'>
            <Card.Img
                src={ import.meta.env.VITE_API_URL + img }
                style={{
                    cursor: 'pointer',
                    maxHeight: '100px',
                    maxWidth: '150px',
                    objectFit: 'contain', }}
                    onClick={ handleClick } />
            <div className='me-auto d-flex flex-column justify-content-between'>
                <Card.Title
                    style={{ cursor: 'pointer' }}
                    onClick={ handleClick }>{ name }</Card.Title>
                <Card.Subtitle className='d-flex justify-content-between text-black-50'>
                    Phone Samsung
                </Card.Subtitle>
                <Rating rate={ rating } />
            </div>
            <div className='me-auto'>
                Plus
            </div>
            <div className='me-auto'>
                { price } &#8372;
            </div>
        </Card.Body>
    </Card>
})

export default BasketDevice