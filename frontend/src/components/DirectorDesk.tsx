"use client";

export function DirectorDesk() {
  return (
    <section className="director-section" style={{ position: "relative", overflow: "hidden" }}>
      {/* Subtle background glow */}
      <div className="director-bg-glow" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .director-section {
            background-color: var(--paper);
            padding: clamp(48px, 6vw, 80px) 0;
            border-top: 1px solid var(--line-2);
            position: relative;
          }

          .director-bg-glow {
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(36, 89, 230, 0.025) 0%, transparent 70%);
            top: 20%;
            left: -100px;
            pointer-events: none;
            z-index: 0;
          }
          
          .director-grid {
            display: grid;
            grid-template-columns: 1.25fr 0.75fr;
            gap: clamp(28px, 4.5vw, 48px);
            align-items: center;
          }

          .director-left {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .director-title {
            font-family: var(--font-display);
            font-size: clamp(20px, 2.4vw, 25px) !important;
            font-weight: 700;
            color: var(--ink);
            line-height: 1.25 !important;
            letter-spacing: -0.015em !important;
            margin: 0 0 4px 0;
          }

          .director-text {
            color: var(--slate);
            font-size: clamp(13.5px, 1vw, 14.5px);
            line-height: 1.65;
            margin: 0;
            text-align: justify;
            text-justify: inter-word;
          }

          .director-right {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }

          .director-img-frame {
            position: relative;
            width: 100%;
            max-width: 330px;
            aspect-ratio: 4 / 5;
            border-radius: 32px;
            overflow: hidden;
            border: 1px solid var(--line-2);
            box-shadow: var(--sh-lg);
            background: var(--paper-2);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .director-img-frame:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 24px 48px -12px rgba(10, 22, 40, 0.18), 0 0 0 1px var(--blue-200);
          }

          .director-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .director-img-frame:hover .director-img {
            transform: scale(1.03);
          }

          @media (max-width: 900px) {
            .director-grid {
              grid-template-columns: 1fr;
              gap: 36px;
            }
            .director-left {
              gap: 16px;
            }
            .director-right {
              justify-content: center;
            }
            .director-img-frame {
              max-width: 320px;
              border-radius: 24px;
            }
            .director-text {
              text-align: left;
            }
          }
        `}} />

        <div className="director-grid">
          {/* Left Column — Text content */}
          <div className="director-left">
            <h2 className="director-title">From the Desk of Managing Director</h2>
            
            <p className="director-text">
              Welcome and thank you for showing your interest and faith in this journey of ours, and help us making &apos;Supremo&apos; a trusted and reputed brand.
            </p>
            <p className="director-text">
              Our Company purpose is to offer innovative products and client centric services backed up by strong infrastructure and dedicated team which has led us making &apos;Supremo&apos; as an emerging brand. This purpose has been evident since the establishment of our corporation, When we set out to build a premium brand with an eye on innovation.
            </p>
            <p className="director-text">
              The values we share are embodied in what goes on at Supremo from day to day. Team members must exhibit ethical and honest behavior, and Supremo must offer fair, equal conduct in a safe, healthy workplace. We believe that in such an environment, sound decision making and effective strategies flow naturally from the give-and-take of daily business engagements among all team members.
            </p>
          </div>

          {/* Right Column — Photo */}
          <div className="director-right">
            <div className="director-img-frame">
              <img 
                src="/images/Managing director.png" 
                alt="Managing Director of Supremo" 
                className="director-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
