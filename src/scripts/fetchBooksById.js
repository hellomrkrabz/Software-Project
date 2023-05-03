import { GoogleBooksAPI } from "google-books-js";
import loading from "../media/loading.gif"

async function fetchBooksById(id) {
    const googleBooksApi = new GoogleBooksAPI();

    var book;
    try {
        book = await googleBooksApi.getVolume(id);
    } catch (error) {
        book = {title:"xd1", authors:["xd2",""], imageLinks:{smallThumbnail: {loading}}}
    }

    return book
}

export default fetchBooksById;