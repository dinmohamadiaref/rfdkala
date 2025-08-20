const galleryGrid = document.getElementById('gallery-grid');
let imagesData = [];
let filteredData = [];
let loadedCount = 0;
const loadPerScroll = 5;
let selectedPackage = 'all';

// بررسی پارامتر package از URL
const urlParams = new URLSearchParams(window.location.search);
const packageFromUrl = urlParams.get('package');
if (packageFromUrl) {
  selectedPackage = packageFromUrl;
}

// بارگذاری تصاویر از JSON
fetch('js/gallery-data.json')
  .then(response => response.json())
  .then(data => {
    imagesData = data.flatMap(item =>
      item.images.map(src => ({
        package: item.package,
        school: item.school,
        src: src
      }))
    );
    applyFilter(selectedPackage);
    // تنظیم وضعیت دکمه‌های فیلتر بر اساس selectedPackage
    const packageFilterButtons = document.querySelectorAll('.gallery-filter.package button');
    packageFilterButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === selectedPackage) {
        btn.classList.add('active');
      }
    });
  })
  .catch(err => console.error('خطا در بارگذاری تصاویر:', err));

// تابع بارگذاری تصاویر
function loadImages() {
  const slice = filteredData.slice(loadedCount, loadedCount + loadPerScroll);

  let currentSchool = null;
  let schoolSection = null;
  let schoolGallery = null;
  let localIndex = 0;

  slice.forEach((img, index) => {
    if (img.school !== currentSchool) {
      currentSchool = img.school;

      schoolSection = document.createElement('div');
      schoolSection.className = 'school-section';

      const schoolTitle = document.createElement('h3');
      schoolTitle.textContent = currentSchool;
      schoolSection.appendChild(schoolTitle);

      schoolGallery = document.createElement('div');
      schoolGallery.className = 'school-gallery';
      schoolSection.appendChild(schoolGallery);

      galleryGrid.appendChild(schoolSection);

      localIndex = 0;
    }

    const container = document.createElement('div');
    if (localIndex % 5 === 0) {
      container.className = 'gallery-item large';
    } else {
      container.className = 'gallery-item small';
    }
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.borderRadius = '8px';

    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.package + ' - ' + img.school;

    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    const overlayText = document.createElement('span');
    overlayText.textContent = img.school;
    overlay.appendChild(overlayText);

    container.appendChild(imgEl);
    container.appendChild(overlay);
    schoolGallery.appendChild(container);

    localIndex++;
  });

  loadedCount += slice.length;
}

// تابع اعمال فیلتر بر اساس پکیج
function applyFilter(packageFilter = 'all') {
  galleryGrid.innerHTML = '';
  loadedCount = 0;
  selectedPackage = packageFilter;
  filteredData = imagesData.filter(img => 
    (selectedPackage === 'all' || img.package === selectedPackage)
  );
  loadImages();
}

// فیلتر پکیج‌ها
const packageFilterButtons = document.querySelectorAll('.gallery-filter.package button');
packageFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    packageFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedPackage = btn.dataset.filter;
    applyFilter(selectedPackage);
  });
});

// اضافه کردن کلاس‌های گرید و flex-wrap
galleryGrid.classList.add('gallery-grid', 'flex-wrap');

// Infinite scroll
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadImages();
  }
});
