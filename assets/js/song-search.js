/**
 * Modern Search Functionality for Song List
 */

class SongSearch {
    constructor() {
        this.searchInput = document.getElementById('songSearch');
        this.searchClear = document.getElementById('searchClear');
        this.songGrid = document.getElementById('songGrid');
        this.noResults = document.getElementById('noResults');
        this.resultsCount = document.getElementById('searchResultsCount');
        
        this.init();
    }

    init() {
        // Add event listeners
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.searchClear.addEventListener('click', this.clearSearch.bind(this));
        
        // Add keyboard shortcuts
        this.searchInput.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Initial count
        this.updateResultsCount(this.getVisibleSongs().length);
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase().trim();
        
        // Show/hide clear button
        this.toggleClearButton(searchTerm);
        
        // Filter songs
        this.filterSongs(searchTerm);
        
        // Update results count
        const visibleSongs = this.getVisibleSongs();
        this.updateResultsCount(visibleSongs.length);
        
        // Show/hide no results message
        this.toggleNoResults(visibleSongs.length === 0 && searchTerm !== '');
    }

    filterSongs(searchTerm) {
        const songCards = this.songGrid.querySelectorAll('.video-card-link');
        let hasVisibleSongs = false;
        
        songCards.forEach(card => {
            const searchData = card.getAttribute('data-search-data') || '';
            const shouldShow = searchTerm === '' || this.matchesSearch(searchData, searchTerm);
            
            if (shouldShow) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                hasVisibleSongs = true;
                
                // Add highlight animation for matching cards
                if (searchTerm !== '') {
                    card.classList.add('search-match');
                    setTimeout(() => card.classList.remove('search-match'), 500);
                }
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
        
        // Force reflow for smooth transition
        this.songGrid.style.display = 'none';
        setTimeout(() => {
            this.songGrid.style.display = 'grid';
        }, 10);
    }

    matchesSearch(searchData, searchTerm) {
        // Split search term into words and check if all words match
        const searchWords = searchTerm.split(/\s+/);
        return searchWords.every(word => 
            searchData.includes(word.toLowerCase())
        );
    }

    getVisibleSongs() {
        return Array.from(this.songGrid.querySelectorAll('.video-card-link'))
            .filter(card => card.style.display !== 'none');
    }

    updateResultsCount(count) {
        if (this.resultsCount) {
            this.resultsCount.textContent = count;
            this.resultsCount.classList.add('count-update');
            setTimeout(() => {
                this.resultsCount.classList.remove('count-update');
            }, 300);
        }
    }

    toggleNoResults(show) {
        if (this.noResults) {
            if (show) {
                this.noResults.style.display = 'block';
                this.noResults.style.opacity = '1';
            } else {
                this.noResults.style.display = 'none';
                this.noResults.style.opacity = '0';
            }
        }
    }

    toggleClearButton(searchTerm) {
        if (this.searchClear) {
            if (searchTerm) {
                this.searchClear.style.opacity = '1';
                this.searchClear.style.visibility = 'visible';
                this.searchClear.style.pointerEvents = 'auto';
            } else {
                this.searchClear.style.opacity = '0';
                this.searchClear.style.visibility = 'hidden';
                this.searchClear.style.pointerEvents = 'none';
            }
        }
    }

    clearSearch() {
        this.searchInput.value = '';
        this.searchInput.focus();
        this.handleSearch({ target: this.searchInput });
    }

    handleKeyboard(event) {
        // Clear search on Escape key
        if (event.key === 'Escape') {
            this.clearSearch();
        }
        
        // Focus search on Ctrl+K or Cmd+K
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            this.searchInput.focus();
        }
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with search functionality
    if (document.getElementById('songSearch')) {
        new SongSearch();
        
        // Debug: Log available songs
        const songCards = document.querySelectorAll('.video-card-link');
        console.log(`Search initialized with ${songCards.length} songs`);
        
        songCards.forEach((card, index) => {
            const searchData = card.getAttribute('data-search-data');
            console.log(`Song ${index + 1}:`, searchData);
        });
    }
});