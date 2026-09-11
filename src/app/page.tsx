"use client";

import { useState } from "react";

type Photo = { title: string; location: string; year: string; category: string; src: string; orientation: "portrait"; aspectRatio: number };

const categories = ["All work", "Places", "Portraits", "Street", "Objects"];
const photoFiles = [
  "DSCF0098.JPG", "DSCF0264.JPG", "DSCF0287.JPG", "DSCF0353.JPG", "DSCF0789.JPG", "DSCF0796.JPG", "DSCF0820.JPG", "DSCF0968.JPG", "DSCF1006.JPG", "DSCF1026.JPG", "DSCF1265.JPG", "6A1665EC-5F51-4F78-B0A0-D3AC79F90289.JPG",
  "09C8B826-043B-4597-B2A2-0652673332A6.JPG", "1102F479-CBA1-47D1-85EA-2C9F59C35BC7.JPG", "1BEFD08C-942E-43CB-B20A-D00FA0F85D2E.JPG", "23E993F3-CD0B-49D0-B135-33CA32C4A4EA.JPG", "411938C4-E788-49E9-8916-9AA77CFCD7F1.JPG", "49A8DAA1-7B9A-4917-9666-6466E2F24992.JPG", "5FF6AA0B-2DCE-4037-A3F1-C419E124B1FE.JPG", "60205EC6-F06F-415E-9201-72F39C7BEC2A.JPG", "62D8B27E-A5AD-4C49-8645-24AA64363D74.JPG", "722F8825-9E5E-4238-92EF-529FAD087B3A.JPG", "73C9C7DD-E3EF-4E40-A2CA-5771875B4E67.JPG", "7642A565-F280-4344-900F-3F1BA94F3771.JPG", "7E110781-6C15-4DC8-A43A-3CC54AC86369.JPG", "865CF3EB-C3BC-4F45-9098-DF419C8F8C7A.JPG", "AFE25C8C-2BF1-413B-9BBD-169163C57708.JPG", "B37F97DE-88CC-4EF7-8350-9700331C96BE.JPG", "B6C080FC-91FD-472C-B700-08DC90253802.JPG", "C01F744D-BF6B-416C-A477-91AD67891CA4.JPG", "C7EB07C3-40F0-4080-9263-342240D2D9BF.JPG", "DD473F8C-76AA-4142-856B-B8E215407F13.JPG", "E24A807E-CA40-4FEC-B5C5-F966066A3088.JPG", "F89D3E35-B54C-43B8-9E66-62ACFE7961D2.JPG", "FAF47B73-B374-44DB-B9AE-005623A285B7.JPG",
];
const photoCategories = ["Places", "Street", "Portraits", "Objects"];
const photos: Photo[] = photoFiles.map((file, index) => ({
  title: `Archive frame ${String(index + 1).padStart(2, "0")}`,
  location: "Joshua archive",
  year: "2024",
  category: photoCategories[index % photoCategories.length],
  src: `/pics/${file}`,
  orientation: "portrait",
  aspectRatio: 0.75,
}));

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All work");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [lensPosition, setLensPosition] = useState({ x: 50, y: 50 });
  const visiblePhotos = activeCategory === "All work" ? photos : photos.filter((photo) => photo.category === activeCategory);

  function handleLensMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setLensPosition({ x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 });
  }

  return (
    <main>
      <section className="hero" onMouseMove={handleLensMove}>
        <nav className="nav-shell"><a className="wordmark" href="#top" aria-label="Joshua home">J<span>/</span>JOSHUA</a><div className="nav-links"><a href="#archive">Archive</a><a href="#about">About</a><a href="mailto:hello@joshua.photo">Contact</a></div><span className="availability"><i /> Available for select projects</span></nav>
        <div className="hero-image" id="top" /><div className="hero-overlay" />
        <div className="hero-copy"><p className="kicker">Photographer / 2020—24</p><h1>Light,<br /><em>caught</em> honestly.</h1><p className="hero-note">A visual archive by Joshua<br />between movement and stillness.</p></div>
        <button className="viewfinder-stage" type="button" style={{ "--lens-x": `${lensPosition.x}%`, "--lens-y": `${lensPosition.y}%` } as React.CSSProperties} onClick={() => document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" })} aria-label="Open the photography archive"><span className="finder-frame"><i className="finder-corner corner-tl" /><i className="finder-corner corner-tr" /><i className="finder-corner corner-bl" /><i className="finder-corner corner-br" /><span className="finder-crosshair" /><span className="finder-focus" /></span><span className="finder-topline"><b>JOSHUA / VIEWFINDER</b><span>REC</span><i /></span><span className="finder-bottomline"><span>35mm&nbsp;&nbsp; f/1.4&nbsp;&nbsp; 1/250</span><span>ISO 400&nbsp;&nbsp; +0.0</span></span><span className="finder-side-mark">◈&nbsp; 02.4m</span><small>click to enter<br /><b>the archive</b></small></button>
        <div className="scroll-cue"><span /> Scroll to enter archive</div><div className="hero-index">Selected works<br /><strong>01</strong> / 08</div>
      </section>
      <section className="archive-section" id="archive"><div className="section-heading"><div><p className="kicker dark-kicker">The archive</p><h2>Small moments,<br /><em>held open.</em></h2></div><p className="section-intro">A collection of frames made in passing. Some planned, most discovered.</p></div>
        <div className="filter-row" role="tablist" aria-label="Filter work">{categories.map((category) => <button key={category} className={activeCategory === category ? "filter active" : "filter"} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}<span className="work-count">{String(visiblePhotos.length).padStart(2, "0")} frames</span></div>
        <div className="gallery-rail" aria-label="Photography archive">{visiblePhotos.map((photo, index) => <button className={`photo-card ${photo.orientation}`} key={photo.title} onClick={() => setSelectedPhoto(photo)} aria-label={`Open ${photo.title}`}><span className="photo-frame" style={{ aspectRatio: photo.aspectRatio }}><span className="photo-image" style={{ backgroundImage: `url(${photo.src})` }} /></span><span className="photo-meta"><span><b>{String(index + 1).padStart(2, "0")}</b>{photo.title}</span><span>{photo.location} / {photo.year}</span></span></button>)}</div>
      </section>
      <section className="about-section" id="about"><div className="about-mark">J<span>/</span></div><div className="about-copy"><p className="kicker">About the work</p><h2>Looking for the<br /><em>real</em> in between.</h2><p>Joshua is a photographer working across portrait, place, and the quiet theatre of everyday life. Based wherever the next frame feels worth waiting for.</p><a className="text-link" href="mailto:hello@joshua.photo">Start a conversation <span>↗</span></a></div><div className="about-aside"><span>Currently</span><strong>New York / Lisbon</strong><span>Available</span><strong>Editorial / Brand / Portrait</strong></div></section>
      <footer><span>© 2024 Joshua</span><span>Made with patience</span><a href="#top">Back to top ↑</a></footer>
      {selectedPhoto && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedPhoto.title} onClick={() => setSelectedPhoto(null)}><div className="lightbox-image" style={{ backgroundImage: `url(${selectedPhoto.src})` }} onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setSelectedPhoto(null)} aria-label="Close image">×</button><div className="lightbox-caption"><strong>{selectedPhoto.title}</strong><span>{selectedPhoto.location} / {selectedPhoto.year}</span></div></div></div>}
    </main>
  );
}
