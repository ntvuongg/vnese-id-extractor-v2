let menu_btn =  document.querySelector("#menu-btn");
let sidebar = document.querySelector(".sidebar");
let search_btn = document.querySelector(".bx-search-alt-2");
let submit_btn = document.querySelector(".btn-block");
let feedbackForm = document.querySelector(".feedbackForm");
let feedbackContent = document.querySelector(".form-control");
let icon = document.querySelector('.icon');

menu_btn.onclick = function(){
  sidebar.classList.toggle("active");
}

search_btn.onclick = function(){
  sidebar.classList.toggle("active");
}

feedbackForm.addEventListener("submit", function(e){
  e.preventDefault();
  let rating = $(".selected").attr('id');
  const formData = new FormData();
  // formData.append('content', feedbackContent);
  formData.append('content', String(feedbackContent.value));
  formData.append('rating', parseInt(rating));
  const xhr = new XMLHttpRequest();

  if (feedbackContent.value == ''){
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Empty feedback!'
    })
  }
  else{
      const URL = '/feedback';
      xhr.open('POST', URL, true);
      xhr.send(formData);
      Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: 'Your feed back has been sent successfully!'
  })
      feedbackContent.value = ''
      $('img').removeClass('selected');
  }
});

$('img').click(function() {
  $('img').not(this).removeClass('selected');
  $(this).toggleClass('selected');
});
// function iconSelected(){
//   icon.classList.toggle("active");
// }
