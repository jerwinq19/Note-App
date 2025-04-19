import { useState } from "react"


const NoteCard = ({title, body, date, idx, saveNotes}) => {
    const [Edit, isEdit] = useState(false)
    const [Input, SetInput] = useState("");
    const [Tinput, SetTinput] = useState("")


    const AccessData = (key) => {
        const cached = localStorage.getItem(key)
        const parsedData = cached ? JSON.parse(cached) : []
        return parsedData;
    }

    const DeleteData = (idx) => {
        const data = AccessData("Notes")
        data.splice(idx, 1)
        localStorage.setItem("Notes", JSON.stringify(data));
        saveNotes(data)
    }

    const EditData = () => {
        isEdit(!Edit)
    }

    const SaveEdit = (idx) => {
        isEdit(false)

        const data = AccessData("Notes")
        
        data[idx] = {
            title: Input,
            body: Tinput,
            date: data[idx].date
        }

        if (data[idx].title === "" && data[idx].body === "") return;

        localStorage.setItem("Notes", JSON.stringify(data));
        saveNotes(data);
    }


    return(
        <div className="note-card">
            {!Edit ? (
                <>
                    <h1>{title}</h1>
                    <div>
                        <p>
                            {body ? body : ""}
                        </p>

                        <p className="date">{date}</p>
                    </div>

                    <span className="button-container">
                        <button className="button edit" onClick={EditData}>Edit</button>
                        <button onClick={() => DeleteData(idx)} className="button delete">Delete</button>
                    </span>
                </>
                
            ) : (
                <>
                    <input type="text" placeholder="Enter your title here..."
                    value={Input}
                    onChange={(e) => SetInput(e.target.value)}/>
                    <div className="text-date-cont">
                        <textarea placeholder="enter your discription here..."
                        value={Tinput}
                        onChange={(e) => SetTinput(e.target.value)}>

                        </textarea>

                        <input type="date" />
                    </div>

                    <span className="button-container">
                        <button className="button edit" onClick={() => SaveEdit(idx)}>Save Edit</button>
                    </span>
                </>
            )}
        </div>
    );
}

export default NoteCard;