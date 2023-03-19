import '../styles/globals.css'
import 'rc-footer/assets/index.css'
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
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />

      </Head>
      <Nav />
      <Component {...pageProps} />
      <Foot />
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </>
  )
}