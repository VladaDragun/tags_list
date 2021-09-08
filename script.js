const tag_input = document.getElementById('tag_input');
const add_tag = document.getElementById('add_tag');
const tag_wrapper = document.getElementById('tag_wrapper');
const read_only = document.getElementById('read_only');
const tooltip = document.getElementById('tooltip');

let tags;
!localStorage.tags ? tags = [] : tags = JSON.parse(localStorage.getItem('tags'));

function Tag(description) {
    this.description = description;
}

const createTemplate = (tag, index) => {
    return `
        <div class="tag">
            <p class="tag_text">${tag.description}</p>
            <i onclick="deleteTag(${index})" class="fas fa-times"></i>
        </div>
    `;
}

const fillHtmlList = () => {
    tag_wrapper.innerHTML = "";
    if(tags.length > 0) {
        tags.forEach((item, index) => {
            tag_wrapper.innerHTML += createTemplate(item, index);
        });
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tags', JSON.stringify(tags));
}

add_tag.addEventListener('click', () => {
    if(read_only.checked) {
        tag_input.value = "";
        alert("You can not do this in read-only mode");
    }
    else {
        if(tag_input.value) {
            tooltip.classList.add('invisible');
            tooltip.classList.remove('empty_input_warning');
            tag_input.classList.remove('empty_input');

            if(tag_input.value.split(" ").length > 1) {
                tag_input.value.split(" ").forEach(item => {
                    tags.push(new Tag(item));
                });
            }
            else {
                tags.push(new Tag(tag_input.value));
            }
            updateLocal();
                fillHtmlList();
                tag_input.value = "";

        }
        else {
            tooltip.classList.remove('invisible');
            tooltip.classList.add('empty_input_warning');
            tag_input.classList.add('empty_input');
        }
    }
});

const deleteTag = index => {
    if(read_only.checked) {
        tag_input.value = "";
        alert("You can not do this in read-only mode");
    }
    else {
        tags.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }
}