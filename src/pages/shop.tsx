import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BrandBar from '../components/brandBar'
import DeviceList from '../components/deviceList'
import TypeBar from '../components/typeBar'
import { Context } from '../main'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi'
import { observer } from 'mobx-react-lite'
import CenteredSpinner from '../components/spinner'
import Pages from '../components/pages'
import { HEIGHTHEADER } from '../utils/helper'

const Shop = observer((): JSX.Element => {
    const { device } = useContext( Context )

    useEffect(() => {
        device.setLoading( true )
        Promise.all([
            fetchTypes().then(({ types }) => {
                device.setType( types )
            }),
            fetchBrands().then(({ brands }) => {
                device.setBrand( brands )
            }),
            fetchDevices( device.selectedType.id, device.selectedBrand.id, device.page, device.limit )
                .then(({ devices: { rows, count }}) => {
                    device.setTotalCount( count )
                    device.setDevices( rows )
            }),
        ]).finally(() => {
            device.setLoading( false )
        })
    }, [])

    if ( device.loading ) {
		return <CenteredSpinner border fullWindow />
	}

    return (
        <Container style={{
            minHeight: window.innerHeight - HEIGHTHEADER,
        }}>
            <Row className='p-4'>
                <Col md={ 3 }>
                    <TypeBar />
                </Col>
                <Col md={ 9 }>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop