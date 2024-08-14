import { IconButton } from "@mui/material"
import Paper from "@mui/material/Paper/Paper"
import Table from "@mui/material/Table/Table"
import TableBody from "@mui/material/TableBody/TableBody"
import TableCell from "@mui/material/TableCell/TableCell"
import TableContainer from "@mui/material/TableContainer/TableContainer"
import TableHead from "@mui/material/TableHead/TableHead"
import TableRow from "@mui/material/TableRow/TableRow"
import { MdDelete, MdEdit } from "react-icons/md"


export const CategoryTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Seção</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key="1"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Saúde e Beleza
            </TableCell>
            <TableCell>Salão de beleza</TableCell>
            <TableCell align="right">
              <IconButton color="warning" aria-label="Deletar">
                <MdDelete />
              </IconButton>
              <IconButton color="info" aria-label="Editar">
                <MdEdit />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}