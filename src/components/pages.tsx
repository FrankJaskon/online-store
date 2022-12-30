import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Pagination } from 'react-bootstrap'
import { fetchDevices } from '../http/deviceApi'
import { Context } from '../main'

const Pages = observer(() => {
    const { device } = useContext( Context )

    useEffect(() => {
        device.setPage( 1 )
    }, [])

    const pages = Math.ceil( device.totalCount / device.limit )
    if ( pages <= 1 ) return <></>

    const onClick = ( index: number ) => {
        device.setPage( index )
        fetchDevices( device.selectedType.id, device.selectedBrand.id, device.page, device.limit )
            .then(({ devices: { rows }}) => {
                device.setDevices( rows )
        })
    }

    const items = []
    for ( let index = 1; index <= pages; index++ ) {
        items.push(
            <Pagination.Item
            key={ index }
            active={ index === device.page }
            onClick={() => { onClick( index ) }}>
                { index }
            </Pagination.Item>,
        )
    }
    return <Pagination className='mb-0'>{ items }</Pagination>
})

export default Pages