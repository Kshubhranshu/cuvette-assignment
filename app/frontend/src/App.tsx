import './styles.css';
import * as React from 'react';
import ViewList from './components/ListPhrase/ViewList';
import { Container, List, Header } from "semantic-ui-react";

export default class App extends React.Component {
    public render() {
        return <Container style={{ margin: 20 }}>
            <Header as="h3">Phrasing Tool 1.0.0</Header>
            <ViewList />
        </Container>
    }
}