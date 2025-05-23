// Wait for the HTML content to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Define the height at which an entry should become collapsible
    const collapseThreshold = 100; // in pixels

    // Get all of the list items that contain your posts
    const allEntries = document.querySelectorAll('.fw-entries-list .entries');

    // Loop through each entry
    allEntries.forEach(entry => {
        // Check if the actual height of the entry is greater than our threshold
        if (entry.scrollHeight > collapseThreshold) {
            
            // If it's too tall, add classes to make it collapsible and set its initial state to 'collapsed'
            entry.classList.add('collapsible', 'collapsed');

            // Add a click event listener directly to this specific entry
            entry.addEventListener('click', function() {
                // When this entry is clicked, simply toggle the 'collapsed' class
                this.classList.toggle('collapsed');
            });
        }
    });
});