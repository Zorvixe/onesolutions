import React, { useState } from "react";
import "./FeedbackModal.css";

const FeedbackModal = ({
  isOpen,
  onClose,
  subtopicId,
  moduleName,
  topicName,
  onSubmitFeedback,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    ratingUnderstanding: null,
    ratingInstructor: null,
    ratingPace: null,
    feedbackText: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleRatingChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !formData.ratingUnderstanding) {
      alert("Please rate your understanding before continuing");
      return;
    }
    if (currentStep === 2 && !formData.ratingInstructor) {
      alert("Please rate the instructor before continuing");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (
      !formData.ratingUnderstanding ||
      !formData.ratingInstructor ||
      !formData.ratingPace
    ) {
      alert("Please complete all ratings before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitFeedback(formData);
      setCurrentStep(1);
      setFormData({
        ratingUnderstanding: null,
        ratingInstructor: null,
        ratingPace: null,
        feedbackText: "",
      });
    } catch (error) {
      console.error("Feedback submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="feedback-step-clss">
      <h2>Rate your understanding of the session today.</h2>
      <div className="rating-options-clss">
        <button
          className={`rating-option-clss ${
            formData.ratingUnderstanding === 1 ? "selected-clss" : ""
          }`}
          onClick={() => handleRatingChange("ratingUnderstanding", 1)}
        >
          <span className="rating-emoji-clss">😕</span>
          <span>Did not Understand</span>
        </button>
        <button
          className={`rating-option-clss ${
            formData.ratingUnderstanding === 2 ? "selected-clss" : ""
          }`}
          onClick={() => handleRatingChange("ratingUnderstanding", 2)}
        >
          <span className="rating-emoji-clss">😊</span>
          <span>Understood everything</span>
        </button>
      </div>
      <div className="feedback-actions-clss">
        <button className="next-btn-clss" onClick={handleNextStep}>
          Next
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="feedback-step-clss">
      <h2>Rate the instructor (pace of teaching, communication, clarity).</h2>
      <div className="rating-options-clss">
        <button
          className={`rating-option-clss ${
            formData.ratingInstructor === 1 ? "selected-clss" : ""
          }`}
          onClick={() => handleRatingChange("ratingInstructor", 1)}
        >
          <span className="rating-emoji-clss">👎</span>
          <span>Unclear</span>
        </button>
        <button
          className={`rating-option-clss ${
            formData.ratingInstructor === 2 ? "selected-clss" : ""
          }`}
          onClick={() => handleRatingChange("ratingInstructor", 2)}
        >
          <span className="rating-emoji-clss">👍</span>
          <span>Clear and Well paced</span>
        </button>
      </div>
      <div className="feedback-actions-clss">
        <button className="prev-btn-clss" onClick={handlePrevStep}>
          Previous
        </button>
        <button className="next-btn-clss" onClick={handleNextStep}>
          Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="feedback-step-clss">
      <h2>What can we do better to improve your experience?</h2>
      <div className="rating-options-clss vertical-clss">
        <button
          className={`rating-option-clss ${
            formData.ratingPace === 1 ? "selected-clss" : ""
          }`}
          onClick={() => handleRatingChange("ratingPace", 1)}
        >
          <span>Too Slow</span>
        </button>
        <button
          className={`rating-option-clss ${
            formData.ratingPace === 2 ? "selected-clss" : ""
          }`}
          onClick={() => handleRatingChange("ratingPace", 2)}
        >
          <span>Good Pace</span>
        </button>
        <button
          className={`rating-option-clss ${
            formData.ratingPace === 3 ? "selected-clss" : ""
          }`}
          onClick={() => handleRatingChange("ratingPace", 3)}
        >
          <span>Too Fast</span>
        </button>
      </div>

      <div className="feedback-textarea-clss">
        <textarea
          placeholder="Write your suggestions here..."
          value={formData.feedbackText}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, feedbackText: e.target.value }))
          }
          rows="4"
        />
      </div>

      <div className="feedback-actions-clss">
        <button className="prev-btn-clss" onClick={handlePrevStep}>
          Previous
        </button>
        <button
          className="submit-btn-clss"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="feedback-modal-overlay-clss">
      <div className="feedback-modal-clss">
        <button className="close-btn-clss" onClick={onClose}>
          ×
        </button>

        <div className="feedback-header-clss">
          <h2>Session Feedback</h2>
          <p>Help us improve your learning experience</p>
        </div>

        <div className="feedback-progress-clss">
          <div
            className={`progress-step-clss ${
              currentStep >= 1 ? "active-clss" : ""
            }`}
          >
            1
          </div>
          <div
            className={`progress-step-clss ${
              currentStep >= 2 ? "active-clss" : ""
            }`}
          >
            2
          </div>
          <div
            className={`progress-step-clss ${
              currentStep >= 3 ? "active-clss" : ""
            }`}
          >
            3
          </div>
        </div>

        <div className="feedback-content-clss">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
