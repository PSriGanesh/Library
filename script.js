let overlay = document.querySelector('.overlay');
let content = document.querySelector('.main-content');
let form = document.querySelector('.book-form');
let index=0;
let array = [];
let inputs = document.querySelectorAll('body form div input');
inputs.forEach((input)=> {
    if(input.id=='bcheck')
        return;
    input.addEventListener('blur',()=> {
        let templabel = input.nextElementSibling;
        if(input.value!="") {
            templabel.classList.add('valid');
        }
        else {
            templabel.classList.remove('valid');
        }
    });
});
function toggle() {
    overlay.style.display="flex";
    form.children[1].children[0].focus();
    form.children[1].children[0].value="";
    form.children[3].children[0].value="";
    form.children[5].children[0].value="";
    form.children[7].children[1].checked=false;
    form.classList.toggle('active');
}
overlay.addEventListener('click',()=>{
    overlay.style.display='none';
    form.classList.toggle('active');
});
form.addEventListener('click',(event)=>{
    event.stopPropagation();
});
function createBook(event) {
    let name = form.children[1].children[0].value;
    let author = form.children[3].children[0].value;
    let pages = form.children[5].children[0].value;
    let stats = form.children[7].children[1].checked;
    if(name==''||author==''||pages=='')
    return;
    let book = new Book(name,author,pages,stats);
    event.preventDefault();
}
function Book(name,author,pages,stats) {
    this.bname = name;
    this.author = author;
    this.pages=pages;
    this.id = index;
    index++;
    array.push(this);
    let ele = document.createElement('div');
    let tempdiv1 = document.createElement('div');
    let tempdiv2 = document.createElement('div');
    let tempdiv3 = document.createElement('div');
    let tempdiv4 = document.createElement('div');
    let remove = document.createElement('div');
    ele.dataset.ind=this.id;
    remove.addEventListener('click',this.removeBook);
    remove.textContent="Remove Book";
    remove.classList.add('removebtn');
    tempdiv1.textContent = `${this.bname}`;
    ele.appendChild(tempdiv1);
    tempdiv2.textContent = `By ${this.author}`;
    ele.appendChild(tempdiv2);
    tempdiv3.textContent = `Pages - ${this.pages}`;
    ele.appendChild(tempdiv3);
    tempdiv4.addEventListener('click',this.setStatus);
    tempdiv4.classList.add('statusbtn');
    if(stats==true)
    this.stats="Read";
    else
    this.stats="Not Read";
    tempdiv4.textContent = `${this.stats}`;
    ele.appendChild(tempdiv4);
    ele.appendChild(remove);
    ele.classList.add('book-card');
    content.appendChild(ele);
    overlay.style.display='none';
    form.classList.toggle('active');
}

Book.prototype.setStatus = function() {
    let tempindex = this.parentElement.dataset.ind;
    let selection = document.querySelector(`[data-ind="${tempindex}"]`).children[3];
    let i=0;
    for(i=0;i<array.length;i++) {
        if(array[i].id==tempindex)
            break;
    }
    if(selection.textContent=="Not Read"){
        selection.textContent="Read";
        array[i].stats="Read";
    }
    else if(selection.textContent=="Read"){
        selection.textContent="Not Read";
        array[i].stats="Not Read";
    }
}
Book.prototype.removeBook = function() {
    let tempindex = this.parentElement.dataset.ind;
    let i=0;
    for(i=0;i<array.length;i++) {
        if(array[i].id==tempindex)
            break;
    }
    array.splice(i,1);
    let selection = document.querySelector(`[data-ind="${tempindex}"]`);
    selection.remove();
}