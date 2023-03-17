document.addEventListener('DOMContentLoaded', () => {
    const getVideos = async () => {
        const response = await fetch('https://tayz.vercel.app/api/videos.json');
        const data = await response.json();
        return data;
    }

    const cleanDescription = (description) => {
        // Turn new lines into <br> tags
        let cleanDescription = description.replace(/(\r\n|\n|\r)/gm, "<br>");
        // Turn URLS into links
        cleanDescription = cleanDescription.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        // Turn @mentions into links
        cleanDescription = cleanDescription.replace(/(^|\s)@(\w+)/g, '$1<a href="https://twitter.com/$2" target="_blank">@$2</a>');
        // Turn #hashtags into links
        cleanDescription = cleanDescription.replace(/(^|\s)#(\w+)/g, '$1<a href="https://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
        // Get first 130 characters
        cleanDescription = cleanDescription.substring(0, 130) + '...';

        return cleanDescription;
    }

    const renderVideo = (video) => {
        const { video_id, title, description } = video;
        const videoList = document.querySelector('#video-list');

        const thumbnail_url = `https://img.youtube.com/vi/${video_id}/0.jpg`;
        const video_url = `http://localhost:5500/video.html?id=${video_id}`;

        const template = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <a href="{{VIDEO_URL}}">
                        <img class="card-img-top" src="{{THUMBNAIL_URL}}" alt="Video thumbnail">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">{{TITLE}}</h5>
                        <p class="card-text">
                            {{DESCRIPTION}}
                        </p>
                    </div>
                </div>
            </div>`;

        const html = template
            .replace('{{VIDEO_URL}}', video_url)
            .replace('{{THUMBNAIL_URL}}', thumbnail_url)
            .replace('{{TITLE}}', title)
            .replace('{{DESCRIPTION}}', cleanDescription(description));

        videoList.innerHTML += html;
    }

    const renderVideos = async () => {
        const videos = await getVideos();
        videos.forEach(video => renderVideo(video));
    }

    renderVideos();
});