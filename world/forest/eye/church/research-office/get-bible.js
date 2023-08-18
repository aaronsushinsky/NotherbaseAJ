export default async function (req, user) {
    //console.log(req.globals.nkjvBible.books.length);
    //66 books

    let query = {
        book: 0,
        chapter: null,
        verse: null,
        ...req.body
    }

    if (query.verse !== null) {
        return req.globals.nkjvBible.books[query.book].chapters[query.chapter].verses[query.verse];
    }
    else if (query.chapter !== null) {
        return req.globals.nkjvBible.books[query.book].chapters[query.chapter];
    }
    else {
        return req.globals.nkjvBible.books[query.book];
    }
}