const select = () => {
    const el = document.querySelector('.todo-options');
    const choices = new Choices(el, {
        searchEnabled: false,
    });

    let ariaLabel = el.getAttribute('aria-label');
    el.closest('.choices').setAttribute('aria-label', ariaLabel);
};

select();
