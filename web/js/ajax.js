function logout() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            window.location.href = xhr.responseText;

        } else {
            alert(xhr.responseText);
        }
    };

    xhr.open('GET', 'Logout?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

    xhr.send();


}
function loginStudent() {
    let data = {};
    data["username"] = document.getElementById("username").value;
    data["password"] = document.getElementById("psw").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.href = xhr.responseText;
            
        } else {
            alert(xhr.responseText);
        }
    };

    xhr.open('POST', 'LoginStudent?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));

}
function activeBorrowing(){
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        alert("You need to return a book!Check your active borrowings!");
     
    } else{
      console.log(xhr.responseText);
    }
  };
  xhr.open("POST", "ActiveBorrowing", true);
  xhr.send();
}
function checkRating(){
    bid=document.getElementById("bid").value;
    let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
        alert("you cannot Rate this Book");
      
    } else if (xhr.status !== 200) {
        $('#review').empty();
     $('#review').append(createRateTableFromJSON(bid));
     
    }
  };
   xhr.open('GET', './RateBook?bid=' + bid);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    
    
}
function oldBorrow(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
            $('#borrowed').empty();
            $('#borrowed').append(createOldBorrowTableFromJSON(responseData));

        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('GET', 'BorrowedBooks?');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    
}
function newBorrow(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
            $('#cur').empty();
            $('#cur').append(createNewBorrowTableFromJSON(responseData));

        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('GET', 'Books?');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    
}
function createNewBorrowTableFromJSON(ob) {
         
    let html = '<h2>Current Borrowings</h2><table id="books" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
    html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>title</td><td>ISBN</td><td>Bookcopy_id</td><td>FirstName</td><td>LastName</td><td>University</td><td>Remaining Days</td><td>Status</td></tr>';
    
    for (let i = 0; i < ob.length; i++) {
        const date1 = new Date(ob[i].fromdate);
        const date2 = new Date(ob[i].todate );
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        html += "<tr><td>" +ob[i].title +
                "</td><td>"+ ob[i].isbn+
                "</td><td>"+ ob[i].bookcopy_id  + "</td><td>" + ob[i].firstname + "</td><td>" + ob[i].lastname+
                "</td><td>" + ob[i].university + "</td><td>" + diffDays + "</td><td>" + ob[i].status+ "</td></tr>";
    }
    html += "</table>";
    return html;

}
function createOldBorrowTableFromJSON(ob) {
         
    let html = '<table id="books" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
    html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>title</td><td>ISBN</td><td>FirstName</td><td>LastName</td><td>University</td><td>FromDate</td><td>Todate</td><td>Status</td></tr>';

    for (let i = 0; i < ob.length; i++) {
        html += "<tr><td>" +ob[i].title +
                "</td><td>"+ ob[i].isbn + "</td><td>" + ob[i].firstname + "</td><td>" + ob[i].lastname+
                "</td><td>" + ob[i].university + "</td><td>" + ob[i].fromdate + "</td><td>" + ob[i].todate +
                "</td><td>" + ob[i].status+ "</td></tr>";
    }
    html += "</table>";
    return html;

}
function returnBook(){
    bid=document.getElementById("bid").value;
    let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
        alert("Book was returned");
      
    } else if (xhr.status !== 200) {
      
    }
  };
   xhr.open('PUT', './BorrowedBooks?bid=' + bid);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    
    
}
function loginLibrarian() {
    let data = {};
    data["username"] = document.getElementById("username").value;
    data["password"] = document.getElementById("psw").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.href = xhr.responseText;
        } else {
            alert(xhr.responseText);
        }
    };

    xhr.open('POST', 'LoginLibrarian?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));

}
function loginAdmin() {
    let data = {};
    data["username"] = document.getElementById("username").value;
    data["password"] = document.getElementById("psw").value;
   
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.href = xhr.responseText;
        } else {
            alert(xhr.responseText);
        }
    };

    xhr.open('POST', 'LoginAdmin?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));

}
function showLoginAdmin() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            window.location.href = xhr.responseText;
        } else {
            alert(xhr.responseText);
        }
    };
    xhr.open('GET', 'LoginAdmin?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send();
}
function showLoginLibrarian() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            window.location.href = xhr.responseText;
        } else {
            alert(xhr.responseText);
        }
    };
    xhr.open('GET', 'LoginLibrarian?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send();
}
function showLoginStudent() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            window.location.href = xhr.responseText;
        } else {
            alert(xhr.responseText);
        }
    };
    xhr.open('GET', 'LoginStudent');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send();
}
function showRegister() {
    window.location.href = "register.html";
}
function register() {
    let coords = {};
    //coords=getcoords();
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            if (JSON.parse(xhr.responseText).user_id !== null) {
                alert("you are successfully registered");
            }
            document.getElementById("myForm").reset();
        } else {
            alert("ppop kako pragma");
        }
    };

    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    data["lat"] = 0;  //coords.lat;
    data["lon"] = 0; //coords.lon;
    console.log(data);


    if (document.getElementById("student").checked) {
        xhr.open('POST', 'RegisterS?');
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(data));
    } else if (document.getElementById("chief").checked) {
        data["student_id"] = 0;
        data["student_id_from_date"] = 0;
        data["student_id_to_date"] = 0;
        data["university"] = 0;
        data["department"] = 0;
        xhr.open('POST', 'RegisterL?');
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(data));
    }


}
function showLibraries(){
    isbn=document.getElementById("isbn").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
            $('#libraries').empty();
            $('#libraries').append(createLibrariesTableFromJSON(responseData,isbn));

        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('GET', './AvailableBook?isbn=' + isbn);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    
    
}
function RateBook(bid){   
     rateNum=document.getElementById("rNum").value;
     rateText= document.getElementById("rText").value;      
     var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Your review was uploaded");
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('POST', './RateBook?bid=' + bid+ "&rateN=" + rateNum+ "&rateT=" + rateText);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}
function createRateTableFromJSON(bid){
    
    let html = '<br><form id="rate"><table id="statusbooks" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
    html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>Rate number</td><td><input type="text" id="rNum"/></td><td>Rate text</td><td><input type="text" id="rText"/></td></tr>';
     html += "</table>";
    html+='<button  onclick="RateBook(bid);return false;" id="save" class="but" value="save">Rate</button></form>';
       
    return html;
}
function check_user() {
    var xhr = new XMLHttpRequest();
    const data = {};
    data["username"] = document.getElementById("username").value;
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("ola kala");
            document.getElementById("sub").disabled = false;
        } else {
            alert("username exists 403");
            document.getElementById("sub").disabled = true;
        }
    };

    xhr.open('POST', 'USER_CHECK?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));
}
function check_email() {
    var xhr = new XMLHttpRequest();
    const data = {};
    data["email"] = document.getElementById("email").value;
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("ola kala");
            document.getElementById("sub").disabled = false;

        } else {
            alert("email exists 403");
            document.getElementById("sub").disabled = true;
        }
    };

    xhr.open('POST', 'EMAIL_CHECK?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));
}
function check_id() {
    const data = {};
    data["student_id"] = document.getElementById("numPaso").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("ola kala");
            document.getElementById("sub").disabled = false;
        } else {
            alert("id exists 403");
            document.getElementById("sub").disabled = true;
        }
    };

    xhr.open('POST', 'ID_CHECK?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(data));

}
function bookSearch(){
    let o={};
    o.genre=document.getElementById("genre").value;
    o.fromYear=document.getElementById("fromYear").value;
    o.toYear=document.getElementById("toYear").value;
    o.author=document.getElementById("author").value;
    o.title=document.getElementById("title").value;
    o.fromPage=document.getElementById("fromPageNumber").value;
    o.toPage=document.getElementById("toPageNumber").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
            $('#results').empty();
            $('#results').append(createSearchBookTableFromJSON(responseData));

        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('GET', 'BookFinder?');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(o));
}
function createSearchBookTableFromJSON(ob) {
    let html = '<table id="books" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
    html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>ISBN</td><td>TITLE</td><td>WRITER</td><td>KIND</td><td>PUBLICATION YEAR</td><td>PAGES</td><td>URL</td><td>PHOTO</td><td>REVIEW TEXT</td><td>REVIEW SCORE</td></tr>';

    for (let i = 0; i < ob.length; i++) {
        html += "<tr><td>" + ob[i].isbn +
                "</td><td>" + ob[i].title + "</td><td>" + ob[i].authors +
                "</td><td>" + ob[i].genre + "</td><td>" + ob[i].pages + "</td><td>" + ob[i].publicationyear +
                "</td><td>" + ob[i].url + "</td><td>" + "<img height=150 src='" + ob[i].photo + "'/>" +
                "</td><td>" + ob[i].reviewText +
                "</td><td>" + ob[i].reviewScore+"</td></tr>";
    }
    html += "</table>";
    return html;

}
/*
function availability() {
    isbnn=document.getElementbyId("isbn").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("saved changes");

        } else {
            alert(xhr.responseText);
        }
    };

    xhr.open('PUT', 'BookAvailability?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(isbnn));
}
*/
let global_obj={};
function changeS() {
  global_obj.email = document.getElementById("email").value;
  global_obj.firstname = document.getElementById("name").value;
  global_obj.lastname = document.getElementById("surname").value;
  global_obj.birthdate = document.getElementById("birthday").value;

if(document.getElementById("under").checked){
    global_obj.student_type =document.getElementById("doc").value;
  }else if(document.getElementById("post").checked){
    global_obj.student_type =document.getElementById("post").value;
  }else {
    global_obj.student_type = document.getElementById("doc").value;
  }
  
  if(document.getElementById("other").checked){
    global_obj.gender =document.getElementById("other").value;
  }else if(document.getElementById("female").checked){
    global_obj.gender =document.getElementById("female").value;
  }else {
    global_obj.gender = document.getElementById("male").value;
  }
  global_obj.department = document.getElementById("department").value;
  global_obj.country = document.getElementById("country").value;
  global_obj.city = document.getElementById("city").value;
  global_obj.address = document.getElementById("address").value;
  global_obj.telephone = document.getElementById("telephone").value;
  global_obj.personalpage = document.getElementById("homepage").value;
  global_obj.password = document.getElementById("psw").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("saved changes");

        } else {
            alert(xhr.responseText);
        }
    };

    xhr.open('POST', 'UpdateStudent?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(global_obj));
 
}
let global_obj1={};
function changeL() {
    alert("yy");
  global_obj1.email = document.getElementById("email").value;
  global_obj1.firstname = document.getElementById("name").value;
  global_obj1.lastname = document.getElementById("surname").value;
  global_obj1.birthdate = document.getElementById("birthday").value;
  global_obj1.library_name= document.getElementById("libraryname").value;
   global_obj1.info= document.getElementById("libraryinfo").value;
  
  if(document.getElementById("other").checked){
    global_obj1.gender =document.getElementById("other").value;
  }else if(document.getElementById("female").checked){
    global_obj1.gender =document.getElementById("female").value;
  }else {
    global_obj1.gender = document.getElementById("male").value;
  }
  global_obj1.country = document.getElementById("country").value;
  global_obj1.city = document.getElementById("city").value;
  global_obj1.address = document.getElementById("address").value;
  global_obj1.telephone = document.getElementById("telephone").value;
  global_obj1.password = document.getElementById("psw").value;
  console.log(global_obj1);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("saved changes");

        } else {
            alert(xhr.responseText);
        }
    };
    
    xhr.open('POST', 'UpdateLibrarian?');
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(global_obj1));
 
}
function deleteUser(){
    username=document.getElementById("Usertype").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //const responseData = JSON.parse(xhr.responseText);
            //console.log(xhr.responseText);
            console.log("ola kala");
           
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    if(document.getElementById("student").checked){
                xhr.open('POST', 'DeleteStudent?');
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(username);  
            }else{
                xhr.open('POST', 'DeleteLibrarian?');
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(username);  
                
            }
    
}
function books() {
    genre=document.getElementById("genre").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
            $('#bookTable').empty();
            $('#bookTable').append(createBookTableFromJSON(responseData));

        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('POST', 'Books?');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(genre);
}
function students() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
            $('#tablee').empty();
            $('#tablee').append(createStudentsTableFromJSON(responseData));

        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('POST', 'Students?');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}
function librarians() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
            $('#tablee').empty();
            $('#tablee').append(createLibrariansTableFromJSON(responseData));

        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('POST', 'Librarians?');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    
}
function ChangeRequest(){
   var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
            $('#requests').empty();
            $('#requests').append(createRequestsTableFromJSON(responseData));

        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('POST', 'BorrowedBooks?');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    
}
function showInfoBorrowed(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
            $('#borrowed').empty();
            $('#borrowed').append(createBorrowingTableFromJSON(responseData));

        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('POST', 'BorrowedBooks?');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    
}
function createRequestsTableFromJSON(ob){
    
    let html = '<h3>Requests</h3> <br><form id="statusForm"><table id="statusbooks" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
    html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>BOOKCOPY_ID</td><td>ISBN</td><td>TITLE</td><td>FROMDATE</td><td>TODATE</td><td>CURRENT STATUS</td><td>NEW STATUS</td></tr>';
    
    for (let i = 0; i < ob.length; i++) {
        bid=ob[i].borrowing_id;
        html += "<tr><td>" + ob[i].bookcopy_id +
                "</td><td>" + ob[i].isbn + "</td><td>" + ob[i].title +
                "</td><td>" + ob[i].fromdate + "</td><td>" + ob[i].todate +"</td><td>"+ob[i].status+"</td>";
        html+="<td><select id='status'><option value='borrowed'>borrowed</option><option value='successEnd'>successEnd</option> </select></td>";
        html+='<td><button id="save" class="but"  onsubmit="saveStatus(bid);return false;" value="save">Save changes</button></form></td></tr>';
    }
    html += "</table>";
    
    return html;
}
function createBorrowingTableFromJSON(ob) {
    let html = '<div id="myDiv"><h3>Borrowed books and student info </h3> <br><table id="borrowedbooks" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
    html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>BOOKCOPY_ID</td><td>ISBN</td><td>TITLE</td><td>FIRST NAME</td><td>LAST NAME</td><td>UNIVERSITY</td><td>FROMDATE</td><td>TODATE</td><td>STATUS</td></tr>';

    for (let i = 0; i < ob.length; i++) {
        html += "<tr><td>" + ob[i].bookcopy_id +
                "</td><td>" + ob[i].isbn + "</td><td>" + ob[i].title +
                "</td><td>" + ob[i].firstname+ "</td><td>" + ob[i].lastname + "</td><td>" + ob[i].university +
                "</td><td>" + ob[i].fromdate + "</td><td>" + ob[i].todate + 
                "</td><td>" + ob[i].status +"</td></tr>";
    }
    html += "</table></div>";
    str=html;
    html+='<br><button id="pdf" class="but"  onclick="savePDF()" value="save">Download pdf</button>';
    return html;

}
function savePDF(){
    let div = document.getElementById("myDiv");

    // Create a new jsPDF instance
    let pdf = new jsPDF();

    // Add the div contents to the PDF
    pdf.addHTML(div, () => {
      // Download the PDF document
      pdf.save("download.pdf");
    });
    
}
function createBookTableFromJSON(ob) {
    let html = '<table id="books" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
    html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>ISBN</td><td>TITLE</td><td>WRITER</td><td>KIND</td><td>PUBLICATION YEAR</td><td>PAGES</td><td>URL</td><td>PHOTO</td></tr>';

    for (let i = 0; i < ob.books.length; i++) {
        html += "<tr><td>" + ob.books[i].isbn +
                "</td><td>" + ob.books[i].title + "</td><td>" + ob.books[i].authors +
                "</td><td>" + ob.books[i].genre + "</td><td>" + ob.books[i].pages + "</td><td>" + ob.books[i].publicationyear +
                "</td><td>" + ob.books[i].url + "</td><td>" + "<img height=150 src='" + ob.books[i].photo + "'/>" + "</td></tr>";
    }
    html += "</table>";
    return html;

}
function createStudentsTableFromJSON(ob) {
    let html = '<table id="librarians" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
    html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>USERNAME</td><td>FIRST NAME</td><td>LAST NAME</td></tr>';

    for (let i = 0; i < ob.students.length; i++) {
        html += "<tr><td>" + ob.students[i].username +
                "</td><td>" + ob.students[i].firstname + "</td><td>" + ob.students[i].lastname + "</td></tr>";
    }
    html += "</table>";
    return html;

}
function createLibrariansTableFromJSON(ob) {
    let html = '<table id="librarians" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
    html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>USERNAME</td><td>FIRST NAME</td><td>LAST NAME</td></tr>';

    for (let i = 0; i < ob.librarians.length; i++) {
        html += "<tr><td>" + ob.librarians[i].username +
                "</td><td>" + ob.librarians[i].firstname + "</td><td>" + ob.librarians[i].lastname + "</td></tr>";
    }
    html += "</table>";
    return html;

}
function createLibrariesTableFromJSON(ob,isbn) {
    let html = '<table id="libraries" style="margin-right: auto; border: 1px solid black; margin-left: auto;">';
    html += '<tr style="font-family: goth2;font-size: medium;border: 1px solid black;"><td>LIBRARY ID</td><td>LIBRARY INFO</td><td>LAT</td><td>LON</td></tr>';
 for (let i = 0; i < ob.libraries.length; i++) {
        html += "<tr><td>" + ob.libraries[i].library_id +
                "</td><td>" + ob.libraries[i].libraryinfo +"</td><td>" + ob.libraries[i].lat+ "</td><td>" + ob.libraries[i].lon + "</td></tr>";
    }
    html += "</table>";
    html+='<label class="title2">Give a Library_id from the above:</label><form onsubmit="borrow(isbn); return false"> <input type="text" id="library_id"/></form>';
    return html;

}
function borrow(isb){
    library_id=document.getElementById("library_id").value;
     var xhr = new XMLHttpRequest();
     console.log(isb);
     console.log(library_id);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
         
            console.log("ola kala");
           alert("Successful request!");
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('POST', './AvailableBook?library_id=' + library_id+ "&isbn=" + isb);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}
function editLibrarianTableFromJSONU(data) {
    var html = '<table name="edd" id="edd" style="margin-left:auto;margin-right:auto;text-align: left;"><tr class="title2"><th>Category</th><th>Value</th></tr>';
    for (const x in data) {
        var category = x;
        var value = data[x];
        if (category!=="lat" && category!="lon" && category!=="user_id" && category !== "username" && category !== "email" && category !== "student_id" && category !== "student_id_from_date" && category !== "student_id_to_date" && category !== "university" && category !== "department") {
            html += '<tr class="title2"><td>' + category + '</td>';
            if(category=="password"){
                html+='<td class="title"><input type="password" name="password" id="psw" pattern="(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}" oninput="safePassword()"><span id="safePass" ></span></td></tr>';
            }else if (category=="firstname") {
                html+='<td class="title"> <input type="text" name="firstname" id="name" pattern="(?=.*[A-Za-z]).{3,30}" ></td></tr>';
            }else if(category=="lastname"){
                html+='<td class="title"><input type="text" name="lastname" id="surname" pattern="(?=.*[A-Za-z]).{3,30}" ></td></tr>';
            }else if(category=="birthdate"){
                html+='<td class="title"><input type="date" name="birthdate" id="birthday" value="1980-01-01" min="1920-01-01" max="2006-12-31" ></td></tr>';
            }else if(category=="gender"){
                html+='<td class="title"><input type="radio" id="male" name="gender" value="Male" > <label class="choice" for="male">Male</label> <input type="radio" id="female" name="gender" value="Female"> <label class="choice" for="female">Female</label><input type="radio" id="other" name="gender" value="Other"> <label class="choice" for="other">Other</label> </td> </tr>';
            }else if(category=="student_type"){
                html+='<td class="title"><input type="radio" id="under" name="student_type" value="Undergraduate"><label class="choice" for="under">Undergraduate</label><input type="radio" id="post" name="student_type" value="Postgraduate"><label class="choice" for="post">Postgraduate</label><input type="radio" id="doc" name="student_type" value="Doctorate"> <label class="choice" for="doc">Doctorate</label>  </td></tr>';
            }else if(category=="personalpage"){
                html+='<td class="title"><input type="url" name="personalpage" id="homepage"></td></tr>';
             }else if(category=="country"){
                     html+='<td class="title"><input type="text" name="country" id="country" pattern="(?=.*[A-Za-z]).{3,50}"></td></tr>';
                }else if(category=="city"){
                    html+='<td class="title"><input type="text" name="city" id="city" pattern="(?=.*[A-Za-z]).{3,50}"></td></tr>';
                }else if(category=="address"){
                    html+='<td class="title"><input type="text" name="address" id="address" pattern="(?=.*[A-Za-z])(?=.*[0-9]).{5,50}" oninput="loadDoc()"> <span id="addrCheck"></span></td></tr>';
                }else if(category=="telephone"){
                    html+='<td class="title"><input type="text" name="telephone" id="telephone" pattern="(?=.*[0-9]).{10,14}"> </td></tr>';
                }
             
        } else{
            html += '<tr class="title2"><td>' + category + '</td><td class="title">' + value + '</td></tr>';
            global_obj[category]=value;
        }

    }
    html += "</table>";
    $("#change").remove();
    html += '<button id="save" name="save" class="but"  onclick="save()" value="save">Save Data</button>';
    return html;

}
function editStudentTableFromJSONU(data) {
    var html = '<table name="edd" id="edd" style="margin-left:auto;margin-right:auto;text-align: left;"><tr class="title2"><th>Category</th><th>Value</th></tr>';
    for (const x in data) {
        var category = x;
        var value = data[x];
        if (category!=="lat" && category!="lon" && category!=="user_id" && category !== "username" && category !== "email" && category !== "student_id" && category !== "student_id_from_date" && category !== "student_id_to_date" && category !== "university" && category !== "department") {
            html += '<tr class="title2"><td>' + category + '</td>';
            if(category=="password"){
                html+='<td class="title"><input type="password" name="password" id="psw" pattern="(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}" oninput="safePassword()"><span id="safePass" ></span></td></tr>';
            }else if (category=="firstname") {
                html+='<td class="title"> <input type="text" name="firstname" id="name" pattern="(?=.*[A-Za-z]).{3,30}" ></td></tr>';
            }else if(category=="lastname"){
                html+='<td class="title"><input type="text" name="lastname" id="surname" pattern="(?=.*[A-Za-z]).{3,30}" ></td></tr>';
            }else if(category=="birthdate"){
                html+='<td class="title"><input type="date" name="birthdate" id="birthday" value="1980-01-01" min="1920-01-01" max="2006-12-31" ></td></tr>';
            }else if(category=="gender"){
                html+='<td class="title"><input type="radio" id="male" name="gender" value="Male" > <label class="choice" for="male">Male</label> <input type="radio" id="female" name="gender" value="Female"> <label class="choice" for="female">Female</label><input type="radio" id="other" name="gender" value="Other"> <label class="choice" for="other">Other</label> </td> </tr>';
            }else if(category=="student_type"){
                html+='<td class="title"><input type="radio" id="under" name="student_type" value="Undergraduate"><label class="choice" for="under">Undergraduate</label><input type="radio" id="post" name="student_type" value="Postgraduate"><label class="choice" for="post">Postgraduate</label><input type="radio" id="doc" name="student_type" value="Doctorate"> <label class="choice" for="doc">Doctorate</label>  </td></tr>';
            }else if(category=="personalpage"){
                html+='<td class="title"><input type="url" name="personalpage" id="homepage"></td></tr>';
             }else if(category=="country"){
                     html+='<td class="title"><input type="text" name="country" id="country" pattern="(?=.*[A-Za-z]).{3,50}"></td></tr>';
                }else if(category=="city"){
                    html+='<td class="title"><input type="text" name="city" id="city" pattern="(?=.*[A-Za-z]).{3,50}"></td></tr>';
                }else if(category=="address"){
                    html+='<td class="title"><input type="text" name="address" id="address" pattern="(?=.*[A-Za-z])(?=.*[0-9]).{5,50}" oninput="loadDoc()"> <span id="addrCheck"></span></td></tr>';
                }else if(category=="telephone"){
                    html+='<td class="title"><input type="text" name="telephone" id="telephone" pattern="(?=.*[0-9]).{10,14}"> </td></tr>';
                }
             
        } else{
            html += '<tr class="title2"><td>' + category + '</td><td class="title">' + value + '</td></tr>';
            global_obj[category]=value;
        }

    }
    html += "</table>";
    $("#change").remove();
    html += '<button id="save" name="save" class="but"  onclick="save()" value="save">Save Data</button>';
    return html;

}
function createTableFromJSONU(data) {
    var html = '<table id="studtab" style="margin-left:auto;margin-right:auto;"><tr class="title2"><th>Category</th><th>Value</th></tr>';
    for (const x in data) {
        var category = x;
        var value = data[x];

        html += '<tr class="title2"><td>' + category + '</td><td >' + value + '</td></tr>';
    }
    html += "</table>";
    html += '<button id="change" name="change" class="but" onclick="change(); return false;" value="cahnge">Change Data</button>';
    return html;

}
function getDataRequest() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            $("#see").hide();
            $('#ajaxContent').append(createTableFromJSONU(responseData));

            // $("#myForm").hide();
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
    };

    xhr.open('GET', 'RegisterS');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}
function getcoords() {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    let coords = {};

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const obj = JSON.parse(xhr.responseText);
            if (Object.keys(obj).length === 0) {
                coords = null;
            } else {
                coords.lat = obj[0].lat;
                coords.lon = obj[0].lon;

            }
        }
    });
    let addressName = document.getElementById("adress").value;
    let city = document.getElementById("city").value;
    let country = document.getElementById("country").value;

    let address = addressName + " " + city + " " + country;


    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=" + address + "&acceptlanguage=en&polygon_threshold=0.0");
    xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "2262984b78msh1631f7878cd6956p1d722bjsn98e6b1f09130");
    xhr.send(data);

    return coords;

}
//function to hide menu when scrolling
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
}
//function when refreshing go to top
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
//function to check passwords
function passChecker() {
    if (document.getElementById("psw").value !== document.getElementById("psw-repeat").value) {
        document.getElementById("wrongPass").innerHTML = "Password mismatch";
    } else {
        document.getElementById("wrongPass").innerHTML = "";
    }

}
//function to check if given password is safe
function safePassword() {
    let password = document.getElementById("psw").value;
    var strongRequired = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=(.*[`!@#$%\^&*\-_=\+'/\.,]){2}).{8,12}$/;
    var nums = 0;
    var badPass = Array("uoc", "tuc", "elmepa");
    for (var i = 0; i < password.length; i++) {
        if (password.charAt(i) <= 9 && password.charAt(i) >= 0)
            nums++;
    }
    if (password.length < 8 || password.length > 12) {
        document.getElementById("safePass").innerHTML = "inadequate length";//thats what she said
    } else if (password.includes(badPass[0]) || password.includes(badPass[1]) || password.includes(badPass[2])) {
        document.getElementById("safePass").innerHTML = "Baaad";
    } else if (nums >= (password.length) / 2) {
        document.getElementById("safePass").innerHTML = "Weak Password";
    } else if (password.match(strongRequired)) {
        document.getElementById("safePass").innerHTML = "Strong Password";
    } else {
        document.getElementById("safePass").innerHTML = "Medium Password";
    }

}
//reveal password
function showPass(id) {
    if (document.getElementById(id).type === "password") {
        document.getElementById(id).type = "text";
    } else {
        document.getElementById(id).type = "password";
    }
}
function studentCheck() {
    var x = document.getElementById("uni").value;
    var mail = document.getElementById("email").value;
    var dateE = document.getElementById("ending").value;
    var dateB = document.getElementById("beginning").value;
    var date1 = new Date(dateE);
    var date2 = new Date(dateB);
    const date2Copy = new Date(date2.getTime());
    var student_type = document.getElementsByName('stud');
    var flag;
    var tmp;
    flag = 0;
    if (x === "UOC") {
        if (mail.endsWith("uoc.gr")) {
            flag = 1;
        } else
            flag = 0;
    } else if (x === "TUC") {
        if (mail.endsWith("tuc.gr")) {
            flag = 1;
        } else
            flag = 0;
    } else if (x === "HELMEPA") {
        if (mail.endsWith("helmepa.gr")) {
            flag = 1;
        } else
            flag = 0;
    }
    if (date1 > date2) {
        flag = flag + 1;
    } else
        flag = 1;
    if (student_type[0].checked) {
        tmp = new Date(date2.getFullYear() + 6, date2.getMonth(), date2.getDate());
    } else if (student_type[1].checked) {
        tmp = new Date(date2.getFullYear() + 2, date2.getMonth(), date2.getDate());

    } else if (student_type[2].checked) {
        tmp = new Date(date2.getFullYear() + 5, date2.getMonth(), date2.getDate());
    }

    if (date1 < tmp) {
        flag = flag + 1;
    } else
        flag = 2;

    if (flag !== 3) {
        alert("Check your student info!");
    }


}
function userS() {
    show1 = document.getElementById("stud");
    show2 = document.getElementById("paso");
    show3 = document.getElementById("dateB");
    show4 = document.getElementById("dateE");
    show6 = document.getElementById("un");
    show7 = document.getElementById("dep");
    hide1 = document.getElementById("library_name");
    hide2 = document.getElementById("infoS");


    document.getElementById("addr").innerHTML = "Home Address:";

    hide1.style.display = "none";
    hide2.style.display = "none";
    show1.style.display = "";
    show2.style.display = "";
    show3.style.display = "";
    show4.style.display = "";
    show6.style.display = "";
    show7.style.display = "";

}
function librarian() {
    hide1 = document.getElementById("stud");
    hide2 = document.getElementById("paso");
    hide3 = document.getElementById("dateB");
    hide4 = document.getElementById("dateE");
    hide6 = document.getElementById("un");
    hide7 = document.getElementById("dep");

    const libraryName = '<td class="title3"><label><b>Liabrary Name:</b></label></td>\
   <td><input type="text"  id="libName" name="libraryname" ></td>';
    const infoAndSchedule = '<td class="title3"><label><b>Info and Schedule of Libray:</b></label></td>\
   <td><textarea id="inf" name="libraryinfo"></textarea></td>';


    document.getElementById("addr").innerHTML = "Liabrary Address:";
    document.getElementById("library_name").innerHTML = libraryName;
    document.getElementById("infoS").innerHTML = infoAndSchedule;
    hide1.style.display = "none";
    hide2.style.display = "none";
    hide3.style.display = "none";
    hide4.style.display = "none";
    hide6.style.display = "none";
    hide7.style.display = "none";

    hide1.value = 0;
    hide2.value = 0;
    hide3.value = 0;
    hide4.value = 0;
    hide6.value = 0;
    hide7.value = 0;
    document.getElementById("addr").style.display = "";
    document.getElementById("library_name").style.display = "";
    document.getElementById("infoS").style.display = "";
}
//term checkbox
function checkbox() {
    var check = document.getElementById("terms").checked;
    if (!check) {
        alert("You must accept our Terms & Privacy.");
    }
}
let ob1={};
let ob2={};
function booksinlibraries(){
     var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
            ob1=responseData;
            for(let j=0;j<responseData.booksinlibraries.length;j++){
               ob1.booksinlibraries[j]=responseData.booksinlibraries[j];
            }
           
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
        
            
    };
     

    xhr.open('POST', 'NumberOfBooks?');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
function drawChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'LibraryName');
        data.addColumn('number', 'numberOfBooks');
        /*data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);*/
    booksinlibraries();
  
            var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            console.log("ola kala");
           ob2=responseData;
           for(let i=0;i<ob2.librarians.length;i++){
               ob2.librarians[i].bookCount=0;
            for(let j=0;j<ob1.booksinlibraries.length;j++){
               if(ob2.librarians[i].librarian_id===ob1.booksinlibraries[j].librarian_id){
                   ob2.librarians[i].bookCount++;
                   console.log(ob2.librarians[i].librarian_id + ob1.booksinlibraries[j].librarian_id);
               }
                }
                console.log(ob2.librarians[i].username,ob2.librarians[i].bookCount);
            }
        } else if (xhr.status !== 200) {
            alert('Request failed. Returned status of ' + xhr.status);
        }
        
               data.addRows([[ob2.librarians[1].username,ob2.librarians[1].bookCount]]);
            
    };

    xhr.open('POST', 'Librarians?');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
    
        // Set chart options
       var options = {'title':'Statistics',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }




