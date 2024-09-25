import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper/Paper';
import { useContext, useEffect } from 'react';
import { CiLogout } from 'react-icons/ci';
import { MdAddBusiness, MdCalendarMonth, MdCategory, MdContentPaste } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Container } from './styles';

export const Menu = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isAuthenticated, logout, isBusiness } = useContext(AuthContext)
  console.log(pathname)

  const handleLink = (path: string) => {
    navigate(path)
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = async () => {
    let logoutSuccess = false
    if (isAuthenticated) logoutSuccess = await logout()
    if (logoutSuccess) navigate('/')
  }

  return (
    <Container>
      <Paper sx={{ width: 300, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem>
            <ListItemText>Cadastros</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleLink('')} selected={pathname === "/dashboard"}>
            <ListItemIcon>
              <MdCalendarMonth size={16} />
            </ListItemIcon>
            <ListItemText>
              Agenda
            </ListItemText>
          </MenuItem>
          {isBusiness && (
            <>
              <MenuItem onClick={() => handleLink('session')} selected={pathname === "/dashboard/session"}>
                <ListItemIcon>
                  <MdContentPaste size={16} />
                </ListItemIcon>
                <ListItemText>
                  Seção
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleLink('category')} selected={pathname === "/dashboard/category"}>
                <ListItemIcon>
                  <MdCategory size={16} />
                </ListItemIcon>
                <ListItemText>
                  Categoria
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleLink('service')} selected={pathname === "/dashboard/service"}>
                <ListItemIcon>
                  <MdAddBusiness size={16} />
                </ListItemIcon>
                <ListItemText>
                  Serviços
                </ListItemText>
              </MenuItem>
            </>
          )}
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