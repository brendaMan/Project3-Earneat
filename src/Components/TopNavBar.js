import React, { Component } from 'react';
import { Menu, Button} from 'semantic-ui-react';

export default class TopNavBar extends Component {
    onLogOut = () => fetch('/api/logout', {method: "POST"})
        .then(res => {
            if (res.status === 200) window.location.reload()
        })
    
    render() {
        return (
            <Menu inverted fluid horizontal="true" attached='top' >
                    <Menu.Item header name='Earn Eat' />
                    <Menu.Item position='right'> 
                        <Button
                            onClick={this.onLogOut}>
                            Log Out
                        </Button>
                    </Menu.Item>             
            </Menu>
        )
    }
}
