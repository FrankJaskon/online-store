import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Context } from '../main'
import { TypeOrBrand } from '../store/types'

const BrandBar = observer(() => {
    const { device } = useContext( Context )
    return (
        <div className='d-flex align-items-center flex-wrap'>
            { device.brands.map( ( brand: TypeOrBrand ) => {
                return <Card key={ brand.id }
                             bg={ device.selectedBrand.id === brand.id ? 'primary' : 'light' }
                             text={ device.selectedBrand.id === brand.id ? 'light' : 'dark' }
                             onClick={ () => device.setSelectedBrand( brand ) }
                             className='me-3 py-2 px-4'
                             style={{ cursor: 'pointer' }}>{ brand.name }</Card>
            }) }
        </div>
    )
})

export default BrandBar