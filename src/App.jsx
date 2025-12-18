import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Plus, Minus, Star, Clock, Briefcase, ChevronLeft, ChevronRight, X, Download } from 'lucide-react';

// --- Global Styles ---
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  html, body { margin: 0; padding: 0; overflow-x: hidden; width: 100%; background-color: #f8f9fa; }
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
`;

// --- Animations ---
const scrollLeft = keyframes` 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } `;
const scrollRight = keyframes` 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } `;
const float = keyframes` 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-45px) rotate(3deg); } `;
const rollAnimation = keyframes` 0% { left: 110%; } 100% { left: -350px; } `;

// --- NEW: Slide Out to LEFT Animation ---
const slideOutLeft = keyframes`
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(-120%); opacity: 0; }
`;

// --- Styled Components ---
const MainContainer = styled.div` width: 100%; margin: 40px 0; `;
const ContentWrapper = styled.div` max-width: 1200px; margin: 0 auto; padding: 0 20px; `;

const SectionHeader = styled.h2` 
  text-align: center; font-size: 42px; margin: 40px 0 30px 0; font-weight: 800; line-height: 1.2;
  @media (max-width: 768px) { font-size: 26px; margin: 20px 0 15px 0; }
`;

const CourseGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 60px; `;
const CourseCard = styled.div`
  background: #ffffff; border: 1px solid #e0e0e0; border-radius: 16px; padding: 24px; 
  position: relative; transition: 0.3s; overflow: hidden;
  &:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.1); transform: translateY(-5px); }
  .rating-badge { position: absolute; top: 15px; right: 15px; background: #fff8ef; color: #ff9f00; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 4px; }
  .title { font-size: 22px; color: #007bff; font-weight: 700; margin: 4px 0 12px 0; }
  .info-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #444; margin-bottom: 12px; }
  .btn-know { width: 100%; margin-top: 20px; background: #007bff; color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
`;

const Ribbon = styled.div`
  position: absolute; top: 0; right: 0; width: 100px; height: 100px; overflow: hidden; pointer-events: none; z-index: 5;
  &::before {
    content: 'Newly launched'; position: absolute; top: 20px; right: -25px; width: 140px; background: #ff4d00;
    color: #fff; font-size: 11px; font-weight: 700; text-align: center; line-height: 24px; transform: rotate(45deg);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-transform: capitalize;
  }
`;

const TrainingSlider = styled.div` display: flex; gap: 20px; overflow-x: auto; padding: 20px 20px; margin-bottom: 60px; &::-webkit-scrollbar { display: none; } `;
const TrainingCard = styled.div`
  min-width: 300px; flex-shrink: 0; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; padding: 16px; 
  .img-box { width: 100%; height: 140px; background: #f8f9fa; border-radius: 8px; margin-bottom: 16px; overflow: hidden; img { width: 100%; height: 100%; object-fit: cover; } }
  .train-title { font-size: 16px; font-weight: 700; margin: 8px 0; }
  .price-row { display: flex; align-items: center; gap: 10px; .curr-price { font-weight: 700; color: #333; font-size: 18px; } .old-price { text-decoration: line-through; color: #aaa; font-size: 14px; } }
`;

const StudentSection = styled.section` width: 100%; background-color: #f1f3f5; padding: 60px 0; margin: 50px 0; `;
const LearnerCard = styled.div`
  flex: 0 0 220px; margin: 10px 15px; padding: 20px; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); text-align: center;
  img.profile { width: 130px; height: 130px; border-radius: 10px; object-fit: cover; margin-bottom: 15px; }
  .name { font-weight: 600; font-size: 15px; margin-bottom: 10px; }
  img.placed-logo { height: 22px; max-width: 100px; object-fit: contain; margin: 0 auto; display: block; }
`;

const MarqueeWrapper = styled.div` 
  width: 100%; overflow: hidden; position: relative; margin-bottom: 20px; 
  ${props => props.fade && `
    &::before, &::after { content: ""; position: absolute; top: 0; width: 200px; height: 100%; z-index: 10; pointer-events: none; }
    &::before { left: 0; background: linear-gradient(to right, #f8f9fa 15%, transparent); }
    &::after { right: 0; background: linear-gradient(to left, #f8f9fa 15%, transparent); }
  `}
`;
const MarqueeTrack = styled.div` display: flex; width: max-content; align-items: center; animation: ${props => (props.reverse ? scrollRight : scrollLeft)} ${props => props.speed || '40s'} linear infinite; &:hover { animation-play-state: paused; } `;
const CompanyLogo = styled.img` height: 40px; margin: 0 55px; object-fit: contain; `;

const FloatingSectionContainer = styled.div` position: relative; width: 100%; height: 650px; overflow: hidden; margin-top: 50px; text-align: center; `;
const FloatingLogo = styled.div`
  position: absolute; width: ${props => props.size || '140px'}; height: ${props => props.size || '140px'};
  background: #fff; border-radius: 50%; box-shadow: 0 8px 30px rgba(0,0,0,0.06); display: flex; justify-content: center; align-items: center; z-index: 1; top: ${props => props.top};
  animation: ${rollAnimation} ${props => props.rollDuration || '25s'} linear infinite, ${float} ${props => props.floatDuration || '6s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'}; cursor: pointer;
  img { width: 70%; height: 70%; object-fit: contain; pointer-events: none; }
  .name-label { position: absolute; bottom: -45px; background: #000; color: #fff; padding: 6px 14px; border-radius: 8px; font-size: 14px; opacity: 0; transition: 0.3s; white-space: nowrap; }
  &:hover { animation-play-state: paused; z-index: 100; transform: scale(1.1); .name-label { opacity: 1; bottom: -50px; } }
`;

const ImageSection = styled.div`
  max-width: 1200px; margin: 60px auto; padding: 0 20px; text-align: center;
  img { width: 100%; height: auto; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
`;

const FAQSection = styled.div` max-width: 1200px; margin: 80px auto; padding: 0 20px; `;
const FAQHeaderRow = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; width: 100%; `;
const FAQHeading = styled.h2` text-align: left; font-size: 32px; font-weight: 700; margin: 0; `;
const FAQTabs = styled.div` display: flex; gap: 20px; border-bottom: 1px solid #eee; overflow-x: auto; margin-bottom: 30px; &::-webkit-scrollbar { display: none; } `;
const Tab = styled.div` padding: 12px 15px; font-weight: 600; font-size: 14px; cursor: pointer; white-space: nowrap; color: ${props => props.active ? '#007bff' : '#666'}; border-bottom: 3px solid ${props => props.active ? '#007bff' : 'transparent'}; transition: 0.3s; `;
const AccordionItem = styled.div` border-bottom: 1px solid #f1f3f5; `;
const Question = styled.div` display: flex; justify-content: space-between; align-items: center; padding: 24px 0; cursor: pointer; font-weight: 500; font-size: 16px; span { flex: 1; text-align: left; } `;
const Answer = styled.div` padding-bottom: 24px; color: #555; font-size: 14px; line-height: 1.6; text-align: left; `;

const AppDownloadNudgeWrapper = styled.div`
  position: fixed; bottom: 30px; right: 30px; z-index: 10000;
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column; align-items: flex-start;
  /* Left closing animation */
  animation: ${props => props.isClosing ? slideOutLeft : 'none'} 0.6s ease-in-out forwards;
  @media (max-width: 768px) { right: 10px; left: 10px; bottom: 10px; }
`;

const PinkTab = styled.div`
  background: #ff4d88; color: white; padding: 6px 16px; border-radius: 12px 12px 0 0;
  font-size: 12px; font-weight: 700; margin-left: 20px; box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
`;

const NudgeMainCard = styled.div`
  background: white; width: 420px; border-radius: 24px; padding: 24px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15); display: flex; align-items: center;
  gap: 24px; position: relative; border: 1px solid #f0f0f0;
`;

const NudgeStats = styled.div`
  flex: 1; display: flex; flex-direction: column;
  .stats-row-container { display: flex; align-items: center; gap: 20px; margin-bottom: 8px; }
  .stat-group { display: flex; flex-direction: column; }
  .rating, .downloads { display: flex; align-items: center; gap: 4px; font-size: 20px; font-weight: 700; color: #222; }
  .sub-text { font-size: 12px; color: #999; font-weight: 400; }
`;

function App() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeTab, setActiveTab] = useState('Eligibility & Application');
  const [showNudge, setShowNudge] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const tabsRef = useRef(null);

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => { setShowNudge(false); }, 600);
  };

  const trainingData = [
    { name: "Python", photo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" },
    { name: "Excel", photo: "https://static0.xdaimages.com/wordpress/wp-content/uploads/wm/2024/11/ai-excel-1.jpg?w=1600" },
    { name: "Web Development", photo: "data:image/jpeg;base64,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" },
    
    { name: "Marketing", photo: "data:image/jpeg;base64,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" },
    
  ];

  const row1 = [{ n: "Amit", p: "https://i.pravatar.cc/150?u=1", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { n: "Sneha", p: "https://i.pravatar.cc/150?u=2", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { n: "Rahul", p: "https://i.pravatar.cc/150?u=3", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { n: "Priya", p: "https://i.pravatar.cc/150?u=4", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { n: "Vikram", p: "https://i.pravatar.cc/150?u=5", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { n: "Anjali", p: "https://i.pravatar.cc/150?u=6", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" }
  ];
   const row2 = [{ n: "Amit", p: "https://i.pravatar.cc/150?u=1", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { n: "Sneha", p: "https://i.pravatar.cc/150?u=2", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { n: "Rahul", p: "https://i.pravatar.cc/150?u=3", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { n: "Priya", p: "https://i.pravatar.cc/150?u=4", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { n: "Vikram", p: "https://i.pravatar.cc/150?u=5", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { n: "Anjali", p: "https://i.pravatar.cc/150?u=6", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" }
  ];
  const companies = [
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", 
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",

  ];

  const faqData = {
  'Eligibility & Application': [
    { q: "Who is eligible to apply for the Placement course?", a: "Graduates and final-year students from any discipline are eligible." },
    { q: "I am in the early years of college, can I still apply?", a: "This program is for those graduating within the next 12 months." },
    { q: "I have more than 3 years of work experience, can I apply?", a: "Yes, career switchers are fully supported." },
    { q: "How can I reserve my seat in advance?", a: "Complete the assessment and pay the booking fee." },
    { q: "What questions will the application process consist of?", a: "It consists of technical aptitude and career goal questions." },
    { q: "On what parameters would my application be evaluated?", a: "Based on technical scores and profile assessment." },
    { q: "My application was rejected, can I join the course?", a: "Rejections for specific batches are final." },
    { q: "My account was rejected, can I re-apply?", a: "Yes, you can re-apply after 3 months." },
    { q: "Does HireNext provide other courses?", a: "Yes, we offer multiple placement tracks." }
  ],
  'Program Prerequisites': [
    { q: "Do I need prior coding knowledge?", a: "No, we teach skills from the absolute basics." },
    { q: "What hardware is required?", a: "A laptop with at least 8GB RAM and a stable internet connection." },
    { q: "Are there any age restrictions?", a: "No, anyone looking to start a career in tech can apply." },
    { q: "Is math mandatory for Data Science?", a: "Basic high-school mathematics is sufficient." },
    { q: "Do I need to install software before starting?", a: "No, we provide a setup guide during orientation." }
  ],
  'Payment & Scholarships': [
    { q: "Are there installment options?", a: "Yes, we offer No-Cost EMI plans for 6-12 months." },
    { q: "Is there an upfront discount?", a: "Yes, full upfront payments are eligible for a 10% discount." },
    { q: "Do you offer scholarships?", a: "Merit-based scholarships are available based on your entrance test." },
    { q: "Is the booking fee refundable?", a: "The booking fee is generally non-refundable but can be adjusted." },
    { q: "What payment methods are accepted?", a: "All major cards, UPI, and Net Banking are accepted." }
  ],
  'Course Duration & Schedule': [
    { q: "When does the next cohort start?", a: "Batches commence on the first Monday of every month." },
    { q: "What is the total duration of the program?", a: "The program typically spans 6 months of training." },
    { q: "Are the sessions live or recorded?", a: "All sessions are LIVE, with recordings available for review." },
    { q: "Can I attend classes on weekends?", a: "Yes, we have dedicated weekend batches for working professionals." },
    { q: "How many hours per week should I dedicate?", a: "Plan for at least 15-20 hours of study per week." }
  ],
  'Placement Support': [
    { q: "Do you guarantee a job?", a: "We provide a placement guarantee with a full refund if unplaced." },
    { q: "What is the average CTC offered?", a: "Our graduates typically receive offers between 5 LPA to 18 LPA." },
    { q: "Will you help with my resume?", a: "Yes, we conduct dedicated resume-building workshops." },
    { q: "Do you provide mock interviews?", a: "Yes, multiple rounds of technical and HR mock interviews are held." },
    { q: "Which companies hire from HireNext?", a: "Over 500+ partners including Google, Amazon, and Microsoft." }
  ],
  'Certification': [
    { q: "Will I get a certificate?", a: "Yes, you receive an industry-recognized certificate upon completion." },
    { q: "Is the certificate verified?", a: "Yes, each certificate comes with a unique verification ID." },
    { q: "Can I share this on LinkedIn?", a: "Absolutely! Our certificates are optimized for LinkedIn sharing." },
    { q: "When will I receive my certificate?", a: "Within 7 working days after completing all projects." },
    { q: "Is the certificate valid globally?", a: "Yes, our certification is recognized by global tech firms." }
  ],
  'Support & Mentorship': [
    { q: "Will I have a dedicated mentor?", a: "Yes, every student is assigned a personal industry mentor." },
    { q: "How do I resolve my doubts?", a: "We have 24/7 doubt support via our community Discord." },
    { q: "Can I talk to alumni?", a: "Yes, we host monthly 'Alumni Connect' sessions." },
    { q: "What if I miss a live class?", a: "You can watch the recording and ask doubts in the next session." },
    { q: "Is there a community group?", a: "Yes, you will join a batch-specific community for networking." }
  ]
    };
  const tabs = Object.keys(faqData);

  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <ContentWrapper>
          <SectionHeader>Placement Courses with AI</SectionHeader>
          <CourseGrid>
            {["Data Scientist", "Full Stack Developer", "Digital Marketer","HR Manager"].map((role, i) => (
              <CourseCard key={i}>
                <Ribbon />
                <div className="rating-badge"><Star size={20} fill="#ff9f00" stroke="none" /> 4.5</div>
                <div className="title">{role}</div>
                <div className="info-row"><Clock size={16} color="#007bff"/> 6 months | LIVE</div>
                <button className="btn-know">Know More</button>
              </CourseCard>
            ))}
          </CourseGrid>
          <SectionHeader>Other in-demand trainings</SectionHeader>
        </ContentWrapper>

        <TrainingSlider>
          {trainingData.map((item, i) => (
            <TrainingCard key={i}><div className="img-box"><img src={item.photo} alt={item.name} /></div><div className="train-title">Programming in {item.name} with AI</div><div className="price-row"><span className="curr-price">₹999</span><span className="old-price">₹4,499</span></div></TrainingCard>
          ))}
        </TrainingSlider>

        <StudentSection>
          <ContentWrapper><SectionHeader>Our learners got placed. So can you!</SectionHeader></ContentWrapper>
          <MarqueeWrapper><MarqueeTrack speed="30s">{[...row1, ...row1].map((l, i) => (<LearnerCard key={i}><img src={l.p} className="profile" /><div className="name">{l.n}</div><img src={l.c} className="placed-logo" /></LearnerCard>))}</MarqueeTrack></MarqueeWrapper>
          <MarqueeWrapper><MarqueeTrack speed="30s">{[...row2, ...row2].map((l, i) => (<LearnerCard key={i}><img src={l.p} className="profile" /><div className="name">{l.n}</div><img src={l.c} className="placed-logo" /></LearnerCard>))}</MarqueeTrack></MarqueeWrapper>
        </StudentSection>

        <ContentWrapper><SectionHeader>Top Companies Hiring On HireNext</SectionHeader></ContentWrapper>
        <MarqueeWrapper fade><MarqueeTrack speed="25s">{[...companies, ...companies].map((url, i) => (<CompanyLogo key={i} src={url} />))}</MarqueeTrack></MarqueeWrapper>

        <FloatingSectionContainer>
          <SectionHeader>Every 3rd software engineer in India is on HireNext</SectionHeader>
           {[
                        { n: "Uber", s: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", t: "15%", r: "20s", d: "-2s", sz: "150px" },
            { n: "PhonePe", s: "https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png", t: "45%", r: "28s", d: "-15s", sz: "100px" },
            { n: "Google", s: "https://pngimg.com/uploads/google/google_PNG19644.png", t: "12%", r: "32s", d: "-5s", sz: "120px" },
            { n: "Flipkart", s: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png", t: "68%", r: "16s", d: "-10s", sz: "160px" },
            { n: "Amazon", s: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", t: "38%", r: "40s", d: "-7s", sz: "110px" },
            { n: "Microsoft", s: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", t: "55%", r: "40s", d: "-12s", sz: "130px" },
            { n: "Apple", s: "https://img.icons8.com/ios_filled/1200/mac-os.png", t: "72%", r: "35s", d: "-20s", sz: "90px" },
            { n: "Netflix", s: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png", t: "20%", r: "52s", d: "-18s", sz: "140px" },
            { n: "Meta", s: "https://pngimg.com/uploads/meta/meta_PNG3.png", t: "20%", r: "11s", d: "-18s", sz: "280px" },
            { n: "Coca Cola", s: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1024px-Coca-Cola_logo.svg.png", t: "20%", r: "32s", d: "-18s", sz: "180px" },
            { n: "Dell", s: "https://www.pngplay.com/wp-content/uploads/7/Dell-Transparent-File.png", t: "20%", r: "20s", d: "-18s", sz: "230px" },
            { n: "hp", s: "https://download.logo.wine/logo/Hewlett-Packard/Hewlett-Packard-Logo.wine.png", t: "40%", r: "32s", d: "-18s", sz: "190px" },
            { n: "Nokia", s: "https://logos-world.net/wp-content/uploads/2020/09/Nokia-Symbol.jpg", t: "20%", r: "22s", d: "-18s", sz: "130px" },
          ].map((logo, i) => (
            <FloatingLogo key={i} top={logo.t} rollDuration={logo.r} delay={logo.d} size={logo.sz} floatDuration={logo.fd}>
              <img src={logo.s} />
            </FloatingLogo>
          ))}
        </FloatingSectionContainer>


        {/* IMAGE SECTION BETWEEN LOGOS AND FAQ */}
        <ImageSection>
          <img src="/New.png" alt="App Download Section" />
        </ImageSection>

        <FAQSection>
          <FAQHeaderRow>
            <FAQHeading>FAQ's</FAQHeading>
            <div style={{display:'flex', gap:'12px'}}>
               <button onClick={() => {}} style={{borderRadius:'50%', width:'36px', height:'36px', background:'#000', color:'#fff', border:'none'}}><ChevronLeft size={20}/></button>
               <button onClick={() => {}} style={{borderRadius:'50%', width:'36px', height:'36px', background:'#000', color:'#fff', border:'none'}}><ChevronRight size={20}/></button>
            </div>
          </FAQHeaderRow>
          <FAQTabs ref={tabsRef}>{tabs.map(tab => (<Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>{tab}</Tab>))}</FAQTabs>
          {faqData[activeTab]?.map((item, index) => (
            <AccordionItem key={index}>
              <Question onClick={() => setOpenFAQ(openFAQ === index ? null : index)}><span>Q. {item.q}</span>{openFAQ === index ? <Minus size={20}/> : <Plus size={20} color="#007bff"/>}</Question>
              {openFAQ === index && <Answer>{item.a}</Answer>}
            </AccordionItem>
          ))}
        </FAQSection>
      </MainContainer>

      {/* POPUP NUDGE WITH LEFT SLIDE ANIMATION */}
      <AppDownloadNudgeWrapper show={showNudge} isClosing={isClosing}>
        <PinkTab>Download the App!</PinkTab>
        <NudgeMainCard>
          <button onClick={handleClosePopup} style={{position:'absolute', top:'10px', right:'10px', border:'none', background:'none', cursor:'pointer'}}><X size={18} /></button>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://hirenext.app" style={{borderRadius:'12px', border:'1px solid #eee'}} alt="QR" />
          <NudgeStats>
            <div className="stats-row-container">
              <div className="stat-group">
                <div className="rating">4.2 <Star size={18} fill="#FFC107" color="#FFC107" /></div>
                <div className="sub-text">39K Reviews</div>
              </div>
              <div style={{ width: '1px', height: '30px', background: '#eee' }}></div>
              <div className="stat-group">
                <div className="downloads">50L+ <Download size={18} /></div>
                <div className="sub-text">Downloads</div>
              </div>
            </div>
            <div className="avail" style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Available on</span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" style={{height:'14px'}} alt="Apple" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" style={{height:'14px'}} alt="Play Store" />
            </div>
          </NudgeStats>
        </NudgeMainCard>
      </AppDownloadNudgeWrapper>
    </>
  );
}  
export default App;