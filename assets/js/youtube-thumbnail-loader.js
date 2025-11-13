/**
 * YouTube Thumbnail Loader
 * Extracts YouTube video IDs from embed URLs and loads high-quality thumbnails
 */

(function() {
  'use strict';

  /**
   * Extract video ID from various YouTube URL formats
   * @param {string} youtubeUrl - YouTube URL in various formats
   * @returns {string|null} Video ID or null if not found
   */
  function extractVideoId(youtubeUrl) {
    if (!youtubeUrl) return null;

    // Handle embed URLs: https://www.youtube.com/embed/VIDEO_ID
    let match = youtubeUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    // Handle standard URLs: https://www.youtube.com/watch?v=VIDEO_ID
    match = youtubeUrl.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    // Handle short URLs: https://youtu.be/VIDEO_ID
    match = youtubeUrl.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];

    // Handle just the video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(youtubeUrl)) {
      return youtubeUrl;
    }

    return null;
  }

  /**
   * Get the best available thumbnail URL from YouTube
   * Priority: maxresdefault > sddefault > hqdefault > mqdefault > default
   * @param {string} videoId - YouTube video ID
   * @returns {string} Thumbnail URL
   */
  function getThumbnailUrl(videoId) {
    // YouTube thumbnail URL pattern
    const baseUrl = `https://img.youtube.com/vi/${videoId}`;
    
    // Quality options in order of preference
    const qualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
    
    // For now, return the most common high-quality option
    // Browser will try to load the best available
    return `${baseUrl}/maxresdefault.jpg`;
  }

  /**
   * Load thumbnails for all images with data-youtube-url attribute
   */
  function loadThumbnails() {
    const images = document.querySelectorAll('img[data-youtube-url]');
    
    images.forEach(img => {
      const youtubeUrl = img.getAttribute('data-youtube-url');
      const videoId = extractVideoId(youtubeUrl);
      
      if (videoId) {
        const thumbnailUrl = getThumbnailUrl(videoId);
        
        // Create a new image to check if maxresdefault exists
        const checkImg = new Image();
        checkImg.onload = function() {
          img.src = thumbnailUrl;
          img.classList.add('thumbnail-loaded');
        };
        checkImg.onerror = function() {
          // Fallback to hqdefault if maxresdefault doesn't exist
          img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          img.classList.add('thumbnail-loaded');
        };
        
        // Start loading the thumbnail
        checkImg.src = thumbnailUrl;
      } else {
        // If no valid video ID found, add an error class
        img.classList.add('thumbnail-error');
      }
    });
  }

  // Load thumbnails when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadThumbnails);
  } else {
    loadThumbnails();
  }
})();
