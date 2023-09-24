const Modal  = ({ isOpen, setCloseModal, children }) => {
    if(isOpen) {
        return (    
            <div className="overlay">
                <div className="modal" >
                    <div onClick={setCloseModal} className="close-modal">X</div>
                    
                    {children}

                    
                </div>

                
            </div>
        );
    }

    return null;
}

export default Modal;