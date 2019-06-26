import React, { Component } from 'react';
import { Menu, Button} from 'semantic-ui-react';

export default class TopNavBar extends Component {
    render() {
        return (
            <Menu inverted fluid horizontal="true" attached='top' >
                    <Menu.Item header name='Earn Eat' />
                    <Menu.Item position='right'> 
                        <Button>Log Out</Button>
                    </Menu.Item>             
            </Menu>
        )
    }
}
