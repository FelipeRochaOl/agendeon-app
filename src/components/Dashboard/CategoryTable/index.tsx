import { IconButton } from "@mui/material"
import Paper from "@mui/material/Paper/Paper"
import Table from "@mui/material/Table/Table"
import TableBody from "@mui/material/TableBody/TableBody"
import TableCell from "@mui/material/TableCell/TableCell"
import TableContainer from "@mui/material/TableContainer/TableContainer"
import TableHead from "@mui/material/TableHead/TableHead"
import TableRow from "@mui/material/TableRow/TableRow"
import { MdDelete, MdEdit } from "react-icons/md"
import { Category } from "../../../interfaces/Category"

interface CategoryTableProps {
  categories: Category[]
  deleteCategory: (code: string) => void
  editCategory: (code: string) => void
}

export const CategoryTable = ({ categories, deleteCategory, editCategory }: CategoryTableProps) => {
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
          {categories.map((category) => (
            <TableRow
              key={category.code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.session.name}
              </TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell align="right">
                <IconButton color="warning" aria-label="Deletar">
                  <MdDelete onClick={() => deleteCategory(category.code)} />
                </IconButton>
                <IconButton color="info" aria-label="Editar">
                  <MdEdit onClick={() => editCategory(category.code)} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}