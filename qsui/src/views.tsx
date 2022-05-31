import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from './components/Icon';
import { Input, ControlledInput } from './components/Input/input';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
library.add(fas)

function View() {
  return (
    <div className="view">
      <FontAwesomeIcon icon={faCoffee} size={'10x'} color="rgb(142, 79, 64)"></FontAwesomeIcon>
      <Icon icon='coffee' theme='info' size='10x' />
      <Menu defaultIndex='0'
        onSelect={index => alert(index)}
        defaultOpenSubMenus={['2']}>
        <MenuItem>aaa color</MenuItem>
        <MenuItem>ooo color</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>eee color</MenuItem>
          <MenuItem>fff color</MenuItem>
        </SubMenu>
        <MenuItem disabled>bbb color</MenuItem>
        <MenuItem>ccc color</MenuItem>
      </Menu >
      <hr />
      <Input prefix={'hello'} suffix={<Icon icon={faCoffee} style={{ height: 24 }} />} />
      <ControlledInput />
    </div >
  );
}

export default View;
