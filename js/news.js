class NewsManager {
    constructor() {
        this.currentDate = new Date(); // 使用固定日期
        
        this.newsData = [
            {
                date: '2025-04-15',
                content: 'Received the <a href="https://cerg1.ugc.edu.hk/hkpfs/index.html">Hong Kong PhD Fellowship (HKPFS)</a> 2025/26'
            },
            {
                date: '2025-04-15',
                content: 'Received the <a href="https://www.gs.cuhk.edu.hk/admissions/scholarships-fees/hkpfs">CUHK Vice-Chancellor HKPFS Scholarship</a>'
            },
            {
                date: '2025-01-20',
                content: 'Our paper <a href="https://arxiv.org/abs/2403.11807" target="_blank">GAMA-Bench</a> is accepted to <a href="https://iclr.cc" target="_blank">ICLR\'25</a>!'
            },
            {
                date: '2024-09-15',
                content: 'Our paper <a href="https://arxiv.org/abs/2308.03656" target="_blank">EmotionBench</a> is accepted to <a href="https://neurips.cc" target="_blank">NeurIPS\'24</a>!'
            },
            {
                date: '2024-09-10',
                content: 'Our paper <a href="https://arxiv.org/abs/2305.19926" target="_blank">ScaleReliability</a> is accepted to <a href="https://2024.emnlp.org" target="_blank">EMNLP\'24</a> main conference!'
            },
            {
                date: '2024-08-19',
                content: 'I join the <a href="http://ariselab.cse.cuhk.edu.hk" target="_blank">ARISE Lab</a> as a Research Assistant in <a href="https://www.cse.cuhk.edu.hk/" target="_blank">CSE Department</a> at <a href="https://www.cuhk.edu.hk/english/index.html" target="_blank">CUHK</a>'
            },
            {
                date: '2024-07-15',
                content: 'I graduate from <a href="https://www.uc.cuhk.edu.hk/" target="_blank">United College</a> at <a href="https://www.cuhk.edu.hk/english/index.html" target="_blank">CUHK</a>!'
            },
            {
                date: '2024-06-20',
                content: 'Our <a href="https://www.cse.cuhk.edu.hk/lyu/_media/thesis/report-2307-2.pdf?id=students%3Afyp&cache=cache" target="_blank">graduation thesis</a> wins the <a href="https://www.asmpt.com" target="_blank">ASMPT</a> Technology Silver Award in a competition among 8 universities in HK!'
            },
            {
                date: '2024-01-15',
                content: 'Our paper <a href="https://arxiv.org/abs/2310.01386" target="_blank">PsychoBench</a> is accepted to <a href="https://iclr.cc/Conferences/2024" target="_blank">ICLR\'24</a> and will have an <span class="oral-presentation">ORAL</span> presentation!'
            },
            {
                date: '2023-05-01',
                content: 'My undergraduate <a href="https://www.erg.cuhk.edu.hk/erg/Elite" target="_blank">ELITE Stream</a> <a href="https://www.cse.cuhk.edu.hk/lyu/_media/thesis/report-2307-2.pdf?id=students%3Afyp&cache=cache" target="_blank">Graduation Thesis</a> is supervised by <a href="https://www.cse.cuhk.edu.hk/lyu/home" target="_blank">Prof. Michael R. Lyu</a> and advised by <a href="https://penguinnnnn.github.io/" target="_blank">Dr. Jen-tse Huang</a>.'
            }
        ];
    }

    init() {
        console.log('NewsManager init starting');
        this.recentNewsList = document.getElementById('recentNews');
        this.newsContainer = document.querySelector('.news-container');
        this.newsScrollContainer = document.querySelector('.news-scroll-container');
        
        if (!this.recentNewsList || !this.newsContainer || !this.newsScrollContainer) {
            console.error('Required DOM elements not found:', {
                recentNewsList: !!this.recentNewsList,
                newsContainer: !!this.newsContainer,
                newsScrollContainer: !!this.newsScrollContainer
            });
            return;
        }

        console.log('DOM elements found, rendering news');
        
        // 立即渲染新闻内容
        this.renderNews();
        
        // 确保内容渲染完成后再设置滚动
        setTimeout(() => {
            console.log('Setting up scroll behaviors');
            this.setupScrollListener();
            this.setupAutoScroll();
            console.log('NewsManager initialization complete');
        }, 500); // 增加延迟以确保DOM完全渲染
    }

    setupScrollListener() {
        this.newsScrollContainer.addEventListener('scroll', () => {
            const isAtBottom = this.newsScrollContainer.scrollHeight - 
                             this.newsScrollContainer.scrollTop - 
                             this.newsScrollContainer.clientHeight < 1;
            
            if (isAtBottom) {
                this.newsContainer.classList.add('at-bottom');
            } else {
                this.newsContainer.classList.remove('at-bottom');
            }
        });
    }

    setupAutoScroll() {
        let animationFrameId;
        let isScrolling = true; // 默认为true，确保一开始就滚动
        const SCROLL_SPEED = 1.0; // 增加滚动速度
        let lastTimestamp = 0;
        const FRAME_RATE = 1000 / 60;
        const RESET_DELAY = 1000;
        let isResetting = false;

        const scroll = (timestamp) => {
            if (!isScrolling) return;

            if (!lastTimestamp) lastTimestamp = timestamp;

            if (timestamp - lastTimestamp < FRAME_RATE) {
                animationFrameId = requestAnimationFrame(scroll);
                return;
            }
            lastTimestamp = timestamp;

            const maxScroll = this.newsScrollContainer.scrollHeight - this.newsScrollContainer.clientHeight;

            // 检查是否到达底部
            if (this.newsScrollContainer.scrollTop >= maxScroll && !isResetting) {
                isResetting = true;
                
                // 等待一段时间后重置到顶部
                setTimeout(() => {
                    if (isScrolling) {
                        this.newsScrollContainer.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                        
                        // 等待滚动动画完成后恢复自动滚动
                        setTimeout(() => {
                            isResetting = false;
                        }, 1000);
                    }
                }, RESET_DELAY);
            } else if (!isResetting) {
                this.newsScrollContainer.scrollTop += SCROLL_SPEED;
            }

            animationFrameId = requestAnimationFrame(scroll);
        };

        const startScroll = () => {
            isScrolling = true;
            if (!animationFrameId) {
                lastTimestamp = 0;
                isResetting = false;
                animationFrameId = requestAnimationFrame(scroll);
                console.log('Auto-scroll started'); // 添加调试日志
            }
        };

        const stopScroll = () => {
            isScrolling = false;
            isResetting = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
                console.log('Auto-scroll stopped'); // 添加调试日志
            }
        };

        // 立即开始滚动，不依赖IntersectionObserver
        console.log('Initializing auto-scroll');
        startScroll();

        // Create an Intersection Observer to detect when the news container is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log('News container visibility changed:', entry.isIntersecting);
                if (entry.isIntersecting) {
                    startScroll();
                } else {
                    stopScroll();
                }
            });
        }, {
            threshold: 0.01 // 降低阈值，使检测更敏感
        });

        // Observe the news container
        observer.observe(this.newsContainer);
        console.log('Observing news container');

        // Handle mouse interactions
        this.newsScrollContainer.addEventListener('mouseenter', () => {
            console.log('Mouse entered news container');
            stopScroll();
        });
        
        this.newsScrollContainer.addEventListener('mouseleave', () => {
            console.log('Mouse left news container');
            startScroll();
        });

        // Handle page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopScroll();
            } else {
                startScroll();
            }
        });

        // 在10秒后检查滚动是否还在运行
        setTimeout(() => {
            if (!isScrolling) {
                console.log('Auto-scroll stopped unexpectedly, restarting');
                startScroll();
            }
        }, 10000);

        // Save references for cleanup
        this.stopScroll = stopScroll;
        this.startScroll = startScroll;
        this.observer = observer;
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    isRecent(dateString) {
        const newsDate = new Date(dateString);
        const threeMonthsAgo = new Date(this.currentDate);
        threeMonthsAgo.setMonth(this.currentDate.getMonth() - 3);
        
        // Set both dates to start of day for accurate comparison
        newsDate.setHours(0, 0, 0, 0);
        threeMonthsAgo.setHours(0, 0, 0, 0);
        
        return newsDate >= threeMonthsAgo;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]}. ${date.getFullYear()}`;
    }

    createNewsItem(newsItem) {
        const newsDate = new Date(newsItem.date);
        const timeDiff = this.currentDate - newsDate;
        const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let timeAgo;
        
        if (daysAgo === 0) {
            timeAgo = 'Today';
        } else if (daysAgo === 1) {
            timeAgo = 'Yesterday';
        } else if (daysAgo < 30) {
            timeAgo = `${daysAgo} days ago`;
        } else {
            const monthsAgo = Math.floor(daysAgo / 30);
            if (monthsAgo >= 12) {
                const yearsAgo = Math.floor(monthsAgo / 12);
                timeAgo = `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
            } else {
                timeAgo = `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
            }
        }

        return `
            <div class="news-item">
                <div class="news-date">
                    ${this.formatDate(newsItem.date)}
                    <span class="news-time-ago">${timeAgo}</span>
                </div>
                <div class="news-content">${newsItem.content}</div>
            </div>
        `;
    }

    renderNews() {
        let newsHTML = '';

        this.newsData
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // 确保按日期降序排序
            .forEach(newsItem => {
                newsHTML += this.createNewsItem(newsItem);
            });

        this.recentNewsList.innerHTML = newsHTML;
    }
}

// Initialize with a longer delay to ensure page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing NewsManager...');
    const newsManager = new NewsManager();
    
    // 增加延迟以确保页面完全加载
    setTimeout(() => {
        console.log('Starting NewsManager init');
        newsManager.init();
    }, 1000);
});