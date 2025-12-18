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
const SectionHeader = styled.h2` text-align: center; font-size: 42px; margin: 40px 0 30px 0; font-weight: 800; `;

const CourseGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 60px; `;
const CourseCard = styled.div`
  background: #ffffff; border: 1px solid #e0e0e0; border-radius: 16px; padding: 24px; position: relative; transition: 0.3s;
  &:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.1); transform: translateY(-5px); }
  .rating-badge { position: absolute; top: 15px; right: 15px; background: #fff8ef; color: #ff9f00; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 4px; }
  .title { font-size: 22px; color: #007bff; font-weight: 700; margin: 4px 0 12px 0; }
  .info-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #444; margin-bottom: 12px; }
  .btn-know { width: 100%; margin-top: 20px; background: #007bff; color: #fff; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
`;

const TrainingSlider = styled.div` display: flex; gap: 20px; overflow-x: auto; padding: 20px 20px; margin-bottom: 60px; &::-webkit-scrollbar { display: none; } `;
const TrainingCard = styled.div`
  min-width: 300px; flex-shrink: 0; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; padding: 16px; 
  .img-box { width: 100%; height: 140px; background: #f8f9fa; border-radius: 8px; margin-bottom: 16px; }
  .train-title { font-size: 16px; font-weight: 700; margin: 8px 0; height: 44px; }
  .price-row { display: flex; align-items: center; gap: 10px; }
  .curr-price { font-weight: 700; color: #333; font-size: 18px; }
  .old-price { text-decoration: line-through; color: #aaa; font-size: 14px; }
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
    &::before, &::after { 
      content: ""; position: absolute; top: 0; width: 200px; height: 100%; z-index: 10; pointer-events: none;
      @media (max-width: 768px) { width: 80px; }
    }
    &::before { left: 0; background: linear-gradient(to right, #f8f9fa 15%, transparent); }
    &::after { right: 0; background: linear-gradient(to left, #f8f9fa 15%, transparent); }
  `}
`;
const MarqueeTrack = styled.div` display: flex; width: max-content; align-items: center; animation: ${props => (props.reverse ? scrollRight : scrollLeft)} ${props => props.speed || '40s'} linear infinite; &:hover { animation-play-state: paused; } `;

const CompanyLogo = styled.img` height: 40px; margin: 0 55px; object-fit: contain; @media (max-width: 768px) { width: 33.33%; margin: 0; padding: 0 15px; } `;

const FloatingSectionContainer = styled.div` position: relative; width: 100%; height: 650px; overflow: hidden; margin-top: 50px; text-align: center; `;
const FloatingLogo = styled.div`
  position: absolute; width: ${props => props.size || '140px'}; height: ${props => props.size || '140px'};
  background: #fff; border-radius: 50%; box-shadow: 0 8px 30px rgba(0,0,0,0.06); display: flex; justify-content: center; align-items: center; z-index: 1; 
  top: ${props => props.top};
  animation: ${rollAnimation} ${props => props.rollDuration || '25s'} linear infinite, ${float} ${props => props.floatDuration || '6s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'}; cursor: pointer;
  img { width: 70%; height: 70%; object-fit: contain; pointer-events: none; }
  .name-label { position: absolute; bottom: -45px; background: #000; color: #fff; padding: 6px 14px; border-radius: 8px; font-size: 14px; opacity: 0; transition: 0.3s; white-space: nowrap; }
  &:hover { animation-play-state: paused; z-index: 100; transform: scale(1.1); .name-label { opacity: 1; bottom: -50px; } }
`;

const FAQSection = styled.div` max-width: 1200px; margin: 80px auto; padding: 0 20px; `;
const FAQHeaderRow = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; width: 100%; `;
const FAQHeading = styled.h2` text-align: left; font-size: 32px; font-weight: 700; margin: 0; `;
const HeaderNavButtons = styled.div` display: flex; gap: 12px; `;
const NavButton = styled.button`
  background: #000; color: #fff; border: none; border-radius: 50%; width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s;
  &:hover { background: #333; }
`;

const FAQTabs = styled.div` display: flex; gap: 20px; border-bottom: 1px solid #eee; overflow-x: auto; scroll-behavior: smooth; width: 100%; &::-webkit-scrollbar { display: none; } `;
const Tab = styled.div` padding: 12px 15px; font-weight: 600; font-size: 14px; cursor: pointer; white-space: nowrap; color: ${props => props.active ? '#007bff' : '#666'}; border-bottom: 3px solid ${props => props.active ? '#007bff' : 'transparent'}; transition: 0.3s; `;
const AccordionItem = styled.div` border-bottom: 1px solid #f1f3f5; `;
const Question = styled.div` display: flex; justify-content: space-between; align-items: center; padding: 24px 0; cursor: pointer; font-weight: 500; font-size: 16px; `;
const Answer = styled.div` padding-bottom: 24px; color: #555; font-size: 14px; line-height: 1.6; `;

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

  // Tab switching logic for navigation buttons
  const navigateTab = (direction) => {
    const currentIndex = tabs.indexOf(activeTab);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % tabs.length;
    } else {
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    }
    setActiveTab(tabs[newIndex]);
    setOpenFAQ(null);
  };

  // Auto-scroll logic for active tab
  useEffect(() => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.querySelector('[data-active="true"]');
      if (activeTabElement) {
        activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  const learners = [
    { n: "Shriyansh Sahu", p: "https://i.pravatar.cc/150?u=1", c: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png" },
    { n: "Meghana", p: "https://i.pravatar.cc/150?u=2", c: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png" },
    { n: "Abhishek", p: "https://i.pravatar.cc/150?u=3", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { n: "Taksheel", p: "https://i.pravatar.cc/150?u=4", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { n: "Nabajyoti", p: "https://i.pravatar.cc/150?u=5", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { n: "Rahul", p: "https://i.pravatar.cc/150?u=7", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
    { n: "Yashwant", p: "https://i.pravatar.cc/150?u=10", c: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { n: "Ankita", p: "https://i.pravatar.cc/150?u=12", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { n: "Sonal", p: "https://i.pravatar.cc/150?u=13", c: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png" },
    { n: "Karan", p: "https://i.pravatar.cc/150?u=14", c: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { n: "Priya", p: "https://i.pravatar.cc/150?u=15", c: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
    { n: "Vikram", p: "https://i.pravatar.cc/150?u=16", c: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" }

  ];

  const companies = ["https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"];

  const floatingLogos = [
    { n: "Google", s: "https://pngimg.com/uploads/google/google_PNG19644.png", t: "5%", r: "32s", d: "-2s", sz: "120px" },
    { n: "Uber", s: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png", t: "12%", r: "20s", d: "-14s", sz: "150px" },
    { n: "Netflix", s: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png", t: "22%", r: "52s", d: "-5s", sz: "140px" },
    { n: "Nokia", s: "https://logos-world.net/wp-content/uploads/2020/09/Nokia-Symbol.jpg", t: "30%", r: "22s", d: "-25s", sz: "130px" },
    { n: "Meta", s: "https://pngimg.com/uploads/meta/meta_PNG3.png", t: "15%", r: "21s", d: "-30s", sz: "280px" },
    { n: "Amazon", s: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", t: "40%", r: "28s", d: "-12s", sz: "160px" },
    { n: "Microsoft", s: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", t: "60%", r: "35s", d: "-8s", sz: "150px" },
    { n: "Flipkart", s: "https://download.logo.wine/logo/Flipkart/Flipkart-Logo.wine.png", t: "75%", r: "30s", d: "-20s", sz: "140px" },
    { n: "Apple", s: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", t: "50%", r: "40s", d: "-15s", sz: "130px" },
    { n: "Intel", s: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY10KWvt29PS7f6vybwxQiZaFaAlDIu0qIow&s", t: "80%", r: "27s", d: "-18s", sz: "150px" },

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
                <div className="rating-badge"><Star size={14} fill="#ff9f00" stroke="none" /> 4.5</div>
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

        <StudentSection>
          <ContentWrapper><SectionHeader style={{textAlign: 'left'}}>Our learners got placed. So can you!</SectionHeader></ContentWrapper>
          <MarqueeWrapper>
            <MarqueeTrack speed="30s">
              {[...learners, ...learners].map((l, i) => (
                <LearnerCard key={`r1-${i}`}><img src={l.p} className="profile" alt={l.n}/><div className="name">{l.n}</div><img src={l.c} className="placed-logo" alt="logo"/></LearnerCard>
              ))}
            </MarqueeTrack>
          </MarqueeWrapper>
          <MarqueeWrapper>
            <MarqueeTrack speed="35s" reverse>
              {[...learners, ...learners].map((l, i) => (
                <LearnerCard key={`r2-${i}`}><img src={l.p} className="profile" alt={l.n}/><div className="name">{l.n}</div><img src={l.c} className="placed-logo" alt="logo"/></LearnerCard>
              ))}
            </MarqueeTrack>
          </MarqueeWrapper>
        </StudentSection>

        <ContentWrapper><SectionHeader margin="80px 0 20px 0">Top Companies Hiring On HireNext</SectionHeader></ContentWrapper>
        <MarqueeWrapper fade><MarqueeTrack speed="25s">
            {[...companies, ...companies].map((url, i) => (<CompanyLogo key={i} src={url} />))}
        </MarqueeTrack></MarqueeWrapper>

        <FloatingSectionContainer>
          <h1 style={{fontSize: '42px', fontWeight: '800'}}>Every 3rd software engineer in India is on HireNext</h1>
          {floatingLogos.map((logo, i) => (
            <FloatingLogo key={i} top={logo.t} rollDuration={logo.r} delay={logo.d} size={logo.sz}>
              <img src={logo.s} alt={logo.n} /><div className="name-label">{logo.n}</div>
            </FloatingLogo>
          ))}
        </FloatingSectionContainer>

        <FAQSection>
          <FAQHeaderRow>
            <FAQHeading>FAQ's</FAQHeading>
            <HeaderNavButtons>
              <NavButton onClick={() => navigateTab('prev')}><ChevronLeft size={20} /></NavButton>
              <NavButton onClick={() => navigateTab('next')}><ChevronRight size={20} /></NavButton>
            </HeaderNavButtons>
          </FAQHeaderRow>

          <FAQTabs ref={tabsRef}>
            {tabs.map(tab => (
              <Tab 
                key={tab} 
                data-active={activeTab === tab}
                active={activeTab === tab} 
                onClick={() => { setActiveTab(tab); setOpenFAQ(null); }}
              >
                {tab}
              </Tab>
            ))}
          </FAQTabs>

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