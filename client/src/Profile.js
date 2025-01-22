import React, { useState } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
    const [name, setName] = useState('K G F Coal Mine');
    const [username, setUsername] = useState('Tarun');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('Vizag');
    const [website, setWebsite] = useState('');
    const [bio, setBio] = useState('');

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.profilePic}></div>
                <h2 className={styles.fullName}>Tarun Kumar</h2>
                <ul className={styles.menu}>
                    <li>Profile</li>
                    <li>Password</li>
                    <li>About Us</li>
                    <li>FAQ's</li>
                    <li>Edit Profile</li>
                    <li><a href='/login'>Sign Out</a></li>
                </ul>
            </aside>
            <main className={styles.mainContent}>
                <h1 className={styles.title}>Profile</h1>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mine Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Username</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="example@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Location</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Website</label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="example.com"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Bio</label>
                        <textarea
                            className={styles.textarea}
                            maxLength="200"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Profile;
