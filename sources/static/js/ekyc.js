//ID card
const dropArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');

const startBtn = document.querySelector('.btn-extract');

let button = dropArea.querySelector('.button');
let input = dropArea.querySelector('input');

let file;
let img;
let dataExtracted;

// Personal img
const p_dropArea = document.querySelector('#personal__img');
const p_dragText = document.querySelector('#personal_header');

let p_button = p_dropArea.querySelector('#personal_button');
let p_input = p_dropArea.querySelector('#personal_input');

// sidebar
let menu_btn =  document.querySelector("#menu-btn");
let sidebar = document.querySelector(".sidebar");
let search_btn = document.querySelector(".bx-search-alt-2");

let resultArea = document.querySelector(".person");

menu_btn.onclick = function(){
  sidebar.classList.toggle("active");
}

search_btn.onclick = function(){
  sidebar.classList.toggle("active");
}

button.onclick = () => {
  input.click();
};

p_button.onclick = () => {
    p_input.click();
};

function loading_on() {
  document.querySelector('.overlay').style.display = "block";
}

function loading_off() {
  document.querySelector('.overlay').style.display = "none";
}

// when browse
input.addEventListener('change', function () {
  file = this.files[0];
  dropArea.classList.add('active');
  displayFile();
});

p_input.addEventListener('change', function () {
    img = this.files[0];
    p_dropArea.classList.add('active');
    displayFile2();
  });

// when file is inside drag area
dropArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropArea.classList.add('active');
  dragText.textContent = 'Release to Upload';
  // console.log('File is inside the drag area');
});

p_dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    p_dropArea.classList.add('active');
    p_dragText.textContent = 'Release to Upload';
    // console.log('File is inside the drag area');
  });

// when file leave the drag area
dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('active');
  // console.log('File left the drag area');
  dragText.textContent = 'Drag & Drop';
});

p_dropArea.addEventListener('dragleave', () => {
    p_dropArea.classList.remove('active');
    // console.log('File left the drag area');
    p_dragText.textContent = 'Drag & Drop';
});

// when file is dropped
dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
  displayFile();
});

p_dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    img = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
    displayFile2();
});

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(e) {

  e.preventDefault ();
  if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
    loading_off();
    resultArea.style.display = "block";

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Extract successfully!',
      footer: `CODE: ${xhr.status}`
    })

    setTimeout(function() {
      resultArea.scrollIntoView(true);
      const data = JSON.parse(xhr.responseText).data;
      const update =  new Date();
      document.querySelector('#id_img').innerHTML = `<img src="/static/results/0.jpg?v=${update.getTime()}" style="width: 120px; height: 120px" />`; // To update avoid using image from cache
      document.querySelector('#upload_img').innerHTML = `<img src="/static/face/face_crop.jpg?v=${update.getTime()}" style="width: 120px; height: 120px" />`;
      document.querySelector('.info__id').innerHTML = `Số (ID): ${data[0]}`;
      document.querySelector('.info__name').innerHTML = `Họ và tên (Full name): ${data[1]}`;
      document.querySelector('.info__date').innerHTML = `Ngày sinh (Date of birth): ${data[2]}`;
      document.querySelector('.info__sex').innerHTML = `Giới tính (Sex): ${data[3]}`;
      document.querySelector('.info__nation').innerHTML = `Quốc tịch (Nationality): ${data[4]}`;
      document.querySelector('.info__hometown').innerHTML = `Quê quán (Place of origin): ${data[5]}`;
      document.querySelector('.info__address').innerHTML = `Nơi thường trú (Place of residence): ${data[6]}`;
      document.querySelector('.info__doe').innerHTML = `Ngày hết hạn (Date of expiry) : ${data[7]}`;
    }, 0);
  }
  else if (xhr.status >= 400 && xhr.status <= 500){
    const data = JSON.parse(xhr.responseText);
    loading_off();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: String(data.message),
      footer: `CODE: ${xhr.status}`
    })
  }
};

startBtn.onclick = (e) => {

  e.preventDefault();
  // const xhr = new XMLHttpRequest();
  const formData = new FormData();
  loading_on();

  if (file == null){
    var f = new File([""], "NULL_1"); // Empty file trick
    formData.append('id', f);
  }
  else{
    formData.append('id', file);
  }

  if (img == null){
    var f = new File([""], "NULL_2"); // Empty file trick
    formData.append('img', f);
  }
  else{
    formData.append('img', img);
  }
  const URL = '/ekyc/uploader';
  xhr.open('POST', URL, true);
  xhr.send(formData);
};

function file_validation(){
  if (file == 'wrong_exts'){
    const URL = '/ekyc/uploader';
    const formData = new FormData();
    var f = new File([""], "WRONG_EXTS"); // Empty file trick
    formData.append('file', f);
    xhr.open('POST', URL, true);
    xhr.send(formData);
  }
}

function displayFile() {
  let fileType = file.type;
  // console.log(fileType);

  let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    dropArea.classList.remove('active');
    file = 'wrong_exts';
    file_validation();
    file = null;
  }
}

function displayFile2() {
  let fileType = img.type;
  // console.log(fileType);

  let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="">`;
      p_dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(img);
  } else {
    p_dropArea.classList.remove('active');
    img = 'wrong_exts';
    file_validation();
    img = null;
  }
}
