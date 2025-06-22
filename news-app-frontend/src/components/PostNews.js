
// Created By Deepak Kushwaha (IIT MANDI)

import React, { useState } from "react";
import axios from "axios";
import {
  ChevronLeft,
  Send,
  CheckCircle,
  AlertCircle,
  Newspaper,
  FileText,
  Database,
  Shield,
} from "lucide-react";
import "./PostNews.css";

const PostNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    location: "",
    imageUrl: "",
    tags: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});

  // API endpoint - change this to your backend URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const categories = [
    "Breaking News",
    "Politics",
    "Sports",
    "Entertainment",
    "Technology",
    "Health",
    "Business",
    "Education",
    "Weather",
    "Community",
    "Crime",
    "Traffic",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }
    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear submit error
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Prepare data for backend
      const newsData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        category: formData.category,
        location: formData.location.trim(),
        imageUrl: formData.imageUrl.trim(),
        tags: formData.tags, // Backend will process comma-separated tags
      };

      // Send data to backend
      const response = await axios.post(`${API_BASE_URL}/api/news`, newsData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      });

      console.log("News submitted successfully:", response.data);

      // Show success message
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        title: "",
        content: "",
        author: "",
        category: "",
        location: "",
        imageUrl: "",
        tags: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting news:", error);

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const errorMessage =
          error.response.data.message || "Failed to submit news article";
        setSubmitError(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        setSubmitError(
          "Cannot connect to server. Please check if the backend is running."
        );
      } else {
        // Something else happened
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Created By Deepak Kushwaha (IIT MANDI)

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="post-news-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={goBack} className="back-button">
              <ChevronLeft size={20} />
            </button>
            <div className="header-title">
              <Newspaper size={32} color="#667eea" />
              <div>
                <h1>Post Local News</h1>
                <p className="header-subtitle">
                  Share breaking news from your community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Form */}
        <div className="form-card">
          <div className="form-header">
            <h2>Create News Article</h2>
            <p>Fill in the details below to publish your news story</p>
          </div>

          <div className="form-content">
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Article Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter compelling news headline..."
                className={`form-input ${errors.title ? "error" : ""}`}
                required
              />
              {errors.title && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  {errors.title}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="form-group">
              <label className="form-label">Article Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your news article content here... Include who, what, when, where, and why."
                className={`form-input form-textarea ${
                  errors.content ? "error" : ""
                }`}
                required
              />
              {errors.content && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  {errors.content}
                </div>
              )}
            </div>

            {/* Author and Category */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Author Name *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className={`form-input ${errors.author ? "error" : ""}`}
                  required
                />
                {errors.author && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {errors.author}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`form-select ${errors.category ? "error" : ""}`}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {errors.category}
                  </div>
                )}
              </div>
            </div>

            {/* Location and Image URL */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State/Country"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className={`form-input ${errors.imageUrl ? "error" : ""}`}
                />
                {errors.imageUrl && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    {errors.imageUrl}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="form-group">
              <label className="form-label">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="breaking, local, community, urgent"
                className="form-input"
              />
              <p className="help-text">
                Separate tags with commas for better categorization
              </p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Publishing Article...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Publish News Article
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="success-message">
              <CheckCircle size={20} />
              <div>
                <strong>Article Published Successfully!</strong>
                <br />
                Your news has been saved to the database.
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="error-message-box">
              <AlertCircle size={20} />
              <div>
                <strong>Error Publishing Article</strong>
                <br />
                {submitError}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Guidelines */}
          <div className="sidebar-card">
            <div className="sidebar-header">
              <h3>
                <FileText size={20} />
                Publishing Guidelines
              </h3>
            </div>
            <div className="sidebar-content">
              <div className="guideline-item">
                <div className="guideline-dot"></div>
                <div className="guideline-text">
                  <h4>Clear Headlines</h4>
                  <p>
                    Write compelling, accurate headlines that capture your
                    story's essence
                  </p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-dot"></div>
                <div className="guideline-text">
                  <h4>Complete Context</h4>
                  <p>Include who, what, when, where, and why in your content</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-dot"></div>
                <div className="guideline-text">
                  <h4>Proper Categorization</h4>
                  <p>Choose appropriate categories and add relevant tags</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-dot"></div>
                <div className="guideline-text">
                  <h4>Fact Verification</h4>
                  <p>Verify information and cite sources when possible</p>
                </div>
              </div>
            </div>
          </div>

          {/* Database Status */}
          {/* <div className="sidebar-card">
            <div className="sidebar-header">
              <h3>
                <Database size={20} />
                Database Status
              </h3>
            </div>
            <div className="sidebar-content">
              <div className="status-item">
                <div className="status-indicator success"></div>
                <div>
                  <h4>MongoDB Connected</h4>
                  <p>Your articles will be saved securely</p>
                </div>
              </div>
              <div className="status-item">
                <div className="status-indicator success"></div>
                <div>
                  <h4>API Endpoint Ready</h4>
                  <p>Backend server is running</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Technical Info */}
          {/* <div className="sidebar-card">
            <div className="sidebar-header">
              <h3>
                <Shield size={20} />
                Technical Details
              </h3>
            </div>
            <div className="sidebar-content">
              <div className="tech-detail">
                <strong>Backend:</strong> Node.js + Express
              </div>
              <div className="tech-detail">
                <strong>Database:</strong> MongoDB
              </div>
              <div className="tech-detail">
                <strong>API:</strong> RESTful endpoints
              </div>
              <div className="tech-detail">
                <strong>Security:</strong> Input validation enabled
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PostNews;
