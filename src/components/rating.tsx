interface Props {
    rate: number | undefined
    star?: {
        justStar: boolean
        fontSize: string
    }
}

const Rating = ({ rate, star }: Props) => {
    const newStar = rate === 0
                ? <span
                    className='icon-star-empty ms-1'
                    style={{
                        fontSize: `${ star?.fontSize }`
                    }}></span>
                : rate === 10
                    ? <span
                        className='icon-star-full ms-1'
                        style={{
                            fontSize: `${ star?.fontSize }`
                        }}></span>
                    : <span
                        className='icon-star-half ms-1'
                        style={{
                            fontSize: `${ star?.fontSize }`
                        }}></span>

    if ( star?.justStar ) return newStar

    return <div
        style={{
        cursor: 'pointer' }}
        className='d-inline-flex align-items-center text-black'>{ rate }/10
            { newStar }
    </div>
}

export default Rating