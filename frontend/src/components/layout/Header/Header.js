import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import HelpDialog from "../../dialogs/HelpDialog/HelpDialog";
import ShareDialog from "../../dialogs/ShareDialog/ShareDialog";

import { Component } from 'react';
import Button from '@material-ui/core/Button';
import version from "./version.json";
const NONE = 0;
const HELP = 1;
const SHARE = 2;



class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openDialog: NONE
        };

    }

    handleClose = () => {
        this.setState({
            openDialog: NONE
        });
    }

    render() {

        const { className, classes } = this.props;
        return (
            <header className={className}>
                <HelpDialog isOpen={this.state.openDialog === HELP} onClose={this.handleClose} />
                <ShareDialog isOpen={this.state.openDialog === SHARE} onClose={this.handleClose} />

                <Button variant="contained" onClick={() => this.setState({
                    openDialog: HELP
                })}> Help </Button>

                <span className="build-num">geoplanets.io {version.value}</span>
                <Button variant="contained" onClick={() => this.setState({
                    openDialog: SHARE
                })}> Share</Button>
            </header >
        );
    }
}


const styles = {
    root: {},
};

export default withStyles(styles)(
    Header
);



