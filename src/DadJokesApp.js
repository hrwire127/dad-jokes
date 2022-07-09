import React, { Component } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import Joke from './Joke';
import './DadJokesApp.css'
import JokeTemp from './JokeTemp';

class DadJokesApp extends Component
{
    static defaultProps = {
        startJokes: 10,
        ratingMax: 5
    }
    constructor(props)
    {
        super(props)
        this.state =
        {
            jokes: [],
            isLoading: false
        }
        this.generateJoke = this.generateJoke.bind(this);
        this.addJoke = this.addJoke.bind(this);
        this.Rate = this.Rate.bind(this);
        this.sortJokes = this.sortJokes.bind(this);
    }
    async componentDidMount()
    {
        this.setState({ isLoading: true })
        const jokes = [];
        for (let i = 1; i <= this.props.startJokes; i++)
        {
            const res = (await this.generateJoke()).data.joke;
            jokes.includes(res) ? (i--) : jokes.push(new JokeTemp(res, uuidv4(), 0).getObj())
        }

        this.setState({ jokes: jokes, isLoading: false })
    }
    async addJoke()
    {
        this.setState({ isLoading: true })
        const res = (await this.generateJoke()).data.joke;
        this.setState(st => ({ jokes: [...st.jokes].concat(new JokeTemp(res, uuidv4(), 0).getObj()), isLoading: false }))
        this.sortJokes();
    }
    generateJoke()
    {
        return axios.get("https://icanhazdadjoke.com", { headers: { Accept: "application/json" } });
    }
    Rate(vote, id)
    {
        const Jokes = this.state.jokes;
        const Joke = Jokes.filter(j => j.id === id)[0]
        const maxRating = this.props.ratingMax;
        let i = Jokes.indexOf(Joke);

        if (Joke.rating <= maxRating
            && Joke.rating >= -maxRating)
        {
            Joke.rating = (Joke.rating === maxRating
                ? (vote ? Joke.rating : Joke.rating - 1)
                : (Joke.rating === -maxRating
                    ? (vote ? Joke.rating + 1 : Joke.rating)
                    : (vote ? Joke.rating + 1 : Joke.rating - 1)))
            // if (Joke.rating === maxRating)
            // {
            //     Joke.rating = (vote ? Joke.rating : Joke.rating - 1);
            // }
            // else if (Joke.rating === -maxRating)
            // {
            //     Joke.rating = (vote ? Joke.rating + 1 : Joke.rating);
            // }
            // else
            // {
            //     Joke.rating = (vote ? Joke.rating + 1 : Joke.rating - 1);
            // }
            this.setState({ jokes: [...Jokes].concat([...Jokes], [...Jokes].splice(i, 1, Joke)) })
        }

        this.sortJokes();
    }
    sortJokes()
    {
        let array = [...this.state.jokes].sort((a, b) => (a.rating > b.rating) ? -1 : 1)
        this.setState({ jokes: array })
    }
    render()
    {
        const { jokes, isLoading } = this.state;
        return (
            <div className='Content'>
                <div className='Sidebar'>
                    <div className='Title'>
                        <h2 className='Pre'>Dad</h2>
                        <h2 className='Sub'>Jokes</h2>
                    </div>
                    <div className='Shadow'><div className='Icon'>🤣</div> </div>
                    {isLoading
                        ? <button className='Waiting'>...</button>
                        : <div className='Ctn'> <button className='Btn' onClick={this.addJoke}><div className='L'>New</div><div className='R'>Joke</div></button> </div>
                    }
                </div>
                <div className='Container'>

                    {isLoading
                        ?
                        <div className="loader"></div>
                        :
                        jokes.map(j =>
                        {
                            return <Joke
                                msg={j.msg}
                                key={j.id}
                                id={j.id}
                                rating={j.rating}
                                Rate={this.Rate}
                            />
                        })
                        }
                </div>
            </div>
        )
    }
}
export default DadJokesApp;


