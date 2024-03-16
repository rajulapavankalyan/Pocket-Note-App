import { useState, useEffect} from "react";
import NotesBgImage from "../assets/image-removebg-preview.png"
import arrow from "../assets/back_arrow.svg"
import send from "../assets/send_btn.svg"
import encrypt from "../assets/lock_vector.png"
import cssStyles from "./NoteDisplayArea.module.css"
// eslint-disable-next-line react/prop-types
function NoteDisplayArea({isSelectedData}) {
    
    const [isActive, setisActive] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const [toDoList, settoDoList] = useState([]);

    useEffect(() => {
        setisActive(isSelectedData !== null);
        if (isSelectedData) {
            const storedTasks = JSON.parse(localStorage.getItem(isSelectedData.groupName)) || [];
            settoDoList(storedTasks);
          }
    }, [isSelectedData]);
    
    
    const handleNewTextMessage = (e) => {
        setTextMessage(e.target.value);
    };
    
      
    const handleSendButton = () => {
        if (textMessage) {
            const date = new Date();
            const currentDate= `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
            const hours = date.getHours();
            const min = date.getMinutes();
            const amPm = hours > 11 ? "PM" : "AM";
            const formattedHours = (hours % 12) || 12;
            const currentTime= `${formattedHours}:${min.toString().padStart(2, "0")} ${amPm}`;
          
          const newNote = {
            text: textMessage,
            date: currentDate,
            time: currentTime,
          };
    
          settoDoList([...toDoList, newNote]);
          localStorage.setItem(isSelectedData.groupName, JSON.stringify([...toDoList, newNote]));
          setTextMessage('');
        }
    };
    
    return ( 
        <>
        {isActive ? (
            <div className={cssStyles.mainContainer}>
                <div className={cssStyles.header}>
                    <img onClick={()=>setisActive(!true)}className={cssStyles.arrow} src={arrow} alt="go back arrow"/>
                    <div className={cssStyles.noteLogoDiv} style={{backgroundColor: isSelectedData.color}}>
                        {isSelectedData.initials}
                    </div>
                    <div className={cssStyles.noteTitle}>
                        {isSelectedData.groupName}
                    </div>
                </div>
                <div className={cssStyles.contentDiv}>
                    {toDoList.map((mssge, index) => (
                        <div className={cssStyles.displayArea} key={index}>
                            <p className={cssStyles.mssge}>{mssge.text}</p>
                            <div className={cssStyles.date}>
                                <p>{mssge.date}</p>&nbsp;
                                <p>.</p>&nbsp;
                                <p>{mssge.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={cssStyles.footerBox}>
                    <div className={cssStyles.textDiv}>
                        <textarea
                            className={cssStyles.TextArea}
                            placeholder="Enter your text here........"
                            rows="4"
                            value={textMessage}
                            onChange={handleNewTextMessage}
                        ></textarea>
                        <div className={cssStyles.sendbtn} onClick={handleSendButton}>
                            <img style={{height: "100%"}} src={send} />
                        </div>
                    </div>
                </div>
            </div>
            )
        : (<div className={cssStyles.rightContainer}>
            <div className={cssStyles.entryPage}>
                <img src={NotesBgImage} alt="notes app image" width={400}/>
                <h1 className={cssStyles.NotesHeading}>Pocket Notes</h1>
                <p className={cssStyles.para}>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div> 
            <div className={cssStyles.encryption}>
                <img src={encrypt} alt="encryption symbol" width={10}/><span className={cssStyles.textencrypted}>end-to-end encrypted</span>
            </div>
        </div>) 
        }
    </>
    );
}

export default NoteDisplayArea;