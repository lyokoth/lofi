import React from "react";
import styles from "@styles/background.module.css";   


function Page() {
    return (
        <div className={styles.background}>
            <h1>Welcome to lo-fi.</h1>
            <p>A simple lo-fi music player!</p>
        </div>
    );
}
export default Page;