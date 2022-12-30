import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Row } from 'react-bootstrap'
import { Context } from '../main'
import { Device } from '../store/types'
import Blank from './blank'
import DeviceItem from './deviceItem'

const DeviceList = observer(() => {
    const { device } = useContext( Context )

    if ( device.devices.length === 0 ) return <Blank />

    return <Row className='pt-3'>
        { device.devices.map(( device: Device ) => {
            return <DeviceItem key={ device.id } device={ device } />
        }) }
    </Row>

})

export default DeviceList