import logoImg from "../assets/images/logo.svg"
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { Question } from '../components/Question';
import { useHistory, useParams } from 'react-router-dom'
import { database } from '../services/firebase';



import '../styles/room.scss'
import { useAuth } from "../hooks/useAuth"
import { useRoom } from "../hooks/useRoom";
import deleteImg from "../assets/images/delete.svg"
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import React from "react";


//components
type RoomParams = {
    id: string;
}


export function AdminRoom() {
    const history = useHistory();
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId)


    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/')
    }


    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('tem certeza que deseja excluir este dado?')) {
            const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }


    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }


    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        })
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                        <RoomCode code={params.id} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>


            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    <span>{questions.length > 0 && <span>{questions.length} perguntas</span>}</span>
                </div>


                <div className="question-list">
                    {questions.map(question => {
                        return <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighLighted={question.isHighLighted}>

                            {!question.isAnswered && (
                                <React.Fragment>
                                    <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                        <img src={answerImg} alt="Marcar pergunta como respondida" />
                                    </button>

                                    <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                                        <img src={checkImg} alt="Dar destaque à pergunta" />
                                    </button>
                                </React.Fragment>
                            )}

                            <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                <img src={deleteImg} alt="remover pergunta" />
                            </button>

                        </Question>
                    })}
                </div>

            </main>
        </div>
    )
}