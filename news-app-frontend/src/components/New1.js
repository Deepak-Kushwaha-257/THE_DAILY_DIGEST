
// Created By Deepak Kushwaha (IIT MANDI)

import React, { Component } from "react";
import NewsItem from "./NewItem1";
import Spinner from "./Spinner";
import "./New1.css";

export class News extends Component {
  articles = [];
  page_no = 1;
  totalResults = 0;
  page_size = 12; // Increased for better grid layout

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      page_no: this.page_no,
      totalResults: this.totalResults,
      page_size: this.page_size,
      loading: false,
      viewMode: "grid", // New: grid or list view
      sortBy: "publishedAt", // New: sorting option
      searchQuery: "", // New: search functionality
    };
  }

  async componentDidMount() {
    await this.fetchNews();
  }

  // Refactored fetch method for reusability
  fetchNews = async (page = 1) => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ea68187f71374f6d8c64a5794237c8c1&page=${page}&pageSize=${this.state.page_size}&sortBy=${this.state.sortBy}`;
    this.setState({ loading: true });

    try {
      let data = await fetch(url);
      let parsed_data = await data.json();

      this.setState({
        articles: parsed_data.articles,
        totalResults: parsed_data.totalResults,
        page_no: page,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  };

  handlenext = async () => {
    if (
      this.state.page_no + 1 <=
      Math.ceil(this.state.totalResults / this.state.page_size)
    ) {
      await this.fetchNews(this.state.page_no + 1);
    }
  };

  handleprev = async () => {
    if (this.state.page_no > 1) {
      await this.fetchNews(this.state.page_no - 1);
    }
  };

  // New: Toggle view mode
  toggleViewMode = () => {
    this.setState({
      viewMode: this.state.viewMode === "grid" ? "list" : "grid",
    });
  };

  // New: Handle sorting
  handleSort = (sortType) => {
    this.setState({ sortBy: sortType }, () => {
      this.fetchNews(1);
    });
  };

  // New: Handle search
  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  // New: Filter articles based on search
  getFilteredArticles = () => {
    if (!this.state.searchQuery) return this.state.articles;

    return this.state.articles.filter(
      (article) =>
        article.title
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase()) ||
        (article.description &&
          article.description
            .toLowerCase()
            .includes(this.state.searchQuery.toLowerCase()))
    );
  };

  // New: Get category display name
  getCategoryDisplayName = () => {
    const category = this.props.category || "general";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  render() {
    const filteredArticles = this.getFilteredArticles();
    const totalPages = Math.ceil(
      this.state.totalResults / this.state.page_size
    );

    return (
      <>

        <div className="news-container">
          <div className="container">
            {/* Enhanced Header */}
            <div className="news-header">
              <h1 className="news-title">
                {this.getCategoryDisplayName()} News - Latest Updates
              </h1>
              <p className="text-center text-muted mb-0">
                Stay informed with the latest{" "}
                {this.getCategoryDisplayName().toLowerCase()} news from around
                the world
              </p>
            </div>

            {/* Enhanced Controls */}
            <div className="news-controls">
              <div className="control-group">
                <button
                  className={`enhanced-btn ${
                    this.state.viewMode === "grid" ? "" : "outline"
                  }`}
                  onClick={this.toggleViewMode}
                >
                  {this.state.viewMode === "grid"
                    ? "📊 Grid View"
                    : "📋 List View"}
                </button>

                {/* <select 
                                    className="form-select"
                                    style={{
                                        borderRadius: '25px',
                                        border: '2px solid rgba(102, 126, 234, 0.2)',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    value={this.state.sortBy}
                                    onChange={(e) => this.handleSort(e.target.value)}
                                >
                                    <option value="publishedAt">📅 Latest First</option>
                                    <option value="popularity">🔥 Most Popular</option>
                                    <option value="relevancy">🎯 Most Relevant</option>
                                </select> */}
              </div>

              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search news..."
                  value={this.state.searchQuery}
                  onChange={(e) => this.handleSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
              <div>
                <strong>📊 Total Articles:</strong> {this.state.totalResults}
              </div>
              <div>
                <strong>📄 Showing:</strong> {filteredArticles && filteredArticles.length} articles
              </div>
              <div>
                <strong>📖 Page:</strong> {this.state.page_no} of {totalPages}
              </div>
            </div>

            {/* Loading Spinner */}
            {this.state.loading && (
              <div className="text-center py-5">
                <Spinner />
              </div>
            )}

            {/* News Grid/List */}
            {!this.state.loading && (
              <>
                {filteredArticles.length > 0 ? (
                  <div
                    className={
                      this.state.viewMode === "grid"
                        ? "grid-container"
                        : "list-container"
                    }
                  >
                    {filteredArticles.map((element, index) => {
                      return (
                        element.urlToImage && (
                          <div key={element.url || index}>
                            <NewsItem
                              title={element.title}
                              desc={element.description}
                              urlToImage={element.urlToImage}
                              url={element.url}
                              author={element.author}
                              publishedAt={element.publishedAt}
                              source={element.source.name}
                              viewMode={this.state.viewMode}
                            />
                          </div>
                        )
                      );
                    })}
                  </div>
                ) : (
                  <div className="empty-state">
                    <h3>🔍 No articles found</h3>
                    <p>
                      Try adjusting your search terms or check back later for
                      new content.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Enhanced Pagination */}
            {!this.state.loading && this.state.totalResults > 0 && (
              <div className="pagination-enhanced">
                <button
                  type="button"
                  disabled={this.state.page_no <= 1}
                  onClick={this.handleprev}
                  className="enhanced-btn"
                >
                  ⬅️ Previous
                </button>

                <div className="page-info">
                  Page {this.state.page_no} of {totalPages}
                </div>

                <button
                  type="button"
                  disabled={this.state.page_no >= totalPages}
                  onClick={this.handlenext}
                  className="enhanced-btn"
                >
                  Next ➡️
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default News;
