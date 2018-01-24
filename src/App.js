import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';
import Radium from 'radium';


class App extends Component {
    state = {
        persons: [
            {id: '1', name: 'Max', age: 28},
            {id: '2', name: 'Manu', age: 29},
            {id: '3', name: 'Stephanie', age: 26}
        ],
        otherState: 'Algum outro estado',
        showPerson: false
    };

    deletePersonHandler = (index) => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({persons: persons})

    };

    tooglePersonHandler = () => {
        const doesShow = this.state.showPerson;
        this.setState({showPerson: !doesShow})
    };

    nameChangedHandler = (event, id) => {

        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons})

    };

    render() {
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            ':hover':{
                backgroundColor: 'lightgreen',
                color: 'black'
            }
        };

        let persons = null;
        if (this.state.showPerson) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person click={() => this.deletePersonHandler(index)}
                                       name={person.name}
                                       age={person.age} key={person.id}
                                       change ={(event) => this.nameChangedHandler(event, person.id)}/>
                    })}
                </div>
            );
            style.backgroundColor = 'red';
            style[':hover']={
                backgroundColor: 'salmon',
                color: 'black'
            }
        }

        const classes = [];
        if(this.state.persons.length <= 2){
            classes.push('red');
        }

        if(this.state.persons.length <= 1){
            classes.push('bold');
        }

        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p className={classes.join(' ')}>This is really working!</p>
                <button
                    style={style}
                    onClick={this.tooglePersonHandler}>Toogle Persons
                </button>
                {persons}
            </div>
        );

    }
}

export default Radium(App);
