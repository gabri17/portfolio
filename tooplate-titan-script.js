/* JavaScript Document

Tooplate 2147 Titan Folio

https://www.tooplate.com/view/2147-titan-folio
*/


// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav a').forEach(function(link) {
    link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile scroll progress bar fallback for browsers without CSS scroll-driven animations
if (!window.CSS || !CSS.supports('animation-timeline', 'scroll()')) {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const updateScrollProgress = function() {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const progressPercentage = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
            scrollProgress.style.transform = `scaleX(${progressPercentage})`;
        };
        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        window.addEventListener('resize', updateScrollProgress);
        updateScrollProgress();
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
});

// Update active menu item based on scroll
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const menuItem = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        const mobileMenuItem = document.querySelector(`.mobile-nav a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all menu items
            document.querySelectorAll('.nav-links a').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.mobile-nav a').forEach(item => item.classList.remove('active'));
            
            // Add active class to current menu item
            if (menuItem) menuItem.classList.add('active');
            if (mobileMenuItem) mobileMenuItem.classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveMenuItem);

// Set initial active state
updateActiveMenuItem();

// Timeline functionality
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineFilters = document.querySelectorAll('.timeline-filter');
    
    // Timeline scroll progress
    function updateTimelineProgress() {
        const timelineContainer = document.querySelector('.timeline-container');
        const containerRect = timelineContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (containerRect.top < windowHeight && containerRect.bottom > 0) {
            const progress = Math.max(0, Math.min(1, 
                (windowHeight - containerRect.top) / (containerRect.height + windowHeight)
            ));
            timelineProgress.style.height = `${progress * 100}%`;
        }
    }
    
    // Timeline item visibility
    function updateTimelineItems() {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !item.classList.contains('visible')) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            }
        });
    }
    
    // Timeline filtering
    timelineFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter
            timelineFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter timeline items
            timelineItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Hide project items on load, show only education
    timelineItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (category !== 'education') {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
    
    // Timeline node interactions
    document.querySelectorAll('.timeline-node').forEach(node => {
        node.addEventListener('click', function() {
            // Remove active class from all nodes
            document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
            // Add active class to clicked node
            this.classList.add('active');
            
            // Smooth scroll to the timeline item
            const timelineItem = this.closest('.timeline-item');
            timelineItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        updateTimelineProgress();
        updateTimelineItems();
    });
    
    // Initial calls
    updateTimelineProgress();
    updateTimelineItems();
}

// Initialize timeline when DOM is ready
document.addEventListener('DOMContentLoaded', initTimeline);

// Skills interaction - sync IDE module rows with stacked skill cards
const skillLabels = {
    programming: 'languages',
    frontend: 'frontend',
    backend: 'backend',
    parallel: 'hpc_computing',
    ai: 'ml_frameworks',
    devops: 'devops'
};

const skillDetailsFallback = {
    programming: 'Java, Python, C/C++, JavaScript, TypeScript, SQL, Solidity, Shell',
    frontend: 'Angular, Vue.js, HTML5, CSS3',
    backend: 'Spring Boot, Node.js, Express, PostgreSQL, MongoDB, Hibernate, JDBC',
    parallel: 'OpenMP, MPI, PySpark, Akka',
    ai: 'TensorFlow, PyTorch, scikit-learn',
    devops: 'Docker, Kubernetes, Git, Linux, CI/CD'
};

const skillOrder = ['programming', 'frontend', 'backend', 'parallel', 'ai', 'devops'];
let activeSkill = 'programming';

function updateSkillStack(selectedSkill) {
    activeSkill = selectedSkill || 'programming';
    const targetIdx = skillOrder.indexOf(activeSkill);
    if (targetIdx === -1) return;

    // Order of skills with selectedSkill at depth 0, followed by the rest cyclically
    const orderedSkills = [];
    for (let i = 0; i < skillOrder.length; i++) {
        orderedSkills.push(skillOrder[(targetIdx + i) % skillOrder.length]);
    }

    // Apply depths to each card in the stack
    document.querySelectorAll('.skill-item[data-skill]').forEach(function(card) {
        const skill = card.getAttribute('data-skill');
        const depth = orderedSkills.indexOf(skill);

        card.setAttribute('data-depth', depth >= 0 ? depth : 5);

        if (depth === 0) {
            card.classList.add('active', 'is-top');
            card.classList.remove('card-promote');
            // Force reflow to re-trigger card promotion animation
            void card.offsetWidth;
            card.classList.add('card-promote');
        } else {
            card.classList.remove('active', 'is-top', 'card-promote');
        }
    });

    // Update stack counter
    const stackCounter = document.getElementById('stackCounter');
    if (stackCounter) {
        stackCounter.textContent = (targetIdx + 1) + ' / ' + skillOrder.length;
    }

    // Update stack indicator dots
    document.querySelectorAll('.stack-dot[data-skill]').forEach(function(dot) {
        if (dot.getAttribute('data-skill') === activeSkill) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function selectSkill(skill) {
    const ideStatusText = document.getElementById('ideStatusText');
    const targetNode = skill ? document.querySelector('.skill-node[data-skill="' + skill + '"]') : null;
    const targetCard = skill ? document.querySelector('.skill-item[data-skill="' + skill + '"]') : null;

    document.querySelectorAll('.skill-node').forEach(function(n) {
        n.classList.remove('active');
        n.setAttribute('aria-pressed', 'false');
    });

    if (skill && targetNode && targetCard) {
        targetNode.classList.add('active');
        targetNode.setAttribute('aria-pressed', 'true');
        updateSkillStack(skill);

        if (ideStatusText) {
            // First read active tech chips from the card
            var chips = Array.from(targetCard.querySelectorAll('.tech-chip'))
                .map(function(c) { return c.textContent.trim(); })
                .filter(Boolean);
            var details = '';
            if (chips.length > 0) {
                details = chips.join(', ');
            } else {
                var detailsEl = targetCard.querySelector('p');
                if (detailsEl && detailsEl.textContent.trim()) {
                    details = detailsEl.textContent.trim();
                } else if (skillDetailsFallback[skill]) {
                    details = skillDetailsFallback[skill];
                }
            }
            var label = skillLabels[skill] || skill;
            ideStatusText.textContent = details ? (label + ' → ' + details) : label;
        }
    }
}

// Click on left IDE rows
document.querySelectorAll('.skill-node[data-skill]').forEach(function(node) {
    node.addEventListener('click', function() {
        var skill = this.getAttribute('data-skill');
        selectSkill(skill);
    });
});

// Click on stacked cards directly
document.querySelectorAll('.skill-item[data-skill]').forEach(function(card) {
    card.addEventListener('click', function() {
        var skill = this.getAttribute('data-skill');
        selectSkill(skill);
    });
});

// Next / Previous buttons for the card stack
const stackPrevBtn = document.getElementById('stackPrevBtn');
const stackNextBtn = document.getElementById('stackNextBtn');

if (stackPrevBtn) {
    stackPrevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const curIdx = skillOrder.indexOf(activeSkill);
        const prevIdx = (curIdx - 1 + skillOrder.length) % skillOrder.length;
        selectSkill(skillOrder[prevIdx]);
    });
}

if (stackNextBtn) {
    stackNextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const curIdx = skillOrder.indexOf(activeSkill);
        const nextIdx = (curIdx + 1) % skillOrder.length;
        selectSkill(skillOrder[nextIdx]);
    });
}

// Stack indicator dots
document.querySelectorAll('.stack-dot[data-skill]').forEach(function(dot) {
    dot.addEventListener('click', function(e) {
        e.stopPropagation();
        const skill = this.getAttribute('data-skill');
        selectSkill(skill);
    });
});

// Initial stack setup on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        selectSkill('programming');
    });
} else {
    selectSkill('programming');
}

// ==========================================================================
// Easter Egg: IDE Run Button & Blackjack Mini-Game
// ==========================================================================

(function initBlackjackEasterEgg() {
    // Elements
    const ideRunBtn = document.getElementById('ideRunBtn');
    const ideCodeBody = document.getElementById('ideCodeBody');
    const ideBlackjack = document.getElementById('ideBlackjack');
    const ideTabIcon = document.getElementById('ideTabIcon');
    const ideTabTitle = document.getElementById('ideTabTitle');
    const ideStatusText = document.getElementById('ideStatusText');

    // Blackjack DOM Elements
    const bjCoinsEl = document.getElementById('bjCoins');
    const bjBetDisplay = document.getElementById('bjBetDisplay');
    const bjStatusPill = document.getElementById('bjStatusPill');
    const bjBanner = document.getElementById('bjBanner');
    const bjDealerCards = document.getElementById('bjDealerCards');
    const bjPlayerCards = document.getElementById('bjPlayerCards');
    const bjDealerScore = document.getElementById('bjDealerScore');
    const bjPlayerScore = document.getElementById('bjPlayerScore');

    // Control groups
    const bjBetControls = document.getElementById('bjBetControls');
    const bjActionControls = document.getElementById('bjActionControls');
    const bjRoundOverControls = document.getElementById('bjRoundOverControls');
    const bjGameOverPanel = document.getElementById('bjGameOverPanel');

    // Buttons
    const bjDealBtn = document.getElementById('bjDealBtn');
    const bjHitBtn = document.getElementById('bjHitBtn');
    const bjStandBtn = document.getElementById('bjStandBtn');
    const bjNextBtn = document.getElementById('bjNextBtn');
    const bjBackBtn = document.getElementById('bjBackBtn');
    const bjRestartBtn = document.getElementById('bjRestartBtn');
    const bjGameOverRestartBtn = document.getElementById('bjGameOverRestartBtn');
    const bjGameOverBackBtn = document.getElementById('bjGameOverBackBtn');
    const chipBtns = document.querySelectorAll('.bj-chip-btn');

    if (!ideRunBtn || !ideBlackjack) return;

    // Run button Easter Egg logic (17 clicks required)
    let runClicks = 0;
    const REQUIRED_CLICKS = 17;
    let isUnlocked = false;
    let isGameOpen = false;

    // Game state
    let coins = 100;
    let selectedBet = 10;
    let currentBet = 0;
    let deck = [];
    let playerHand = [];
    let dealerHand = [];
    let phase = 'betting'; // 'betting', 'player', 'dealer', 'roundOver', 'gameOver'

    // Suits & Ranks
    const SUITS = [
        { sym: '♠', name: 'spades', isRed: false },
        { sym: '♥', name: 'hearts', isRed: true },
        { sym: '♦', name: 'diamonds', isRed: true },
        { sym: '♣', name: 'clubs', isRed: false }
    ];
    const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    // Progressive status hints for clicking Run
    const statusMessages = {
        //1: "Running gabriele.stack.ts... (exit code: 0)",
        //3: "gabriele.stack.ts executed successfully in 12ms",
        //6: "Stack compiled: 0 warnings, 0 errors. Systems nominal.",
        //9: "Execution verified. Still clicking? 🤔",
        //12: "Stack cache cleared. Something unusual is loading...",
        //14: "Kernel process warming up... (3 clicks left)",
        //15: "Secret protocol compiling... (2 clicks left)",
        //16: "⚡ Terminal override in 1 click!"
        14: "Stack compiled: 0 warnings, 0 errors.",
        15: "Running gabriele.stack.ts... (exit code: 0)",
        16: "gabriele.stack.ts executed successfully in 12ms"

    };

    ideRunBtn.addEventListener('click', function() {
        if (isGameOpen) {
            return;
        }

        if (isUnlocked) {
            openGame();
            return;
        }

        runClicks++;

        // Visual press bounce
        ideRunBtn.style.transform = 'scale(0.92)';
        setTimeout(() => { ideRunBtn.style.transform = ''; }, 100);

        if (statusMessages[runClicks] && ideStatusText) {
            ideStatusText.textContent = statusMessages[runClicks];
        } else if (runClicks < REQUIRED_CLICKS && ideStatusText) {
            //ideStatusText.textContent = `Running stack... [${runClicks}/${REQUIRED_CLICKS}]`;
        }

        if (runClicks >= REQUIRED_CLICKS) {
            isUnlocked = true;
            if (ideStatusText) {
                ideStatusText.textContent = "🔓 Access Granted: Welcome to Las Vegas!";
            }
            openGame();
        }
    });

    function openGame() {
        isGameOpen = true;
        if (ideCodeBody) ideCodeBody.style.display = 'none';
        ideBlackjack.style.display = 'flex';

        if (ideTabIcon) ideTabIcon.textContent = '🃏';
        if (ideTabTitle) ideTabTitle.textContent = 'blackjack.ts';

        if (phase === 'gameOver') {
            triggerGameOver();
        } else if (phase === 'roundOver') {
            // Keep current view or allow next round
        } else if (phase !== 'player' && phase !== 'dealer') {
            startBettingPhase();
        }
    }

    function closeGame() {
        restartFullGame()

        isGameOpen = false;
        runClicks = 0;
        isUnlocked = false;
        ideBlackjack.style.display = 'none';
        if (ideCodeBody) ideCodeBody.style.display = 'flex';

        if (ideTabIcon) ideTabIcon.innerHTML = '&lt;/&gt;';
        if (ideTabTitle) ideTabTitle.textContent = 'gabriele.stack.ts';

        if (ideStatusText) {
            ideStatusText.textContent = 'Select a skill module to highlight';
        }
    }

    function restartFullGame() {
        coins = 100;
        selectedBet = 10;
        currentBet = 0;
        playerHand = [];
        dealerHand = [];
        renderHands();
        startBettingPhase("Game restarted with 100 coins! Place your bet.");
    }

    // Deck & Card management
    function buildDeck() {
        const newDeck = [];
        for (const s of SUITS) {
            for (const r of RANKS) {
                newDeck.push({ rank: r, suit: s.sym, isRed: s.isRed });
            }
        }
        // Fisher-Yates shuffle
        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }
        return newDeck;
    }

    function drawCard() {
        if (deck.length < 10) {
            deck = buildDeck();
        }
        return deck.pop();
    }

    function calculateScore(hand) {
        let total = 0;
        let aces = 0;

        for (const card of hand) {
            if (card.rank === 'A') {
                aces++;
                total += 11;
            } else if (['K', 'Q', 'J'].includes(card.rank)) {
                total += 10;
            } else {
                total += parseInt(card.rank, 10);
            }
        }

        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }

        return {
            total: total,
            isBlackjack: hand.length === 2 && total === 21
        };
    }

    // Rendering functions
    function createCardElement(card, isHidden) {
        const cardEl = document.createElement('div');
        cardEl.className = 'bj-card';

        if (isHidden) {
            cardEl.classList.add('bj-card-back');
            cardEl.innerHTML = `
                <div class="bj-card-back-pattern">
                    <span class="bj-back-glyph">&lt;/&gt;</span>
                </div>
            `;
            return cardEl;
        }

        cardEl.classList.add(card.isRed ? 'suit-red' : 'suit-black');
        cardEl.innerHTML = `
            <div class="bj-card-corner top-left">
                <span class="bj-card-val">${card.rank}</span>
                <span class="bj-card-suit">${card.suit}</span>
            </div>
            <div class="bj-card-center">${card.suit}</div>
            <div class="bj-card-corner bottom-right">
                <span class="bj-card-val">${card.rank}</span>
                <span class="bj-card-suit">${card.suit}</span>
            </div>
        `;
        return cardEl;
    }

    function renderHands(hideDealerHole = false) {
        // Dealer cards
        bjDealerCards.innerHTML = '';
        if (dealerHand.length === 0) {
            bjDealerCards.innerHTML = '<span class="bj-cards-empty">Cards will appear here</span>';
            bjDealerScore.textContent = '-';
        } else {
            dealerHand.forEach((card, index) => {
                const isHidden = (index === 1 && hideDealerHole);
                bjDealerCards.appendChild(createCardElement(card, isHidden));
            });

            if (hideDealerHole) {
                const visibleCard = dealerHand[0];
                const val = (visibleCard.rank === 'A') ? 11 : (['K', 'Q', 'J'].includes(visibleCard.rank) ? 10 : parseInt(visibleCard.rank, 10));
                bjDealerScore.textContent = `${val} + ?`;
            } else {
                const dScore = calculateScore(dealerHand);
                bjDealerScore.textContent = dScore.total;
            }
        }

        // Player cards
        bjPlayerCards.innerHTML = '';
        if (playerHand.length === 0) {
            bjPlayerCards.innerHTML = '<span class="bj-cards-empty">Cards will appear here</span>';
            bjPlayerScore.textContent = '-';
        } else {
            playerHand.forEach(card => {
                bjPlayerCards.appendChild(createCardElement(card, false));
            });
            const pScore = calculateScore(playerHand);
            bjPlayerScore.textContent = pScore.total;
        }
    }

    function updateCoinsUI() {
        if (bjCoinsEl) bjCoinsEl.textContent = coins;
        if (bjBetDisplay) bjBetDisplay.textContent = (phase === 'betting') ? selectedBet : currentBet;

        // Update chip availability
        chipBtns.forEach(btn => {
            const betVal = btn.getAttribute('data-bet');
            if (betVal === 'all') {
                btn.disabled = (coins <= 0);
            } else {
                const num = parseInt(betVal, 10);
                btn.disabled = (coins < num);
            }

            // Mark active
            if (betVal === 'all' && selectedBet === coins && coins > 0) {
                btn.classList.add('active');
            } else if (betVal !== 'all' && parseInt(betVal, 10) === selectedBet) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Ensure selectedBet is valid
        if (selectedBet > coins && coins > 0) {
            selectedBet = coins;
        }
        if (selectedBet < 10 && coins >= 10) {
            selectedBet = 10;
        }
        if (coins > 0 && selectedBet === 0) {
            selectedBet = coins;
        }
    }

    function setBanner(text, type = '') {
        bjBanner.textContent = text;
        bjBanner.className = 'bj-banner' + (type ? ' ' + type : '');
    }

    function setStatus(text, statusClass = '') {
        bjStatusPill.textContent = text;
        bjStatusPill.className = 'bj-status-pill' + (statusClass ? ' ' + statusClass : '');
    }

    // Phases
    function startBettingPhase(customMsg) {
        if (coins <= 0) {
            triggerGameOver();
            return;
        }

        phase = 'betting';
        currentBet = 0;

        // Auto-select sensible bet if previous selection > current coins
        if (selectedBet > coins) {
            selectedBet = coins;
        } else if (selectedBet <= 0) {
            selectedBet = Math.min(10, coins);
        }

        updateCoinsUI();
        renderHands();

        bjBetControls.style.display = 'flex';
        bjActionControls.style.display = 'none';
        bjRoundOverControls.style.display = 'none';
        bjGameOverPanel.style.display = 'none';

        setStatus('BETTING');
        setBanner(customMsg || "Choose your bet amount and click Deal Hand.");
    }

    function dealHand() {
        if (phase !== 'betting') return;

        if (coins <= 0) {
            triggerGameOver();
            return;
        }

        if (selectedBet <= 0 || selectedBet > coins) {
            selectedBet = Math.min(10, coins);
        }

        currentBet = selectedBet;
        coins -= currentBet;
        updateCoinsUI();

        deck = buildDeck();
        playerHand = [drawCard(), drawCard()];
        dealerHand = [drawCard(), drawCard()];

        const pScore = calculateScore(playerHand);

        // Check Natural 21 Blackjack
        if (pScore.isBlackjack) {
            renderHands(false); // reveal dealer
            const dScore = calculateScore(dealerHand);

            if (dScore.isBlackjack) {
                coins += currentBet; // Push
                endRound('push', `Both have Blackjack! Push (tie) at 21. Bet returned.`);
            } else {
                const payout = Math.floor(currentBet * 2.5); // 3:2 payout (original bet + 1.5x)
                coins += payout;
                endRound('blackjack', `BLACKJACK! 🏆 Natural 21 pays 3:2 (+${payout - currentBet} coins)`);
            }
            return;
        }

        // Normal play
        phase = 'player';
        renderHands(true); // hide dealer hole card

        bjBetControls.style.display = 'none';
        bjActionControls.style.display = 'flex';
        bjRoundOverControls.style.display = 'none';
        bjGameOverPanel.style.display = 'none';

        setStatus('YOUR TURN', 'status-play');
        setBanner("Your turn: Ask for + Card (Hit) or ✋ Stay (Stand)?");
    }

    function hit() {
        if (phase !== 'player') return;

        playerHand.push(drawCard());
        renderHands(true);

        const pScore = calculateScore(playerHand);

        if (pScore.total > 21) {
            // Bust!
            renderHands(false); // reveal dealer
            endRound('bust', `Bust! You went over 21 with ${pScore.total}. Dealer wins.`);
        } else if (pScore.total === 21) {
            // Automatically stand on 21
            stand();
        }
    }

    function stand() {
        if (phase !== 'player') return;

        phase = 'dealer';
        bjActionControls.style.display = 'none';
        setStatus('DEALER');
        setBanner("Dealer's turn... revealing cards.");

        renderHands(false); // reveal hole card

        // Dealer draws until total >= 17
        function stepDealer() {
            let dScore = calculateScore(dealerHand);
            if (dScore.total < 17) {
                setTimeout(() => {
                    dealerHand.push(drawCard());
                    renderHands(false);
                    stepDealer();
                }, 450);
            } else {
                resolveOutcome();
            }
        }

        setTimeout(stepDealer, 400);
    }

    function resolveOutcome() {
        const pTotal = calculateScore(playerHand).total;
        const dTotal = calculateScore(dealerHand).total;

        if (dTotal > 21) {
            // Dealer busts
            const winAmount = currentBet * 2;
            coins += winAmount;
            endRound('win', `Dealer busts with ${dTotal}! You win +${currentBet} coins! 🎉`);
        } else if (pTotal > dTotal) {
            // Player has higher total
            const winAmount = currentBet * 2;
            coins += winAmount;
            endRound('win', `You win! ${pTotal} beats Dealer's ${dTotal} (+${currentBet} coins) 🎉`);
        } else if (dTotal > pTotal) {
            // Dealer wins
            endRound('lose', `Dealer wins with ${dTotal} against your ${pTotal}.`);
        } else {
            // Push (tie)
            coins += currentBet;
            endRound('push', `Push (Tie) at ${pTotal}! Your bet was returned.`);
        }
    }

    function endRound(type, msg) {
        phase = 'roundOver';
        updateCoinsUI();

        if (type === 'win') {
            setStatus('YOU WIN', 'status-win');
            setBanner(msg, 'win');
        } else if (type === 'blackjack') {
            setStatus('BLACKJACK', 'status-win');
            setBanner(msg, 'blackjack');
        } else if (type === 'lose' || type === 'bust') {
            setStatus('DEALER WINS', 'status-lose');
            setBanner(msg, 'lose');
        } else if (type === 'push') {
            setStatus('PUSH', 'status-push');
            setBanner(msg, 'push');
        }

        if (coins <= 0) {
            setTimeout(triggerGameOver, 700);
        } else {
            bjActionControls.style.display = 'none';
            bjBetControls.style.display = 'none';
            bjRoundOverControls.style.display = 'flex';
        }
    }

    function triggerGameOver() {
        phase = 'gameOver';
        updateCoinsUI();
        bjBetControls.style.display = 'none';
        bjActionControls.style.display = 'none';
        bjRoundOverControls.style.display = 'none';
        bjGameOverPanel.style.display = 'flex';

        setStatus('GAME OVER', 'status-lose');
        setBanner("GAME OVER: You have 0 coins left!", 'lose');
    }

    // Event Listeners
    chipBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (phase !== 'betting') return;
            const betVal = this.getAttribute('data-bet');
            if (betVal === 'all') {
                selectedBet = coins;
            } else {
                selectedBet = parseInt(betVal, 10);
            }
            updateCoinsUI();
        });
    });

    bjDealBtn.addEventListener('click', dealHand);
    bjHitBtn.addEventListener('click', hit);
    bjStandBtn.addEventListener('click', stand);
    bjNextBtn.addEventListener('click', () => startBettingPhase());

    // Navigation and Restart buttons
    bjBackBtn.addEventListener('click', closeGame);
    if (bjGameOverBackBtn) {
        bjGameOverBackBtn.addEventListener('click', closeGame);
    }
    bjRestartBtn.addEventListener('click', restartFullGame);
    bjGameOverRestartBtn.addEventListener('click', restartFullGame);
})();