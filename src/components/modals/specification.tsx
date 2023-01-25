import { Button, Col, Form, Row } from 'react-bootstrap'
import { Info } from '../../store/types'

interface Props {
    info: Info[]
    onChangeInfo: ( key: string, index: number, value: string ) => void
    removeInfo: ( id: number ) => void
}

const Specification = ({ info, onChangeInfo, removeInfo }: Props ) => {
    const specification = info.map(( item, index ) =>  <Row className='align-items-center'
        key={ item.id }>
            <Col md={ 4 }>
                <Form.Control
                    type="text"
                    placeholder="title"
                    value={ item.title }
                    onChange={( e ) => onChangeInfo( 'title', index, e.target.value )} />
            </Col>
            <Col md={ 4 }>
                <Form.Control
                    type="text"
                    placeholder="value"
                    value={ item.description }
                    onChange={( e ) => onChangeInfo( 'description', index, e.target.value )} />
            </Col>
            <Col md={ 4 }>
                <Button
                    variant='outline-danger'
                    onClick={ () => removeInfo( item.id as number ) }
                    style={{ width: '100%' }}>Remove</Button>
            </Col>
        </Row> )
    return <>
        { specification }
    </>
}

export default Specification