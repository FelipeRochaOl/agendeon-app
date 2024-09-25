import { IconButton } from "@mui/material"
import Paper from "@mui/material/Paper/Paper"
import Table from "@mui/material/Table/Table"
import TableBody from "@mui/material/TableBody/TableBody"
import TableCell from "@mui/material/TableCell/TableCell"
import TableContainer from "@mui/material/TableContainer/TableContainer"
import TableHead from "@mui/material/TableHead/TableHead"
import TableRow from "@mui/material/TableRow/TableRow"
import { MdDelete, MdEdit } from "react-icons/md"
import { Service } from "../../../interfaces/Service"

interface ServiceTableProps {
  services: Service[]
  deleteService: (code: string) => void
  editService: (code: string) => void
}

export const ServiceTable = ({ services, deleteService, editService }: ServiceTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Duração</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services?.map((service) => (
            <TableRow
              key={service.code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {service.description}
              </TableCell>
              <TableCell>{service.formattedValue}</TableCell>
              <TableCell>{service.duration}</TableCell>
              <TableCell align="right">
                <IconButton color="warning" aria-label="Deletar">
                  <MdDelete onClick={() => deleteService(service.code)} />
                </IconButton>
                <IconButton color="info" aria-label="Editar">
                  <MdEdit onClick={() => editService(service.code)} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}