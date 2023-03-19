import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

export default function Home({ videos }) {
  const renderVideo = (video) => {
    // Render video method with bootstrap classes
    return (
      <div className="col-md-4" key={video.video_id}>
        <div className="card mb-4 shadow-sm">
          <Image
            src={`https://img.youtube.com/vi/${video.video_id}/0.jpg`}
            alt={video.title}
            width={350}
            height={250}
          />
          <div className="card-body">
            <p className="card-text">{video.title}</p>
            <div className="d-flex justify-content-between align-items-center">

              <div className="btn-group">
                <Link href={`/video/${video.video_id}`} className="btn btn-sm btn-outline-primary">
                  View
                </Link>
              </div>
              <small className="text-muted">{video.published_at}</small>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Tayz - Home</title>
        <meta name="description" content="Tayz - Home" />
      </Head>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {videos.map((video) => renderVideo(video))}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const AUTH_KEY = process.env.AUTH_KEY;
  console.log("AUTH KEY: " + AUTH_KEY);

  const videos = await fetch('https://fornowbackend.vercel.app/api/videos', {
    method: 'GET',
    headers: {
      'auth_key': AUTH_KEY,
      'content-type': 'application/json'
    }
  }).then(res => res.json())
    .then(data => data.data);

  console.log(videos);

  return {
    props: {
      videos
    }, // will be passed to the page component as props
  }
}