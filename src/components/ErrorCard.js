import React, { useState } from 'react';
import styles from '@/styles/ErrorCard.module.css';

export default function ErrorCard() {
    return (
        <div className={styles.container}>
            <div className={styles.main_container}>NO DATA FOR THIS DATE</div>
        </div>
    );
}
