import React, { Component } from 'react';
import { Button, Image, List, Label } from 'semantic-ui-react';
import './ViewList.css';
import AddPhrase from '../AddPhrase/AddPhrase';
import axios from 'axios';
import { toast } from 'react-toastify';

toast.configure();

interface IPhrase {
    id: number,
    phrase: string
}

interface IState {
    phraseData: IPhrase[],
    isOpen?: boolean
}

interface IProp {
    isOpen: boolean
}

class ViewList extends Component<{}, IState, IProp> {
    private phrasesListResult: any;
    async componentDidMount() {
        this.populateData();
    }

    constructor(props: IProp) {
        super(props);
        this.state = {
            phraseData: [],
            isOpen: false
        }
    }

    async populateData() {
        this.phrasesListResult = await this.getAllPhrases();
        this.setState({ phraseData: this.phrasesListResult });
    }

    async getAllPhrases() {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/get-all-phrase');
            if (response?.data?.data.length > 0) {
                return response.data.data;
            }
            return [];
        } catch (error) {
            console.error(error)
        }
    }

    openPhraseDialog() {
        this.setState({ isOpen: !this.state.isOpen });
        this.populateData();
    }

    async deletePhrase(id: number) {
        const response = await axios.delete(`http://localhost:8000/api/v1/delete-phrase/${id}`);
        if (response.data.data.success) {
            toast('Phrase deleted successfully');
            this.populateData();
        } else {
            toast(`Phrase could'nt be deleted`);
        }
    }

    render() {
        return (
            <>
                <div className="cu-container">
                    <List divided verticalAlign="middle" className="cu-list">
                        <List.Item className="m-10">
                            <List.Content floated='right'>
                                <List.Header>Action</List.Header>
                            </List.Content>
                            <List.Content floated="left" className="pr-40"><List.Header>Id</List.Header></List.Content>
                            <List.Content><List.Header className="ml">Phrase Description</List.Header></List.Content>
                        </List.Item>
                        {this.state.phraseData.length > 0 && this.state.phraseData.map((item: IPhrase) => (
                            <List.Item key={item.id}>
                                <List.Content floated="right">
                                    <Button color="red" onClick={() => this.deletePhrase(item.id)}>Delete</Button>
                                </List.Content>
                                <List.Content floated="left"><Button>{item.id}</Button></List.Content>
                                <List.Content>{item.phrase}</List.Content>
                            </List.Item>))}
                        {this.state.phraseData.length < 1 && <List.Header className="cu-message">No Phrases</List.Header>}
                    </List>
                </div>
                <Button onClick={() => this.openPhraseDialog()} className="cu-add-btn" color="blue">Add Phrase</Button>
                {this.state.isOpen && (<AddPhrase isOpen={this.state.isOpen} onRequestClose={() => this.openPhraseDialog()} />)}
            </>
        )
    }
}

export default ViewList;