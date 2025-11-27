import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";

const rows = [
  { no:"#876364", name:"Camera Lens", price:"$178", order:325, total:"$1,46,660" },
  { no:"#876368", name:"Black Dress", price:"$14", order:53, total:"$46,660" },
  { no:"#876412", name:"Argan Oil", price:"$21", order:78, total:"$3,46,676" },
  { no:"#876621", name:"EAU DE Parfum", price:"$32", order:98, total:"$4,36,981" },
];

export default function RecentOrders() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tracking no</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total Order</TableCell>
            <TableCell>Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(r=>(
            <TableRow key={r.no}>
              <TableCell>{r.no}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.price}</TableCell>
              <TableCell><Chip label={r.order} color="primary" variant="outlined" /></TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{r.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
