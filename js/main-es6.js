window.addEventListener('DOMContentLoaded', () => {
    // Header
    (function () {
        const header = document.querySelector('.header');
        let opacity = 0;

        window.addEventListener('scroll', () => {
            opacity = Math.abs(1 - window.scrollY/150);

            if (window.scrollY < 150) {
                header.style.background = `rgba(0, 0, 0, 0)`;
            } else {
                if (window.scrollY >= 300) {
                    header.style.background = `rgba(0, 0, 0, 0.95)`;
                } else {
                    header.style.background = `rgba(0, 0, 0, ${opacity})`;
                }
                
            }
        });
    }());

    // Nav menu
    (function() {
        const lngLinks = document.querySelectorAll('.header__lng-link');
        const navLinks = document.querySelectorAll('.nav__link');
        
        function removeActive(links, activeClass) {
            links.forEach(link => {
                link.addEventListener('click', () => {
                    if (!link.classList.contains(activeClass)) {
                        links.forEach(el => {
                            el.classList.remove(activeClass);
                        });
                        link.classList.add(activeClass);
                    }
                });
            });
        }

        removeActive(lngLinks, 'active');

        if (window.innerWidth > 768) {
            removeActive(navLinks, 'active');
        } else {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
        }
    }());

    // Burger
    (function() {
        const closeMenu = function(activeSelector) {
            menu.classList.toggle(activeSelector);
            document.body.style.overflow = '';
            closeMenuBtn.style.display = 'none';
        };

        const burger = document.querySelector('.header__burger'),
              menu = document.querySelector('.nav'),
              closeMenuBtn = document.querySelector('.header__nav-close'),
              menuLinks = menu.querySelectorAll('.nav__link');

        burger.addEventListener('click', () => {
            menu.classList.toggle('nav-active');
            document.body.style.overflow = 'hidden';
            closeMenuBtn.style.display = 'block';
        });

        closeMenuBtn.addEventListener('click', () => {
            closeMenu('nav-active');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu('nav-active');
            });
        });

        if (window.innerWidth <= 768) {
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMenu('nav-active');
                });
            });
        }
    }());

    // Scroll
    (function () {

        const smoothScrool = function (targetEl, duration) {
            const headerElHeight = document.querySelector('.header').clientHeight,
                  target = document.querySelector(targetEl),
                  targetPosition = target.getBoundingClientRect().top - headerElHeight,
                  startPosition = window.pageYOffset;
            let startTime = null;

            const ease = function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) {return c / 2 * t * t + b;}
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };

            const animation = function(currentTime) {
                if (startTime == null) {startTime = currentTime;}
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, targetPosition, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) {requestAnimationFrame(animation);}
            };
            requestAnimationFrame(animation);
        };

        const scrollTo = function () {
            const links = document.querySelectorAll('.js-scroll');
            links.forEach(link => {
                link.addEventListener('click', function () {
                    const currentTarget = this.getAttribute('href');
                    smoothScrool(currentTarget, 1000);
                });
            });
        };
        scrollTo();
    }());
}); 