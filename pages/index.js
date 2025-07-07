import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>RoaS Org - Aditask & Professional Management Training</title>
        <meta name="description" content="Professional app development, design, and management training by RoaS Org." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <Image src="/logo.png" alt="Aditask Logo" width={64} height={64} />
        <h1>RoaS Org</h1>
        <p>Professional Management Training & App Creation</p>
      </header>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#aditask">Aditask</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
      <main className="main">
        <section id="home">
          <h2>Welcome to RoaS Org</h2>
          <p>
            We build innovative apps, deliver professional management training, and create digital solutions that inspire.
          </p>
        </section>
        <section id="about">
          <h2>About Us</h2>
          <p>
            RoaS Org is a team of developers, designers, and trainers. Our mission is to empower organizations and individuals with digital and management skills.
          </p>
        </section>
        <section id="aditask">
          <h2>Aditask Project</h2>
          <p>
            <strong>Aditask</strong> is our flagship productivity and accountability app, designed to help you achieve your goals with smart tracking and community support.
          </p>
        </section>
        <section id="services">
          <h2>Our Services</h2>
          <ul>
            <li><strong>App Development:</strong> Mobile and web apps tailored to your needs.</li>
            <li><strong>Management Training:</strong> Professional courses for teams and leaders.</li>
            <li><strong>Design & Branding:</strong> UI/UX, branding, and visual storytelling.</li>
          </ul>
        </section>
        <section id="contact">
          <h2>Contact Us</h2>
          <p>
            <strong>Email:</strong> <a href="mailto:info@roasorg.com">info@roasorg.com</a><br/>
            <strong>Phone:</strong> <a href="tel:+358408713073">+358 40 871 3073</a>
          </p>
        </section>
      </main>
      <footer className="footer">
        &copy; 2024 RoaS Org. All rights reserved.
      </footer>
    </>
  );
}
