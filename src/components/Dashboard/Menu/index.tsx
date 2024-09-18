import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper/Paper';
import { CiLogout } from 'react-icons/ci';
import { FaUsers } from 'react-icons/fa';
import { MdAddBusiness, MdCategory, MdContentPaste } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';

export const Menu = () => {
  const navigate = useNavigate()
  const handleLink = (path: string) => {
    navigate(path)
  }
  return (
    <Container>
      <Paper sx={{ width: 300, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem>
            <ListItemText>Cadastros</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleLink('session')}>
            <ListItemIcon>
              <MdContentPaste size={16} />
            </ListItemIcon>
            <ListItemText>
              Seção
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleLink('category')}>
            <ListItemIcon>
              <MdCategory size={16} />
            </ListItemIcon>
            <ListItemText>
              Categoria
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MdAddBusiness size={16} />
            </ListItemIcon>
            <ListItemText>
              Prestadores de Serviço
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <FaUsers size={16} />
            </ListItemIcon>
            <ListItemText>
              Clientes
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleLink('/')}>
            <ListItemIcon>
              <CiLogout size={16} />
            </ListItemIcon>
            <ListItemText>
              Sair
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Container>
  )
}