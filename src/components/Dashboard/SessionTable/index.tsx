import { IconButton } from "@mui/material"
import Paper from "@mui/material/Paper/Paper"
import Table from "@mui/material/Table/Table"
import TableBody from "@mui/material/TableBody/TableBody"
import TableCell from "@mui/material/TableCell/TableCell"
import TableContainer from "@mui/material/TableContainer/TableContainer"
import TableHead from "@mui/material/TableHead/TableHead"
import TableRow from "@mui/material/TableRow/TableRow"
import { MdDelete, MdEdit } from "react-icons/md"
import { Session } from "../../../interfaces/Session"

interface SessionTableProps {
  sessions: Session[]
  deleteSession: (code: string) => void
  editSession: (code: string) => void
}

export const SessionTable = ({ sessions, deleteSession, editSession }: SessionTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((session) => (
            <TableRow
              key={session.code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell key={session.code} component="th" scope="row">
                {session.name}
              </TableCell>
              <TableCell align="right">
                <IconButton color="warning" aria-label="Deletar" onClick={() => deleteSession(session.code!)}>
                  <MdDelete />
                </IconButton>
                <IconButton color="info" aria-label="Editar" onClick={() => editSession(session.code!)}>
                  <MdEdit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}