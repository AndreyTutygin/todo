import {
    disableScroll
} from '../functions/disable-scroll.js';
import {
    enableScroll
} from '../functions/enable-scroll.js';

const profileModal = () => {
    const btnProfile = document?.querySelector('.nav__btn_profile');
    const modal = document?.querySelector('.profile-modal');
    const modalItems = document?.querySelectorAll('.profile-modal__link');
    const closeModal = document?.querySelector('.profile-modal__close');

    btnProfile?.addEventListener('click', (e) => {
        modal?.classList.toggle('profile-modal_active');
        disableScroll();
    });

    closeModal?.addEventListener('click', (e) => {
        modal?.classList.remove('profile-modal_active');
        enableScroll();
    });

    modalItems?.forEach(el => {
        el.addEventListener('click', () => {
            modal.classList.remove('profile-modal_active');
            enableScroll();
        });
    });
};

profileModal();
