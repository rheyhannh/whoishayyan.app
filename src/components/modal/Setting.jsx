import React, { useContext, useRef } from "react"
import { useTimeout } from 'ahooks'
import { ModalContext } from "@/components/provider/Modal"
import { RootPageContext } from "@/components/provider/RootPage";
import {
    UilTimes
} from '@iconscout/react-unicons'
import styles from './modal.module.css'

/**
 * Component Description
 * @returns {JSX.Element} Rendered component
 */
export default function ModalSetting() {
    const modalRef = useRef(
        /** @type {HTMLElement} */
        (null)
    );
    const { active, handleModalClose } = useContext(ModalContext);
    const { forceLoadingState, forceErrorState, setForceLoadingState, setForceErrorState } = useContext(RootPageContext);

    useTimeout(() => {
        if (modalRef.current) modalRef.current.focus();
    }, 250);

    return (
        <div className={`${styles.overlay} ${active ? styles.active : ''}`}>
            <div ref={modalRef} tabIndex={'0'} className={styles.setting} onKeyDown={(e) => { if (e.key === 'Escape') handleModalClose() }}>
                <h2 className={styles.heading}>
                    <span>Setting</span>
                    <span
                        tabIndex={'0'}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onClick={() => { handleModalClose() }}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleModalClose() }}
                    >
                        <UilTimes />
                    </span>
                </h2>
                <div className={styles.layout}>
                    <span className={styles.small}>Page State</span>

                    <div
                        tabIndex={'0'}
                        className={`${styles.panel} ${!forceErrorState && !forceLoadingState ? styles.active : ''}`}
                        onClick={() => { setForceLoadingState(false); setForceErrorState(false); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { setForceLoadingState(false); setForceErrorState(false); } }}
                    >
                        <span className={styles.title}>Default</span>
                        <span className={styles.small}>
                            Normal view
                        </span>
                    </div>

                    <div
                        tabIndex={'0'}
                        className={`${styles.panel} ${forceLoadingState ? styles.active : ''}`}
                        onClick={() => { setForceLoadingState(true); setForceErrorState(false); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { setForceLoadingState(true); setForceErrorState(false); } }}
                    >
                        <span className={styles.title}>Loading</span>
                        <span className={styles.small}>
                            Simulate the view during loading
                        </span>
                    </div>

                    <div
                        tabIndex={'0'}
                        className={`${styles.panel} ${forceErrorState ? styles.active : ''}`}
                        onClick={() => { setForceErrorState(true); setForceLoadingState(false); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { setForceErrorState(true); setForceLoadingState(false); } }}
                    >
                        <span className={styles.title}>Error</span>
                        <span className={styles.small}>
                            Simulate the view during error
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}