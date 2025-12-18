import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Plus, Minus, Star, Clock, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

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

// --- Styled Components ---
const MainContainer = styled.div` width: 100%; margin: 40px 0; `;
const ContentWrapper = styled.div` max-width: 1200px; margin: 0 auto; padding: 0 20px; `;

const SectionHeader = styled.h2` 
  text-align: center; font-size: 42px; margin: 40px 0 30px 0; font-weight: 800; line-height: 1.2;
  @media (max-width: 768px) { font-size: 26px; margin: 20px 0 15px 0; }
`;

// NEW: Ribbon Styled Component
const Ribbon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  overflow: hidden;
  pointer-events: none;
  z-index: 5;

  &::before {
    content: 'Newly launched';
    position: absolute;
    top: 20px;
    right: -25px;
    width: 140px;
    background: #ff4d00; /* Reddish-orange as seen in image */
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    line-height: 24px;
    transform: rotate(45deg); /* Rotated as seen in image */
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    text-transform: capitalize;
  }
`;

const CourseGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 60px; `;
const CourseCard = styled.div`
  background: #ffffff; border: 1px solid #e0e0e0; border-radius: 16px; padding: 24px; 
  position: relative; /* Required for the Ribbon to position correctly */
  transition: 0.3s;
  overflow: hidden; /* Clips the ribbon corners */
  &:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.1); transform: translateY(-5px); }
  .rating-badge { position: absolute; top: 15px; right: 15px; background: #fff8ef; color: #ff9f00; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 4px; }
  .title { font-size: 22px; color: #007bff; font-weight: 700; margin: 4px 0 12px 0; }
  .info-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #444; margin-bottom: 12px; }
  .btn-know { width: 100%; margin-top: 20px; background: #007bff; color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
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
const CompanyLogo = styled.img` height: 40px; margin: 0 55px; object-fit: contain; @media (max-width: 768px) { height: 30px; margin: 0 25px; } `;

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

const FAQSection = styled.div` max-width: 1200px; margin: 80px auto; padding: 0 20px; `;
const FAQHeaderRow = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; width: 100%; `;
const FAQHeading = styled.h2` text-align: left; font-size: 32px; font-weight: 700; margin: 0; @media (max-width: 768px) { font-size: 24px; } `;
const HeaderNavButtons = styled.div` display: flex; gap: 12px; `;
const NavButton = styled.button` background: #000; color: #fff; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; &:hover { background: #333; } `;
const FAQTabs = styled.div` display: flex; gap: 20px; border-bottom: 1px solid #eee; overflow-x: auto; scroll-behavior: smooth; width: 100%; margin-bottom: 30px; &::-webkit-scrollbar { display: none; } `;
const Tab = styled.div` padding: 12px 15px; font-weight: 600; font-size: 14px; cursor: pointer; white-space: nowrap; color: ${props => props.active ? '#007bff' : '#666'}; border-bottom: 3px solid ${props => props.active ? '#007bff' : 'transparent'}; transition: 0.3s; `;
const AccordionItem = styled.div` border-bottom: 1px solid #f1f3f5; `;
const Question = styled.div` display: flex; justify-content: space-between; align-items: center; padding: 24px 0; cursor: pointer; font-weight: 500; font-size: 16px; span { flex: 1; text-align: left; } `;
const Answer = styled.div` padding-bottom: 24px; color: #555; font-size: 14px; line-height: 1.6; text-align: left; `;

function App() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeTab, setActiveTab] = useState('Eligibility & Application');
  const tabsRef = useRef(null);

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
  const navigateTab = (dir) => {
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = dir === 'next' ? (currentIndex + 1) % tabs.length : (currentIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[newIndex]); setOpenFAQ(null);
  };

  useEffect(() => {
    if (tabsRef.current) {
      const activeEl = tabsRef.current.querySelector('[data-active="true"]');
      if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  const trainingData = [
   { name: "Python", photo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" },
    { name: "Excel", photo: "https://static0.xdaimages.com/wordpress/wp-content/uploads/wm/2024/11/ai-excel-1.jpg?w=1600&h=900&fit=crop" },
    { name: "Web Dev", photo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400" },
    { name: "Marketing", photo: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400" }
  ];

  const row1 = [
    { n: "Amit", p: "https://i.pravatar.cc/150?u=1", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { n: "Sonal", p: "https://i.pravatar.cc/150?u=2", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { n: "Rahul", p: "https://i.pravatar.cc/150?u=3", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
    { n: "Priya", p: "https://i.pravatar.cc/150?u=4", c: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png" },
      { n: "Rahul", p: "https://i.pravatar.cc/150?u=3", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
    { n: "Priya", p: "https://i.pravatar.cc/150?u=4", c: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png" },
    { n: "Amit", p: "https://i.pravatar.cc/150?u=1", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { n: "Sonal", p: "https://i.pravatar.cc/150?u=2", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" }

    
    ];
  const row2 = [
    { n: "Rahul", p: "https://i.pravatar.cc/150?u=3", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" }, 
    { n: "Priya", p: "https://i.pravatar.cc/150?u=4", c: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png" },
    { n: "Amit", p: "https://i.pravatar.cc/150?u=1", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { n: "Sonal", p: "https://i.pravatar.cc/150?u=2", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { n: "Rahul", p: "https://i.pravatar.cc/150?u=3", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
    { n: "Priya", p: "https://i.pravatar.cc/150?u=4", c: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png" },
    { n: "Amit", p: "https://i.pravatar.cc/150?u=1", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { n: "Sonal", p: "https://i.pravatar.cc/150?u=2", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" }

  ];

  const companies = [
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
    "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-transparent-pngpix-14.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYVfXnPTb-PVPHpI4dTm05ChjA2PpREbfqkQ&s",
    "https://media.licdn.com/dms/image/sync/v2/D4D27AQHrCe9sOv-HIg/articleshare-shrink_800/articleshare-shrink_800/0/1713336583779?e=2147483647&v=beta&t=ztQ-FzNSTv0y6C6lTfHtsTXtCjyPFcCDy91ciYo-9CY",
    "https://static.vecteezy.com/system/resources/thumbnails/018/930/745/small/twitter-logo-twitter-icon-transparent-free-free-png.png",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/LinkedIn_logo_initials.png"
  ];

  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <ContentWrapper>
          <SectionHeader>Placement Courses with AI</SectionHeader>
          <CourseGrid>
            {["Data Scientist", "Full Stack Developer", "Digital Marketer", "HR Manager"].map((role, i) => (
              <CourseCard key={i}>
                {/* Ribbon ONLY on specific cards if desired, or all */}
                <Ribbon />
                <div className="rating-badge"><Star size={20} fill="#ff9f00" stroke="none" /> 4.5</div>
                <div className="title">{role}</div>
                <div className="info-row"><Clock size={16} color="#007bff"/> 6 months | LIVE</div>
                <div className="info-row"><Briefcase size={16} color="#007bff"/> Salary: ₹18 LPA</div>
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
          <ContentWrapper><SectionHeader style={{textAlign: 'left'}}>Our learners got placed. So can you!</SectionHeader></ContentWrapper>
          <MarqueeWrapper><MarqueeTrack speed="30s">{[...row1, ...row1].map((l, i) => (<LearnerCard key={`r1-${i}`}><img src={l.p} className="profile" /><div className="name">{l.n}</div><img src={l.c} className="placed-logo" /></LearnerCard>))}</MarqueeTrack></MarqueeWrapper>
          <MarqueeWrapper><MarqueeTrack speed="35s" reverse>{[...row2, ...row2].map((l, i) => (<LearnerCard key={`r2-${i}`}><img src={l.p} className="profile" /><div className="name">{l.n}</div><img src={l.c} className="placed-logo" /></LearnerCard>))}</MarqueeTrack></MarqueeWrapper>
        </StudentSection>

        <ContentWrapper><SectionHeader margin="80px 0 20px 0">Top Companies Hiring On HireNext</SectionHeader></ContentWrapper>
        <MarqueeWrapper fade><MarqueeTrack speed="25s">{[...companies, ...companies].map((url, i) => (<CompanyLogo key={i} src={url} />))}</MarqueeTrack></MarqueeWrapper>

        <FloatingSectionContainer>
          <SectionHeader>Every 3rd software engineer in India is on HireNext</SectionHeader>
          {[
            { n: "Google", s: "https://pngimg.com/uploads/google/google_PNG19644.png", t: "10%", r: "32s", d: "-2s", sz: "120px" },
            { n: "Microsoft", s: "https://pngimg.com/uploads/microsoft/microsoft_PNG22.png", t: "30%", r: "28s", d: "0s", sz: "140px" },
            { n: "Uber", s: "https://pngimg.com/uploads/uber/uber_PNG24.png", t: "50%", r: "30s", d: "1s", sz: "130px" },
            { n: "Flipkart", s: "https://cdn.freebiesupply.com/logos/large/2x/flipkart-logo-png-transparent.png", t: "70%", r: "26s", d: "-1s", sz: "150px" },
            { n: "Netflix", s: "https://pngimg.com/uploads/netflix/netflix_PNG15.png", t: "40%", r: "34s", d: "2s", sz: "120px" },
            { n: "Apple", s: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png", t: "60%", r: "29s", d: "-2s", sz: "140px" },
            { n: "Amazon", s: "https://pngimg.com/uploads/amazon/amazon_PNG11.png", t: "20%", r: "31s", d: "1s", sz: "130px" },
            { n: "LinkedIn", s: "https://pngimg.com/uploads/linkedIn/linkedIn_PNG19.png", t: "80%", r: "27s", d: "0s", sz: "150px" } ,


          
          ].map((logo, i) => (
            <FloatingLogo key={i} top={logo.t} rollDuration={logo.r} delay={logo.d} size={logo.sz}><img src={logo.s} alt={logo.n} /><div className="name-label">{logo.n}</div></FloatingLogo>
          ))}
        </FloatingSectionContainer>

        <FAQSection>
          <FAQHeaderRow><FAQHeading>FAQ's</FAQHeading><HeaderNavButtons><NavButton onClick={() => navigateTab('prev')}><ChevronLeft size={20}/></NavButton><NavButton onClick={() => navigateTab('next')}><ChevronRight size={20}/></NavButton></HeaderNavButtons></FAQHeaderRow>
          <FAQTabs ref={tabsRef}>{tabs.map(tab => (<Tab key={tab} data-active={activeTab === tab} active={activeTab === tab} onClick={() => { setActiveTab(tab); setOpenFAQ(null); }}>{tab}</Tab>))}</FAQTabs>
          {faqData[activeTab]?.map((item, index) => (
            <AccordionItem key={index}>
              <Question onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
                <span>Q. {item.q}</span>
                {openFAQ === index ? <Minus size={20}/> : <Plus size={20} color="#007bff"/>}
              </Question>
              {openFAQ === index && <Answer>{item.a}</Answer>}
            </AccordionItem>
          ))}
        </FAQSection>
      </MainContainer>
    </>
  );
}

export default App;