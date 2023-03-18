import '../styles/globals.css'
import 'rc-footer/assets/index.css'
import 'reactjs-navbar/dist/index.css'
import Head from 'next/head.js'
import Foot from '../components/Footer.js'
import Nav from '../components/Navbar.js'
import { useEffect, useState } from 'react'

const setCurrentTitle = (routeName) => {
  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'About':
      return 'About';
    case 'Contact':
      return 'Contact';
    case 'Login':
      return 'Login';

    default:
      return 'Tayz';
  }
}


export default function MyApp({ Component, pageProps }) {
  const [title, setTitle] = useState('Tayz');

  useEffect(() => {
    setTitle(setCurrentTitle(`Tayz - ${Component.name}`));
  }, [Component.name]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="https://i.imgur.com/xmjg60H.png" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Foot />
    </>
  )
}