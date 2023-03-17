document.addEventListener('DOMContentLoaded', () => {
    const getVideos = async () => {
        const response = await fetch('https://tayz.vercel.app/api/videos.json');
        const data = await response.json();
        return data;
    }

    // Get id from URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id');
    // Get video from API
    const getVideo = async () => {
        const videos = await getVideos();
        return videos.find(video => video.video_id === videoId);
    }

    const cleanDescription = (description, limit) => {
        // Turn new lines into <br> tags
        let cleanDescription = description.replace(/(\r\n|\n|\r)/gm, "<br>");
        // Turn URLS into links
        cleanDescription = cleanDescription.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        // Turn @mentions into links
        cleanDescription = cleanDescription.replace(/(^|\s)@(\w+)/g, '$1<a href="https://twitter.com/$2" target="_blank">@$2</a>');
        // Turn #hashtags into links
        cleanDescription = cleanDescription.replace(/(^|\s)#(\w+)/g, '$1<a href="https://www.youtube.com/hashtag/$2" target="_blank">#$2</a>');
        // Get first 130 characters
        if (limit) cleanDescription = cleanDescription.substring(0, 130) + '...';

        return cleanDescription;
    }

    const template = `
        <div class="col-md-12">
            <div class="card mb-4">
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/{{VIDEO_ID}}" allowfullscreen></iframe>
                    </div>
                <div class="card-body">
                    <h5 class="card-title">{{TITLE}}</h5>
                    <p class="card-text">
                        {{DESCRIPTION}}
                    </p>
                </div>
            </div>
        </div>`;

    const renderVideo = async () => {
        const video = await getVideo();
        const { video_id, title, description } = video;
        const videoList = document.querySelector('#video');

        const html = template
            .replace('{{VIDEO_ID}}', video_id)
            .replace('{{TITLE}}', title)
            .replace('{{DESCRIPTION}}', cleanDescription(description, false));

        videoList.innerHTML = html;
    }

    const renderSideVideo = (video) => {
        const { video_id, title, description } = video;
        const videoList = document.querySelector('#sideVideos');

        const thumbnail_url = `https://img.youtube.com/vi/${video_id}/0.jpg`;
        const youtube_url = `https://tayz.vercel.app/video.html?id=${video_id}`;


        const template = `
            <div class="col-md-8">
                <div class="card mb-8">
                    <a href="{{VIDEO_URL}}">
                        <img class="card-img-top" src="{{THUMBNAIL_URL}}" alt="Video thumbnail">
                    </a>
                    <div class="card-body">
                        <strong>{{TITLE}}</strong>
                        <div class="clearfix">{{DESCRIPTION}}</div>
                    </div>
                </div>
            </div>`;

        const html = template
            .replace('{{VIDEO_URL}}', youtube_url)
            .replace('{{THUMBNAIL_URL}}', thumbnail_url)
            .replace('{{TITLE}}', title)
            .replace('{{DESCRIPTION}}', cleanDescription(description, true));

        videoList.innerHTML += html;

    }

    const renderSideVideos = async () => {
        const videos = await getVideos();
        const sideVideos = videos.filter(video => video.video_id !== videoId);
        sideVideos.forEach(video => renderSideVideo(video));
    }

    renderVideo();
    renderSideVideos();
})