//toggle bg active
const slideNavigator = name => {
    let slides = document.querySelectorAll('.bg-slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
        if (slide.classList.contains(name)) {
            slide.classList.add('active');
        }
    });
};

//switch bg
window.addEventListener('load', () => {
    const slideBtnList = document.querySelectorAll('.slide-btn');
    slideBtnList.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            slideBtnList.forEach(el => {
                el.classList.remove('active');
            });
            this.classList.add('active');
            slideNavigator(this.getAttribute('data-target'));
        });
    });
});

//activate section 
const sectionNavigator = name => {
    let sections = document.querySelectorAll('section');
    let header = document.querySelector('header');
    sections.forEach(section => {
        section.classList.remove('section-show');
        if (section.classList.contains(name)) {
            section.classList.add('section-show');
            header.classList.add('active');
        }
    })
};

window.addEventListener('load', () => {
    const navList = document.querySelectorAll('.nav-btn');
    navList.forEach(nav => {
        nav.addEventListener('click', function (e) {
            e.preventDefault();
            navList.forEach(el => {
                el.classList.remove('active');
            });
            this.classList.add('active');
            sectionNavigator(this.getAttribute('data-target'));
            screen.width < 768 && toggleMenu();
        });
    })
});

const resetHeader = () => {
    let header = document.querySelector('header');
    header.classList.remove('active');
}

//initial navigation
const initNavigation = () => {
    const navList = document.querySelectorAll('.nav-btn');
    navList.forEach(el => {
        el.classList.remove('active');
        if (el.getAttribute('data-target') === 'about') {
            el.classList.add('active');
        }
    });
    sectionNavigator('about');
}

//filter with Isotope
const select = (el, all = false) => {
    el = el.trim();
    if (all) {
        return [...document.querySelectorAll(el)];
    } else {
        return document.querySelector(el);
    }
};

const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener));
        } else {
            selectEl.addEventListener(type, listener);
        }
    }
};

window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item',
        });
        let portfolioFilters = select('#portfolio-filters li', true);

        on(
            'click',
            '#portfolio-filters li',
            function (e) {
                e.preventDefault();
                portfolioFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter'),
                });
                portfolioIsotope.on('arrangeComplete', function () {
                    AOS.refresh();
                });
            },
            true
        )
    }
});

//glightbox as Modal and Slider
const portfolioLightBox = GLightbox({
    selector: '.portfolio-lightbox',
});

//toggle menu 
const toggleMenu = () => {
    const menu = document.querySelector('.menu');
    const navMobile = document.querySelector('.nav-mobile');
    menu.classList.toggle('active');
    navMobile.classList.toggle('active');
}


