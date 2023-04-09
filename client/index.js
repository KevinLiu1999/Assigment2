

const form = document.querySelector('form');
const foodInput = document.getElementById('food');
const caloriesInput = document.getElementById('calories');
const foodList = document.querySelector('.food-list')


const refreshFoodList = ()=>{
    fetch("https://golden-forge-381221.nn.r.appspot.com/food")
    .then(response=>{
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        data.map(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<p>${item.food}: ${item.calories} calories</p>`;
            foodList.appendChild(listItem);

            const editButton = document.createElement('button');
            editButton.classList.add('edit-button');
            editButton.innerHTML = 'Edit';
            editButton.setAttribute("data-id",item.id);
            editButton.style.marginLeft = "40%";
            editButton.style.backgroundColor = "#2196F3";
            editButton.style.color="white";
            editButton.style.border="none"
            editButton.style.borderRadius="5px"
            editButton.addEventListener('click', (e) => {
               const id = e.target.getAttribute('data-id');
               console.log('kk',id);
                console.log(`Edit button clicked for item ${item.id}`);
                const form = document.createElement('form');
                const foodInput = document.createElement('input');
                foodInput.type = 'text';
                foodInput.name = 'food';
                foodInput.value = item.food;
                const caloriesInput = document.createElement('input');
                caloriesInput.type = 'text';
                caloriesInput.name = 'calories';
                caloriesInput.value = item.calories;
                const submitButton = document.createElement('button');
                submitButton.innerText = 'Update';
                submitButton.type = 'submit';
                form.appendChild(foodInput);
                form.appendChild(caloriesInput);
                form.appendChild(submitButton);


                listItem.innerText = '';
                listItem.appendChild(form);
                form.addEventListener('submit', (event) => {

                    event.preventDefault()
                
                  const food = event.currentTarget.food.value;
                  const calories = event.currentTarget.calories.value;
                  
                  console.log({food,calories})
                  fetch(`https://golden-forge-381221.nn.r.appspot.com/food/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ food, calories }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                  .then(response => {

                    location.reload()
                    
                    console.log('Form submitted successfully');
                  })
                  .catch(error => {
                    console.error(error);
                  });
                });

            });
            foodList.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.style.margin="1%";
            deleteButton.style.backgroundColor = "#f44336";
            deleteButton.style.color="white";
            deleteButton.style.border="none"
            deleteButton.style.borderRadius="5px"
            deleteButton.addEventListener('click', (e) => {
             
                fetch(`https://golden-forge-381221.nn.r.appspot.com/food/${item.id}`,{
                    method:'DELETE',
                }).then(()=>{
                    location.reload()
                })
                console.log(`Delete button clicked for item ${item.id}`);
            });
            foodList.appendChild(deleteButton);
        });
    })
}




form.addEventListener('submit', (event) => {

    event.preventDefault()

  const food = event.currentTarget.food.value;
  const calories = event.currentTarget.calories.value;
  
  console.log({food,calories})
  fetch('https://golden-forge-381221.nn.r.appspot.com/food', {
    method: 'POST',
    body: JSON.stringify({ food, calories }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    location.reload()
    
    console.log('Form submitted successfully');
  })
  .catch(error => {
    console.error(error);
  });
});

refreshFoodList()