import React from 'react'
import Autosuggest from 'react-autosuggest'
import './index.css'

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters


const App = props => {

    const [state,setState] = React.useState({value:'',suggestions:[]})
    const [original,setOriginal] = React.useState([
        {
            name: 'C',
            year: 1972
        },
        {
            name: 'C#',
            year: 2000
        },
        {
            name: 'C++',
            year: 1983
        },
        {
            name: 'Clojure',
            year: 2007
        },
        {
            name: 'Elm',
            year: 2012
        },
        {
            name: 'Go',
            year: 2009
        },
        {
            name: 'Haskell',
            year: 1990
        },
        {
            name: 'Java',
            year: 1995
        },
        {
            name: 'Javascript',
            year: 1995
        },
        {
            name: 'Perl',
            year: 1987
        },
        {
            name: 'PHP',
            year: 1995
        },
        {
            name: 'Python',
            year: 1991
        },
        {
            name: 'Ruby',
            year: 1995
        },
        {
            name: 'Scala',
            year: 2003
        }
    ])
    // constructor() {
    //     super();

    //     this.state = {
    //         value: '',
    //         suggestions: []
    //     };
    // }

    const onChange = (event, { newValue, method }) => {
        console.log('hehrherherbhktjskrhfgnkjs',newValue)
        setState({
            ...state,
            value: newValue
        })
    };

    const getSuggestionValue = suggestion => {
        if (suggestion.isAddNew) {
            return state.value;
        }

        return suggestion.name;
    };

    const renderSuggestion = suggestion => {
        if (suggestion.isAddNew) {
            return (
                <span>
                    [+] Add new: <strong>{state.value}</strong>
                </span>
            );
        }

        return suggestion.name;
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setState({
            ...state,
            suggestions: getSuggestions(value)
        });
    };

    const onSuggestionsClearRequested = () => {
        setState({
            ...state,
            suggestions: []
        });
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        if (suggestion.isAddNew) {
            console.log('Add new:', state.value);
        }
    };

    const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const getSuggestions = value => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');
        const suggestions = original.filter(language => regex.test(language.name));

        if (suggestions.length === 0) {
            return [
                { isAddNew: true }
            ];
        }

        return suggestions;
    }

    // const { value, suggestions } = this.state;
    const inputProps = {
        placeholder: "Type something",
        value: state.value,
        onChange
    };

    console.log('state: ',state)

    return (
        <Autosuggest
            suggestions={state.suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={onSuggestionSelected}
            inputProps={inputProps}
        />
    );
}

export default App
