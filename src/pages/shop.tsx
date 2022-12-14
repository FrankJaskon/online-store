import { Col, Container, Row } from 'react-bootstrap'
import BrandBar from '../components/brandBar'
import DeviceList from '../components/deviceList'
import TypeBar from '../components/typeBar'

const Shop = (): JSX.Element => {
    return (
        <Container>
            <Row className='p-4'>
                <Col md={ 3 }>
                    <TypeBar />
                </Col>
                <Col md={ 9 }>
                    <BrandBar />
                    <DeviceList />
                </Col>
            </Row>
        </Container>
    )
}

export default Shop