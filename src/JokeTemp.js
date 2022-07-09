export default class JokeTemp
{
    constructor(msg, id, rating)
    {
        this.msg = msg;
        this.id = id;
        this.rating = rating;
    }
    getObj()
    {
        return {msg: this.msg, id: this.id, rating: this.rating}
    }
}