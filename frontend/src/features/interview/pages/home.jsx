import { useState, useRef } from 'react'
import "../../../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const { handleLogout } = useAuth()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [activeInfo, setActiveInfo] = useState(null)
    const [generationError, setGenerationError] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const onLogout = async () => {
        try {
            await handleLogout()
            navigate("/login")
        } catch (err) {
            console.error("Logout error:", err)
        }
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files?.[0]
        setGenerationError("")
        try {
            const data = await generateReport({ jobDescription, selfDescription, resumeFile })
            navigate(`/interview/${data._id}`)
        } catch (error) {
            setGenerationError(error.response?.data?.message || error.message || "Unable to generate your interview plan.")
        }
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='home-page'>
            <header className='topbar'>
                <div className='brand-mark'>
                    <span className='brand-mark__icon' aria-hidden='true'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5" /><path d="M8 19v-8" /><path d="M12 19V8" /><path d="M16 19v-5" /><path d="M20 19V3" /></svg>
                    </span>
                    <span>InterviewPlan <strong>AI</strong></span>
                </div>
                <button type='button' onClick={onLogout} className='logout-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    Logout
                </button>
            </header>

            <main className='dashboard-shell'>
                <aside className='sidebar'>
                    <div className='sidebar-intro'>
                        <h2>AI-Powered.<br />Personalized.<br /><span>Interview-Ready.</span></h2>
                        <p>Our AI analyzes the job requirements and your profile to craft a personalized interview strategy that helps you stand out.</p>
                    </div>

                    <div className='feature-list'>
                        <div className='feature-item'>
                            <span className='feature-item__icon feature-item__icon--pink'>◎</span>
                            <div><strong>Role Focused</strong><p>Tailored to the specific job description</p></div>
                        </div>
                        <div className='feature-item'>
                            <span className='feature-item__icon feature-item__icon--blue'>▧</span>
                            <div><strong>Profile Aware</strong><p>Highlights your strengths and experience</p></div>
                        </div>
                        <div className='feature-item'>
                            <span className='feature-item__icon feature-item__icon--green'>ϟ</span>
                            <div><strong>Actionable Plan</strong><p>Get a clear roadmap to ace your interview</p></div>
                        </div>
                    </div>

                    <div className='privacy-note'>
                        <span aria-hidden='true'>♧</span>
                        <p><strong>100% Secure &amp; Private</strong><br />Your data is encrypted and never shared.</p>
                    </div>
                </aside>

                <section className='workspace'>
                    <header className='page-header'>
                        <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                        <p>Provide the details below and our AI will create a winning interview strategy just for you.</p>
                    </header>

                    <div className='interview-grid'>
                        <section className='workspace-card job-card'>
                            <div className='card-heading'>
                                <span className='card-heading__icon'>▣</span>
                                <span className='step-number'>1.</span>
                                <h2>Target Job Description</h2>
                                <span className='badge badge--required'>Required</span>
                            </div>
                            <p className='card-helper'>Paste the full job description to help our AI understand the role and requirements.</p>
                            <div className='textarea-wrap'>
                                <textarea
                                    value={jobDescription}
                                    onChange={(event) => setJobDescription(event.target.value)}
                                    className='panel__textarea'
                                    placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                    maxLength={5000}
                                />
                                <span className='char-counter'>{jobDescription.length} / 5000</span>
                            </div>
                            <div className='tip-note'><span>♧</span><p><strong>Tip:</strong> Include responsibilities, must-have skills, and preferred qualifications for best results.</p></div>
                        </section>

                        <section className='workspace-card profile-card'>
                            <div className='card-heading'>
                                <span className='card-heading__icon'>♙</span>
                                <span className='step-number'>2.</span>
                                <h2>Your Profile</h2>
                                <span className='badge badge--best'>Best Results</span>
                            </div>
                            <label className='section-label' htmlFor='resume'>Upload Resume <span className='visually-hidden'>file</span></label>
                            <label className='dropzone' htmlFor='resume'>
                                <span className='dropzone__icon'>⇧</span>
                                <p className='dropzone__title'>Drag &amp; drop your file here</p>
                                <p className='dropzone__browse'>or click to browse</p>
                                <p className='dropzone__subtitle'>PDF only (Max 3MB)</p>
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='application/pdf,.pdf' />
                            </label>
                            <div className='or-divider'><span>OR</span></div>
                            <div className='self-description'>
                                <label className='section-label' htmlFor='selfDescription'>Quick Self-Description <span>(Optional)</span></label>
                                <div className='textarea-wrap'>
                                    <textarea
                                        value={selfDescription}
                                        onChange={(event) => setSelfDescription(event.target.value)}
                                        id='selfDescription'
                                        name='selfDescription'
                                        className='panel__textarea panel__textarea--short'
                                        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                        maxLength={1000}
                                    />
                                    <span className='char-counter'>{selfDescription.length} / 1000</span>
                                </div>
                            </div>
                            <div className='info-box'><span className='info-box__icon'>ⓘ</span><p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p></div>
                        </section>
                    </div>

                    <div className='generate-area'>
                        <button type='button' onClick={handleGenerateReport} className='generate-btn'><span aria-hidden='true'>✧</span> Generate My Interview Plan</button>
                        {generationError && <p className='generate-error' role='alert'>{generationError}</p>}
                        <p><span aria-hidden='true'>♧</span> Your information is secure and confidential</p>
                    </div>

                    {reports.length > 0 && (
                        <section className='recent-reports'>
                            <h2>My Recent Interview Plans</h2>
                            <ul className='reports-list'>
                                {reports.map((report) => (
                                    <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                        <h3>{report.title || 'Untitled Position'}</h3>
                                        <p>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                        <strong>Match Score: {report.matchScore}%</strong>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </section>
            </main>

            <footer className='page-footer'>
                <button type='button' onClick={() => setActiveInfo('privacy')}>Privacy Policy</button>
                <button type='button' onClick={() => setActiveInfo('terms')}>Terms of Service</button>
                <button type='button' onClick={() => setActiveInfo('help')}>Help Center</button>
            </footer>

            {activeInfo && (
                <div className='info-modal-backdrop' onClick={() => setActiveInfo(null)}>
                    <section className='info-modal' role='dialog' aria-modal='true' aria-labelledby='info-modal-title' onClick={(event) => event.stopPropagation()}>
                        <button type='button' className='info-modal__close' onClick={() => setActiveInfo(null)} aria-label='Close information dialog'>&times;</button>
                        {activeInfo === 'privacy' && <><h2 id='info-modal-title'>Privacy Policy</h2><p>Interview Planner uses the information you provide to create a personalized interview strategy.</p><h3>Information we use</h3><p>Your account details, job description, self-description, and uploaded resume may be processed by the application and its AI service.</p><h3>How it is used</h3><p>Information is used to generate interview questions, preparation guidance, and match insights. It is not used to make hiring decisions.</p><h3>Your responsibility</h3><p>Only upload resume or profile information that you are comfortable processing through this project.</p></>}
                        {activeInfo === 'terms' && <><h2 id='info-modal-title'>Terms of Service</h2><p>By using Interview Planner, you agree to use it for lawful interview preparation and to provide information you have permission to share.</p><h3>What the service provides</h3><p>The application generates preparation guidance from your job description and profile. Results are suggestions, not guarantees of an interview or job offer.</p><h3>Content and accuracy</h3><p>You are responsible for reviewing AI-generated content before relying on it.</p></>}
                        {activeInfo === 'help' && <><h2 id='info-modal-title'>Help Center</h2><h3>Generate a plan</h3><p>Paste the complete job description, then upload a PDF resume up to 3MB, or enter a short self-description.</p><h3>Having trouble?</h3><p>Check that the job description and profile information are present, confirm the file is a PDF under 3MB, and try again.</p></>}
                    </section>
                </div>
            )}
        </div>
    )
}

export default Home