<<<<<<< HEAD
const searchBar = document.getElementById('search_bar')
const carousel = document.querySelector('.carousel-general-container')

//WE DONT NEED THIS BECAUSE OUR EVENTLISTENER IS IN THE DASHBOARD EJS (FORM ACTION)
// searchBar.addEventListener('submit', (event) => {
//   // event.preventDefault()
//   // console.log(searchBar.value, "from searchProfiles.js")
 
//   if(!searchBar.value == ""){
//     carousel.style.display = "none"
//     // searchBars(searchBar.value)
//   }

// })


// const searchBars = (input) => {
//   fetch("bars/search", {
//     method:'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({user_input: input})
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data, "data front end")
//     //   data.data.forEach((bars) => {
//     //   // sugg.insertAdjacentHTML('beforeend', `
//     //   //   <a href="/profiles/show/${profile._id}">
//     //   //     <div class="suggestion">
//     //   //       <div class="avatar"></div>
//     //   //       <div class="name">${profile.username}</div>
//     //   //     </div>
//     //   //   </a>
//     //   //   `)
//     // })
//   })
//   .catch((err) =>{
//     console.log(err)
//   })
// }
=======
const searchbar2 = document.getElementById('test1')

searchbar2.addEventListener('click', () =>{
  console.log ('test')
})

>>>>>>> 4377867a319e564b782ea32e39c7500adb52c2b2
