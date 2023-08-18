export default async function (req, user) {
    let info = [];

    for (let i = 0; i < req.globals.nkjvBible.books.length; i++) {
        const ele = req.globals.nkjvBible.books[i];

        let book = {
            name: ele.name,
            chapters: []
        };

        for (let j = 0; j < ele.chapters.length; j++) {
            const jele = ele.chapters[j];

            book.chapters.push(jele.verses.length);
        }

        info.push(book);
    }

    return info;
}