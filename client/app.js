function addUser(email, first_name, last_name, phone_number, address, bio, skill_level_list, skill_type_list) {
    const data = {
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        address: address,
        bio: bio,
        skill_level_list: skill_level_list,
        skill_type_list: skill_type_list
    };

        fetch('http://localhost:4004/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

/*            fill dropdown list with Skills from database               */
let skillTypes;

fetch('http://localhost:4004/getSkillType')
    .then(response => response.json())
    .then(data => {
        console.log("skillTypes retrieved");
        skillTypes = data;
        console.log(skillTypes);
    })
    .catch(error => console.error('Error fetching skillTypes:', error));

let skillLevels;
fetch('http://localhost:4004/getSkillLevel')
    .then(response => response.json())
    .then(data => {
        console.log("skillLevels retrieved");
        skillLevels = data;
        console.log(skillLevels);
    })
    .catch(error => console.error('Error fetching skillTypes:', error));

/*          make checkboxes           */

function init () {
    let form = document.createElement('form');
    for (let i = 0; i < skillTypes.length; i++) {
        let formItem = document.createElement('div');

        let formItemHeader = document.createElement('span');
        formItemHeader.textContent= skillTypes[i].skill_type;
        formItem.appendChild(formItemHeader);

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        formItem.appendChild(checkbox);

        checkbox.addEventListener('change', function() {
            // This function is called whenever a checkbox is checked or unchecked.
            // 'this' refers to the checkbox that triggered the event.
            if (this.checked) {
                for (let j = 0; j < skillLevels.length; j++) {
                    let radio = document.createElement('input');
                    radio.setAttribute('type', 'radio');
                    radio.setAttribute('name', 'group' + i);
                    formItem.appendChild(radio);

                    let skillLevelTextSpan = document.createElement('span');
                    skillLevelTextSpan.textContent = skillLevels[j].skill_level;
                    formItem.append(skillLevelTextSpan);
                }

            } else {
                const radioInputs = formItem.querySelectorAll('input[type="radio"]');
                radioInputs.forEach(radio => {
                    formItem.removeChild(radio);
                });
                const skillLevelTextsSpan = formItem.querySelectorAll('span'); // Assuming you wrap skill level texts in <span> for easy removal
                for (let j = 1; j < skillLevelTextsSpan.length; j++) {
                    formItem.removeChild(skillLevelTextsSpan[j]);
                }
            }
        });

        form.appendChild(formItem);
    }
    document.body.appendChild(form);

    const submitButton = document.getElementById('submit-btn');
    submitButton.addEventListener('click' ,() => {
        const checkedCheckboxes = form.querySelectorAll('input[type="checkbox"]:checked');

        let skillsList = {skillLevels: [], skillTypes: []};
        for (let i = 0; i < checkedCheckboxes.length; i++) {
            let checkbox = checkedCheckboxes[i];
            const checkedRadio = document.querySelector('input[name="group' + i + '"]:checked');

            let skillLevelText = checkedRadio.nextElementSibling.textContent;
            let skillTypeText = checkbox.parentNode.querySelector('span').textContent;

            skillsList.skillTypes[i] = skillTypeText;
            skillsList.skillLevels[i] = skillLevelText;
        }
        const userForm = document.querySelector('.user-form');
        const inputs = userForm.querySelectorAll('input');
        const user = [];
        for (let i = 0; i < inputs.length; i++) {
            user[i] = inputs[i].value;
        }
        console.log(user);
        console.log(skillsList);

        addUser(user[0], user[1], user[2], Number(user[3]), user[4], user[5], skillsList.skillLevels, skillsList.skillTypes);
    })
}
setTimeout(init, 1000);
