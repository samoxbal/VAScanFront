import { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class FileUpload extends Component {

    constructor() {
        super();
        this._file = null;
        this.inputStyle = {
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0
        }
    }

    getFile() {
        return this._file;
    }

    render() {
        return (
            <RaisedButton
                label="Выберите файл"
                labelPosition="before"
                containerElement="label"
            >
                <input type="file" style={ this.inputStyle } />
            </RaisedButton>
        )
    }
}