document.addEventListener('DOMContentLoaded', () => {
    const thumbs = Array.from(document.querySelectorAll('.screenshot-thumb'));
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const overlay = document.querySelector('.lightbox-overlay');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!modal || thumbs.length === 0) return;

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const currentThumb = thumbs[currentIndex];
        modalImg.src = currentThumb.src;
        modalImg.alt = currentThumb.alt;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = '';
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
        openLightbox(currentIndex);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % thumbs.length;
        openLightbox(currentIndex);
    }

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => openLightbox(index));
    });

    closeBtn?.addEventListener('click', closeLightbox);
    overlay?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
});
