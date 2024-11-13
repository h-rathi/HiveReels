import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HivePostSubmission() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [postingKey, setPostingKey] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    const [postLink, setPostLink] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitPost = async () => {
        setError(null);
        setLoading(true);

        if (!tags.trim()) {
            setError('Please enter at least one tag.');
            setLoading(false);
            return;
        }

        const postData = { username, postingKey, title, body, tags };

        try {
            
            // http://localhost:3000/submitPost
            const response = await fetch('http://localhost:3000/submitPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            const result = await response.json();
            if (result.success) {
                setPostLink({
                    blockNum: result.result.block_num,
                    link: result.link
                });
            } else {
                setError(`Failed to broadcast post: ${result.error}`);
            }
        } catch (error) {
            setError('Error submitting post. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <button onClick={() => navigate('/')} style={styles.homeButton}>
                    Home
                </button>

                <h1 style={styles.heading}>Hive Post Submission</h1>
                
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="postingKey">Private Posting Key</label>
                    <input
                        id="postingKey"
                        type="password"
                        placeholder="Private Posting Key"
                        value={postingKey}
                        onChange={(e) => setPostingKey(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="body">Body</label>
                    <textarea
                        id="body"
                        placeholder="Body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        style={{ ...styles.input, minHeight: '100px', resize: 'vertical' }}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="tags">Tags (separated by spaces)</label>
                    <input
                        id="tags"
                        type="text"
                        placeholder="Tags (separated by spaces)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <button onClick={submitPost} style={styles.button} disabled={loading}>
                    {loading ? 'Posting...' : 'Submit Post'}
                </button>

                {error && <p style={styles.error}>{error}</p>}

                {postLink && (
                    <div style={styles.postLink}>
                        <p>Included in block: {postLink.blockNum}</p>
                        <a href={postLink.link} target="_blank" rel="noopener noreferrer">Check post here</a>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    page: {
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        maxWidth: '600px', // Increased the max width for better appearance
        backgroundColor: '#111',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #333',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        position: 'relative', // To position the home button within the container
    },
    homeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '0.5rem',
        fontSize: '0.9rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        
    },
    heading: {
        fontSize: '1.5em',
        color: '#fff',
        marginBottom: '1rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1rem',
    },
    label: {
        fontSize: '0.9em',
        color: '#bbb',
        marginBottom: '0.3rem',
    },
    input: {
        padding: '0.8rem',
        fontSize: '1em',
        color: '#fff',
        backgroundColor: '#222',
        border: '1px solid #555',
        borderRadius: '5px',
    },
    button: {
        width: '100%',
        padding: '0.8rem',
        fontSize: '1em',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    error: {
        color: 'red',
        marginTop: '1rem',
    },
    postLink: {
        marginTop: '1rem',
        fontSize: '0.9em',
        color: '#fff',
    },
};

export default HivePostSubmission;
