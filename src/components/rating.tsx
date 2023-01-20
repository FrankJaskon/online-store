interface Props {
    rate: number | undefined
    justStar?: boolean
}

const Rating = ({ rate, justStar }: Props) => {
    const newStar = rate === 0
                ? <span className='icon-star-empty ms-1' />
                : rate === 10
                    ? <span className='icon-star-full ms-1' />
                    : <span className='icon-star-half ms-1' />

    if ( justStar ) return newStar

    return <div
        style={{
        cursor: 'pointer' }}
        className='d-inline-flex align-items-center text-black'>{ rate }/10
            { newStar }
    </div>
}

export default Rating