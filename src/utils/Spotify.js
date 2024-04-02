const baseURL = 'https://api.spotify.com';
const clientId = '5272680779b94e77b614d8e1f4b45151';
async function search(term) {
    try {
        const response = await fetch(
            `${baseURL}/v1/search?type=["album", "artist", "playlist", "track", "show", "episode", "audiobook"
]&q=${term}`
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }
}