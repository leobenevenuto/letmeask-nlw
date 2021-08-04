import copyImg from '../assets/images/copy.svg'
import '../styles/room-code.scss'
import {useParams} from 'react-router-dom'

type RoomCodeProps = {
    code: string;
}


export function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToCliboard(){
        navigator.clipboard.writeText(props.code)
    }




    return (
        <button className="room-code" onClick={copyRoomCodeToCliboard}>
            <div>
                <img src={copyImg} alt="Copy room code"></img>
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}


