
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

        let author = "unknown";
        try {
            author = document.querySelector('.cha-info').firstChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.textContent
        }
        catch(error) {
            console.log('Author element class cha-info not found')
        }

        const chaps = [];

        const $chapters = await document.querySelectorAll(".chapter_content");

        await $chapters.forEach(async chapter => {
            const chapterName = chapter.querySelector(".dib, .mb0").textContent;
            const chapterText = await chapter.querySelectorAll(".dib.pr");
            const chapters = [];
            chapterText.forEach(element => {
                let tempstring = (element.querySelector('p').textContent.replace(/(\r\n|\n|\r)/g,""))
                chapters.push(tempstring.replace(/ +(?= )/g,''))
            })
            const currentChapter = await new Chapter(chapterName, chapters)
            await chaps.push(currentChapter);
        })

        book = await new Book(document.querySelector(".lh1.mb16.auto.oh.lh1d2").textContent, chaps, document.querySelector('.g_thumb.auto').querySelector('img').src);
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
        console.log(book)
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

    // Your code here...
})();
