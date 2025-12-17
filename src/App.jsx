import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Plus, Minus, Star, Clock, Briefcase } from 'lucide-react';

// --- Global Styles ---
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden; 
    width: 100%;
    background-color: #f8f9fa; /* Uniform light gray background */
  }

  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
    font-family: 'Poppins', sans-serif; 
    border: none; /* Clears accidental gray border lines */
  }
`;

// --- Animations ---
const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-40px) rotate(3deg); } /* Increased from -20px to -40px for a deeper wave */
`;

const rollAnimation = keyframes`
  0% { left: 110%; }
  100% { left: -350px; }
`;

// --- Styled Components ---
const Container = styled.div`
  width: 100%; /* Changed from max-width to 100% to remove side spaces */
  margin: 0;
  padding: 40px 0; /* Removed horizontal padding */
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.h2`
  text-align: ${props => props.align || 'center'};
  font-size: ${props => props.size || '42px'}; 
  margin: ${props => props.margin || '40px 0 30px 0'}; 
  font-weight: 800;
`;

const CenteredSubHeader = styled.h3`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #444;
  margin-bottom: 30px; /* Correctly centered line */
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const CourseCard = styled.div`
  background: #fff; border: 1px solid #e0e0e0; border-radius: 16px; padding: 24px; position: relative;
  transition: 0.3s; &:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.1); transform: translateY(-5px); }
  .rating-badge { position: absolute; top: 15px; right: 15px; background: #fff8ef; color: #ff9f00; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 4px; }
  .title { font-size: 22px; color: #007bff; font-weight: 700; margin: 4px 0 12px 0; }
  .info-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #444; margin-bottom: 12px; }
  .btn-know { width: 100%; margin-top: 20px; background: #007bff; color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
`;

const TrainingSlider = styled.div`
  display: flex; 
  gap: 20px; 
  overflow-x: auto; 
  padding: 20px 20px; 
  margin-bottom: 60px;
  &::-webkit-scrollbar { display: none; }
  scroll-snap-type: x mandatory;
`;

const TrainingCard = styled.div`
  min-width: 300px; 
  flex-shrink: 0; /* Prevents squishing */
  background: #fff; 
  border: 1px solid #f0f0f0; 
  border-radius: 12px; 
  padding: 16px;
  scroll-snap-align: start;

  .img-box { width: 100%; height: 140px; background: #f8f9fa; border-radius: 8px; margin-bottom: 16px; }
  .train-title { font-size: 16px; font-weight: 700; margin: 8px 0; height: 44px; }
  .price-row { display: flex; align-items: center; gap: 10px; margin-top: 15px; }
  .curr-price { font-weight: 700; color: #333; font-size: 18px; }
  .old-price { text-decoration: line-through; color: #aaa; font-size: 14px; }
`;

const MarqueeWrapper = styled.div`
  width: 100%; /* Spans full screen width */
  overflow: hidden; 
  position: relative; 
  margin-bottom: 20px;
  background: transparent;

  /* Exclusive dual-sided fading logic */
  ${props => props.fade && `
    &::before, &::after { 
      content: ""; 
      position: absolute; 
      top: 0; 
      width: 250px; /* Width of the fade effect */
      height: 100%; 
      z-index: 10; /* Ensures gradients stay above moving logos */
      pointer-events: none;
    }
    
    /* Left side fade */
    &::before { 
      left: 0; 
      background: linear-gradient(to right, #f8f9fa 15%, transparent); 
    }
    
    /* Right side fade (The Fix) */
    &::after { 
      right: 0; 
      background: linear-gradient(to left, #f8f9fa 15%, transparent); 
    }
  `}
`;

const MarqueeTrack = styled.div`
  display: flex; width: max-content; 
  animation: ${props => (props.reverse ? scrollRight : scrollLeft)} ${props => props.speed || '40s'} linear infinite;
  &:hover { animation-play-state: paused; }
`;

const LearnerCard = styled.div`
  flex: 0 0 220px; margin: 10px 15px; padding: 20px; background: #fff; border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); text-align: center; border: 1px solid #f3f3f3;
  img.profile { width: 130px; height: 130px; border-radius: 10px; object-fit: cover; margin-bottom: 15px; }
  .name { font-weight: 600; font-size: 15px; margin-bottom: 10px; }
  img.placed-logo { height: 22px; max-width: 100px; object-fit: contain; margin: 0 auto; display: block; }
`;

const CompanyLogo = styled.img` height: 40px; margin: 0 55px; object-fit: contain; `;

const FloatingSectionContainer = styled.div`
  position: relative; 
  width: 100%; 
  height: 650px; 
  overflow: hidden; 
  margin-top: 50px;
`;

const FloatingLogo = styled.div`
  position: absolute; 
  width: ${props => props.size || '140px'}; 
  height: ${props => props.size || '140px'};
  background: #fff; 
  border-radius: 50%; 
  box-shadow: 0 8px 30px rgba(0,0,0,0.06); 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  padding: 15px; 
  z-index: 1; 
  cursor: pointer;
  top: ${props => props.top};
  
  animation: 
   ${rollAnimation} ${props => props.rollDuration || '25s'} linear infinite, 
    ${float} ${props => props.floatDuration || '6s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  img { width: 70%; height: 70%; object-fit: contain; pointer-events: none; }
  
  .name-label { 
    position: absolute; bottom: -45px; background: #222; color: #fff; 
    padding: 6px 14px; border-radius: 8px; font-size: 14px; 
    opacity: 0; transition: 0.3s; white-space: nowrap; 
  }
  
  &:hover { 
    animation-play-state: paused; 
    z-index: 100; 
    transform: scale(1.1); 
    .name-label { opacity: 1; } 
  }
`;

const FAQSection = styled.div` 
  margin-top: 80px; 
  max-width: 1200px; 
  margin-left: auto; 
  margin-right: auto;
  padding: 0 20px;
  h2 { font-size: 32px; font-weight: 700; margin-bottom: 25px; } 
`;

const FAQTabs = styled.div` display: flex; gap: 20px; border-bottom: 1px solid #eee; margin-bottom: 30px; overflow-x: auto; &::-webkit-scrollbar { display: none; } `;
const Tab = styled.div` padding: 12px 15px; font-weight: 600; font-size: 14px; cursor: pointer; white-space: nowrap; color: ${props => props.active ? '#007bff' : '#666'}; border-bottom: 3px solid ${props => props.active ? '#007bff' : 'transparent'}; transition: 0.3s; `;
const AccordionItem = styled.div` border-bottom: 1px solid #f1f3f5; `;
const Question = styled.div` display: flex; justify-content: space-between; align-items: center; padding: 24px 0; cursor: pointer; font-weight: 500; font-size: 16px; `;
const Answer = styled.div` padding-bottom: 24px; color: #555; font-size: 14px; line-height: 1.6; `;

function App() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeTab, setActiveTab] = useState('Eligibility & Application');

  const learners = [
    { n: "Kala", p: "https://i.pravatar.cc/150?u=1", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { n: "Rahul", p: "https://i.pravatar.cc/150?u=3", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { n: "Sneha", p: "https://i.pravatar.cc/150?u=5", c: "https://logos-world.net/wp-content/uploads/2020/04/FedEx-Logo.png" },
    { n: "Amit", p: "https://i.pravatar.cc/150?u=7", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { n: "Priya", p: "https://i.pravatar.cc/150?u=9", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { n: "Vikram", p: "https://i.pravatar.cc/150?u=11", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { n: "Anita", p: "https://i.pravatar.cc/150?u=13", c: "https://logos-world.net/wp-content/uploads/2020/04/FedEx-Logo.png" },
    { n: "Rohan", p: "https://i.pravatar.cc/150?u=15", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },

  ];

  const companies = [
    "https://logos-world.net/wp-content/uploads/2020/04/FedEx-Logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
    "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png",
    
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  ];

  const faqData = {
    'Eligibility & Application': [
      { q: "Who is eligible to apply for the Placement course?", a: "Graduates and final-year students from any discipline are eligible." },
      { q: "I am in the early years of college, can I still apply?", a: "This program is for those graduating within the next 12 months." },
      { q: "I have more than 3 years of work experience, can I apply?", a: "Yes, career switchers are fully supported." },
      { q: "How can I reserve my seat in advance?", a: "Complete the assessment and pay the booking fee." },
      { q: "What questions will the application process consist of?", a: "Technical aptitude and career goal questions." },
      { q: "On what parameters would my application be evaluated?", a: "Based on technical scores and profile assessment." },
      { q: "My application was rejected, can I join the course?", a: "Rejections for specific batches are final." },
      { q: "My account was rejected, can I re-apply?", a: "Yes, you can re-apply after 3 months." },
      { q: "Does HireNext provide other courses?", a: "Yes, we offer multiple placement tracks." }
    ],
    'Program Prerequisites': Array(5).fill({ q: "Do I need prior coding knowledge?", a: "No, we teach skills from the absolute basics." }),
    'Payment & Scholarships': Array(5).fill({ q: "Are there installment options?", a: "Yes, we offer No-Cost EMI plans." }),
    'Course Duration': Array(5).fill({ q: "When does the next cohort start?", a: "Batches commence monthly." }),
    'Placement Support': Array(5).fill({ q: "Do you guarantee a job?", a: "We provide placement assistance with top partners." }),
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <ContentWrapper>
          <SectionHeader>Placement Courses with AI</SectionHeader>
          <CourseGrid>
            {["Data Scientist", "Full Stack Developer", "Digital Marketer", "HR Manager"].map((role, i) => (
              <CourseCard key={i}>
                <div className="rating-badge"><Star size={14} fill="#ff9f00" stroke="none" /> 4.5</div>
                <div className="label">Become a</div>
                <div className="title">{role}</div>
                <div className="info-row"><Clock size={16} color="#007bff"/> 6 months | LIVE sessions</div>
                <div className="info-row"><Briefcase size={16} color="#007bff"/> Highest salary: ₹18 LPA</div>
                <button className="btn-know">Know More</button>
              </CourseCard>
            ))}
          </CourseGrid>

          <SectionHeader>Other in-demand trainings</SectionHeader>
        </ContentWrapper>

        <TrainingSlider>
          {["Python", "Excel", "Web Dev", "Marketing"].map((name, i) => (
            <TrainingCard key={i}>
              <div className="img-box" />
              <div className="train-title">Programming in {name} with AI</div>
              <div className="price-row"><span className="curr-price">₹999</span><span className="old-price">₹4,499</span></div>
            </TrainingCard>
          ))}
        </TrainingSlider>

        <ContentWrapper>
          <SectionHeader size="36px" align="left">Our learners got placed. So can you!</SectionHeader>
        </ContentWrapper>

        <MarqueeWrapper>
          <MarqueeTrack speed="30s">
            {[...learners, ...learners, ...learners].map((l, i) => (
              <LearnerCard key={i}><img src={l.p} className="profile" alt={l.n}/><div className="name">{l.n}</div><img src={l.c} className="placed-logo" alt="logo"/></LearnerCard>
            ))}
          </MarqueeTrack>
        </MarqueeWrapper>
        <MarqueeWrapper>
          <MarqueeTrack speed="35s" reverse={true}>
            {[...learners, ...learners, ...learners].map((l, i) => (
              <LearnerCard key={i}><img src={l.p} className="profile" alt={l.n}/><div className="name">{l.n}</div><img src={l.c} className="placed-logo" alt="logo"/></LearnerCard>
            ))}
          </MarqueeTrack>
        </MarqueeWrapper>

        <ContentWrapper>
          <SectionHeader margin="80px 0 10px 0">Top Companies Hiring On HireNext</SectionHeader>
          <CenteredSubHeader>Every 3rd software engineer in india is on HireNext</CenteredSubHeader>
        </ContentWrapper>
        
        <MarqueeWrapper fade>
          <MarqueeTrack speed="25s">
            {[...companies, ...companies, ...companies].map((url, i) => (
              <CompanyLogo key={i} src={url} alt="company"/>
            ))}
          </MarqueeTrack>
        </MarqueeWrapper>

        <FloatingSectionContainer>
          {[
  { n: "Uber", s: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", t: "5%", r: "22s", d: "-2s", sz: "140px", fd: "5s" },
  { n: "Google", s: "https://pngimg.com/uploads/google/google_PNG19644.png", t: "12%", r: "35s", d: "-5s", sz: "110px", fd: "7s" },
  { n: "Netflix", s: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png", t: "20%", r: "50s", d: "-18s", sz: "130px", fd: "4s" },
  { n: "Nokia", s: "https://logos-world.net/wp-content/uploads/2020/09/Nokia-Symbol.jpg", t: "28%", r: "24s", d: "-11s", sz: "100px", fd: "6s" },
  { n: "Amazon", s: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", t: "35%", r: "42s", d: "-7s", sz: "105px", fd: "8s" },
  { n: "Meta", s: "https://pngimg.com/uploads/meta/meta_PNG3.png", t: "42%", r: "28s", d: "-8s", sz: "180px", fd: "9s" },
  { n: "hp", s: "https://download.logo.wine/logo/Hewlett-Packard/Hewlett-Packard-Logo.wine.png", t: "55%", r: "32s", d: "-3s", sz: "120px", fd: "5s" },
  { n: "Microsoft", s: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", t: "62%", r: "44s", d: "-12s", sz: "115px", fd: "7s" },
  { n: "Dell", s: "https://www.pngplay.com/wp-content/uploads/7/Dell-Transparent-File.png", t: "70%", r: "19s", d: "-14s", sz: "160px", fd: "6s" },
  { n: "Flipkart", s: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png", t: "78%", r: "16s", d: "-10s", sz: "130px", fd: "4s" },
  { n: "Apple", s: "https://img.icons8.com/ios_filled/1200/mac-os.png", t: "85%", r: "38s", d: "-20s", sz: "90px", fd: "5s" },
  { n: "Coca Cola", s: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1024px-Coca-Cola_logo.svg.png", t: "18%", r: "30s", d: "-25s", sz: "150px", fd: "8s" },
  { n: "PhonePe", s: "https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png", t: "48%", r: "26s", d: "-15s", sz: "90px", fd: "6s" },
].map((logo, index) => (
  <FloatingLogo 
    key={index} 
    top={logo.t} 
    rollDuration={logo.rollDuration} 
    delay={logo.d} 
    size={logo.sz}
    floatDuration={logo.fd} /* Passing the wave speed prop */
  >
    <img src={logo.s} alt={logo.n} />
    <div className="name-label">{logo.n}</div>
  </FloatingLogo>
))}

        </FloatingSectionContainer>

        <FAQSection>
          <h2>FAQ's</h2>
          <FAQTabs>{Object.keys(faqData).map(tab => (<Tab key={tab} active={activeTab === tab} onClick={() => { setActiveTab(tab); setOpenFAQ(null); }}>{tab}</Tab>))}</FAQTabs>
          {faqData[activeTab].map((item, index) => (
            <AccordionItem key={index}>
              <Question onClick={() => setOpenFAQ(openFAQ === index ? null : index)}><span>Q. {item.q}</span>{openFAQ === index ? <Minus size={20}/> : <Plus size={20} color="#007bff"/>}</Question>
              {openFAQ === index && <Answer>{item.a}</Answer>}
            </AccordionItem>
          ))}
        </FAQSection>
      </Container>
    </>
  );
}

export default App;