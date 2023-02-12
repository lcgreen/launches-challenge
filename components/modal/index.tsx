import React, { useRef } from 'react'
import styles from './modal.module.scss'
import { CSSTransition } from 'react-transition-group'

type ModalProps = {
  show?: boolean
  hideModal: () => void
}

const Modal = (props: React.PropsWithChildren<ModalProps>) => {
  const handleHideModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      props.hideModal()
    }
  }
  const nodeRef = useRef(null)
  return (
    <>
      <div
        className={styles.overlay}
        style={{ display: props.show ? 'flex' : 'none' }}
        onClick={handleHideModal}
      />
      <CSSTransition
        in={props.show}
        timeout={500}
        classNames={'modal'}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className={styles.content}>
          <div>{props.children}</div>
        </div>
      </CSSTransition>
    </>
  )
}

export default Modal
