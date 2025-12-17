import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Plus, Minus, Star, Clock, Briefcase } from 'lucide-react';

// --- Global Styles ---
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
  body { 
    background-color: #e8e8e9ff; /* Very light gray background */
    color: #333; 
    overflow-x: hidden; 
    width: 100%; 
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
  50% { transform: translateY(-20px) rotate(2deg); }
`;

const rollAnimation = keyframes`
  0% { left: 110%; }
  100% { left: -250px; }
`;

// --- Styled Components ---
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px; 
`;

const SectionHeader = styled.h2`
  text-align: ${props => props.align || 'center'};
  font-size: ${props => props.size || '42px'};
  margin: ${props => props.margin || '40px 0 30px 0'};
  font-weight: 800;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
`;

const CourseCard = styled.div`
  background: #fff; border: 1px solid #e0e0e0; border-radius: 16px; padding: 24px; position: relative;
  transition: 0.3s; &:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.1); transform: translateY(-5px); }
  .rating-badge { position: absolute; top: 15px; right: 15px; background: #fff8ef; color: #ff9f00; padding: 4px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 4px; }
  .title { font-size: 22px; color: #007bff; font-weight: 700; margin: 4px 0 12px 0; }
  .info-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #444; margin-bottom: 12px; }
  .btn-know { width: 100%; margin-top: 20px; background: #007bff; color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
`;

// --- Updated Styled Components ---

const TrainingSlider = styled.div`
  display: flex; 
  gap: 20px; 
  overflow-x: auto; 
  padding: 20px 0; 
  margin-bottom: 60px;
  /* Add padding to the right so the last card isn't cut off */
  padding-right: 20px; 
  &::-webkit-scrollbar { display: none; }
  /* Optional: Ensure it behaves well on mobile */
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`;

const TrainingCard = styled.div`
  /* Set a fixed minimum width to maintain consistency */
  min-width: 300px; 
  /* Use flex-shrink: 0 to prevent the last card from squishing */
  flex-shrink: 0; 
  background: #fff; 
  border: 1px solid #f0f0f0; 
  border-radius: 12px; 
  padding: 16px;
  scroll-snap-align: start;

  .img-box { 
    width: 100%; 
    height: 140px; 
    background: #f8f9fa; 
    border-radius: 8px; 
    margin-bottom: 16px; 
  }
  .train-title { 
    font-size: 16px; 
    font-weight: 700; 
    margin: 8px 0; 
    height: 44px; 
  }
  .price-row { 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    margin-top: 15px; 
  }
  .curr-price { font-weight: 700; color: #333; font-size: 18px; }
  .old-price { text-decoration: line-through; color: #aaa; font-size: 14px; }
`;

// Removed Side Fade Effects from Marquee
const MarqueeWrapper = styled.div`
  width: 100vw; 
  margin-left: calc(-50vw + 50%); 
  overflow: hidden; 
  position: relative; 
  margin-bottom: 20px;

  /* --- ADD FADE EFFECT HERE --- */
  &::before, &::after { 
    content: ""; 
    position: absolute; 
    top: 0; 
    width: 200px; /* Adjust width for more or less fade */
    height: 100%; 
    z-index: 2; 
    pointer-events: none; 
  }
  
  /* Left side fade */
  &::before { 
    left: 0; 
    background: linear-gradient(to right, #f8f9fa, transparent); 
  }
  
  /* Right side fade */
  &::after { 
    right: 0; 
    background: linear-gradient(to left, #f8f9fa, transparent); 
  }
`;

const MarqueeTrack = styled.div`
  display: flex; width: max-content; 
  animation: ${props => (props.reverse ? scrollRight : scrollLeft)} ${props => props.speed || '40s'} linear infinite;
  &:hover { animation-play-state: paused; }
`;

const LearnerCard = styled.div`
  flex: 0 0 220px; margin: 10px 15px; padding: 20px; background: #fff; border-radius: 12px;
  box-shadow: 0 10px 30px rgba(236, 236, 236, 1); text-align: center; border: 1px solid #f3f3f3;
  img.profile { width: 130px; height: 130px; border-radius: 10px; object-fit: cover; margin-bottom: 15px; }
  .name { font-weight: 600; font-size: 15px; margin-bottom: 10px; }
  img.placed-logo { height: 22px; max-width: 100px; object-fit: contain; margin: 0 auto; display: block; }
`;

const CompanyLogo = styled.img` height: 40px; margin: 0 55px; object-fit: contain; `;

// Floating Section: Removed side fades and container borders
const FloatingSectionContainer = styled.div`
  position: relative; 
  width: 100vw; 
  height: 650px; /* Increased height to prevent cropping */
  margin-left: calc(-50vw + 50%);
  overflow: hidden; 
  margin-top: 50px;
  text-align: center;
  font-size: 20px;
`;

const FloatingLogo = styled.div`
  position: absolute; 
  width: ${props => props.size || '140px'}; 
  height: ${props => props.size || '140px'};
  background: #fff; 
  border-radius: 50%; 
  box-shadow: 0 8px 30px rgba(0,0,0,0.06); /* Softer shadow */
  display: flex; 
  justify-content: center; 
  align-items: center; 
  padding: 15px; 
  z-index: 1; 
  cursor: pointer;
  top: ${props => props.top};
  
  /* Rolling and Floating Animations */
  animation: 
    ${rollAnimation} ${props => props.rollDuration || '25s'} linear infinite, 
    ${float} 6s ease-in-out infinite;
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
`

;


const FAQSection = styled.div` margin-top: 80px; h2 { font-size: 32px; font-weight: 700; margin-bottom: 25px; } `;
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
  ];

  const companies = [
    "https://logos-world.net/wp-content/uploads/2020/04/FedEx-Logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
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
    
  return (
    <>
      <GlobalStyles />
      <Container>
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
        <TrainingSlider>
          {["Python", "Excel", "Web Dev", "Marketing"].map((name, i) => (
            <TrainingCard key={i}>
              <div className="img-box" />
              <div className="train-title">Programming in {name} with AI</div>
              <div className="price-row"><span className="curr-price">₹999</span><span className="old-price">₹4,499</span></div>
            </TrainingCard>
          ))}
        </TrainingSlider>

        <SectionHeader size="36px" align="left">Our learners got placed. So can you!</SectionHeader>
        <MarqueeWrapper><MarqueeTrack speed="30s">{[...learners, ...learners, ...learners].map((l, i) => (<LearnerCard key={i}><img src={l.p} className="profile" alt={l.n}/><div className="name">{l.n}</div><img src={l.c} className="placed-logo" alt="logo"/></LearnerCard>))}</MarqueeTrack></MarqueeWrapper>
        <MarqueeWrapper><MarqueeTrack speed="35s" reverse={true}>{[...learners, ...learners, ...learners].map((l, i) => (<LearnerCard key={i}><img src={l.p} className="profile" alt={l.n}/><div className="name">{l.n}</div><img src={l.c} className="placed-logo" alt="logo"/></LearnerCard>))}</MarqueeTrack></MarqueeWrapper>

        <SectionHeader margin="80px 0 30px 0">Top Companies Hiring On HireNext</SectionHeader>
        <MarqueeWrapper><MarqueeTrack speed="25s">{[...companies, ...companies, ...companies].map((url, i) => (<CompanyLogo key={i} src={url} alt="company"/>))}</MarqueeTrack></MarqueeWrapper>

        {/* Floating Section: Varied sizes and safe vertical zones to avoid cropping */}
        <FloatingSectionContainer>
          <h1>Every 3rd software engineer in india is on HireNext</h1>
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
          ].map((logo, index,) => (
            <FloatingLogo key={index} top={logo.t} rollDuration={logo.r} delay={logo.d} size={logo.sz}>
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