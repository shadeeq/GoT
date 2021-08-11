export default class GotService {
    constructor() {
        this._apibase = 'https://www.anapioficeandfire.com/api';
    }

    getResourse = async (url)  => {
        const res = await fetch(`${this._apibase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} , received ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const result = await this.getResourse('/characters?page=5&pageSize=10');
        return result.map(this._transformChar);
    }

    getCharacter = async (id) => {
        const result = await this.getResourse(`/characters/${id}`);
        return this._transformChar(result);
    }

    getAllHouses = async () => {
        const result = await this.getResourse('/houses');
        return result.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const result = await this.getResourse(`/houses/${id}`);
        return this._transformHouse(result);
    }

    getAllBooks = async () => {
        const result = await this.getResourse('/books');
        return result.map(this._transformBook);
    }

    getBook = async (id) => {
        const result = await this.getResourse(`/books/${id}`);
        return this._transformBook(result);
    }

    isSet(data) {
        if (data) {
            return data;
        } else {
            return 'no data'
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformChar = (char) =>{
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        }
    }

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publiser: this.isSet(book.publiser),
            released: this.isSet(book.released)
        }
    }
}
