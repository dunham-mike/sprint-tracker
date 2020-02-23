import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline'; // See: https://material-ui.com/components/css-baseline/

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
        <div>
        <Button variant="contained" color="primary">Hello World</Button>
        <br/>
        // Layout<br/>
        Main View<br/>
        // Layout<br/>
      </div>
    </React.Fragment>
  );
}

export default App;