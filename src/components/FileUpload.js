import { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

export default class FileUpload extends Component {

    constructor() {
        super();
        this.state = {
            file: null
        };
    }

    style = {
        input: {
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0
        },
        chip: {
            marginTop: 5
        }
    }

    getFile() {
        return this.state.file;
    }

    onUploadFile = () => this.setState({ file: this._input.files[0] })
    onDeleteFile = () => {
        this._input.value = '';
        this.setState({ file: null })
    }

    renderFileChip() {
        return (
            <Chip
                style={ this.style.chip }
                onRequestDelete={ this.onDeleteFile }
            >
                { this.state.file.name }
            </Chip>
        )
    }

    render() {
        return (
            <div>
                <RaisedButton
                    label="Выберите файл"
                    labelPosition="before"
                    containerElement="label"
                >
                    <input
                        type="file"
                        style={ this.style.input }
                        ref={ ref => this._input = ref }
                        onChange={ this.onUploadFile }
                    />
                </RaisedButton>
                <br/>
                { this.state.file && this.renderFileChip() }
            </div>
        )
    }
}