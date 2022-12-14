import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Context } from '../main'
import { TypeOrBrand } from '../store/types'

const TypeBar = observer(() => {
    const { device } = useContext( Context )
    return (
        <ListGroup>
            { device.types.map( ( type: TypeOrBrand ) => {
                return <ListGroup.Item
                    key={ type.id }
                    active={ device.selectedType.id === type.id }
                    onClick={ () => device.setSelectedType( type ) }
                    style={{ cursor: 'pointer' }}>
                        { type.name }
                </ListGroup.Item>
            }) }
        </ListGroup>
    )
})

export default TypeBar