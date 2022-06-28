import Head from 'next/head';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import Landing from '../components/landing';

export default function Home() {
  return (
    <>
      <Head>
        <title>Hale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <NavBar/>
        <Landing/>
        <Footer/>
      </div>
    </>
  )
}
