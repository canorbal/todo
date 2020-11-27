import './LeftBar.css';
import React from 'react';
import {CardActionArea, Grid, Typography, Card, CardContent, IconButton} from '@material-ui/core';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {Star, StarBorder} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button/Button";

class LeftBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
            showItems: 'all',
            inputText: '',
            value: 0,
            pressed: false,
        }
    }

    onPressTag = () => {
        this.setState({pressed: !this.state.pressed});
    };

    renderList = (list) => (
        <Grid key={1} item xs={6} style={{flexBasis: 0}}>
            {((this.state.pressed && list.favorite) || !this.state.pressed) && <Card style={{height: 200, width: 200, backgroundColor: list.active ? '#e8eaf6' : ""}}>
                <CardActionArea style={{height: 200, width: 200}} onClick={() => this.props.onClick(list)} disableRipple>
                    <CardContent style={{height: '100%', boxSizing: 'border-box'}}>
                        <Typography variant="h5" component="h2" style={{wordBreak: 'break-all'}}>
                            {list.name}
                        </Typography>
                        <div style={{position: 'absolute', bottom: 5, display: 'flex'}}>
                            <Typography color="textSecondary" gutterBottom>
                                {list.date}
                            </Typography>
                            <FormControlLabel
                                control={<Checkbox icon={<StarBorder />} checkedIcon={<Star />} name="checkedH" checked={list.favorite}/>}
                                label={""}
                                onClick={(e) => {e.stopPropagation(); this.props.onMakeFavorite(list)}}
                            />
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>}
        </Grid>
    );

    render() {
        return (
            <>
            <Button variant={this.state.pressed ? "contained" : "outlined"}
                    color="default"
                    onClick={this.onPressTag}
                    disableRipple
                    disableElevation
                    style={{marginTop: 10}}>
                избранные
            </Button>
            <div className="lists-container">
                {this.props.lists.length ? <Grid container spacing={1}>
                    {this.props.lists.map(list => this.renderList(list))}
                </Grid> : <Typography style={{marginTop: 150}}>Добавьте новый список, нажав на плюс</Typography>}
            </div>
            </>
        )
    }
}

export default LeftBar;
