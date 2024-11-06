import React, { useState } from 'react';

function HivePostSubmission() {
    const [username, setUsername] = useState('');
    const [postingKey, setPostingKey] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');
    const [postLink, setPostLink] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitPost = async () => {
        // Reset error and start loading
        setError(null);
        setLoading(true);

        // Validate if tags are empty
        if (!tags.trim()) {
            setError('Please enter at least one tag.');
            setLoading(false);
            return;
        }

        const postData = { username, postingKey, title, body, tags };

        try {
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
        <div style={styles.container}>
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
                    type="text"
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
    );
}

const styles = {
    container: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
        textAlign: 'center',
    },
    heading: {
        fontSize: '1.5em',
        color: '#333',
        marginBottom: '1rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1rem',
    },
    label: {
        fontSize: '0.9em',
        color: '#666',
        marginBottom: '0.3rem',
    },
    input: {
        padding: '0.8rem',
        fontSize: '1em',
        border: '1px solid #ddd',
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
        opacity: '1',
    },
    error: {
        color: 'red',
        marginTop: '1rem',
    },
    postLink: {
        marginTop: '1rem',
        fontSize: '0.9em',
        color: '#333',
    },
};

export default HivePostSubmission;
