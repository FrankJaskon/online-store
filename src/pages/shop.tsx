import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BrandBar from '../components/brandBar'
import DeviceList from '../components/deviceList'
import TypeBar from '../components/typeBar'
import { Filter } from '../store/types'
import { Context } from '../main'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi'
import { observer } from 'mobx-react-lite'
import CenteredSpinner, { delay } from '../components/spinner'
import Pages from '../components/pages'
import { HEADER_HEIGHT } from '../utils/helper'
import SortDropdown from '../components/sortDropdown'

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
            delay(() => device.setLoading( false ))
        })

        return () => {
            device.setFilter( {} as Filter )
            device.setLoading( true )
        }
    }, [])

    if ( device.loading ) {
		return <CenteredSpinner border fullWindow />
	}

    return (
        <Container
            fluid
            style={{
                minHeight: window.innerHeight - HEADER_HEIGHT,
        }}>
            <Row
                className='p-4 pt-3'>
                <Col
                    sm={ 3 }
                    className='pt-2'>
                    <TypeBar />
                </Col>
                <Col sm={ 9 }>
                    <Row>
                        <Col sm={ 9 }>
                            <BrandBar />
                        </Col>
                        <Col sm={ 3 } className='pt-2'>
                            <SortDropdown setLoading={( value: boolean ) => device.setLoading( value )} />
                        </Col>
                    </Row>
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop