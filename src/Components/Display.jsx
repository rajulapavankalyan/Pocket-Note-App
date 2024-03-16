import { useState, useEffect } from "react"
import styles from "./Display.module.css"
import Modal from "./Modal"

// eslint-disable-next-line react/prop-types
function Display({setisSelectedData}) {
    const [notes,setNotes] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedFormData,setSelectedFormData] = useState(null);
    const localStorageKeyName = 'formValues';
    // Get notes data from Local Storage if it exists otherwise
    // initialize with an empty array
    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem(localStorageKeyName));
        if(localStorageData){
            setNotes(localStorageData);
        }
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCreate = (note) => {
        const initials = note.groupName.split(' ').map((word) => word.charAt(0).toUpperCase()).join('').slice(0,2); // getting the initials of the word
        const updatedFormData = [...notes,{...note, initials}];
        setNotes(updatedFormData);
        localStorage.setItem(localStorageKeyName, JSON.stringify(updatedFormData));
        setOpen(false);
    };

    const handleSelectedDiv = (object) => {
        setisSelectedData(object);
        setSelectedFormData(object);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <h1 className={styles.heading}>Pocket Notes</h1>
                    <div className={styles.noteContainer}>
                        {notes.map((note,index)=>(
                            <div 
                                key={index}
                                className={`${styles.parentDiv} ${selectedFormData === note ? styles.selected : ''}`} 
                                onClick={()=>{handleSelectedDiv(note)}}> 
                                <div className={styles.initialsDiv} style={{backgroundColor: note.color}}>
                                    {note.initials}
                                </div>
                                <div className={styles.title}>
                                    <p>{note.groupName}</p>
                                </div>
                          </div> 
                        ))}
                    </div>
                    <button className={styles.plusbtn} onClick={handleOpen}>+</button>
                </div>
                {open && (<Modal isOpen={open} onClose={()=>setOpen(false)} onCreate={handleCreate}/>)}
            </div>
            
        </>
    );
}

export default Display;