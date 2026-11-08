/**
 * Together We Can Thrive - Interactive Controller
 * High-performance, modular ES6+ functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initHeroVideoControls();
  initInteractiveMap();
  initDonationCalculator();
  initProgramModals();
  initNewsModals();
  initNewsletterForm();
  initSocialInteractions();
});

/* ==========================================================================
   1. Sticky Header Watcher
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  // Divi mobile nav toggle
  const navWrap = document.querySelector('.et_pb_menu_0_tb_header');
  if (navWrap) {
    const mobileNav = navWrap.querySelector('.mobile_nav');
    const mainUl = navWrap.querySelector('ul#menu-bwamenu');
    if (mobileNav && mainUl) {
      let mobileMenu = mobileNav.querySelector('.et_mobile_menu');
      if (!mobileMenu) {
        mobileMenu = document.createElement('ul');
        mobileMenu.className = 'et_mobile_menu';
        mobileMenu.id = 'mobile_menu';
        mobileMenu.innerHTML = mainUl.innerHTML;
        mobileNav.appendChild(mobileMenu);
      }

      mobileNav.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          mobileNav.classList.remove('opened');
          mobileNav.classList.add('closed');
          return;
        }
        e.stopPropagation();
        if (mobileNav.classList.contains('opened')) {
          mobileNav.classList.remove('opened');
          mobileNav.classList.add('closed');
        } else {
          mobileNav.classList.remove('closed');
          mobileNav.classList.add('opened');
        }
      });

      document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target)) {
          mobileNav.classList.remove('opened');
          mobileNav.classList.add('closed');
        }
      });
    }
  }

  // Standalone drawer support if present
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu-item a');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    toggleBtn.classList.add('active');
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. Hero Video Controls
   ========================================================================== */
function initHeroVideoControls() {
  const video = document.querySelector('.hero-video');
  const playBtn = document.getElementById('videoPlayBtn');
  const muteBtn = document.getElementById('videoMuteBtn');

  if (!video) return;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playBtn.innerHTML = '⏸ <span style="font-size:0.75rem;">PAUSE</span>';
      } else {
        video.pause();
        playBtn.innerHTML = '▶ <span style="font-size:0.75rem;">PLAY</span>';
      }
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      if (video.muted) {
        muteBtn.innerHTML = '🔇 <span style="font-size:0.75rem;">MUTED</span>';
      } else {
        muteBtn.innerHTML = '🔊 <span style="font-size:0.75rem;">SOUND ON</span>';
      }
    });
  }
}

/* ==========================================================================
   4. Interactive Africa Map & Country Information
   ========================================================================== */
const countryData = {
  cameroon: {
    name: 'Cameroon',
    flag: '🇨🇲',
    capital: 'Yaoundé',
    projects: 'Clean Water Systems & Rural Primary Health Clinics',
    impact: 'Over 42,000 community members with reliable access to solar-powered deep boreholes and essential maternal medicine.',
    quote: 'Access to safe water nearby allows our daughters to stay in school rather than walking 6 miles each day.'
  },
  chad: {
    name: 'Chad',
    flag: '🇹🇩',
    capital: "N'Djamena",
    projects: 'Emergency Nutrition, Drought Resilience & Hand Pumps',
    impact: '18 community water wells installed, providing clean hydration and disease prevention across arid villages.',
    quote: 'Water has restored peace and vitality to our farming community.'
  },
  drc: {
    name: 'Democratic Republic of the Congo',
    flag: '🇨🇩',
    capital: 'Kinshasa',
    projects: 'CARILINO Orphanage Farm & Solar-Powered Irrigation',
    impact: 'Transformed 7.5 acres into productive agriculture, sustaining 55 orphaned children and 160 community neighbors with fresh vegetables year-round.',
    quote: 'Our children now see healthy food growing right where land once lay barren.'
  },
  ethiopia: {
    name: 'Ethiopia',
    flag: '🇪🇹',
    capital: 'Addis Ababa',
    projects: 'Child Nutrition, Micro-Grants & Secondary Education',
    impact: 'Supporting orphaned and vulnerable youth through tuition sponsorships, textbooks, and hot meal distributions.',
    quote: 'With a warm meal and books, every child is eager to learn and thrive.'
  },
  kenya: {
    name: 'Kenya',
    flag: '🇰🇪',
    capital: 'Nairobi',
    projects: 'Seed School Nutrition Program in Kibera & Clean Water Storage',
    impact: 'Providing daily hot, balanced lunches to over 850 primary students in informal urban settlements.',
    quote: 'When hunger leaves the classroom, academic achievement and attendance soar.'
  },
  malawi: {
    name: 'Malawi',
    flag: '🇲🇼',
    capital: 'Lilongwe',
    projects: 'Community Boreholes & Female Agricultural Collectives',
    impact: 'Over 65 deep water points operational, alongside seed distribution to 120 rural women farmers.',
    quote: 'We now harvest surplus maize and beans to fund our children’s school fees.'
  },
  rwanda: {
    name: 'Rwanda',
    flag: '🇷🇼',
    capital: 'Kigali',
    projects: 'Clean Water Catchment & Youth Vocational Training',
    impact: 'Supplying 15 rural communities with gravity-flow potable water pipelines and vocational toolkits.',
    quote: 'Clean water in our hills has dramatically improved health and school attendance.'
  },
  sierra_leone: {
    name: 'Sierra Leone',
    flag: '🇸🇱',
    capital: 'Freetown',
    projects: 'FHDO Agricultural Training for Women & Youth',
    impact: 'Trained 75 rural women and 25 young adults in sustainable crop rotation, cassava production, and financial literacy.',
    quote: 'Farming is our independence and our hope for a thriving tomorrow.'
  },
  tanzania: {
    name: 'Tanzania',
    flag: '🇹🇿',
    capital: 'Dodoma',
    projects: 'Vocational Training Centers & Medical Care for Mothers',
    impact: 'Equipped 310 young women with tailoring and carpentry skills to launch self-sustaining micro-enterprises.',
    quote: 'Learning a trade broke the cycle of poverty for my family.'
  },
  uganda: {
    name: 'Uganda',
    flag: '🇺🇬',
    capital: 'Kampala',
    projects: 'Orphan Care Homes & Hygiene Outreach',
    impact: 'Comprehensive shelter, healthcare, and educational mentorship for 140 vulnerable children.',
    quote: 'Together We Can Thrive gave us a family and a future.'
  },
  zambia: {
    name: 'Zambia',
    flag: '🇿🇲',
    capital: 'Lusaka',
    projects: 'Clean Water Boreholes & School Meal Gardens',
    impact: '24 solar-pumped water towers serving schools and health outposts across Southern Province.',
    quote: 'Water flows straight into our school clinic for the first time in our history.'
  },
  zimbabwe: {
    name: 'Zimbabwe',
    flag: '🇿🇼',
    capital: 'Harare',
    projects: 'Rural Clinic Solar Electrification & Nutrition Gardens',
    impact: 'Provided 24/7 solar power and clean water access to 3 regional maternity clinics.',
    quote: 'Mothers can now safely deliver babies under bright light with clean, sterile water.'
  }
};

function initInteractiveMap() {
  const mapContainer = document.getElementById('map_11155');
  const overlay = document.getElementById('mapCountryOverlay');
  const tooltip = document.getElementById('mapCountryTooltip');
  const closeBtn = document.getElementById('mapOverlayCloseBtn');
  const filterPills = document.querySelectorAll('.country-filter-pill');
  const countrySpans = document.querySelectorAll('.country-pill-span');

  if (!mapContainer) return;

  const activePaths = mapContainer.querySelectorAll('.africa-country.active-country');
  const allPaths = mapContainer.querySelectorAll('.africa-country');

  const codeToKey = {
    'CM': 'cameroon',
    'TD': 'chad',
    'CD': 'drc',
    'ET': 'ethiopia',
    'KE': 'kenya',
    'MW': 'malawi',
    'RW': 'rwanda',
    'SL': 'sierra_leone',
    'TZ': 'tanzania',
    'UG': 'uganda',
    'ZM': 'zambia',
    'ZW': 'zimbabwe'
  };

  const selectCountry = (countryKey) => {
    if (!countryKey || countryKey === 'all') {
      resetSelection();
      return;
    }

    const data = countryData[countryKey];
    if (!data) return;

    // Highlight SVG path
    allPaths.forEach(p => p.classList.remove('selected'));
    const targetPath = mapContainer.querySelector(`[data-country="${countryKey}"]`);
    if (targetPath) {
      targetPath.classList.add('selected');
    }

    // Highlight filter pill
    filterPills.forEach(p => {
      if (p.dataset.country === countryKey) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    // Populate and show overlay card
    if (overlay) {
      const flagEl = document.getElementById('mapOverlayFlag');
      const nameEl = document.getElementById('mapOverlayName');
      const projectsEl = document.getElementById('mapOverlayProjects');
      const impactEl = document.getElementById('mapOverlayImpact');
      const quoteEl = document.getElementById('mapOverlayQuote');
      const donateBtn = document.getElementById('mapOverlayDonateBtn');

      if (flagEl) flagEl.textContent = data.flag;
      if (nameEl) nameEl.textContent = data.name;
      if (projectsEl) projectsEl.textContent = data.projects;
      if (impactEl) impactEl.textContent = data.impact;
      if (quoteEl) quoteEl.textContent = `“${data.quote.replace(/^[“"]|[”"]$/g, '')}”`;
      if (donateBtn) donateBtn.textContent = `Support Projects in ${data.name} →`;

      overlay.style.display = 'block';
    }
  };

  const resetSelection = () => {
    allPaths.forEach(p => p.classList.remove('selected'));
    filterPills.forEach(p => {
      if (p.dataset.country === 'all') {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
    if (overlay) {
      overlay.style.display = 'none';
    }
  };

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      resetSelection();
    });
  }

  // Bind clicks to active paths in SVG map
  activePaths.forEach(path => {
    const id = path.dataset.id;
    const key = path.dataset.country || codeToKey[id];

    path.addEventListener('click', (e) => {
      e.stopPropagation();
      selectCountry(key);
    });

    // Tooltip hover
    if (tooltip) {
      path.addEventListener('mouseenter', (e) => {
        const countryName = path.dataset.name || (countryData[key] ? countryData[key].name : 'Country');
        tooltip.textContent = `${countryName} (Active Program Country · Click to explore)`;
        tooltip.style.display = 'block';
      });

      path.addEventListener('mousemove', (e) => {
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
      });

      path.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });
    }
  });

  // Hover for inactive paths
  const inactivePaths = mapContainer.querySelectorAll('.africa-country.inactive-country');
  inactivePaths.forEach(path => {
    if (tooltip) {
      path.addEventListener('mouseenter', (e) => {
        const countryName = path.dataset.name || 'Country';
        tooltip.textContent = countryName;
        tooltip.style.display = 'block';
      });

      path.addEventListener('mousemove', (e) => {
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
      });

      path.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });
    }
  });

  // Bind clicks to Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const country = pill.dataset.country;
      selectCountry(country);
    });
  });

  // Bind clicks to legacy country spans if present
  countrySpans.forEach(span => {
    span.addEventListener('click', () => {
      const country = span.dataset.country;
      selectCountry(country);
    });
  });
}

/* ==========================================================================
   5. Interactive Donation Calculator & Modal
   ========================================================================== */
function initDonationCalculator() {
  const freqBtns = document.querySelectorAll('.freq-btn');
  const chipBtns = document.querySelectorAll('.chip-btn');
  const customInput = document.getElementById('customAmountInput');
  const impactNotice = document.getElementById('dynamicImpactNotice');
  const submitBtn = document.getElementById('submitDonationBtn');

  if (!impactNotice || !submitBtn) return;

  let currentFrequency = 'monthly';
  let currentAmount = 50;

  const impactStatements = {
    monthly: {
      25: 'Provides continuous clean, safe drinking water for 12 children throughout the year.',
      50: 'Sponsors school fees, daily nutritious meals, and textbooks for 2 vulnerable students every month.',
      100: 'Funds full healthcare supplies, emergency malaria treatments, and clinic visits for 20 children.',
      250: 'Supplies high-yield seeds, solar drip irrigation maintenance, and agricultural training for an entire farming co-op.'
    },
    onetime: {
      25: 'Provides an emergency water filtration and hygiene kit for a family in need.',
      50: 'Provides complete school textbooks and uniforms for one eager student.',
      100: 'Supplies 100 emergency hot lunches at the Seed School in Kibera.',
      250: 'Installs a dedicated rainwater harvesting catchment tank for a rural clinic.'
    }
  };

  function updateImpactNotice() {
    const freqText = currentFrequency === 'monthly' ? 'monthly gift' : 'one-time gift';
    let text = '';

    if (impactStatements[currentFrequency][currentAmount]) {
      text = impactStatements[currentFrequency][currentAmount];
    } else {
      if (currentAmount < 35) {
        text = `Your ${freqText} of $${currentAmount} delivers clean hydration and emergency care packs directly to frontline villages.`;
      } else if (currentAmount < 150) {
        text = `Your ${freqText} of $${currentAmount} provides classrooms with food, safe drinking water, and quality learning materials.`;
      } else {
        text = `Your generous ${freqText} of $${currentAmount} powers sustainable community agriculture, deep boreholes, and medical clinics.`;
      }
    }

    impactNotice.innerHTML = `🌟 <strong>Impact:</strong> ${text}`;
    submitBtn.textContent = `DONATE $${currentAmount} ${currentFrequency === 'monthly' ? '/ MONTH' : 'TODAY'}`;
  }

  freqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      freqBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFrequency = btn.dataset.freq;
      updateImpactNotice();
    });
  });

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAmount = parseInt(btn.dataset.amount, 10);
      if (customInput) customInput.value = '';
      updateImpactNotice();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val) && val > 0) {
        chipBtns.forEach(b => b.classList.remove('active'));
        currentAmount = val;
        updateImpactNotice();
      }
    });
  }

  submitBtn.addEventListener('click', () => {
    openDonationModal(currentAmount, currentFrequency);
  });

  updateImpactNotice();
}

function openDonationModal(amount, frequency) {
  const modal = document.getElementById('donationModal');
  const details = document.getElementById('modalDonationSummary');
  if (!modal) return;
  modal.style.display = 'flex';
  modal.classList.add('open');

  details.innerHTML = `
    <div style="background:#F8FAFC; padding:1.25rem; border-radius:8px; border:1px solid #E2E8F0; margin-bottom:1.5rem;">
      <h4 style="margin-bottom:0.25rem; color:#005A87;">Together We Can Thrive</h4>
      <p style="font-size:1.15rem; font-weight:800; color:#1F2937;">$${amount}.00 ${frequency === 'monthly' ? 'Monthly Recurring' : 'One-Time Donation'}</p>
      <p style="font-size:0.85rem; color:#6B7280;">100% Tax Deductible under IRS 501(c)(3) • Platinum Transparency Certified</p>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   6. Program Detail Modals
   ========================================================================== */
const programData = {
  water: {
    title: 'Clean Water Program',
    image: 'https://africanrelief.org/wp-content/uploads/2020/04/wate1.png',
    badge: 'Core Catalyst',
    desc: 'Clean water is the cornerstone of community survival and economic independence. When clean water is established, waterborne diseases drop by over 80%, girls can attend class instead of walking hours to fetch murky stream water, and community vegetable plots flourish.',
    stats: ['Over 140 Deep Boreholes Drilled', '38 Solar Pump Storage Systems', '180,000+ Direct Beneficiaries'],
    action: 'Support Clean Water'
  },
  education: {
    title: 'Education Program',
    image: 'https://africanrelief.org/wp-content/uploads/2020/04/ed1.png',
    badge: 'Youth Empowerment',
    desc: 'Education is the passport to breaking systemic poverty. We partner with local schools across Kenya, Chad, and Sierra Leone to provide tuition grants, solar desk lamps, textbooks, desks, and classroom sanitation so every boy and girl has the tools to succeed.',
    stats: ['2,400+ Students Sponsored', '12 Community Libraries Equipped', '98% Graduation Rate in Sponsored Cohorts'],
    action: 'Fund a Classroom'
  },
  healthcare: {
    title: 'Health Care Program',
    image: 'https://africanrelief.org/wp-content/uploads/2020/04/he1.png',
    badge: 'Lifesaving Care',
    desc: 'Our health programs support rural clinics with essential medications, solar electricity for safe nighttime childbirth, immunization clinics, and mobile health workers who bring malaria diagnostics and maternal checkups to remote villages.',
    stats: ['52 Rural Health Posts Supported', '28,000+ Pediatric Checkups', 'Zero Night Delivery Blackouts with Solar Kits'],
    action: 'Support Rural Clinics'
  },
  orphan: {
    title: 'Orphan Care Program',
    image: 'https://africanrelief.org/wp-content/uploads/2020/04/orp1.png',
    badge: 'Family & Dignity',
    desc: 'We support community-rooted orphanages like CARILINO in the DRC and partners in Uganda, ensuring children who have lost their parents receive family-style love, nutritious daily meals, counseling, healthcare, and educational opportunity in a dignified environment.',
    stats: ['320+ Children in Family Homes', '100% School Enrollment', 'On-site Farming for Self-Sufficiency'],
    action: 'Sponsor an Orphan'
  },
  agriculture: {
    title: 'Agriculture Program',
    image: 'https://africanrelief.org/wp-content/uploads/2020/04/ag1.png',
    badge: 'Food Sovereignty',
    desc: 'Farming is the bedrock of rural African resilience. Together with local partners like FHDO in Sierra Leone, we train women farmers and youth in organic farming, crop rotation, drought-hardy cassava, and market distribution so communities can feed themselves forever.',
    stats: ['450+ Farmers Certified', '7.5-Acre Flagship Farm in Kinshasa', 'Average 240% Crop Yield Increase'],
    action: 'Empower Farmers'
  },
  meals: {
    title: 'School Meal Program',
    image: 'https://africanrelief.org/wp-content/uploads/2024/02/BWA-BREAD-AND-WATER-FOR-AFRICA-Basic-Relief-Support-.webp',
    badge: 'Zero Hunger',
    desc: 'A hungry child cannot focus, learn, or retain knowledge. Our School Meal Program provides hot, nutritious breakfasts and lunches—sourced from local farms—keeping children healthy, energized, and eager to come to school every single morning.',
    stats: ['850+ Daily Meals Served in Kibera', '99.4% Student Attendance Record', 'Local Farm Produce Sourcing'],
    action: 'Feed School Children'
  },
  income: {
    title: 'Income Generation Program',
    image: 'https://africanrelief.org/wp-content/uploads/2017/07/Banana-harvest-1.jpg',
    badge: 'Sustainable Livelihoods',
    desc: 'True relief means self-sufficiency. We provide micro-capital grants, sewing machines, tailoring workshops, and poultry seed funding to widowed mothers and young adults to build independent, thriving businesses that sustain generations.',
    stats: ['280+ Women-Led Businesses Launched', '96% Micro-Loan Repayment/Reinvestment', 'Generational Household Stability'],
    action: 'Support Entrepreneurs'
  }
};

function initProgramModals() {
  const readBtns = document.querySelectorAll('.btn-program-read');
  const modal = document.getElementById('programModal');
  const modalBody = document.getElementById('modalProgramBody');

  if (!modal || !modalBody) return;

  readBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pKey = btn.dataset.program;
      const data = programData[pKey];
      if (!data) return;

      modalBody.innerHTML = `
        <div style="position:relative; height:240px; border-radius:10px; overflow:hidden; margin-bottom:1.5rem;">
          <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">
          <span style="position:absolute; top:1rem; left:1rem; background:rgba(0,90,135,0.9); color:#fff; font-size:0.75rem; font-weight:700; padding:0.3rem 0.8rem; border-radius:999px;">${data.badge}</span>
        </div>
        <h3 style="font-size:1.6rem; color:#005A87; margin-bottom:0.75rem;">${data.title}</h3>
        <p style="font-size:1.05rem; line-height:1.7; color:#434960; margin-bottom:1.5rem;">${data.desc}</p>
        
        <h5 style="font-size:0.95rem; text-transform:uppercase; color:#1F2937; margin-bottom:0.75rem; font-weight:800;">Key Program Achievements</h5>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem; margin-bottom:2rem;">
          ${data.stats.map(s => `<li style="display:flex; align-items:center; gap:0.5rem; font-weight:600; color:#15803D;">✓ <span style="color:#1F2937;">${s}</span></li>`).join('')}
        </ul>

        <button onclick="document.getElementById('programModal').classList.remove('open'); document.getElementById('donationModal').classList.add('open');" class="btn-primary-donate" style="width:100%; text-align:center; justify-content:center;">
          ${data.action}
        </button>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* ==========================================================================
   7. News Detail Modals
   ========================================================================== */
function initNewsModals() {
  const newsLinks = document.querySelectorAll('.news-link');
  const modal = document.getElementById('newsModal');
  const modalBody = document.getElementById('modalNewsBody');

  if (!modal || !modalBody) return;

  newsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.news-card');
      if (!card) return;

      const title = card.querySelector('.news-title').textContent;
      const date = card.querySelector('.news-date').textContent;
      const imgSrc = card.querySelector('.news-img').src;
      const excerpt = card.querySelector('.news-excerpt').textContent;

      modalBody.innerHTML = `
        <div style="height:260px; border-radius:10px; overflow:hidden; margin-bottom:1.5rem;">
          <img src="${imgSrc}" alt="${title}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <span style="font-size:0.85rem; font-weight:700; color:#B75131;">${date} • Field Report</span>
        <h3 style="font-size:1.6rem; color:#1F2937; line-height:1.3; margin:0.5rem 0 1rem;">${title}</h3>
        <p style="font-size:1.05rem; line-height:1.75; color:#434960; margin-bottom:1.5rem;">${excerpt}</p>
        <p style="font-size:1.05rem; line-height:1.75; color:#434960; margin-bottom:1.5rem;">
          Thanks to our generous donors and dedicated partners on the ground, this initiative continues to expand across community clinics, schools, and family farms. Every project is monitored with strict accountability and transparent reporting.
        </p>
        <div style="background:#F0FDF4; border-left:4px solid #2CA25F; padding:1rem; border-radius:6px; margin-bottom:1.5rem; font-size:0.95rem; color:#166534;">
          💬 “When communities are empowered with training, tools, and clean water, they don’t just survive—they thrive.”
        </div>
        <button onclick="document.getElementById('newsModal').classList.remove('open');" class="btn-spotlight-primary" style="width:100%; text-align:center; justify-content:center;">
          Close Story
        </button>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
}

// Global modal close handlers
window.closeAllModals = function() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
};

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop') || e.target.classList.contains('modal-close-btn')) {
    window.closeAllModals();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeAllModals();
  }
});

/* ==========================================================================
   8. Working Newsletter Form & Toasts
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterEmail');

  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      showToast('⚠️ Please enter a valid email address.', '#DC2626');
      return;
    }

    input.value = '';
    showToast('🎉 Thank you for subscribing to Together We Can Thrive updates!', '#16A34A');
  });
}

function showToast(message, borderColor = '#16A34A') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeftColor = borderColor;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   9. Social Interactions (Likes, Shares, Comments, Load More)
   ========================================================================== */
function initSocialInteractions() {
  // 1. Like buttons in Social Feeds
  const likeButtons = document.querySelectorAll('.cff-like-btn');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const counterEl = document.getElementById(targetId);
      let count = parseInt(btn.dataset.count, 10);
      const isLiked = btn.dataset.liked === 'true';

      if (isLiked) {
        btn.dataset.liked = 'false';
        btn.classList.remove('liked');
        count -= 1;
        btn.dataset.count = count;
        if (counterEl) counterEl.textContent = count;
      } else {
        btn.dataset.liked = 'true';
        btn.classList.add('liked');
        count += 1;
        btn.dataset.count = count;
        if (counterEl) counterEl.textContent = count;
        showToast('❤️ Thank you for liking this story from the field!', '#1877F2');
      }
    });
  });

  // 2. Comment buttons
  const commentButtons = document.querySelectorAll('.cff-comment-btn');
  commentButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('💬 Comments are synced with Facebook. Leave a supportive note on our official page!', '#1877F2');
    });
  });

  // 3. Share buttons
  const shareButtons = document.querySelectorAll('.cff-share-btn');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('🔗 Story link copied to clipboard!', '#1877F2');
      } else {
        showToast('🔗 Share Together We Can Thrive with your friends!', '#1877F2');
      }
    });
  });

  // 4. Load More Button
  const loadMoreBtn = document.getElementById('cff-load-more');
  if (loadMoreBtn) {
    let loadCount = 0;
    loadMoreBtn.addEventListener('click', () => {
      if (loadCount === 0) {
        loadMoreBtn.innerHTML = '<span>Loading recent updates...</span>';
        setTimeout(() => {
          const grid = document.querySelector('.cff-posts-grid');
          if (grid) {
            const extraCard = document.createElement('article');
            extraCard.className = 'cff-card';
            extraCard.innerHTML = `
              <div class="cff-card-header">
                <img src="assets/logo.svg" alt="Avatar" class="cff-post-avatar" />
                <div class="cff-post-author-info">
                  <span class="cff-post-author-name">Together We Can Thrive</span>
                  <span class="cff-post-time">1 week ago · 🌐</span>
                </div>
                <a href="https://www.facebook.com/175310219146269" target="_blank" class="cff-post-fb-icon" aria-label="View on Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
              <div class="cff-card-media">
                <img src="assets/img/news-sierra-leone-ag.png" alt="Sierra Leone Agricultural Training" class="cff-card-img" />
              </div>
              <div class="cff-card-body">
                <p class="cff-card-text">
                  🌾 In Sierra Leone, 75 women and 25 youth have completed sustainable agricultural training with our partner FHDO! They are harvesting healthy cassava and groundnuts to feed their households and fund schooling.<br><br>
                  💬 <em>“When rural women lead farming collectives, whole villages flourish.”</em><br><br>
                  🧡 Thank you for standing with African farming families!
                </p>
              </div>
              <div class="cff-card-footer">
                <div class="cff-reactions-bar">
                  <span class="cff-reaction-emojis">👍 ❤️</span>
                  <span class="cff-reaction-count">21</span>
                  <span class="cff-share-count">4 comments · 5 shares</span>
                </div>
                <div class="cff-action-buttons">
                  <button type="button" class="cff-action-btn cff-like-btn" onclick="this.classList.toggle('liked'); showToast('❤️ Thank you for your support!', '#1877F2');">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    <span>Like</span>
                  </button>
                  <button type="button" class="cff-action-btn cff-comment-btn" onclick="showToast('💬 Comments synced with Facebook!', '#1877F2');">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <span>Comment</span>
                  </button>
                  <button type="button" class="cff-action-btn cff-share-btn" onclick="showToast('🔗 Story link copied!', '#1877F2');">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            `;
            grid.appendChild(extraCard);
          }
          loadMoreBtn.innerHTML = `
            <span class="cff-dots-icon">
              <svg width="20" height="20" viewBox="0 0 21 20" fill="currentColor">
                <circle cx="5.75" cy="9.75" r="1.5" />
                <circle cx="10.5" cy="9.75" r="1.5" />
                <circle cx="15.25" cy="9.75" r="1.5" />
              </svg>
            </span>
            <span>All Recent Posts Loaded</span>
          `;
          loadMoreBtn.disabled = true;
          loadMoreBtn.style.opacity = '0.7';
          loadMoreBtn.style.cursor = 'default';
          showToast('✨ Loaded recent social updates from the field!', '#16A34A');
          loadCount++;
        }, 500);
      }
    });
  }
}

// Complete checkout simulation
window.completeDonationCheckout = function(e) {
  e.preventDefault();
  window.closeAllModals();
  showToast('💖 Donation confirmed! Your receipt and tax deduction letter has been sent.', '#16A34A');
};

window.openDonationModal = openDonationModal;
