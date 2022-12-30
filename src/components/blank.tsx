import { ReactComponent as EmptyBoxImg } from '../assets/empty-box.svg'

const Blank = () => {
    return <div style={{
        width: 650,
        margin: '0 auto',
        paddingTop: '2rem',
     }}>
    <div style={{
        fontSize: 35,
        color: '#777',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    }}>No items founded <span style={{ fontSize: 50, fontWeight: 700 }}>:\</span></div>
        <EmptyBoxImg style={{ marginTop: '-5rem' }}/>
    </div>
}

export default Blank