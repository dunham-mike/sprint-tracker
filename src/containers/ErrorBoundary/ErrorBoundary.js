import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    errorBoundaryContainer: {
        textAlign: 'center',
        padding: theme.spacing(5, 5),
    },
});


// Modeled on: https://reactjs.org/docs/error-boundaries.html
class errorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    // componentDidCatch(error, errorInfo) {
    //   // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
    // }
  
    render() {
        const { classes } = this.props;

        if (this.state.hasError) {
            // Rendering custom fallback UI
            return (
                <div className={classes.errorBoundaryContainer}>
                    <Typography variant="h5">
                        Something went wrong! Please try something else or refresh the page.
                    </Typography>
                </div>
            );
        }
    
        return this.props.children; 
    }
  }

  export default withStyles(styles)(errorBoundary);