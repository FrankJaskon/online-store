import { Button } from 'react-bootstrap'

interface Props {
    number: number
    incrementFunc: () => void
    decrementFunc: () => void
}

const CountBar = ({ number, incrementFunc, decrementFunc }: Props ) => {
    return <div style={{
        display: 'flex',
        alignItems: 'center',
    }}>
        <Button
            style={{
                padding: '0 .5rem',
                height: 30,
                width: 30,
            }}
            onClick={ decrementFunc }>
            <div style={{
                height: 3,
                backgroundColor: '#fff',
                margin: '0 auto',
                borderRadius: 2,
            }} /></Button>
        <input
            value={ number }
            readOnly
            style={{
                width: 40,
                height: 30,
                textAlign: 'center',
                borderRadius: '.5rem',
                margin: '0 .25rem',
                borderColor: '#eee',
            }} />
        <Button
            style={{
                padding: 6,
                height: 30,
                width: 30,
            }}
            onClick={ incrementFunc }>
            <div style={{
                height: 3,
                backgroundColor: '#fff',
                margin: '0 auto',
                transform: 'translateY( 1.5px )',
                borderRadius: 2,
            }} />
            <div style={{
                height: 3,
                backgroundColor: '#fff',
                margin: '0 auto',
                transform: 'rotate( 90deg ) translateX( -1.5px )',
                borderRadius: 2,
            }} />
        </Button>
    </div>
}

export default CountBar