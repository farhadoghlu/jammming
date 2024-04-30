const BASE_URL = process.env.REACT_APP_BASE_URL;
const CLIENT_ID = process.env.REACT_APP_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
const LOCAL_STORAGE_KEY = 'accessToken';

const storeAccessToken = (accessToken, ttl) => {
    const now = new Date();

    const item = {
        value: accessToken,
        expiry: now.getTime() + ttl * 1000
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(item))
}

const getStoredAccessToken = () => {
    const itemStr = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!itemStr)
        return false;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return false
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return false;
    }
    return item.value;
}

const getAccessToken = () => {
    if (getStoredAccessToken()) {
        return getStoredAccessToken()
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
        const expiresIn = Number(expiresInMatch[1]);
        storeAccessToken(accessTokenMatch[1], expiresIn);
        window.history.pushState("Access Token", null, "/");
        return getStoredAccessToken();
    } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        window.location = accessUrl;
        return false;
    }
}

async function search(term) {
    try {
        const accessToken = getAccessToken();

        if (accessToken) {
            const response = await fetch(
                `${BASE_URL}/v1/search?type=track&q=${term}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                return [];
            }

            return jsonResponse.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }));
        }

    } catch (e) {
        console.error('Error fetching data:', e);
        return []; // Return an empty array in case of an error
    }
}

const savePlaylist = async (playlistName, trackUris) => {
    if (playlistName && trackUris) {
        let response, jsonResponse;
        const accessToken = getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        //Get userID
        let userId;
        response = await fetch(`${BASE_URL}/v1/me`, {
            headers: headers,
        });
        jsonResponse = await response.json();
        userId = jsonResponse.id;

        //Create Playlist and get its Id
        response = await fetch(
            `${BASE_URL}/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ name: playlistName }),
            }
        );
        jsonResponse = await response.json();
        const playlistId = jsonResponse.id;

        //Save tracks to the newly created playlist
        response = await fetch(
            `${BASE_URL}/v1/users/${userId}/playlists/${playlistId}/tracks`,
            {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
            }
        );
        return await response.json();
    }
    return;
}

module.exports = { search, savePlaylist };