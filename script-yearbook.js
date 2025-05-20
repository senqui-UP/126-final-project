window.onload = function () {
    const pages = [
        './flipbook-viewer/pages/2.jpg',
        './flipbook-viewer/pages/3.jpg',
        './flipbook-viewer/pages/4.jpg',
        './flipbook-viewer/pages/5.jpg',
        './flipbook-viewer/pages/6.jpg',
        './flipbook-viewer/pages/7.jpg'
    ];

    const book = {
        numPages: () => pages.length,
        getPage: (num, cb) => {
            if (num < 0 || num >= pages.length) return cb(new Error('Invalid page number'));

            const img = new Image();
            img.onerror = () => {
                console.error('Failed to load image:', pages[num]);
                cb(new Error('Failed to load image: ' + pages[num]));
            };
            img.onload = () => {
                console.log('Image loaded:', img);
                cb(null, img);
            };
            img.src = pages[num];
        }
    };

    flipbook.init(book, 'flipbook-container', (err, viewer) => {
        if (err) {
            console.error('Error initializing flipbook:', err);
            return;
        }

        window.viewer = viewer;

        console.log('Flipbook initialized with', viewer.page_count, 'pages');

        viewer.on('seen', (n) => {
            console.log('Page viewed:', n);
        });
    });
}