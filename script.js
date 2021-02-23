// ==UserScript==
// @name         WebnovelReader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Convert to bookable format
// @author       You
// @match        https://www.webnovel.com/book/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    class Book {
    constructor(name, chapters, cover) {
        this.name = name;
        this.chapters = chapters;
        let temp = cover.split('/');
        temp[temp.length-1] = `600${temp[temp.length-1].substring(3)}`
        let timeUrl = temp[temp.length-1].split('=');
        temp[length-1] = `${timeUrl[0]}=${(new Date()).getTime()}`
        temp[temp.length-2] = `600`
        temp = temp.join('/')
        this.cover = temp;
    }

    addChapter(chapter) {
        this.chapters.push(chapter)
    }
}
    class Chapter {
    constructor(name, chapters){
        this.name = name;
        this.chapters = chapters;
    }

    addText(incoming) {
        this.addText.push(incoming);
    }
}

    let book = null;

    const init = async () => {

        document.querySelectorAll('script').forEach(scrip => {
         scrip.parentElement.removeChild(scrip);
        })



        let author = "unknown";
        try {
            author = document.querySelector('.cha-info').firstChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.textContent
        }
        catch(error) {
            console.log('Author element class cha-info not found')
        }

        const chaps = [];


        const title = document.querySelector('.dib.ell.vam.c_000').getAttribute('title');
        const $chapters = await document.querySelectorAll(".chapter_content");

        await $chapters.forEach(async chapter => {
            const chapterName = chapter.querySelector(".dib, .mb0").textContent;
            const chapterText = await chapter.querySelectorAll(".dib.pr");
            const chapters = [];
            chapterText.forEach(element => {
                if(element.querySelector('pirate'))element.querySelector('pirate').remove()
                let tempstring = (element.querySelector('p').textContent.replace(/(\r\n|\n|\r)/g,""))
                chapters.push(tempstring.replace(/ +(?= )/g,''))
            })
            const currentChapter = await new Chapter(chapterName, chapters)
            await chaps.push(currentChapter);
        })

        book = await new Book(title, chaps, document.querySelector('.g_thumb.mla.mra').querySelector('img').src);
        const $book = document.createElement('article');
        const $title = document.createElement('h2');
        $title.textContent = book.name;

        const $cover = document.createElement('img')
        $cover.classList.add('cover')
        $cover.src = book.cover;

        $book.appendChild($cover);
        $book.appendChild($title);

        book.chapters.forEach(chapter => {
            const $section = document.createElement('section');
            const $chapterTitle = document.createElement('h2');
            $chapterTitle.title= chapter.name;
            $chapterTitle.textContent = chapter.name;
            $section.appendChild($chapterTitle);

            chapter.chapters.forEach(chapterText => {
                const $text = document.createElement('p');
                $text.textContent = chapterText;
                $section.appendChild($text)
            })
            $book.appendChild($section);

        })


        var meta = document.createElement('meta');
        meta.name = "author";
        meta.content = author;
        document.getElementsByTagName('head')[0].innerHTML = "";
        document.getElementsByTagName('head')[0].appendChild(meta);
        document.querySelector('body').innerHTML = "";
        document.title = book.name;


        await document.querySelector('body').appendChild($book);




            let edited = book.name.split(' ').join('_');
            const desc = localStorage.getItem(edited);

            const metaTag = document.createElement('meta');
            metaTag.name = "DC.description";
            metaTag.content = desc
            document.querySelector('head').appendChild(metaTag);

    }


    const addBookDescriptionToStorage = () => {
         const desc = `Source: ${window.location.href}
                       ${document.querySelector('.g_txt_over.mb48.fs16.j_synopsis p').textContent}`;
        let title = document.querySelectorAll('.lh24.fs16.pt24.pb24.ell.c_000 span');
        title = (title[title.length-1].textContent).split(' ').join('_')
        localStorage.setItem(title, desc);
        console.log(localStorage);
    }


    const $button = document.createElement('p');
    $button.addEventListener('click', init);
    $button.textContent = 'Convert to book'
    $button.style.cssText  =
    `
    color: white;
    padding: 5px 8px;
    font-size: 18px;
    background-color: #1f2129;
    border-radius: 15px;
    position: fixed;
    z-index: 999;
    top: 70px;
    right: 60px;
    cursor: pointer;
    `
    document.querySelector('body').appendChild($button);


    const $buttonn = document.createElement('p');
    $buttonn.addEventListener('click', addBookDescriptionToStorage);
    $buttonn.textContent = 'Add description'
    $buttonn.style.cssText  =
    `
    color: white;
    padding: 5px 8px;
    font-size: 18px;
    background-color: #1f2129;
    border-radius: 15px;
    position: fixed;
    z-index: 999;
    top: 110px;
    right: 60px;
    cursor: pointer;
    `
    document.querySelector('body').appendChild($buttonn);

    // Your code here...
})();
