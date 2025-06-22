
// Created By Deepak Kushwaha (IIT MANDI)

import React, { Component } from 'react'
import './NewItem1.css'

export class NewsItem extends Component {
    
    // Format date for better display
    formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Truncate text for better display
    truncateText = (text, maxLength) => {
        if (!text) return 'No description available';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    // Handle social sharing
    shareArticle = (platform) => {
        const url = encodeURIComponent(this.props.url);
        const title = encodeURIComponent(this.props.title);
        
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            whatsapp: `https://wa.me/?text=${title} ${url}`
        };
        
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }

    // Copy link to clipboard
    copyLink = async () => {
        try {
            await navigator.clipboard.writeText(this.props.url);
            // You could add a toast notification here
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    render() {
        const { title, desc, urlToImage, url, author, publishedAt, source, viewMode = 'grid' } = this.props;
        
        return (
            <>
                <div className={`news-card ${viewMode === 'list' ? 'news-card-list' : ''}`}>
                    <div className="news-image-container">
                        <img 
                            src={urlToImage} 
                            className="news-image" 
                            alt={title}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x200/667eea/ffffff?text=News+Image';
                            }}
                        />
                        <div className="news-overlay"></div>
                        <div className="news-badge">
                            📰 {source || 'News Source'}
                        </div>
                    </div>
                    
                    <div className="news-content">
                        <h3 className="news-title">
                            {this.truncateText(title, 80)}
                        </h3>
                        
                        <p className="news-description">
                            {this.truncateText(desc, 150)}
                        </p>
                        
                        <div className="news-meta">
                            <div className="news-author">
                                <span>👤</span>
                                <span>{author || 'Unknown Author'}</span>
                            </div>
                            <div className="news-date">
                                <span>📅</span>
                                <span>{this.formatDate(publishedAt)}</span>
                            </div>
                        </div>
                        
                        <div className="news-actions">
                            <a 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="news-btn"
                            >
                                📖 Read Full Article
                            </a>
                            
                            <div className="share-buttons">
                                <button 
                                    className="share-btn" 
                                    onClick={() => this.shareArticle('twitter')}
                                    title="Share on Twitter"
                                >
                                    🐦
                                </button>
                                <button 
                                    className="share-btn" 
                                    onClick={() => this.shareArticle('facebook')}
                                    title="Share on Facebook"
                                >
                                    📘
                                </button>
                                <button 
                                    className="share-btn" 
                                    onClick={() => this.shareArticle('whatsapp')}
                                    title="Share on WhatsApp"
                                >
                                    💬
                                </button>
                                <button 
                                    className="share-btn" 
                                    onClick={this.copyLink}
                                    title="Copy Link"
                                >
                                    🔗
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem