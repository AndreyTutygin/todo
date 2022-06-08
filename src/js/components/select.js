const select = () => {
    const el = document.querySelector('.todo-options');
    const choices = new Choices(el, {
        searchEnabled: false,
        sorter: function (a, b) {
            return b.label.length - a.label.length;
        },
    });

    let ariaLabel = el.getAttribute('aria-label');
    el.closest('.choices').setAttribute('aria-label', ariaLabel);
};

select();
