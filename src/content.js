/**
 * Threads Video Downloader Logic
 */

function injectDownloadButton() {
    // Mencari semua elemen video di halaman
    const videos = document.querySelectorAll('video');

    videos.forEach((video) => {
        // Cek apakah tombol sudah ada supaya tidak double
        const container = video.closest('div'); 
        if (container && !container.querySelector('.btn-threads-download')) {
            
            const downloadBtn = document.createElement('button');
            downloadBtn.innerHTML = '⬇️ Download';
            downloadBtn.className = 'btn-threads-download';

            downloadBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const videoUrl = video.src || video.querySelector('source')?.src;
                
                if (videoUrl) {
                    // Membuka link video di tab baru (Metode paling aman)
                    window.open(videoUrl, '_blank');
                } else {
                    alert('Gagal mendapatkan URL video.');
                }
            };

            // Masukkan tombol ke dalam container video
            container.style.position = 'relative';
            container.appendChild(downloadBtn);
        }
    });
}

// Menjalankan fungsi saat scroll atau konten baru muncul (Lazy Load)
const observer = new MutationObserver(() => {
    injectDownloadButton();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Jalankan sekali saat pertama kali load
injectDownloadButton();