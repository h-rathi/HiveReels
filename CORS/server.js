const express = require('express');
const cors = require('cors'); // Import CORS middleware
const { Client, PrivateKey } = require('@hiveio/dhive');
const app = express();
const port = 3000;

// Setup the Hive client
const client = new Client('https://api.hive.blog');

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

app.post('/submitPost', async (req, res) => {
    try {
        const { username, postingKey, title, body, tags } = req.body;
        const privateKey = PrivateKey.fromString(postingKey);
        const taglist = tags.split(' ');

        const json_metadata = JSON.stringify({ tags: taglist });
        const permlink = Math.random().toString(36).substring(2);

        const payload = {
            author: username,
            body: body,
            json_metadata: json_metadata,
            parent_author: '',
            parent_permlink: taglist[0],
            permlink: permlink,
            title: title,
        };

        const result = await client.broadcast.comment(payload, privateKey);
        res.json({ success: true, result, link: `https://hive.blog/${taglist[0]}/@${username}/${permlink}` });
    } catch (error) {
        console.error('Error broadcasting comment:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
