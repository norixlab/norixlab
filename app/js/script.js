function showModal(modalId, title, message) {
        $('#' + modalId).css('display', 'block');
        $('#' + modalId + ' h2').text(title);
        $('#' + modalId + ' p').text(message);
        $('#' + modalId + ' .close-button').on('click', function () {
            $('#' + modalId).css('display', 'none');
        });
    }
    
    $(function () {
        $('#contactForm').submit(function (event) {
            event.preventDefault(); // Prevent the default form submission behavior
    
            var form = $(this);
    
            $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: form.serialize(),
                dataType: 'json',
                success: function (response) {
                    form[0].reset();
                    if (response.success) {
                        showModal('successModal', 'Success!', response.message);
                    } else {
                        showModal('errorModal', 'Error', response.message);
                    }
                },
                error: function () {
                    showModal('errorModal', 'Error', 'An error occurred. Please try again.');
                },
            });
        });
    });

    let isEmailValid = true;
    let isLinkValid = true;
    

    $(document).on('input', function (event) {
        const target = event.target;

        if ($(target).hasClass('contacts__form-textarea') && target.form) {
            const commentField = target;
            const linkWarning = $(commentField.form).find('.contacts__warr-message');
            const submitButton = $(commentField.form).find('.contacts__form-btn');
            validateComment(commentField, linkWarning, submitButton);
        }

        if ($(target).hasClass('email') && target.form) {
            const emailField = target;
            const emailWarning = $(emailField.form).find('.contacts__warr-email');
            const submitButton = $(emailField.form).find('.contacts__form-btn');

            if ($(emailField).val().trim() === '') {
                $(emailWarning).text('');
                isEmailValid = true;
            } else {
                validateEmail(emailField, emailWarning, submitButton);
            }
        }
    });
    $(document).on('submit', function (event) {
        const target = event.target;

        if ($(target).prop('tagName') === 'FORM') {
            const form = target;
            const commentField = $(form).find('.contacts__form-textarea');
            const linkWarning = $(form).find('.contacts__warr-message');
            const emailField = $(form).find('.email');
            const emailWarning = $(form).find('.contacts__warr-email');
            const submitButton = $(form).find('.contacts__form-btn');

            if (!formSubmitted) {
                event.preventDefault();
                validateComment(commentField, linkWarning, submitButton);
                validateEmail(emailField, emailWarning, submitButton);
            }
        }
    });

    function validateEmail(emailField, emailWarning, submitButton) {
        const email = $(emailField).val();
        const hasValidEmail = validateEmailAddress(email);

        if (!hasValidEmail) {
            $(emailWarning).text('incorrect email!');
            isEmailValid = false;
        } else {
            $(emailWarning).text('');
            isEmailValid = true;
        }

        toggleSubmitButton(submitButton);
    }

    function validateComment(commentField, linkWarning, submitButton) {
        const comment = $(commentField).val();
        const hasLink = containsLink(comment);

        if (hasLink) {
            $(linkWarning).text('no links allowed!');
            isLinkValid = false;
        } else {
            $(linkWarning).text('');
            isLinkValid = true;
        }

        toggleSubmitButton(submitButton);
    }

    function toggleSubmitButton(submitButton) {
        $(submitButton).prop('disabled', !(isLinkValid && isEmailValid));
    }

    function containsLink(text) {
        const urlPattern = /(https?:\/\/)?(www\.)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/i;
        return urlPattern.test(text);
    }

    function validateEmailAddress(email) {
        const allowedDomains = /@(gmail\.com|yandex\.ru|mail\.ru|outlook\.com)$/i;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return false;
        }

        return allowedDomains.test(email);
    }

 

//-------- Slider ----------
let swiper = new Swiper(".slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
    // autoplay: {
    //     delay: 3000,
    //     disableOnInteraction: false,
    // },
    navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
      
  });

  //------- main menu ---------
const gate = document.querySelectorAll('.header__img-gate');
const menu = document.querySelector('.menu__list');
const classesToRemove = ['gate-left', 'gate-right'];

setTimeout(() => {

    gate.forEach((item) => {
        classesToRemove.forEach(className => {
            item.classList.remove(className);
        });
    });
    menu.classList.remove('hidden');
}, 1800);


setTimeout(() => {

    gate.forEach((item) => {
            item.classList.remove('hidden');
        });
    }, 300);

//------- auto text ---------
const typingTexts = document.querySelectorAll('.text');

typingTexts.forEach(typingText => {
    const textToType = typingText.textContent;
    typingText.textContent = '';

    const typingSpeed = 15;

    let textIndex = 0;

    function typeText() {
        if (textIndex < textToType.length) {
            typingText.textContent += textToType[textIndex];
            textIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }

    const sectionObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            typeText();
            sectionObserver.unobserve(typingText);
        }
    });

    sectionObserver.observe(typingText);
});


const mobMenuBtn = document.querySelector('.menu__btn');
const closeBtn = document.querySelector('.close-btn');

const mobMenu = document.querySelector('.menu__list');

mobMenuBtn.addEventListener('click', () => {
    mobMenu.classList.add('menu__list--active');
    })

closeBtn.addEventListener('click', () => {
    mobMenu.classList.remove('menu__list--active')
})
