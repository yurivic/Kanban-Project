document.querySelectorAll('.kanban_card').forEach(card => {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging')
    })

    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging')
    })

})

document.querySelectorAll('.kanban_cards').forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault(); //impede um comportamento padrão do navegador
        e.currentTarget.classList.add('cards-rover');
    });

    column.addEventListener('dragleave', e => {
        e.currentTarget.classList.remove('cards-rover');
    });

    column.addEventListener('drop', e => {
        e.currentTarget.classList.remove('cards-rover');

        const dragCard = document.querySelector('.kanban_card.dragging');
        e.currentTarget.appendChild(dragCard);
    });
});

const textarea = document.querySelectorAll('.kanban_text');

    textarea.forEach((textarea, index) => {
        textarea.value = localStorage.getItem(`textoSalvo_${index}`) || '';

        textarea.addEventListener('input', () => {
            localStorage.setItem(`textoSalvo_${index}`, textarea.value);
            autoResize(textarea)
        });
    })

function autoResize(textarea) {
    textarea.style.height = 'auto'; // Reseta a altura
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta a altura com base no conteúdo
}

document.querySelectorAll('.adicionar_nota').forEach(button => {
    button.addEventListener('click', (e) => {
        const coluna = e.target.closest('.kanban_coluna');
        const novoCard = `
            <div class="kanban_card" draggable="true">
                <div class="badge high">
                    <span>Alta Prioridade</span>
                </div>
                <p class="card_title">
                    <textarea class="kanban_text"></textarea>
                </p>
                <div class="card_infos">
                    <div class="card_icons">
                        <p><i class="fa-regular fa-comment"></i> 1</p>
                        <p><i class="fa-solid fa-paperclip"></i> 1</p>
                        <button class="remover_nota">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    <div class="user">
                        <img src="assets/img/icon_girl.png" alt="Avatar">
                    </div>
                </div>
            </div>
        `
        coluna.querySelector('.kanban_cards').insertAdjacentHTML('beforeend', novoCard)
    })
})

document.body.addEventListener('click', (e) => {
    if (e.target.closest('.remover_nota')) {
        const card = e.target.closest('.kanban_card')
        if (card) {
            card.remove() // Condição que valida se .remove_nota vai ser encontrado ou não
        }
    }
})