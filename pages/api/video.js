export default async function handler(req, res) {
    const { auth_key } = req.headers;

    if (auth_key !== process.env.AUTH_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    };

    if (req.method === 'GET') {
        const videos_url = process.env.VIDEOS_URL;
        const videos = await fetch(videos_url).then(res => res.json());
        const video_id = req.query.id;
        const video = videos.filter(video => video.video_id === video_id);
        res.status(200).json({ stats: 200, data: video })
    } else if (req.method === 'POST') {
        // Implement something here
    } else {
        res.status(401).json({ status: 401, error: 'Method not allowed' });
    }
}