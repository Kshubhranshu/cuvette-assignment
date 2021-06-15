import React, { Component } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface IProp {
    isOpen: boolean,
    onRequestClose: any
}

class AddPhrase extends Component<IProp> {
    private inputPhrase: string = '';
    constructor(props: IProp) {
        super(props);
    }

    onInputChange(event: React.FormEvent<HTMLInputElement>) {
        this.inputPhrase = event.currentTarget.value;
    }

    async addPhrase() {
        if (!this.inputPhrase) return;
        const reqPayload = {
            phrase: this.inputPhrase.trim()
        }
        const response = await axios.post('http://localhost:8000/api/v1/write-phrase', reqPayload);
        if (response.data.data.id) {
            toast('Phrase added successfully');
        } else {
            toast(`Phrase couldn't be added`);
        }
    }

    render() {
        return (
            <Modal
                open={this.props.isOpen}
                size={'tiny'}
                onRequestClose={this.props.onRequestClose}
            >
                <Modal.Header>Add Phrase</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <input placeholder="Enter a phrase" onChange={event => this.onInputChange(event)} />
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.onRequestClose}>Cancel</Button>
                    <Button onClick={() => {
                        this.addPhrase();
                        this.props.onRequestClose();
                    }}>Add</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AddPhrase;