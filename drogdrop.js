const dropSpace = document.querySelector('.drog-space');
const div = document.querySelector('.info-title');
const imgNAme = div.querySelector('p');
const formUpload = document.querySelector('.progress__inner__btn-form');
const divInfoAboutSize = document.querySelector('.info-text');
const imgSize = divInfoAboutSize.querySelector('p');
// const btnSendToServer = formUpload.querySelector('.progress__inner__btn');
const btnSave = document.querySelector('.drog-space-save');
const btnBrowse =  document.querySelector('.drog-space-download');
console.log(btnBrowse);
const input = document.querySelector('#fileElem');
const progressBar = document.querySelector('.progress__inner-loaded');
console.log(progressBar);
// const MyForm = document.que
console.log(input);
let file;

const availableFileTypes = {
  'image/png': true,
  'image/jpg': true,
  'image/jpeg': true,
}

// btnBrowse.onclick = ()=>{
//   input.click() ;
// }

input.addEventListener('change', function() {
  file = this.files[0];
  toggleDropSpaceClass();
  showFile();
  progressBar.classList.add('active');
  console.log(file.name);
});

function toggleDropSpaceClass(){
  dropSpace.classList.toggle('active');
}

dropSpace.addEventListener('dragover' ,(e) => {
  e.preventDefault();
});
dropSpace.addEventListener('dragenter' ,(e) => {
  toggleDropSpaceClass();
});
dropSpace.addEventListener('dragleave', (e) => {
  toggleDropSpaceClass();
})

dropSpace.addEventListener('drop', (e) => {
  e.preventDefault();
  if( e.dataTransfer.files.length > 1){
    alert(' You can drop only one file');
    toggleDropSpaceClass();
    return;
  }
  [file] = e.dataTransfer.files;
  showFile();
  progressBar.classList.add('active');
  // toggleDropSpaceClass();
});

// function sentServer(body, cb) {
//   const xhr = new XMLHttpRequest();
//   let formData = new FormData();
//   xhr.open('POST', ' http://localhost:2121/upload');
//   xhr.addEventListener('load', () => {
//     const response = JSON.parse(xhr.responseText);
//     cb(response);
//   });
//   xhr.setRequestHeader('Content-Type','form/multipart');
//   xhr.addEventListener('error', () => {
//     console.log('error');
//   });
//    formData.append('file', file);
//    xhr.send(formData);
// }

// btnSave.addEventListener('click', e => {
//   const newPost = {
//     body: formData,
//   };
//   sentServer(newPost, response => {
//     console.log(response);
//   });
//});
// TODO showFile rename to showFileInfo
function showFile(){
  // TODO use const instead of let
  let fileType = file.type;
  let fileName = file.name;
  let fileSize = file.size;

  toggleDropSpaceClass();

  if (availableFileTypes[fileType] === undefined) {
    alert(' You can drop only file with type: png,jpg,jpeg!');
    return
  }

  imgNAme.classList.add('info-title');
  imgNAme.textContent = fileName;
  imgSize.classList.add('info-text');
  imgSize.textContent = `${Math.floor(fileSize / 1000)}kb`;

  // =================================

  // if (availableFileTypes[fileType]) {
  //   imgNAme.classList.add('info-title');
  //   imgNAme.textContent = fileName;
  //   imgSize.classList.add('info-text');
  //   imgSize.textContent = `${Math.floor(fileSize / 1000)}kb`;
  // } else {
  //   alert(' You can drop only file with type: png,jpg,jpeg!');
  // }
  //
  // toggleDropSpaceClass();
}
// function handleFiles(files) {
//   ([...files]).forEach(uploadFile);
// }
// function sentServer(body, cb){
//   let url = 'http://localhost:2121/upload';
//   let  xhr = new XMLHttpRequest();
//   let formData = new FormData();
//   xhr.open('POST', url, true)
//   xhr.addEventListener('load', () => {
//     const response = JSON.parse(xhr.responseText);
//     cb(response);
//   });
//   xhr.setRequestHeader('Content-Type','multipart/form-data');
//   xhr.addEventListener('error', () => {
//     console.log('error');
//   });
//   formData.append('file', file);
//    xhr.send(formData);
// }

formUpload.addEventListener('submit', uploadFile);

function uploadFile(e){
  e.preventDefault();
  // let file = this.files;
  // TODO move to separate function uploadFileToServer use Promise
  /**
   * await uploadFileToServer()
   * const urlList = await getAllFilesURLs()
   * renderImages(urlList)
   * */
  let url = 'http://localhost:2121/upload';
  let xhr = new XMLHttpRequest();
  let formData = new FormData();
  xhr.open('POST', url, true)
  xhr.addEventListener('load', () => {
    // const response = JSON.parse(xhr.responseText);
    console.log(xhr.responseText)
    // cb(response);
  });
  xhr.upload.addEventListener('progress', e => {
   console.log(e);
  });

  xhr.addEventListener('error', () => {
    console.error('error');
  });
  formData.append('files', file);
  xhr.send(formData);
}

// btnSave.addEventListener('click', e => {
//     const newPost = {
//       body: new FormData(fileElem[0]),
//     };
//     uploadFile(newPost, response => {
//       console.log(response);
//     });
//   });
