import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Plus, Minus, Star, Clock, Briefcase, X, Download, GraduationCap, Briefcase as JobIcon, Home, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Global Styles ---
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  html, body { margin: 0; padding: 0; overflow-x: hidden; width: 100%; background-color: #ffffff; }
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
`;

// --- Animations ---
const scrollLeft = keyframes` 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } `;
const scrollRight = keyframes` 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } `;
const float = keyframes` 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } `;
const rollAnimation = keyframes` 0% { left: 110%; } 100% { left: -350px; } `;
const slideOutLeft = keyframes` 0% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(-120%); opacity: 0; } `;

// --- Styled Components ---
const MainContainer = styled.div` width: 100%; min-height: 100vh; padding-bottom: 120px; `;
const ContentWrapper = styled.div` max-width: 1200px; margin: 0 auto; padding: 0 20px; `;

const Navbar = styled.div`
  display: flex; justify-content: center; gap: 20px; padding: 25px 0; background: white;
  box-shadow: 0 2px 15px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 1000;
`;

const NavButton = styled.button`
  display: flex; align-items: center; gap: 10px; padding: 12px 24px;
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#007bff' : '#eee'};
  border-radius: 12px; cursor: pointer; transition: 0.3s; font-weight: 600;
  &:hover { background: #007bff; color: white; border-color: #007bff; transform: translateY(-3px); }
  @media (max-width: 600px) { padding: 8px 12px; font-size: 12px; gap: 5px; }
`;

const SectionHeader = styled.h2` text-align: center; font-size: 38px; margin: 50px 0 30px; font-weight: 800; @media (max-width: 600px) { font-size: 24px; } `;

const Ribbon = styled.div`
  position: absolute; top: 0; right: 0; width: 110px; height: 115px; overflow: hidden; pointer-events: none; z-index: 5;
  &::before {
    content: 'Newly Launched'; position: absolute; top: 30px; right: -35px; width: 180px; background: #ff4d00;
    color: #fff; font-size: 10px; font-weight: 700; text-align: center; line-height: 22px; transform: rotate(45deg);
    box-shadow: 20px 10px 1px  rgba(0,0,0,0.1); text-transform: uppercase;
  }
`;

const FloatingLogo = styled.div`
  position: absolute; width: ${props => props.size || '150px'}; height: ${props => props.size || '150px'};
  background: #fff; border-radius: 50%; box-shadow: 0 8px 30px rgba(0,0,0,0.06); 
  display: flex; justify-content: center; align-items: center; top: ${props => props.top};
  animation: ${rollAnimation} ${props => props.rollDuration || '25s'} linear infinite, ${float} 6s ease-in-out infinite;
  img { width: 70%; object-fit: contain; }
  .name-label { position: absolute; bottom: -45px; background: #000; color: #fff; padding: 6px 14px; border-radius: 8px; opacity: 0; transition: 0.3s; pointer-events: none; white-space: nowrap; z-index: 10; }
  &:hover { animation-play-state: paused; z-index: 100; transform: scale(1.1); .name-label { opacity: 1; bottom: -50px; } }
`;

// --- FIXED COMPANY LOGO MARQUEE ---
const MarqueeWrapper = styled.div`
  width: 100vw; overflow: hidden; position: relative; margin: 20px 0;
  left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
`;

const MarqueeTrack = styled.div`
  display: flex; width: max-content; 
  animation: ${props => props.reverse ? scrollRight : scrollLeft} ${props => props.speed || '40s'} linear infinite;
  align-items: center;
  &:hover { animation-play-state: paused; }
  img.company-logo-img { 
    height: 45px; width: auto; max-width: 150px; object-fit: contain; margin: 0 50px; 
    @media (max-width: 600px) { height: 30px; margin: 0 20px; } /* Fix oversized logos in mobile */
  }
`;

const StudentSectionWrapper = styled.div`
  background-color: #f8f9fa; width: 100vw; padding: 60px 0; position: relative;
  left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; bottom: 20px;
`;

const LearnerCard = styled.div`
  flex: 0 0 260px; margin: 0 15px; padding: 25px; background: #ffffff; border-radius: 20px; 
  box-shadow: 0 10px 20px rgba(180, 179, 179, 0.4); text-align: center;
  img.profile { width: 110px; height: 110px; border-radius: 15px; object-fit: cover; margin-bottom: 15px; }
  .name { font-weight: 700; font-size: 18px; margin-bottom: 5px; }
  img.placed-logo { height: 25px; width: auto; max-width: 100px; object-fit: contain; margin: 10px auto; display: block; }
  @media (max-width: 600px) { flex: 0 0 200px; padding: 15px; img.profile { width: 80px; height: 80px; } }
`;

const TrainingCard = styled.div`
  background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border: 1px solid #eee; transition: 0.3s;
  img { width: 100%; height: 160px; object-fit: cover; }
  .content { padding: 15px; }
  .title { font-weight: 600; font-size: 16px; margin-bottom: 5px; }
  .price { font-weight: 700; font-size: 18px; color: #333; display: flex; align-items: center; gap: 8px; }
  .old-price { text-decoration: line-through; color: #999; font-size: 14px; font-weight: 400; }
  &:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
`;

const AppPopupWrapper = styled.div`
  position: fixed; bottom: 30px; right: 30px; z-index: 10000;
  display: flex; flex-direction: column; align-items: flex-start;
  animation: ${props => props.isClosing ? slideOutLeft : 'none'} 0.6s forwards;
  @media (max-width: 600px) { right: 10px; bottom: 10px; width: calc(100% - 20px); }
`;

const PinkPill = styled.div`
  background: #ff4d88; color: white; padding: 6px 16px; border-radius: 12px 12px 0 0;
  font-size: 12px; font-weight: 700; margin-left: 20px;
`;

// --- FIXED POPUP BODY ---
const MainPopupBody = styled.div`
  background: white; width: 420px; border-radius: 24px; padding: 24px; 
  box-shadow: 0 15px 50px rgba(0,0,0,0.15); display: flex; align-items: center; 
  gap: 20px; position: relative; border: 1px solid #f0f0f0;
  @media (max-width: 600px) { width: 100%; padding: 15px; gap: 10px; }
`;

const FAQTabList = styled.div` display: flex; gap: 12px; overflow-x: auto; padding-bottom: 15px; margin-bottom: 30px; &::-webkit-scrollbar { display: none; } `;
const TabItem = styled.button` 
  padding: 10px 20px; white-space: nowrap; border-radius: 30px; font-weight: 600; cursor: pointer; transition: 0.3s; 
  border: 1px solid ${props => props.active ? '#007bff' : '#eee'}; 
  background: ${props => props.active ? '#007bff' : 'white'}; 
  color: ${props => props.active ? 'white' : '#666'}; 
  &:hover { background: #007bff; color: white; border-color: #007bff; }
`;

function App() {
  const [view, setView] = useState('home');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeFAQTab, setActiveFAQTab] = useState('Eligibility & Application');
  const [showNudge, setShowNudge] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const faqData = {
    'Eligibility & Application': [{ q: "Who is eligible?", a: "Graduates and students." }],
    'Program Prerequisites': [{ q: "Prior coding needed?", a: "No, skills are taught from basics." }],
    'Placement Support': [{ q: "Guarantee?", a: "Placement guarantee or full refund." }]
  };

  const companies = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
  ];

  const studentData1 = [
    { n: "Sonal", p: "https://i.pravatar.cc/150?u=11", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { n: "Abhishek", p: "https://i.pravatar.cc/150?u=12", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { n: "Nabajyoti", p: "https://i.pravatar.cc/150?u=13", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { n: "Anita", p: "https://i.pravatar.cc/150?u=17", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
  { n: "Karan", p: "https://i.pravatar.cc/150?u=18", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { n: "Deepa", p: "https://i.pravatar.cc/150?u=19", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { n: "Rahul", p: "https://i.pravatar.cc/150?u=20", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { n: "Sneha", p: "https://i.pravatar.cc/150?u=21", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
  { n: "Amit", p: "https://i.pravatar.cc/150?u=22", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { n: "Pooja", p: "https://i.pravatar.cc/150?u=23", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { n: "Vishal", p: "https://i.pravatar.cc/150?u=24", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { n: "Meera", p: "https://i.pravatar.cc/150?u=25", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" }
  ];

  const studentData2 = [
    { n: "Priya", p: "https://i.pravatar.cc/150?u=14", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
    { n: "Vikram", p: "https://i.pravatar.cc/150?u=15", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { n: "Rohan", p: "https://i.pravatar.cc/150?u=16", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { n: "Anjali", p: "https://i.pravatar.cc/150?u=26", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { n: "Suresh", p: "https://i.pravatar.cc/150?u=27", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
    { n: "Kavita", p: "https://i.pravatar.cc/150?u=28", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { n: "Manish", p: "https://i.pravatar.cc/150?u=29", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { n: "Ritu", p: "https://i.pravatar.cc/150?u=30", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { n: "Ajay", p: "https://i.pravatar.cc/150?u=31", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
    { n: "Neha", p: "https://i.pravatar.cc/150?u=32", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { n: "Sanjay", p: "https://i.pravatar.cc/150?u=33", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { n: "Tina", p: "https://i.pravatar.cc/150?u=34", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" }
  ];

  const trainings = [
    { t: "Programming in Python with AI", p: "999", o: "4,499", i: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" },
    { t: "Programming in Excel with AI", p: "999", o: "4,499", i: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400" },
    { t: "Programming in Web Dev with AI", p: "999", o: "4,499", i: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400" },
    { t: "Programming in Data Science with AI", p: "999", o: "4,499", i: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400" }
  ];

  const handleClosePopup = () => { setIsClosing(true); setTimeout(() => setShowNudge(false), 600); };
  const navigateFAQ = (dir) => { 
    const tabs = Object.keys(faqData); 
    const currentIndex = tabs.indexOf(activeFAQTab); 
    const nextIndex = dir === 'next' ? (currentIndex + 1) % tabs.length : (currentIndex - 1 + tabs.length) % tabs.length; 
    setActiveFAQTab(tabs[nextIndex]); 
    setOpenFAQ(null); 
  };

  return (
    <>
      <GlobalStyles />
      <Navbar>
        <NavButton active={view === 'home'} onClick={() => setView('home')}><Home size={18}/> Home</NavButton>
        <NavButton active={view === 'jobs'} onClick={() => setView('jobs')}><JobIcon size={18}/> Job-Portal</NavButton>
        <NavButton active={view === 'courses'} onClick={() => setView('courses')}><GraduationCap size={18}/> Courses</NavButton>
      </Navbar>

      <MainContainer>
        {view === 'home' && (
          <ContentWrapper>
            <SectionHeader>Placement Courses with AI</SectionHeader>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'25px'}}>
              {["Data Scientist", "Full Stack Developer","Digital Marketer","HR Manager"].map((role, i) => (
                <div key={i} style={{background:'#fff', padding:'25px', borderRadius:'16px', position:'relative', border:'1px solid #eee', boxShadow:'0 4px 15px rgba(0,0,0,0.05)'}}>
                  <Ribbon />
                  <div style={{position:'absolute', top:'15px', right:'15px', color:'#ff9f00', fontWeight:700, display:'flex', alignItems:'center', gap:'4px'}}><Star size={30} fill="currentColor"/> </div>
                  <h3 style={{color:'#007bff', fontSize:'22px', marginBottom:'10px', fontWeight:700}}>{role}</h3>
                  <div style={{fontSize:'13px', color:'#555'}}><Clock size={14}/> 6 months | LIVE</div>
                  <button style={{width:'100%', marginTop:'20px', padding:'12px', background:'#007bff', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:600}}>Know More</button>
                </div>
              ))}
            </div>
          </ContentWrapper>
        )}

        {view === 'jobs' && (
          <div style={{ position: 'relative', width: '100%', height: '700px', overflow: 'hidden', textAlign: 'center' }}>
            <SectionHeader>Floating Objects Job Portal</SectionHeader>
            {[
  { n: "Uber", s: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", t: "5%", r: "18s", d: "-2s", sz: "150px" },
  { n: "PhonePe", s: "https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png", t: "12%", r: "24s", d: "-15s", sz: "100px" },
  { n: "Google", s: "https://pngimg.com/uploads/google/google_PNG19644.png", t: "19%", r: "28s", d: "-5s", sz: "120px" },
  { n: "Flipkart", s: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png", t: "26%", r: "16s", d: "-10s", sz: "70px" },
  { n: "Amazon", s: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", t: "33%", r: "35s", d: "-7s", sz: "70px" },
  { n: "Microsoft", s: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", t: "40%", r: "30s", d: "-12s", sz: "130px" },
  { n: "Apple", s: "https://img.icons8.com/ios_filled/1200/mac-os.png", t: "47%", r: "26s", d: "-20s", sz: "90px" },
  { n: "Netflix", s: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png", t: "54%", r: "45s", d: "-18s", sz: "140px" },
  { n: "Meta", s: "https://pngimg.com/uploads/meta/meta_PNG3.png", t: "61%", r: "40s", d: "-25s", sz: "200px" },
  { n: "Coca Cola", s: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1024px-Coca-Cola_logo.svg.png", t: "68%", r: "28s", d: "-3s", sz: "30px" },
  { n: "Dell", s: "https://www.pngplay.com/wp-content/uploads/7/Dell-Transparent-File.png", t: "75%", r: "15s", d: "-8s", sz: "230px" },
  { n: "hp", s: "https://download.logo.wine/logo/Hewlett-Packard/Hewlett-Packard-Logo.wine.png", t: "82%", r: "22s", d: "-14s", sz: "90px" },
  { n: "Nokia", s: "https://logos-world.net/wp-content/uploads/2020/09/Nokia-Symbol.jpg", t: "89%", r: "19s", d: "-10s", sz: "30px" },
  { n: "Intel", s: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1200px-Intel_logo_%282006-2020%29.svg.png?20200807225939", t: "96%", r: "24s", d: "-19s", sz: "70px" },
  { n: "IBM", s: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", t: "2%", r: "32s", d: "-22s", sz: "200px" },
  { n: "Twitter", s: "https://img.freepik.com/premium-vector/round-twitter-logo-isolated-white-background_469489-899.jpg?semt=ais_hybrid&w=740&q=80", t: "15%", r: "27s", d: "-6s", sz: "150px" },
  { n: "LinkedIn", s: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png", t: "28%", r: "38s", d: "-16s", sz: "80px" },
  { n: "Adobe", s: "https://1000logos.net/wp-content/uploads/2021/04/Adobe-logo.png", t: "41%", r: "29s", d: "-9s", sz: "120px" },
  { n: "Samsung", s: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8rNzfm30Z3wteJhxxlQPOFMkaHtOLvQhuw&s", t: "54%", r: "34s", d: "-4s", sz: "100px" }
].map((logo, i) => (
              <FloatingLogo key={i} top={logo.t} rollDuration={logo.r} size={logo.sz}><img src={logo.s} alt={logo.n} /><div className="name-label">{logo.n}</div></FloatingLogo>
            ))}
          </div>
        )}

        {view === 'courses' && (
          <>
            <SectionHeader>Top Companies Hiring On HireNext</SectionHeader>
            <MarqueeWrapper>
               <MarqueeTrack speed="25s">
                 {[...companies, ...companies, ...companies].map((url, i) => (<img key={i} src={url} className="company-logo-img" alt="logo" />))}
               </MarqueeTrack>
            </MarqueeWrapper>

            <SectionHeader>Our learners got placed. So can you!</SectionHeader>
            <StudentSectionWrapper>
              <MarqueeWrapper>
                <MarqueeTrack speed="40s">
                  {[...studentData1, ...studentData1].map((s, i) => (
                    <LearnerCard key={`row1-${i}`}><img src={s.p} className="profile" alt={s.n} /><div className="name">{s.n}</div><img src={s.c} className="placed-logo" alt="logo" /></LearnerCard>
                  ))}
                </MarqueeTrack>
              </MarqueeWrapper>
              <MarqueeWrapper style={{marginTop:'50px'}}>
                <MarqueeTrack reverse speed="45s">
                  {[...studentData2, ...studentData2].map((s, i) => (
                    <LearnerCard key={`row2-${i}`}><img src={s.p} className="profile" alt={s.n} /><div className="name">{s.n}</div><img src={s.c} className="placed-logo" alt="logo" /></LearnerCard>
                  ))}
                </MarqueeTrack>
              </MarqueeWrapper>
            </StudentSectionWrapper>

            <ContentWrapper style={{marginTop: '80px'}}>
              <SectionHeader>Other in-demand trainings</SectionHeader>
              <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'25px'}}>
                {trainings.map((item, i) => (
                  <TrainingCard key={i}><img src={item.i} alt={item.t} /><div className="content"><div className="title">{item.t}</div><div className="price">₹{item.p} <span className="old-price">₹{item.o}</span></div></div></TrainingCard>
                ))}
              </div>
            </ContentWrapper>

            <ContentWrapper style={{marginTop:'80px'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '25px'}}>
                <h2 style={{fontSize: '32px', fontWeight: 800}}>FAQ's</h2>
                <div style={{display:'flex', gap:'12px'}}>
                  <button onClick={() => navigateFAQ('prev')} style={{width:'40px', height:'40px', borderRadius:'50%', border:'1px solid #eee', background:'white', cursor:'pointer'}}><ChevronLeft size={20} /></button>
                  <button onClick={() => navigateFAQ('next')} style={{width:'40px', height:'40px', borderRadius:'50%', border:'1px solid #eee', background:'white', cursor:'pointer'}}><ChevronRight size={20} /></button>
                </div>
              </div>
              <FAQTabList>{Object.keys(faqData).map(tab => (<TabItem key={tab} active={activeFAQTab === tab} onClick={() => {setActiveFAQTab(tab); setOpenFAQ(null)}}>{tab}</TabItem>))}</FAQTabList>
              {faqData[activeFAQTab]?.map((item, index) => (
                <div key={index} style={{ borderBottom: '1px solid #eee', padding: '24px 0', cursor: 'pointer' }} onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
                  <div style={{display:'flex', justifyContent:'space-between', fontWeight:600, fontSize:'18px'}}><span>Q. {item.q}</span>{openFAQ === index ? <Minus /> : <Plus color="#007bff"/>}</div>
                  {openFAQ === index && <div style={{marginTop:'15px', color:'#666', lineHeight: '1.6'}}>{item.a}</div>}
                </div>
              ))}
            </ContentWrapper>
          </>
        )}
      </MainContainer>

      {/* --- RECTIFIED POPUP SIDE-BY-SIDE DESIGN --- */}
      {showNudge && (
        <AppPopupWrapper isClosing={isClosing}>
          <PinkPill>Download the App!</PinkPill>
          <MainPopupBody>
            <button onClick={handleClosePopup} style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}><X size={18} /></button>
            <div style={{textAlign:'center'}}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=95x95&data=hirenext" style={{borderRadius:'8px', border:'1px solid #eee', width:'85px'}} alt="qr" />
              <div style={{fontSize:'9px', fontWeight:800, color:'#555', marginTop: '5px'}}>SCAN THE QR</div>
            </div>
            <div style={{flex: 1}}>
               <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'10px'}}>
                  <div>
                    <div style={{fontWeight:700, fontSize:'22px', display:'flex', alignItems:'center', gap:'6px'}}>4.2 <Star size={18} fill="#FFC107" color="#FFC107" /></div>
                    <div style={{fontSize:'10px', color:'#999'}}>39K Reviews</div>
                  </div>
                  <div style={{width:'1px', height:'35px', background:'#eee'}}></div>
                  <div>
                    <div style={{fontWeight:700, fontSize:'22px', display:'flex', alignItems:'center', gap:'6px'}}>50L+ <Download size={18} /></div>
                    <div style={{fontSize:'10px', color:'#999'}}>Downloads</div>
                  </div>
               </div>
               <div style={{borderTop:'1px solid #eee', paddingTop:'10px'}}>
                  <div style={{fontSize:'10px', color:'#888', marginBottom:'5px'}}>Available on</div>
                  <div style={{display:'flex', gap:'8px'}}><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" style={{height:'16px'}} alt="apple" /><img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" style={{height:'16px'}} alt="google" /></div>
               </div>
            </div>
          </MainPopupBody>
        </AppPopupWrapper>
      )}
    </>
  );
}

export default App;