import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper/Paper';
import { useContext, useEffect } from 'react';
import { CiLogout } from 'react-icons/ci';
import { FaUsers } from 'react-icons/fa';
import { MdAddBusiness, MdCalendarMonth, MdCategory, MdContentPaste } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Container } from './styles';

export const Menu = () => {
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

  const handleLink = (path: string) => {
    navigate(path)
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <Container>
      <Paper sx={{ width: 300, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem>
            <ListItemText>Cadastros</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleLink('Agenda')} selected>
            <ListItemIcon>
              <MdCalendarMonth size={16} />
            </ListItemIcon>
            <ListItemText>
              Agenda
            </ListItemText>
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
          <MenuItem onClick={handleLogout}>
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