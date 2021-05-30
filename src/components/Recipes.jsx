import {useState} from 'react';
const test = {
    a: 1,
    b: 2,
    c: 3
};

const second = {
    ...test,
    d: 4,
    e: 5
}

const Recipes = () => {
    const [list, setList] = useState({});
    const handleClick = (newList) => {
        setList(newList)
    }


    return (
        <div>
            <h3>Current Recipes:</h3>
            <button onClick={() => handleClick(test)}>First List</button>
            <button onClick={() => handleClick(second)}>Second List</button>

            <ul>
                {Object.keys(list).map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    )
}

export default Recipes;