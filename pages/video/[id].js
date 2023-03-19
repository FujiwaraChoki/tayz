import styles from '../../styles/video.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Video() {
    const router = useRouter();
    const { id } = router.query;
    const [video, setVideo] = useState({});
    const [comments, setComments] = useState([]);
    const [sideVideos, setSideVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getVideo = async () => {
        const response = await fetch(`https://fornowbackend.vercel.app/api/video?id=${id}`, {
            method: 'GET',
            headers: {
                'auth_key': "SECRET_AUTH_KEY",
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log(data);
        setVideo(data.data);
        setComments(data.data.comments);
    }

    const getVideos = async () => {
        const response = await fetch('https://fornowbackend.vercel.app/videos.json');
        const data = await response.json();
        return data;
    }

    const renderSideVideo = (video) => {
        const { video_id, title } = video;

        const thumbnail_url = `https://img.youtube.com/vi/${video_id}/0.jpg`;
        const youtube_url = `https://tayz.vercel.app/video.html?id=${video_id}`;


        return (
            <div className="col-md-8" key={youtube_url}>
                <div className="card mb-8">
                    <a href={youtube_url} target="_blank">
                        <Image className="card-img-top" src={thumbnail_url} alt="Video thumbnail" width={400} height={300} />
                    </a>
                    <div className="card-body">
                        <strong>{title}</strong>
                    </div>
                </div>
                <br />
            </div>
        );
    }

    const renderSideVideos = async () => {
        const videos = await getVideos();
        const sideVideos = videos.filter(video => video.video_id !== id);
        setSideVideos(sideVideos);
    }

    const renderComment = (comment) => {
        const { authorDisplayName, authorProfileImageUrl, textDisplay, authorChannelUrl } = comment;

        if (comment) {
            return (
                <div className="media mb-4" key={authorChannelUrl}>
                    <a href={authorChannelUrl}>
                        <Image className="d-flex rounded-circle profilePic" src={authorProfileImageUrl} alt={authorDisplayName} width={50} height={50} />
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="media-body">
                        <h5 className="mt-0">{authorDisplayName}</h5>
                        {textDisplay}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="media mb-4">
                    <div className="media-body">
                        <h5 className="mt-0">Loading...</h5>
                    </div>
                </div>
            );
        }
    };

    const cleanDescription = (description, limit) => {
        if (!description) return ('');
        // Turn to string
        description = description.toString();
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

        return <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />;
    }

    useEffect(() => {
        if (id) {
            getVideo();
            renderSideVideos();
            setIsLoading(false);
        }
    }, [])

    return (
        <div className={styles.videoContainer}>
            <div className="row">
                <div className="col-lg-8">
                    <div id="video">
                        {isLoading ? (
                            <div className={styles.loadingContainer}>
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            <div className="col-md-12">
                                <div className="card mb-4">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    </div>
                                </div>
                            </div>
                        )
                        }
                        <div className="card-body">
                            <h1 className="card-title">{video.title}</h1>
                        </div>
                    </div>
                    <>
                        <div id="description">
                            <h3 className="mb-4">Description</h3>
                            <p>{cleanDescription(video.description, false)}</p>
                        </div>
                        <hr />
                        <div id="comments">
                            <h3 className="mb-4">Comments</h3>
                            {
                                isLoading || !id ? (
                                    <div className={styles.loadingContainer}>
                                        <div className="spinner-border text-primary" role="status"></div>
                                    </div>
                                ) : (
                                    comments.map(comment => renderComment(comment))
                                )
                            }
                            {comments.length === 0 && !isLoading && (
                                <div className="alert alert-info" role="alert">
                                    No comments yet!
                                </div>
                            )}
                        </div>
                    </>
                </div>
                <div className="col-lg-4">
                    <h3 className="mb-4">Related Videos</h3>
                    <div className="row" id="sideVideos">
                        {sideVideos.map(video => renderSideVideo(video))}
                    </div>
                </div>
            </div>
        </div >
    )
}