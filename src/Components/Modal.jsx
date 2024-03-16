import { useRef, useState } from "react";
import Styled from "./Modal.module.css"

// eslint-disable-next-line react/prop-types
function Modal( {isOpen,onClose,onCreate}) {
    const [groupName,setGroupName] = useState('');
    const [color,setColor] = useState(null);
   
    const modalRef = useRef();

    if (!isOpen) return null;

    const closeModal = (e)=>{
        if(modalRef.current==e.target){
            onClose();
        }
    };
    
    const handleSelectedColor = (color) => {
        setColor(color);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
        if (groupName && color) {
            const formValues = {groupName,color};
            onCreate(formValues);
        }
    };

	return (
		<div ref = {modalRef} onClick={closeModal} className={Styled.modalContainer}>
			<div className={Styled.contentdiv}>
				<h1 className={Styled.grpheading}>Create New Group</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="groupname">
                        Group Name
                    </label>
                    <input 
                        className={Styled.grpname}  
                        id="groupname" 
                        type="text" 
                        placeholder="Enter group name" 
                        value={groupName}
                        onChange={(event) => setGroupName(event.target.value)}
                        autoComplete="off"
                        required
                    />
                    
                    <label>
                        Choose colour
                    </label>
                    <div className={Styled.colorSection}>
                        <div
                            className={`${Styled.colordivs} ${Styled.violet}`}
                                onClick={() => handleSelectedColor('#b38bfa')}
                        />
                        <div
                            className={`${Styled.colordivs} ${Styled.pink}`}
                                onClick={() => handleSelectedColor('#fe78f2')}
                        />
                        <div
                            className={`${Styled.colordivs} ${Styled.skyblue}`}
                                onClick={() => handleSelectedColor('#43e7fd')}
                        />
                        <div
                           className={`${Styled.colordivs} ${Styled.brown}`}
                                onClick={() => handleSelectedColor('#f09577')}
                        />
                        <div
                            className={`${Styled.colordivs} ${Styled.darkblue}`}
                                onClick={() => handleSelectedColor('#0046fe')}
                        />
                        <div
                            className={`${Styled.colordivs} ${Styled.mildblue}`}
                                onClick={() => handleSelectedColor('#6691ff')}
                        />
                    </div>
                    <div className={Styled.createDiv}>
                        <button type="submit" className={Styled.createbtn}>Create</button>
                    </div>
                </form>
			</div>
		</div>
    );
}

export default Modal;

