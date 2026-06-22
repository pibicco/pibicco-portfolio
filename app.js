const accessGate = document.querySelector('#access-gate');
const accessForm = document.querySelector('#access-form');
const accessPassword = document.querySelector('#access-password');
const accessMessage = document.querySelector('#access-message');
const passwordHash = 'ebfb082da8c475a4350e7b090c0fcbead9b68615c611ad6b1dc321d96c1ed2d9';

const digestPassword = async (value) => {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

const revealPortfolio = (animate = true) => {
  document.body.classList.remove('is-locked');
  if (!accessGate) return;

  if (!animate) {
    accessGate.hidden = true;
    return;
  }

  accessGate.classList.add('is-unlocking');
  window.setTimeout(() => { accessGate.hidden = true; }, 1950);
};

if (sessionStorage.getItem('portfolio-access') === 'granted') {
  revealPortfolio(false);
} else {
  window.setTimeout(() => accessPassword?.focus(), 100);
}

accessForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submittedHash = await digestPassword(accessPassword.value);

  if (submittedHash === passwordHash) {
    sessionStorage.setItem('portfolio-access', 'granted');
    if (accessMessage) accessMessage.textContent = '';
    revealPortfolio(true);
    return;
  }

  accessForm.classList.remove('is-error');
  void accessForm.offsetWidth;
  accessForm.classList.add('is-error');
  if (accessMessage) accessMessage.textContent = 'パスワードが違います';
  accessPassword.select();
});

const lightbox = document.querySelector('#image-lightbox');
const lightboxImage = lightbox?.querySelector('.lightbox-image');
const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

const openLightbox = (image) => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  if (lightboxCaption) lightboxCaption.textContent = image.alt;
  lightbox.hidden = false;
  document.body.classList.add('is-lightbox-open');
  requestAnimationFrame(() => lightbox.classList.add('is-open'));
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  document.body.classList.remove('is-lightbox-open');
  window.setTimeout(() => {
    lightbox.hidden = true;
    if (lightboxImage) lightboxImage.src = '';
  }, 250);
};

document.querySelectorAll('.work-visual:not(.website-visual) img').forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `拡大表示: ${image.alt}`);
  image.addEventListener('click', () => openLightbox(image));
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) closeLightbox();
});

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  });
});

const workGrid = document.querySelector('.work-grid');

if (workGrid) {
  const workCards = [...workGrid.querySelectorAll('.work-card')].sort((a, b) =>
    b.dataset.date.localeCompare(a.dataset.date)
  );

  workCards.forEach((card, index) => {
    workGrid.append(card);
    const number = card.querySelector('.work-number');
    if (number) number.textContent = String(index + 1).padStart(2, '0');
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
