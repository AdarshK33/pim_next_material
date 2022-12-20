import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Login from"./login";


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet"/>
        <title>Apollo_PIM</title>       
      </Head>
      <Login />
    </div>
  )
}
