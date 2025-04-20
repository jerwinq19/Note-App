import NoteCard from "./NotesCard";
import { useState, useEffect } from "react";
import '../App.css'

const NoteBody = () => {
    const [Input, SetInput] = useState("");
    const [Tinput, SetTinput] = useState("")

    const [Notes, saveNotes] = useState([])
    const [Modal, setModal] = useState(false)


    const ShowModal = () => {
        setModal(!Modal)
    }

    const AddNotes = () => {
        if (!Input && !Tinput) return;

        const noteData = {
            title: Input,
            body: Tinput,
            date: new Date().toLocaleDateString(),
        }

            const cachedData = localStorage.getItem("Notes")
            const  parsedData = cachedData ? JSON.parse(cachedData) : []
            parsedData.push(noteData)
            localStorage.setItem("Notes", JSON.stringify(parsedData))

        
        saveNotes([...Notes, noteData])
        setModal(false)
        SetInput("")
        SetTinput("")
    }

    useEffect(() => {
        const cachedData = localStorage.getItem("Notes")
        const parsedData = cachedData ? JSON.parse(cachedData) : []
        saveNotes(parsedData)
    }, [])

    return(
        <div className="container">
            <h1 className="title">Note App ni Jico</h1>
            
            <button
            onClick={() => ShowModal()}
            className="add-Button">
                +
            </button>


            {Modal ? (
                <div className="modal">
                    <h1>Add Notes:</h1>

                    <input type="text" 
                    placeholder="Add your title here..."
                    value={Input}
                    onChange={(e) => SetInput(e.target.value) }/>

                    <textarea placeholder="add your discription here..."
                    value={Tinput}
                    onChange={(e) => SetTinput(e.target.value)}>

                    </textarea>

                    <button onClick={Tinput && Input ? AddNotes : () => setModal(false)}>{Tinput && Input ? "Add" : "Close"}</button>
                </div>
            ): (
                null
            )}
            
            {Notes.length === 0 ? (
                <div className="note-card-container">
                    <h1>Your Notes here</h1>
                    <div className="note-card">
                        <h2>No available notes... Please add one.</h2>
                    </div>

                </div>
            ) : (
                <div className="note-card-container">
                    <h1>Your Notes Here</h1>
                        {Notes.map((item, idx) => (
                        <NoteCard key={idx} title={item.title} body={item.body} date={item.date} idx={idx} saveNotes={saveNotes}/>
                    ))}
                </div>
            )}
            

        </div>
    );
};


export default NoteBody;