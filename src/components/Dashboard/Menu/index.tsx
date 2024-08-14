import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper/Paper';
import { CiLogout } from 'react-icons/ci';
import { FaUsers } from 'react-icons/fa';
import { MdAddBusiness, MdCategory, MdContentPaste } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container } from './styles';

export const Menu = () => {
  return (
    <Container>
      <Paper sx={{ width: 300, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem>
            <ListItemText>Cadastros</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MdContentPaste size={16} />
            </ListItemIcon>
            <ListItemText>
              <Link to="session">Seção</Link>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MdCategory size={16} />
            </ListItemIcon>
            <ListItemText>
              <Link to="category">Categoria</Link>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MdAddBusiness size={16} />
            </ListItemIcon>
            <ListItemText>
              <Link to="category">Prestadores de Serviço</Link>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <FaUsers size={16} />
            </ListItemIcon>
            <ListItemText>
              <Link to="category">Clientes</Link>
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <CiLogout size={16} />
            </ListItemIcon>
            <ListItemText>
              <Link to="/">Sair</Link>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Container>
  )
}