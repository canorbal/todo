import './TodoList.css';
import React from 'react';
import {IconButton, Card, Typography, TextField, Checkbox, Tabs, Tab, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: this.props.list.items || [],
            showItems: 'all',
            inputText: '',
            value: 0,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.list.items !== this.props.list.items) {
            this.setState({listItems: this.props.list.items || []});
        }
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    onCheckItem = (item) => {
        let checked;
        this.setState({listItems: this.state.listItems.map(el => {
                if (el.code === item.code) {
                    checked = el.checked;
                    el.checked = !el.checked;
                }
                return el;
            })
        });
    };

    onRemoveItem = (item) => {
        this.setState({listItems: this.state.listItems.filter(el => el.code !== item.code)},
            () => this.props.updateListItems(this.state.listItems));
    };

    renderListItem = (listItem) => {
        return (
            <div className="todo__list-item" key={listItem.code}>
                <Checkbox color="primary" checked={listItem.checked} onClick={() => this.onCheckItem(listItem)}/>
                <div className={listItem.checked ? "todo__list-item_done" : ""} style={{cursor: 'pointer', wordBreak: 'break-word'}}>{listItem.text}</div>
                <IconButton color="primary" aria-label="upload picture" component="span" style={{marginLeft: 'auto'}} onClick={() => this.onRemoveItem(listItem)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        );
    };

    showCompleted = () => {
        this.setState({showItems: 'completed'});
    };

    showInProcess = () => {
        this.setState({showItems: 'process'});
    };

    showAll = () => {
        this.setState({showItems: 'all'});
    };

    addItem = (e) => {
        if (e.key === 'Enter') {
            if (this.state.inputText.length > 0) {
                this.setState({
                    listItems: [...this.state.listItems,
                        {code: Math.random(), checked: false, text: this.state.inputText}]
                });
                document.getElementById('item-input').value = '';
                this.setState({inputText: ''}, () => this.props.updateListItems(this.state.listItems));
            }
        }
    };

    renderItems = () => {
        switch (this.state.showItems) {
            case 'all':
                return this.state.listItems?.map(item => this.renderListItem(item)) || [];
            case 'completed':
                return this.state.listItems?.map(item => {
                    if (item.checked) return this.renderListItem(item);
                }) || [];
            case 'process':
                return this.state.listItems?.map(item => {
                    if (!item.checked) return this.renderListItem(item);
                }) || [];
            default:
                return;
        }
    };

    render() {
        return (Object.keys(this.props.list).length ?
                (<div className="todo">
                <Typography gutterBottom variant="h5" component="h2" style={{color: 'rgba(0, 0, 0, 0.87)'}}>
                    {this.props.list.name}
                </Typography>
                <Card className="todo__list-form">
                    <div className="todo__list-form_input">
                        <TextField id="item-input" label="Новый пункт" style={{width: '100%'}}
                                   onChange={(event) => this.setState({inputText: event.target.value})} onKeyDown={this.addItem}/>
                    </div>
                    <div className="todo__list-scroll">
                        {this.renderItems(this.state.listItems)}
                    </div>
                    <Paper style={{position: 'absolute', bottom: '10px', left: '10px', right: '10px'}}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="tabs"
                        >
                            <Tab onClick={this.showAll} label="Все" />
                            <Tab onClick={this.showInProcess} label="В процессе" />
                            <Tab onClick={this.showCompleted} label="Выполненные" />
                        </Tabs>
                    </Paper>
                </Card>
            </div>) : <></>
        )
    }
}

export default TodoList;
