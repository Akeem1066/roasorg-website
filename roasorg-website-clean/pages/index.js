import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.body.classList.add('roasorg');
    return () => document.body.classList.remove('roasorg');
  }, []);

  return (
    <>
      <Head>
        <title>RoaSorg</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/Icon.png" type="image/png" />
      </Head>
      <div className="roasorg-container">
        <img src="/Icon.png" alt="RoaSorg Logo" className="roasorg-logo" />
        <div className="roasorg-brand">RoaSorg</div>
        <div className="roasorg-subtitle">
          Development &bull; Design &bull; Content &bull; Management<br />
          Product Development Management Support by <b>EduTutor (E2T)</b>
        </div>
        <div className="roasorg-card-row">
          <div className="roasorg-card roasorg-dev">
            <div className="roasorg-card-icon">📱</div>
            <div className="roasorg-card-label">
              Developer<br />
              <span style={{ fontSize: '0.9em', fontWeight: 400 }}>(Mobile App)</span>
            </div>
          </div>
          <div className="roasorg-card roasorg-design">
            <div className="roasorg-card-icon">⭐</div>
            <div className="roasorg-card-label">
              Design<br />
              <span style={{ fontSize: '0.9em', fontWeight: 400 }}>(3D Printing)</span>
            </div>
          </div>
          <div className="roasorg-card roasorg-content">
            <div className="roasorg-card-icon">📄</div>
            <div className="roasorg-card-label">Content Creation</div>
          </div>
          <div className="roasorg-card roasorg-mgmt">
            <div className="roasorg-card-icon">🛠️</div>
            <div className="roasorg-card-label">
              Management<br />
              <span style={{ fontSize: '0.9em', fontWeight: 400 }}>(E2T)</span>
            </div>
          </div>
        </div>
        <div className="roasorg-alt-section">
          <div className="roasorg-alt-brand">RoaSorg</div>
          <div className="roasorg-alt-desc">Development &bull; Design &bull; Content &bull; Management</div>
        </div>
      </div>
    </>
  );
} 