import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Icon, Responsive, Segment, Button, Dropdown } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class MenuWithRouter extends Component {

  onLogOut = () => fetch('/api/logout', {method: "POST"})
  .then(res => {
      if (res.status === 200) window.location.href = '/';
  })

  render() {
    const headerIcon = <Icon name={this.props.headerIcon} size="large" />;

    let menuItems = [];
    for (let i = 0; i < this.props.items.length; i++) {
      if (this.props.items[i].length !== 2) {
        console.error('HeaderMenu: items format should be ["name", "route"]');
        break;
      }
      const name = this.props.items[i][0];
      const route = this.props.items[i][1];
      menuItems.push(
        <Menu.Item
          key={"item-" + i}
          index={i}
          as={Link}
          to={route}
          header={i === 0}
          active={route === this.props.location.pathname}
        >
          {i === 0 ? headerIcon : ""}
          {name}
        </Menu.Item>
      );
    }

    return (
      <div>
{/* Tablet and Computer */}
        <Responsive minWidth={768}>
          <Menu fluid vertical pointing>
            <Segment>{menuItems}</Segment>
          </Menu>
        </Responsive>
{/* Mobile */}
        <Responsive maxWidth={767}>
        <Menu inverted color= 'teal' horizontal="true" borderless={true}>
          <Menu.Item>
            <Dropdown as='h3' floating={true} 
              text='EarnEat' options={menuItems} />
          </Menu.Item>
          <Menu.Item position='right'> 
            <Button circular={true} type='submit' inverted
              onClick={this.onLogOut}> 
              Log Out
            </Button>
          </Menu.Item> 
        </Menu>
        </Responsive>
      </div> 
    );
  }
}

MenuWithRouter.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  headerIcon: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired
};

export default withRouter(MenuWithRouter);