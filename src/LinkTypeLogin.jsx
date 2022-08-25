import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup
} from "@mui/material";

class ConfirmationDialogRaw extends React.Component {
        constructor(props) {
        super();
        this.state = {
            value: props.value,
        };
    }

    // TODO
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    handleEntering = () => {
        this.radioGroupRef.focus();
    };

    handleCancel = () => {
        this.props.onClose(this.props.value, false);
    };

    handleOk = () => {
        this.props.onClose(this.state.value, true);
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value, ...other } = this.props;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
                <DialogContent>
                    <RadioGroup
                        ref={ref => {
                            this.radioGroupRef = ref;
                        }}
                        aria-label="Ringtone"
                        name="ringtone"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {this.props.options.map(option => (
                            <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func,
    value: PropTypes.string,
};

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
});

export default ConfirmationDialogRaw;