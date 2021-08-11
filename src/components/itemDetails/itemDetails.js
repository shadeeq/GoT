import React, {Component, useState, useEffect} from 'react';
import './itemDetails.css';
import GotService from '../../services/gotService';
import ErrorMessage from '../error';
import Spinner from '../spinner';


const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
       </li>
    )
}

export {Field};

function ItemDetails({getData, itemId, ...props}) {

    const [item, updItem] = useState(null);
    const [loading, updLoad] = useState(true);
    const [error, updError] = useState(false);


    useEffect(() => {
        updateItem();
    }, [itemId])

    const onItemDetailsLoaded = (item) => {
        updItem(item);
        updLoad(false);
    }

    function updateItem() {

        if (!itemId) {
            return;
        }

        updLoad(true);

        getData(itemId)
            .then( onItemDetailsLoaded )
            .catch( () => onError())
    }

    function onError(){
        updItem(null);
        updError(true);
    }

   
        
    if (!item && error) {
        return <ErrorMessage/>
    } else if (!item) {
        return <span className="select-error">Please select a character</span>
    }

    const {name} = item;  

    if (loading) {
        return (
            <div className="char-details rounded">
                <Spinner/>
            </div>
        )
    }

    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(props.children, (child) => {
                        return (React.cloneElement(child, {item}))
                    })
                }
            </ul>
        </div>
    );
    
} 

export default ItemDetails;

/* export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateItem() {
        const {itemId} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        this.props.getData(itemId)
            .then( this.onItemDetailsLoaded )
            .catch( () => this.onError())
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

    render() {
        
        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <span className="select-error">Please select a character</span>
        }

        const {item} = this.state;
        const {name} = item;
        

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return (React.cloneElement(child, {item}))
                        })
                    }
                </ul>
            </div>
        );
    }
}    */