document.addEventListener('DOMContentLoaded', function() {

    const collapseThreshold = 100; // in pixels

    const allEntries = document.querySelectorAll('.fw-entries-list .entries');

    // Loop through each entry
    allEntries.forEach(entry => {

        if (entry.scrollHeight > collapseThreshold) {
            entry.classList.add('collapsible', 'collapsed');
            entry.addEventListener('click', function() {
                this.classList.toggle('collapsed');
            });
        }
    });
});