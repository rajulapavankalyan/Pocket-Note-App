import { useState, useEffect} from "react";
import NotesBgImage from "../assets/image-removebg-preview.png"
import arrow from "../assets/back_arrow.svg"
import send from "../assets/send_btn.svg"
import encrypt from "../assets/lock_vector.png"
import cssStyles from "./NoteDisplayArea.module.css"
// eslint-disable-next-line react/prop-types
function NoteDisplayArea({isSelectedData}) {
    
    const [isActive, setisActive] = useState(false);

    useEffect(() => {
        setisActive(isSelectedData !== null);
    }, [isSelectedData]);
    

    return ( 
        <>
        {isActive ? (
            <div className={cssStyles.mainContainer}>
                <div className={cssStyles.header}>
                    <img className={cssStyles.arrow} src={arrow} alt="go back arrow"/>
                    <div className={cssStyles.noteLogoDiv} style={{backgroundColor: isSelectedData.color}}>
                        {isSelectedData.initials}
                    </div>
                    <div className={cssStyles.noteTitle}>
                        {isSelectedData.groupName}
                    </div>
                </div>
                <div className={cssStyles.contentDiv}>

                </div>

                <div className={cssStyles.footerBox}>
                    <div>
                        <textarea
                            className={cssStyles.TextArea}
                            placeholder="Enter your text here........"
                            rows="4"
                        ></textarea>
                        <div className={cssStyles.sendbtn}>
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