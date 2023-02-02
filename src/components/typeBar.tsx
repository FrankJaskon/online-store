import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { fetchDevices } from '../http/deviceApi'
import { Context } from '../main'
import { TypeOrBrand } from '../store/types'
import { delay } from './spinner'

const TypeBar = observer(() => {
    const { device } = useContext( Context )

    const onClick = async ( type: TypeOrBrand ) => {
        device.setLoading( true )
        if ( device.selectedType.id === type.id ) {
            device.setSelectedType( {} as TypeOrBrand )
        } else {
            device.setSelectedType( type )
        }
        device.setPage( 1 )
        await fetchDevices( device.selectedType.id, device.selectedBrand.id, device.page, device.limit )
            .then(({ devices: { rows: devices, count }}) => {
                device.setDevices( devices )
                device.setTotalCount( count )
        })
        delay(() => device.setLoading( false ))
    }

    return (
        <ListGroup>
            { device.types.map( ( type: TypeOrBrand ) => {
                return <ListGroup.Item
                    key={ type.id }
                    active={ device.selectedType.id === type.id }
                    onClick={ () => onClick( type )}
                    style={{ cursor: 'pointer' }}>
                        { type.name }
                </ListGroup.Item>
            }) }
        </ListGroup>
    )
})

export default TypeBar