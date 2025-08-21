document.addEventListener('DOMContentLoaded', function () {

    // --- Navbar Active Link on Scroll ---
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 75) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Animate sections and counters on scroll ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'impact-stats') {
                    startCounters();
                }
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));

    // --- Impact Number Counter Animation ---
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        const counters = document.querySelectorAll('.impact-number');
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '');
                const inc = target / 200; // Animation speed
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString();
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    }

    // --- Photo Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
        const lightboxImage = document.getElementById('lightboxImage');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightboxImage.src = item.src;
                lightboxModal.show();
            });
        });
    }

    // --- Web3 Wallet Connection Simulation ---
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    if (connectWalletBtn) {
        let isConnected = false;
        let userAddress = '';
        connectWalletBtn.addEventListener('click', () => {
            if (isConnected) {
                alert(`Already connected: ${userAddress}`);
                return;
            }
            userAddress = '0x' + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            isConnected = true;
            connectWalletBtn.innerHTML = `<i class="fas fa-check me-2"></i> Connected`;
            connectWalletBtn.classList.remove('btn-success');
            connectWalletBtn.classList.add('btn-outline-secondary');
            alert(`Wallet Connected!\nYour Address: ${userAddress}`);
        });
    }

    // --- Web3 Donation Tracker Simulation ---
    const tracker = document.getElementById('donation-tracker');
    if (tracker) {
        const transactionFeed = document.getElementById('transaction-feed');
        const verifyBtn = document.getElementById('verifyBtn');
        const donations = ["5 T-Shirts to Green Angels NGO", "1 Laptop (Recycled)", "Winter Coats to Shelter Home", "2 Old Phones (Recycled)"];
        function generateTxHash() { return '0x' + [...Array(20)].map(() => Math.floor(Math.random() * 16).toString(16)).join('') + '...'; }
        const addTransaction = (donation) => {
            const p = document.createElement('p');
            p.innerHTML = `[${new Date().toLocaleTimeString()}] ${donation} | Tx: <span class="hash">${generateTxHash()}</span>`;
            p.style.animation = 'fadeIn 0.5s';
            transactionFeed.prepend(p);
            if (transactionFeed.children.length > 5) { transactionFeed.removeChild(transactionFeed.lastChild); }
        };
        donations.forEach(d => addTransaction(d));
        setInterval(() => { addTransaction(donations[Math.floor(Math.random() * donations.length)]); }, 5000);
        verifyBtn.addEventListener('click', () => {
            if (!connectWalletBtn.innerHTML.includes('Connected')) {
                 alert('Please connect your wallet first.'); return;
            }
            alert(`Verification Success!\n\nItem: Your donation of 3 Sweaters\nStatus: Delivered\nBlockchain Tx: ${generateTxHash()}`);
        });
    }
});
