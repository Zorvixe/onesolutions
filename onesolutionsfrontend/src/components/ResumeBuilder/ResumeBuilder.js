// src/components/ResumeBuilder/ResumeBuilder.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

import HeaderStep from './HeaderStep';
import EducationStep from './EducationStep';
import ExperienceStep from './ExperienceStep';
import SummaryStep from './SummaryStep';
import SkillsStep from './SkillsStep';
import AdditionalStep from './AdditionalStep';

import './ResumeBuilder.css';



const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5002';

const steps = [
  { id: 'header', label: 'Header', component: HeaderStep },
  { id: 'education', label: 'Education', component: EducationStep },
  { id: 'experience', label: 'Experience', component: ExperienceStep },
  { id: 'summary', label: 'Summary', component: SummaryStep },
  { id: 'skills', label: 'Skills', component: SkillsStep },
  { id: 'additional', label: 'Additional Details', component: AdditionalStep },
];

const ResumeBuilder = () => {

  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);

  const [resumeData, setResumeData] = useState({
    header: {},
    education: {},
    experience: [],
    summary: { text: '' },
    skills: [],
    additional: {
      certifications: [],
      websites: [],
      languages: [],
      projects: []
    },
  });

  const [title, setTitle] = useState('Untitled Resume');
  const [targetRole, setTargetRole] = useState('');
  const [company, setCompany] = useState('');

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const HeaderImage = '/assets/resume/header.png';
  const EducationImage = '/assets/resume/education.png';
  const ExperienceImage = '/assets/resume/experience.png';
  const SummaryImage = '/assets/resume/summary.png';
  const SkillsImage = '/assets/resume/skills.png';
  const AchievementImage = '/assets/resume/achievements.png';


  // STEP IMAGE MAPPING
  const stepImages = {
    header: HeaderImage,
    education: EducationImage,
    experience: ExperienceImage,
    summary: SummaryImage,
    skills: SkillsImage,
    additional: AchievementImage,
  };


  useEffect(() => {

    if (resumeId) {

      const fetchResume = async () => {

        setLoading(true);

        try {

          const token = localStorage.getItem('token');

          const res = await axios.get(
            `${API_BASE_URL}/api/resumes/${resumeId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (res.data.success) {

            const resume = res.data.data.resume;

            setTitle(resume.title);
            setTargetRole(resume.target_role || '');
            setCompany(resume.company || '');

            setResumeData(resume.resume_data);

          }

        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }

      };

      fetchResume();
    }

  }, [resumeId]);


  const handleNext = () => {
    if (currentStep < steps.length - 1)
      setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0)
      setCurrentStep(currentStep - 1);
  };


  const handleSave = async () => {

    setSaving(true);

    try {

      const token = localStorage.getItem('token');

      await axios.put(
        `${API_BASE_URL}/api/resumes/${resumeId}`,
        {
          title,
          target_role: targetRole,
          company,
          resume_data: resumeData
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }

  };


  const CurrentStepComponent = steps[currentStep].component;

  const currentStepId = steps[currentStep].id;

  const currentImage = stepImages[currentStepId];


  if (loading) return <div>Loading...</div>;


  return (

    <div className="res-build-wrapper">

      <div className="res-build-stepper-container">

        <div className="res-build-stepper">

          <div
            className="res-build-stepper-progress"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`
            }}
          ></div>

          {steps.map((step, index) => (

            <div
              key={step.id}
              className={`res-build-step-item 
              ${index === currentStep ? 'active' : ''} 
              ${index < currentStep ? 'completed' : ''}`}
            >

              <div className="res-build-step-circle">
                {index < currentStep ? '✓' : index + 1}
              </div>

              <span className="res-build-step-label">
                {step.label}
              </span>

            </div>

          ))}

        </div>

      </div>


      <div className="res-build-content-split">

        <div className="res-build-left-form-panel">

          <CurrentStepComponent
            data={resumeData}
            setData={setResumeData}
            onNext={handleNext}
            onPrev={handlePrev}
            onSave={handleSave}
            isLastStep={currentStep === steps.length - 1}
          />

        </div>


        {/* RIGHT PREVIEW PANEL */}

        <div className="res-build-right-preview-panel">

          <img
            src={currentImage}
            alt="Resume Preview"
            className="res-build-resume-preview-image"
          />

        </div>

      </div>

    </div>

  );

};

export default ResumeBuilder;