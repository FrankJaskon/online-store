import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { fetchDevices } from '../http/deviceApi'
import { Context } from '../main'
import { TypeOrBrand } from '../store/types'
import { delay } from './spinner'

const BrandBar = observer(() => {
    const { device } = useContext( Context )

    const onClick = async ( brand: TypeOrBrand ) => {
        device.setLoading( true )
        if ( device.selectedBrand.id === brand.id ) {
            device.setSelectedBrand( {} as TypeOrBrand )
        } else {
            device.setSelectedBrand( brand )
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
        <div className='d-flex align-items-center flex-wrap'>
            { device.brands.map(( brand: TypeOrBrand ) => {
                return <Card
                    key={ brand.id }
                    bg={ device.selectedBrand.id === brand.id ? 'primary' : 'light' }
                    text={ device.selectedBrand.id === brand.id ? 'light' : 'dark' }
                    onClick={ () => onClick( brand ) }
                    className='me-3 mt-2 py-2 px-4'
                    style={{ cursor: 'pointer' }}>{ brand.name }</Card>
            }) }
        </div>
    )
})

export default BrandBar