const dropArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');

let button = dropArea.querySelector('.button');
let input = dropArea.querySelector('input');

let file;
let dataExtracted;

let menu_btn =  document.querySelector("#menu-btn");
let sidebar = document.querySelector(".sidebar");
let search_btn = document.querySelector(".bx-search-alt-2");
let imgForm = document.querySelector(".get_img");

menu_btn.onclick = function(){
  sidebar.classList.toggle("active");
}

search_btn.onclick = function(){
  sidebar.classList.toggle("active");
}


button.onclick = () => {
  input.click();
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

// when file is inside drag area
dropArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropArea.classList.add('active');
  dragText.textContent = 'Release to Upload';
  // console.log('File is inside the drag area');
});

// when file leave the drag area
dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('active');
  // console.log('File left the drag area');
  dragText.textContent = 'Drag & Drop';
});

// when file is dropped
dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
  displayFile();
});

// imgForm.addEventListener("submit", function(e) {
//   e.preventDefault();
//   if (file == null){
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'Please upload your image first!'
//     })
//   }
//   else{
//     loading_on()
//     const formData = new FormData();
//     formData.append('file', file);
//     const xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function() {
//       if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
//         loading_off()
//           // window.alert(xhr.readyState)
//         const data = JSON.parse(xhr.responseText).data;
//         const update =  new Date();
//         document.querySelector('.person__img').innerHTML = `<img src="/static/crop/0.jpg?v=${update.getTime()}" />`; // To update avoid using image from cache
//         document.querySelector('.info__id').innerHTML = `Số (ID): ${data[0]}`;
//         document.querySelector('.info__name').innerHTML = `Họ và tên (Full name): ${data[1]}`;
//         document.querySelector('.info__date').innerHTML = `Ngày sinh (Date of birth): ${data[2]}`;
//         document.querySelector('.info__sex').innerHTML = `Giới tính (Sex): ${data[3]}`;
//         document.querySelector('.info__nation').innerHTML = `Quốc tịch (Nationality): ${data[4]}`;
//         document.querySelector('.info__hometown').innerHTML = `Quê quán (Place of origin): ${data[5]}`;
//         document.querySelector('.info__address').innerHTML = `Nơi thường trú (Place of residence): ${data[6]}`;
//         document.querySelector('.info__doe').innerHTML = `Ngày hết hạn (Date of expiry) : ${data[7]}`;
//         dataExtracted = [{
//           id: data[0],
//           name: data[1],
//           date_of_birth: data[2],
//           sex: data[3],
//           nationality: data[4],
//           hometown: `"${data[5]}"`,
//           address: `"${data[6]}"`,
//           date_of_expiry: data[7]
//         }];
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Extract successfully!',
//           footer: `CODE: ${xhr.status}`
//         })
//       }
//       else if (xhr.status >= 400 && xhr.status <= 500){
//         const data = JSON.parse(xhr.responseText);
//         loading_off();
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: String(data.message),
//           footer: `CODE: ${xhr.status}`
//         })
//       }
//     }
//   const URL = '/uploader';
//   xhr.open('POST', URL, true);
//   xhr.send(formData);
//   }
// });

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(e) {
  e.preventDefault();

  if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
    loading_off();
    const data = JSON.parse(xhr.responseText).data;
    const update =  new Date();
    document.querySelector('.person__img').innerHTML = `<img src="/static/results/0.jpg?v=${update.getTime()}" />`; // To update avoid using image from cache
    document.querySelector('.info__id').innerHTML = `Số (ID): ${data[0]}`;
    document.querySelector('.info__name').innerHTML = `Họ và tên (Full name): ${data[1]}`;
    document.querySelector('.info__date').innerHTML = `Ngày sinh (Date of birth): ${data[2]}`;
    document.querySelector('.info__sex').innerHTML = `Giới tính (Sex): ${data[3]}`;
    document.querySelector('.info__nation').innerHTML = `Quốc tịch (Nationality): ${data[4]}`;
    document.querySelector('.info__hometown').innerHTML = `Quê quán (Place of origin): ${data[5]}`;
    document.querySelector('.info__address').innerHTML = `Nơi thường trú (Place of residence): ${data[6]}`;
    document.querySelector('.info__doe').innerHTML = `Ngày hết hạn (Date of expiry) : ${data[7]}`;
    dataExtracted = [{
      id: data[0],
      name: data[1],
      date_of_birth: data[2],
      sex: data[3],
      nationality: data[4],
      hometown: `"${data[5]}"`,
      address: `"${data[6]}"`,
      date_of_expiry: data[7]
    }];
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Extract successfully!',
      footer: `CODE: ${xhr.status}`
    })
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
  else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201){
    downloadCSV({
            filename: "user_data.csv"
          });
    const downloadSuccess = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })

    downloadSuccess.fire({
      icon: 'success',
      title: 'Download extracted data successfully!'
    })
  }
}

function file_validation(){
  if (file == 'wrong_exts'){
    const URL = '/uploader';
    const formData = new FormData();
    var f = new File([""], "WRONG_EXTS"); // Empty file trick
    formData.append('file', f);
    xhr.open('POST', URL, true);
    xhr.send(formData);
  }
}

imgForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData();
  loading_on();

  if (file == null){
    var f = new File([""], "NULL"); // Empty file trick
    formData.append('file', f);
  }
  else{
    formData.append('file', file);
  }
  const URL = '/uploader';
  xhr.open('POST', URL, true);
  xhr.send(formData);
});

convertArrayOfObjectsToCSV = args => {
  const data = args.data;
  if (!data || !data.length) return;

  const columnDelimiter = args.columnDelimiter || ',';
  const lineDelimiter = args.lineDelimiter || '\n';

  const keys = Object.keys(data[0]);

  let result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(item => {
    ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function downloadExtracted(){
  const URL = '/download';
  const formData = new FormData();
  formData.append('file', dataExtracted);
  xhr.open('POST', URL, true);
  xhr.send(formData);
}

downloadCSV = args => {

  let csv = convertArrayOfObjectsToCSV({
    data: dataExtracted
  });
  if (!csv) return;

  const filename = args.filename || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }

  const data = encodeURI(csv);

  const link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

function displayFile() {
  let fileType = file.type;
  // console.log(fileType);

  let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

  if (validExtensions.includes(fileType)) {
    // console.log('This is an image file');
    let fileReader = new FileReader();

    fileReader.onload = () => {
      let fileURL = fileReader.result;
      // console.log(fileURL);
      // let imgTag = `<img src="${fileURL}" alt="">
      //               <button id='close'>close</button>`;
      let imgTag = `<img src="${fileURL}" alt="">`;
      // let removeBtn = `<button id='close'>close</button>`;
      dropArea.innerHTML = imgTag;
      // dropArea.innerHTML = removeBtn;
    };
    fileReader.readAsDataURL(file);
  } else {
    dropArea.classList.remove('active');
    file = 'wrong_exts';
    file_validation();
    file = null;
  }
}
