import Head from 'next/head';

const sections = [
  { id: 'home-details', label: 'Home', icon: '🏠', desc: '', colorClass: '' },
  { id: 'about-details', label: 'About', icon: 'ℹ️', desc: '', colorClass: '' },
  { id: 'services-details', label: 'Services', icon: '🛠️', desc: '', colorClass: '' },
  { id: 'portfolio-details', label: 'Portfolio', icon: '📁', desc: '', colorClass: '' },
  { id: 'contact-details', label: 'Contact', icon: '✉️', desc: '', colorClass: '' },
];

const cardSections = [
  { id: 'developer', label: 'Developer', icon: '📱', desc: 'Mobile App', colorClass: 'dev' },
  { id: 'design', label: 'Design', icon: '⭐', desc: '3D Printing', colorClass: 'design' },
  { id: 'content', label: 'Content Creation', icon: '📄', desc: '', colorClass: 'content' },
  { id: 'mgmt', label: 'Management', icon: '🛠️', desc: 'E2T', colorClass: 'mgmt' },
];

export default function Home() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <Head>
        <title>RoaSorg</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/roasorg-website/favicon.ico" type="image/x-icon" />
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background: radial-gradient(circle at 60% 20%, #3a206e 0%, #1a093b 100%);
            color: #fff;
          }
          .navbar {
            width: 100%;
            background: rgba(30, 20, 60, 0.95);
            display: flex;
            justify-content: center;
            gap: 2rem;
            padding: 1rem 0 0.5rem 0;
            position: sticky;
            top: 0;
            z-index: 10;
          }
          .navbar a {
            color: #a48cff;
            font-weight: 600;
            text-decoration: none;
            font-size: 1.1rem;
            transition: color 0.2s;
          }
          .navbar a:hover {
            color: #fff;
          }
          .site-title {
            text-align: center;
            font-size: 2.7rem;
            font-weight: 900;
            letter-spacing: 1px;
            color: #a48cff;
            margin-top: 2.5rem;
            margin-bottom: 0.5rem;
            text-shadow: 0 4px 16px rgba(0,0,0,0.18);
          }
          .subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: #e0e0e0;
            margin-bottom: 2.5rem;
          }
          .card-row {
            display: flex;
            justify-content: center;
            align-items: stretch;
            margin: 0 auto 2.5rem auto;
            gap: 18px;
            max-width: 1200px;
            flex-wrap: nowrap;
            overflow-x: auto;
          }
          .card {
            flex: 0 0 260px;
            background: #fff;
            color: #2c3e50;
            border-radius: 22px;
            padding: 28px 12px 18px 12px;
            margin: 0 4px;
            box-shadow: 0 2px 16px rgba(80,40,180,0.13);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 220px;
            max-width: 260px;
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
          }
          .card:hover {
            transform: translateY(-6px) scale(1.04);
            box-shadow: 0 8px 32px rgba(80,40,180,0.18);
          }
          .card-icon {
            font-size: 2.7rem;
            margin-bottom: 10px;
          }
          .dev { background: linear-gradient(135deg, #2D8CF0 60%, #8A2BE2 100%); color: #fff; }
          .design { background: linear-gradient(135deg, #8A2BE2 60%, #FF5EAA 100%); color: #fff; }
          .content { background: linear-gradient(135deg, #43a047 60%, #FFB347 100%); color: #fff; }
          .mgmt { background: linear-gradient(135deg, #FF5EAA 60%, #FFB347 100%); color: #fff; }
          .card-label {
            font-size: 1.15rem;
            font-weight: 700;
            margin-top: 2px;
            text-align: center;
          }
          .card-desc {
            font-size: 0.98rem;
            font-weight: 400;
            margin-top: 4px;
            color: #e0e0e0;
          }
          .alt-section {
            margin: 2.5rem auto 0 auto;
            background: rgba(255,255,255,0.06);
            border-radius: 18px;
            padding: 18px 10px 10px 10px;
            max-width: 420px;
            text-align: center;
          }
          .alt-brand {
            font-size: 1.3rem;
            font-weight: 700;
            color: #a48cff;
            margin-bottom: 4px;
          }
          .alt-desc {
            font-size: 0.98rem;
            color: #e0e0e0;
          }
          .details-section {
            max-width: 1200px;
            width: 95vw;
            margin: 2.5rem auto;
            background: #fff;
            color: #222;
            border-radius: 10px;
            padding: 2.5rem 2rem;
            box-shadow: 0 2px 8px #0001;
          }
          .details-section h2 { color: #1976d2; }
          .details-section ul { margin-left: 1.2rem; }
          .details-section a { color: #1976d2; text-decoration: underline; }
          @media (max-width: 1100px) {
            .card-row { gap: 10px; }
            .card { min-width: 180px; max-width: 220px; }
          }
          @media (max-width: 900px) {
            .card-row { gap: 8px; }
            .card { min-width: 160px; max-width: 180px; }
          }
          @media (max-width: 600px) {
            .site-title { font-size: 2rem; }
            .card-row { flex-wrap: nowrap; overflow-x: auto; gap: 8px; }
            .card { min-width: 160px; max-width: 180px; margin: 0; }
          }
        `}</style>
      </Head>
      <nav className="navbar">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} onClick={e => { e.preventDefault(); scrollToSection(section.id); }}>{section.label}</a>
        ))}
        <a href="/privacy-policy">Privacy Policy</a>
      </nav>
      <div className="site-title">RoaSorg</div>
      <div className="subtitle">Development &bull; Design &bull; Content &bull; Management<br />Product Development Management Support by <b>EduTutor (E2T)</b></div>
      <div className="card-row">
        {cardSections.map((section) => (
          <div key={section.id} id={section.id} className={`card ${section.colorClass}`}>
            <div className="card-icon">{section.icon}</div>
            <div className="card-label">{section.label}</div>
            {section.desc && <div className="card-desc">{section.desc}</div>}
          </div>
        ))}
      </div>
      {/* Detailed content sections */}
      <section id="home-details" className="details-section">
        <h2>Welcome to RoaS Org</h2>
        <p>We are passionate creators, building innovative apps, beautiful designs, and engaging content for the digital world.</p>
      </section>
      <section id="about-details" className="details-section">
        <h2>About Us</h2>
        <p>RoaS Org is a team of developers, designers, and product consultant management. Our mission is to empower organizations and individuals with digital solutions that inspire and connect.</p>
      </section>
      <section id="services-details" className="details-section">
        <h2>Our Services</h2>
        <ul>
          <li><strong>App Development:</strong> Mobile and web apps tailored to your needs.</li>
          <li><strong>Design:</strong> UI/UX, branding, and visual product development.</li>
          <li><strong>Content Creation:</strong> Copywriting, blogs, and multimedia content.</li>
        </ul>
      </section>
      <section id="portfolio-details" className="details-section">
        <h2>Portfolio</h2>
        <p><em>Our latest apps and creative projects are Aditask, ThinkStack....</em></p>
      </section>
      <section id="contact-details" className="details-section">
        <h2>Contact Us</h2>
        <p>Ready to start your project or have questions? <br />
          <strong>Email:</strong> <a href="mailto:info@roasorg.com">info@roasorg.com</a>
        </p>
      </section>
      <div className="alt-section">
        <div className="alt-brand">RoaSorg</div>
        <div className="alt-desc">Development &bull; Design &bull; Content &bull; Management</div>
      </div>
    </>
  );
}
