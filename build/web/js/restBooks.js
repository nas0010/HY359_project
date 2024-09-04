/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function addBook() {
    //let myForm = document.getElementById('myForm');
    //let formData = new FormData(myForm);
    const data = {};
    //formData.forEach((value, key) => (data[key] = value));
    
     data["isbn"] = document.getElementById("isbn").value;
    data["title"] = document.getElementById("title").value;
    data["authors"] = document.getElementById("authors").value;
    data["genre"] = document.getElementById("genre").value;
    data["pages"] = document.getElementById("pages").value;
    data["publicationyear"] = document.getElementById("publicationyear").value;
    data["url"] = document.getElementById("url").value;
    data["photo"] = document.getElementById("photo").value;
    
    var jsonData=JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           document.getElementById('msg').innerHTML=JSON.stringify(xhr.responseText);
            
        } else if (xhr.status !== 200) {
            document.getElementById('msg').innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"+
					JSON.stringify(xhr.responseText);
 
        }
    };
    xhr.open('POST', 'http://localhost:8080/ServletWithDatabaseConnection2022_2023/LibraryBooks/books/newBook');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}
var i;
function availability(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText) ;
            const responseData = JSON.parse(xhr.responseText);
            document.getElementById("myText").value = responseData;
            console.log(document.getElementById("myText").value);
            isbn= document.getElementById("isbn").value;
            //getLibrary_id();
            id= parseInt(document.getElementById("myText").value);
            console.log(id);
             var xhr1 = new XMLHttpRequest();
             xhr1.onload = function () {
                 if (xhr1.readyState === 4 && xhr1.status === 200) {
                    document.getElementById('msg').innerHTML=JSON.stringify(xhr1.responseText);

                 } else if (xhr1.status !== 200) {

                 }
             };
             xhr1.open('PUT', 'http://localhost:8080/ServletWithDatabaseConnection2022_2023/LibraryBooks/books/bookAvaiability/'+isbn+"/"+id);
             xhr1.setRequestHeader("Content-type", "application/json");
             xhr1.send(isbn);
            
        } else {
            alert(xhr.responseText);
        }
    };

    xhr.open('GET', 'USER_CHECK?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send();
}
/*function availability() {
   isbn= document.getElementById("isbn").value;
   getLibrary_id();
   id= document.getElementById("myText").value;
   console.log(id);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           document.getElementById('msg').innerHTML=JSON.stringify(xhr.responseText);
            
        } else if (xhr.status !== 200) {
            document.getElementById('msg').innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"+
					JSON.stringify(xhr.responseText);
 
        }
    };
    xhr.open('PUT', 'http://localhost:8080/ServletWithDatabaseConnection2022_2023/LibraryBooks/books/bookAvaiability/'+isbn+"/"+id);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}*/

function saveStatus(bid){
    //status= document.getElementById("status").value;
    console.log(status);
    status="suc";
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           document.getElementById('msg').innerHTML=JSON.stringify(xhr.responseText);
            showInfoBorrowed();
        } else if (xhr.status !== 200) {
            document.getElementById('msg').innerHTML = 'Request failed. Returned status of ' + xhr.status + "<br>"+
					JSON.stringify(xhr.responseText);
 
        }
    };
    xhr.open('PUT', 'http://localhost:8080/ServletWithDatabaseConnection2022_2023/LibraryBooks/books/bookStatus/'+bid+"/"+status);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(status);
    
}