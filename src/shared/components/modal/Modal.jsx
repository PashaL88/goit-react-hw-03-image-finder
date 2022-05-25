import { createPortal } from 'react-dom'
import styles from './modal.module.css'
import { Component } from 'react'
const modalRoot = document.getElementById('modal-root')

class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.closeModal)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModal)
    }

    closeModal = (e) => {
        if (e.code === 'Escape') {
                this.props.close()
            }
    }

    render() {
        const {close, children} = this.props
        return createPortal(
            
            <div className={styles.overlay} onClick={close}>
                <div className={styles.modal}>
                    {children}
                </div>
            </div>, modalRoot
        )
    }
}

export default Modal