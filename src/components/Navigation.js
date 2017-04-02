import React, {Component} from 'react';
import Sidebar from 'react-sidebar';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Collapse from 'react-bootstrap/lib/Collapse';
import startsWith from 'lodash/startsWith';
import find from 'lodash/find';

const Link = ({ name, icon, isActive, nestLevel = 0, onClick }) =>
  <a
    style={{
      cursor: 'pointer',
      color: isActive ? '#000' : '#757575',
      display: 'block',
      padding: `1em ${8 - nestLevel}em 1em ${4 + nestLevel}em`,
      fontSize: '1.2em',
      backgroundColor: isActive && '#dcdcdc',
      boxShadow: isActive && 'inset 0 1px 1px rgba(0,0,0,.1)'
    }}
    onClick={onClick}
  >
    <i className={`fa ${icon}`} aria-hidden="true"/>
    <span style={{ marginLeft: '.5em' }}>{name}</span>
  </a>;

class LinkContainer extends Component {
  state = { expanded: !!this.props.defaultOpen };

  render() {
    const { name, icon, children, nestLevel, visible } = this.props;
    const { expanded } = this.state;

    return visible
      ? <div>
        <div
          onClick={() => this.setState({ expanded: !expanded })}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <Link
            name={name}
            icon={icon}
            nestLevel={nestLevel}
          />

          <i
            className={`fa fa-angle-${expanded ? 'up' : 'down'}`}
            aria-hidden="true"
            style={{ fontSize: '1.4em', position: 'absolute', right: '1em' }}
          />
        </div>

        <Collapse
          in={expanded}
        >
          <div>
            {children}
          </div>
        </Collapse>
      </div>
      : null;
  }
}

class Navigation extends Component {
  state = {
    sidebarOpen: false,
    sidebarDocked: false,
    mql: null,
    expanded: null,
  };

  componentWillMount() {
    const mql = window.matchMedia('(min-width: 800px)');
    mql.addListener(this.onMediaQueryChange);
    this.setState({ mql, sidebarDocked: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.onMediaQueryChange);
  }

  onMediaQueryChange = () => {
    this.setState({ sidebarDocked: this.state.mql.matches });
  };

  onLinkClick = link => {
    this.setState({ sidebarOpen: false, expanded: null, });
    this.props.onNavigate(link);
  };

  renderLinks = () => {
    const {
      route: { pathname },
      user: { firstName, lastName, roles },
      onLogout,
    } = this.props;

    return <div
      style={{
        minHeight: '100%',
        backgroundColor: '#FFF',
        paddingBottom: '2em',
        minWidth: '3em',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: '5em',
          marginBottom: '1em',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '1em',
          fontSize: '1.3em',
          color: '#757575',
        }}
      >
        {`${firstName} ${lastName}`}
      </div>

      <Link
        name="Search"
        icon="fa-search"
        onClick={() => this.onLinkClick('/')}
        isActive={pathname === '/'}
      />

      <LinkContainer
        name="Reports"
        icon="fa-bar-chart"
        defaultOpen={startsWith(pathname, '/reports')}
        visible
      >
        <Link
          name="Stats"
          icon="fa-pie-chart"
          onClick={() => this.onLinkClick('/reports/stats')}
          isActive={pathname === '/reports/stats'}
          nestLevel={1}
        />
      </LinkContainer>

      <LinkContainer
        name="Editor"
        icon="fa-pencil"
        defaultOpen={startsWith(pathname, '/editor')}
        visible={find(roles, r => r.description === 'editor')}
      >
        <Link
          name="Categories"
          icon="fa-tasks"
          onClick={() => this.onLinkClick('/editor/behaviour-categories')}
          isActive={startsWith(pathname, '/editor/behaviour-categories')}
          nestLevel={1}
        />
        <Link
          name="Behaviour"
          icon="fa-tasks"
          onClick={() => this.onLinkClick('/editor/behaviour')}
          isActive={pathname === '/editor/behaviour'}
          nestLevel={1}
        />
      </LinkContainer>

      <LinkContainer
        name="Admin"
        icon="fa-lock"
        defaultOpen={startsWith(pathname, '/admin')}
        visible={find(roles, r => r.description === 'admin')}
      >
        <Link
          name="Students"
          icon="fa-user-o"
          onClick={() => this.onLinkClick('/admin/students')}
          isActive={pathname === '/admin/students'}
          nestLevel={1}
        />
        <Link
          name="Users"
          icon="fa-user-o"
          onClick={() => this.onLinkClick('/admin/users')}
          isActive={pathname === '/admin/users'}
          nestLevel={1}
        />
      </LinkContainer>

      <div style={{
        marginTop: '2em',
        display: 'flex',
        flex: '1 0 0%',
        alignItems: 'flex-end'
      }}>
        <Link
          name="Logout"
          icon="fa-sign-out"
          onClick={onLogout}
        />
      </div>
    </div>;
  };

  renderMenuButton = () => {
    return !this.state.sidebarDocked
      && <Glyphicon
        glyph="menu-hamburger"
        onClick={() => this.setState({ sidebarOpen: true })}
        style={{
          padding: '1em',
          fontSize: '2.5em',
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: 'pointer',
        }}
      />;
  };

  render() {
    const { isLoggedIn, children, user } = this.props;

    return isLoggedIn && user
      ? <Sidebar
        sidebar={this.renderLinks()}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={open => this.setState({ sidebarOpen: open })}
      >
        {this.renderMenuButton()}
        {children}
      </Sidebar>
      : children;
  }
}

export default Navigation;