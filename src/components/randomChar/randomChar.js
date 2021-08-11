import React from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner/';
import ErrorMessage from '../error/';
import {useEffect, useState} from 'react';


function RandomChar() {

    const gotService = new GotService();
    const [char, updChar] = useState({});
    let [loading, updLoad] = useState(true);
    let [error, updError] = useState(false);
   
    useEffect(() => {
        updateChar(); 

        const timerId = setInterval(updateChar, 4000);

        return (() => {  
            clearInterval(timerId);
        })      
    }, [])

    const onCharLoaded = (char) => {
        updChar(char);
        updLoad(false);

    };

    const onError = (err) => {
        updError(true);
        updLoad(false);
    }
    
    const updateChar = () => {

        const id = Math.floor(Math.random()*140 + 25);
        gotService.getCharacter(id)
          .then(data => onCharLoaded(data))
          .catch(onError);
    }

  
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    

    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
    
}

export default RandomChar;

/* export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
        char : {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 6000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25);
        // const id = 130000;
        this.gotService
          .getCharacter(id)
          .then(this.onCharLoaded)
          .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
        

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
} */

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}