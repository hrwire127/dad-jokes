import React, { Component } from 'react'
import './Joke.css'

class Joke extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {

        }
        this.handleRate = this.handleRate.bind(this);
        this.colorRating = this.colorRating.bind(this);
        this.emojiRating = this.emojiRating.bind(this);
    }
    handleRate(vote, id)
    {
        this.props.Rate(vote, id);
    }

    colorRating(rating)
    {
        const colors = ["rgb(243, 36, 36)", "rgb(221, 69, 69)", "rgb(224, 87, 24)", 
        "rgb(224, 144, 24)", "rgb(255, 153, 0)", "rgb(255, 238, 0)", "rgb(157, 255, 0)", 
        "rgb(146, 228, 13)", "rgb(74, 228, 13)", "rgb(74, 228, 13)", "rgb(76, 179, 35)"]
        return colors[rating + 5];
    }
    emojiRating(rating)
    {
        const emojis = ["🤮", "🤢", "😔", 
        "😧", "🙁", "😐", "🙂", 
        "🤭", "😃", "😆", "😂"]
        return emojis[rating + 5];
    }
    render()
    {
        const { msg, rating, id } = this.props;
        const color = this.colorRating(rating);
        const emoji = this.emojiRating(rating);
        return (
            <div className='Joke'>
                <div className='Voting'>
                    <div className='Vote'><button className='VoteUp' onClick={this.handleRate.bind(this, true, id)}>🔺</button></div>
                    <div className='Score' style={{border: `3px solid ${color}`}}>{rating}</div>
                    <div className='Vote'><button className='VoteDown' onClick={this.handleRate.bind(this, false, id)}>🔻</button></div>
                </div>
                <h4>{msg}</h4>
                <div className='Rcon'><div className='Rating'>{emoji}</div></div>
            </div>
        )
    }
}
export default Joke;