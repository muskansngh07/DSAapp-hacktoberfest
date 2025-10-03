

// Flowchart toggle functionality
document.querySelectorAll(".flowchart-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const container = btn.nextElementSibling; // find the div right after this button
    container.style.display = 
      container.style.display === "none" ? "block" : "none";

    // Optional: toggle button text
    btn.textContent = container.style.display === "block" 
      ? "Hide Flowchart" 
      : "View Flowchart";
  });
});
document.addEventListener('DOMContentLoaded', () => {

    // Snake toggle logic with persistence
    const toggleBtn = document.getElementById("snakeToggle");
    if (toggleBtn) {
        // Check localStorage for saved snake state
        let snakeEnabled = localStorage.getItem('snakeEnabled') === 'true';
        let trail = [];

        // Initialize snake state based on saved preference
        if (snakeEnabled) {
            enableSnake();
        }

        toggleBtn.addEventListener("click", () => {
            snakeEnabled = !snakeEnabled;
            // Save state to localStorage
            localStorage.setItem('snakeEnabled', snakeEnabled);
            
            if (snakeEnabled) {
                enableSnake();
            } else {
                disableSnake();
            }
        });

        function enableSnake() {
            document.body.classList.add("snake-cursor");
            document.addEventListener("mousemove", drawSnake);
            toggleBtn.innerHTML = '<span style="margin-left: 20px;">Disable Snake</span>';
            toggleBtn.classList.add("active");
        }

        function disableSnake() {
            document.body.classList.remove("snake-cursor");
            document.removeEventListener("mousemove", drawSnake);
            clearTrail();
            toggleBtn.innerHTML = '<span style="margin-left: 20px;">Snake Cursor</span>';
            toggleBtn.classList.remove("active");
        }

        function drawSnake(e) {
            const seg = document.createElement("div");
            seg.className = "snake-segment";
            seg.style.left = e.pageX + "px";
            seg.style.top = e.pageY + "px";
            document.body.appendChild(seg);
            trail.push(seg);

            setTimeout(() => {
                seg.remove();
                trail.shift();
            }, 500);
        }

        function clearTrail() {
            trail.forEach(seg => seg.remove());
            trail = [];
        }
    }


    // Recently Viewed Problems Logic 
    const recentlyViewedList = document.getElementById('recently-viewed-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // reads from localStorage and builds the HTML list
    function displayRecentProblems() {
        if (!recentlyViewedList) return; // Guard clause if element doesn't exist
        
        recentlyViewedList.innerHTML = '';
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

        if (recentlyViewed.length === 0) {
            recentlyViewedList.innerHTML = '<li>No recent problems viewed</li>';
            if (clearHistoryBtn) clearHistoryBtn.style.display = 'none';
        } else {
            recentlyViewed.forEach(problem => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = problem.url;
                link.textContent = problem.title;
                listItem.appendChild(link);
                recentlyViewedList.appendChild(listItem);
            });
            if (clearHistoryBtn) clearHistoryBtn.style.display = 'block';
        }
    }

    //function to clear history on buttonclick
    function clearHistory() {
        localStorage.removeItem('recentlyViewed');
        displayRecentProblems();
    }
    
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearHistory);
    }
    
    if (recentlyViewedList) {
        displayRecentProblems();
    }

});

function navigateTo(page) {
    window.location.href = page;
}

// Dark Mode toggle logic with persistence
const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
    // Check localStorage for saved dark mode state
    let darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    
    // Initialize dark mode state based on saved preference
    if (darkModeEnabled) {
        enableDarkMode();
    }
    
    darkModeToggle.addEventListener("click", () => {
        darkModeEnabled = !darkModeEnabled;
        // Save state to localStorage
        localStorage.setItem('darkModeEnabled', darkModeEnabled);
        
        if (darkModeEnabled) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
    
    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        darkModeToggle.innerHTML = '☀️ Light Mode';
        darkModeToggle.classList.add("active");
    }
    
    function disableDarkMode() {
        document.body.classList.remove("dark-mode");
        darkModeToggle.innerHTML = '🌙 Dark Mode';
        darkModeToggle.classList.remove("active");
    }
}