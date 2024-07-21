"use strict";

const pFile = "portfolio"; 
const portfolio = 6;

const sFile = "sketch";
const sketch = 8;

initialize();

async function initialize(){
    const pThumb = createThumbnail(pFile, portfolio);
    const pTitle = await createTitle(pFile);
    const pAlt = await createAlt(pFile);
    
    const sThumb = createThumbnail(sFile, sketch);
    const sTitle = await createTitle(sFile);
    const sAlt = await createAlt(sFile);

    const pImg = await createModalImage(pFile, portfolio);
    const sImg = await createModalImage(sFile, sketch);

    document.getElementById("grid").innerHTML = createGrid(portfolio, pThumb, pTitle, pAlt);
    document.getElementById("grid2").innerHTML = createGrid(sketch, sThumb, sTitle, sAlt);
    document.getElementById("pModal").innerHTML = createModal(portfolio, pTitle, pImg);
    document.getElementById("sModal").innerHTML = createModal(sketch, sTitle, sImg);
    
    document.addEventListener('DOMContentLoaded', createDataModalTarget());
    document.addEventListener('DOMContentLoaded', createModalId());
    document.addEventListener('DOMContentLoaded', addClass());
    document.addEventListener('DOMContentLoaded', modalOpenClose());
}

function createGrid(grid, thumbnails, title, alt) {
    var gridHTML = ""; 
    for(var i=0; i < grid; i++){
        gridHTML += "<div class='imageContainer'>";
        gridHTML += "<img class='thumbnail' src='" + thumbnails[i] + "' alt='" + alt[i] + "' loading='lazy' />";
        gridHTML += "<button class='imgButton' data-modal-target=''>";
        gridHTML += "<div class='title'><h1 class='gridTitle'>" + title[i] + "</h1></div>";
        gridHTML += "<div id='decal1'></div>";
        gridHTML += "<div id='decal2'></div>";
        gridHTML += "</button>";
        gridHTML += "<div class='imgOverlay'></div>";
        gridHTML += "</div>";
    }
    return gridHTML;
}

function createModal(grid, title, img){
    var modalHTML = "";
    for(var i=0; i< grid; i++){
        modalHTML += "<div class='modal' id=''>";
        modalHTML += "<div class='modalImg'>";
        modalHTML += "<p>" + title[i] + "</p>"; 
        modalHTML += "<button data-close-button class='close'>&times;</button>"; 
        modalHTML += "</div>";
        modalHTML += "<div class ='modalGridImg'>"
        modalHTML += img[i];
        modalHTML += "</div></div>";
        modalHTML += "<div id='overlay'></div>"
    }
    return modalHTML;
}
  
function createThumbnail(file, grid){
    var thumbnailImg = [];
    for(var i=1; i <= grid; i++){
        thumbnailImg.push(file+"/thumbnail/"+i+".png");
    }
    return thumbnailImg;
}

async function createTitle(file){
    var titleText = [];
    const response = await fetch(file + '/titleText.txt');
    const data = await response.text();
    data.split(/\r?\n/).forEach(line =>{
        titleText.push(line)
    });

    return titleText;
}


async function createModalImage(file, grid){
    var modalImg = [];

    for(var i =1; i<=grid;i++){
        var modalImgGroup = [];
        var j = 1;
        let imageFound = true;

        if(imageFound){
            var imgSrc = file + '/' + i +'/' +j +'.png';
            const doesImgExist = await imgExist(imgSrc);
            if(doesImgExist){
                modalImgGroup.push("<img class='modalArtImg' src='" + imgSrc + "' alt='' loading='lazy' />");
                j++;
            } else {
                imageFound = false;
            }
        }
    
        
        //remove commas 
        var modalImgGroupJoin = modalImgGroup.join('\n');
        modalImg.push(modalImgGroupJoin);
    } 
    return modalImg;
}

async function imgExist(url){
    try{
        const response = await fetch(url)
        return response.ok;
    }catch(error){
        return false;
    }
}

async function createAlt(file) {
    var altText = [];
    const response = await fetch(file + '/altText.txt');
    const data = await response.text();
    data.split(/\r?\n/).forEach(line =>{
        altText.push(line);
    })

    return altText;
}

function createDataModalTarget(){
    var total = document.getElementsByClassName('imgButton');
    for(var i=0; i < total.length; i++){
     total[i].setAttribute('data-modal-target', '#modal' + i);
    }
}

function createModalId(){
    var totalId = document.getElementsByClassName('modal');
    for (var i=0; i<totalId.length; i++){
        totalId[i].id = 'modal'+i;
    }
}

function addClass(){
    var totalClass = document.getElementsByClassName('imageContainer');
    for (var i=0; i <totalClass.length; i++){
        totalClass[i].className += ' ' + i;
    }
}

//open modal functions
function modalOpenClose(){
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay')
    const modalArrows = document.querySelectorAll('.modalArrow');


    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
        });
    });

    overlay.addEventListener('click', ()=>{
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal =>{
            closeModal(modal);
        });
    });

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
        document.documentElement.style.overflow='hidden';
        document.body.scroll = "no";
    }
    
    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "yes";
    }
    
}
