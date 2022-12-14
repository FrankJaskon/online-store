import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Button, Col, Container, Image, Row, Table } from 'react-bootstrap'
import { Context } from '../main'
import bigStar from '../assets/star-full.svg'

const DevicePage = observer(() => {
    const { device: { devices: [ item ] } } = useContext( Context )
    const description = [
        { id: 1, title: 'Random access memory (RAM)', description: '5gb' },
        { id: 2, title: 'Random access memory (RAM)', description: '5gb' },
        { id: 3, title: 'Random access memory (RAM)', description: '5gb' },
        { id: 4, title: 'Random access memory (RAM)', description: '5gb' },
        { id: 5, title: 'Random access memory (RAM)', description: '5gb' },
    ]
    return (
        <Container fluid
                   style={{ minHeight: window.innerHeight - 54 }}>
            <Row>
                <Col md={ 4 }
                    className='mt-3'
                    style={{ background: '#fff' }}>
                    <div style={{ width: 300, height: 300, margin: '0 auto' }}>
                        <Image src={ item.img }
                            alt={ item.name }
                            style={{ height: '100%', width: 'auto' }}
                            className='d-block mx-auto' />
                    </div>
                </Col>
                <Col md={ 4 }
                    className='mt-3'>
                    <div className='d-flex flex-column justify-content-between align-items-center'
                        style={{ height: 300 }}>
                        <h2>{ item.name }</h2>
                        <div className='d-flex justify-content-center align-items-center'
                            style={{
                                height: '100%', width: '100%',
                                background: `url(${ bigStar }) no-repeat center / contain` }}>
                            <div style={{ width: '100%', textAlign: 'center', fontSize: '2rem' }}>{ item.rating }</div>
                        </div>
                    </div>
                </Col>
                <Col md={ 4 }
                    className='mt-3'>
                    <div className='d-flex flex-column justify-content-between align-items-center p-5'
                            style={{ height: '100%', backgroundColor: '#fff' }}>
                            <div>from { item.price } $</div>
                            <Button variant='outline-dark'
                                    style={{ width: '100%' }}>Add to card</Button>
                    </div>
                </Col>
            </Row>
            <div className='mt-3 px-5'>
                <Table striped
                    variant='light'
                    style={{width: '100%' }}>
                    <caption style={{ captionSide: 'top' }}>
                        <h2 style={{ fontSize: 36, fontWeight: 700, color: '#000' }}>Specifications</h2></caption>
                    <tbody>
                        <tr style={{ display: 'none' }}></tr>
                        { description.map( ( item: any ) => {
                            return <tr key={ item.id }>
                                <td style={{ width: '40%' }}>{ item.title }:</td>
                                <td style={{ width: '60%', textAlign: 'left' }}>{ item.description }</td>
                            </tr>
                        }) }
                    </tbody>
                </Table>
            </div>

        </Container>
    )
})

export default DevicePage