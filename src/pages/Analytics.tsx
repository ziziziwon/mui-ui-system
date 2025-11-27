// src/pages/Analytics.tsx
import { useState, MouseEvent } from "react";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import MailRounded from "@mui/icons-material/MailRounded";
import PhoneIphoneRounded from "@mui/icons-material/PhoneIphoneRounded";
import RoomRounded from "@mui/icons-material/RoomRounded";
import { TinyBars } from "../charts/Bars";

type Gender = "Male" | "Female";
type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  avatar: string;
  role?: string;
  address?: string;
};

const DATA: Customer[] = [
  { id: 1,  name: "John Deo",       email: "johndoe2211@gmail.com",    phone: "+33757005467", gender: "Male",   avatar: "https://i.pravatar.cc/64?img=12", role: "UI/UX Designer", address: "2239 Hog Camp Road, Schaumburg" },
  { id: 2,  name: "Shelby Goode",   email: "shelbygoode481@gmail.com", phone: "+33757005467", gender: "Female", avatar: "https://i.pravatar.cc/64?img=15" },
  { id: 3,  name: "Robert Bacins",  email: "robertbacins4182@e.com",   phone: "+33757005467", gender: "Male",   avatar: "https://i.pravatar.cc/64?img=5"  },
  { id: 4,  name: "John Carilo",    email: "john_carilo182@e.com",     phone: "+33757005467", gender: "Male",   avatar: "https://i.pravatar.cc/64?img=20" },
  { id: 5,  name: "Adriene Watson", email: "adrienewatson82@e.com",    phone: "+33757035467", gender: "Female", avatar: "https://i.pravatar.cc/64?img=32" },
  { id: 6,  name: "Jhon Deo",       email: "jhondeo24823@e.com",       phone: "+63475700546", gender: "Male",   avatar: "https://i.pravatar.cc/64?img=29" },
  { id: 7,  name: "Mark Ruffalo",   email: "markruffalo3735@e.com",    phone: "+33757005467", gender: "Male",   avatar: "https://i.pravatar.cc/64?img=23" },
  { id: 8,  name: "Bethany Jackson",email:"bethanyjackson5@e.com",     phone: "+33757005467", gender: "Female", avatar: "https://i.pravatar.cc/64?img=47"},
  { id: 9,  name: "Christine Huston",email:"christinehuston4@e.com",   phone: "+33757005467", gender: "Male",   avatar: "https://i.pravatar.cc/64?img=40" },
  { id: 10, name: "Anne Jacob",     email: "annejacob2@ummoh.com",     phone: "+33757005467", gender: "Male",   avatar: "https://i.pravatar.cc/64?img=8"  },
  { id: 11, name: "James Mullican", email: "jamesmullican5346@e.com",  phone: "+33757005467", gender: "Male",   avatar: "https://i.pravatar.cc/64?img=49" },
];

function GenderChip({ g }: { g: Gender }) {
  const color = g === "Male" ? "info" : "warning";
  return (
    <Chip
      size="small"
      label={g}
      color={color as any}
      variant="outlined"
      sx={{
        bgcolor: (t) => (g === "Male" ? t.palette.info.main + "14" : t.palette.warning.main + "12"),
        borderColor: "transparent",
      }}
    />
  );
}

function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const handleClose = () => setAnchor(null);

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <MoreHorizRounded />
      </IconButton>
      <Menu anchorEl={anchor} open={open} onClose={handleClose}>
        <MenuItem onClick={() => { handleClose(); onEdit(); }}>Edit</MenuItem>
        <MenuItem onClick={() => { handleClose(); onDelete(); }} sx={{ color: "error.main" }}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default function Analytics() {
  const [selected, setSelected] = useState<Customer>(DATA[0]);

  return (
    <div className="pl-20 min-h-screen bg-soft">
      {/* 상단 바 */}
      <div className="sticky top-0 z-10 backdrop-blur px-6 py-4 bg-[var(--bg-soft)]/70 flex items-center gap-3">
        <Typography variant="h4" className="!text-2xl !font-extrabold">
          Customer List
        </Typography>

        {/* 오른쪽으로 보내고 싶으면 className="ml-auto" 추가 */}
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          sx={{ borderRadius: 1 }}
        >
          Add Customer
        </Button>
      </div>

      {/* 본문 */}
      <div className="px-6 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEFT: 목록 */}
        <Card className="lg:col-span-2 bg-paper shadow-card rounded-2xl">
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "16px" }}>
            <Table size="medium" sx={{ "& th": { color: "text.secondary" } }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone number</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DATA.map((c: Customer) => {
                  const active = selected.id === c.id;
                  return (
                    <TableRow
                      key={c.id}
                      hover
                      onClick={() => setSelected(c)}
                      sx={{
                        cursor: "pointer",
                        bgcolor: active ? "action.hover" : "transparent",
                        "&:not(:last-of-type) td": { borderColor: "divider" },
                      }}
                    >
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar src={c.avatar} />
                          <div className="font-medium leading-tight">{c.name}</div>
                        </Stack>
                      </TableCell>
                      <TableCell className="text-muted">{c.email}</TableCell>
                      <TableCell className="text-muted">{c.phone}</TableCell>
                      <TableCell><GenderChip g={c.gender} /></TableCell>
                      <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                        <RowActions
                          onEdit={() => console.log("edit", c.id)}
                          onDelete={() => console.log("delete", c.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* RIGHT: 상세 + Performance */}
        <div className="space-y-4">
          {/* 프로필 카드 */}
          <Card className="bg-paper shadow-card rounded-2xl p-5">
            <Stack alignItems="center" spacing={1.5}>
              <Avatar src={selected.avatar} sx={{ width: 70, height: 70 }} />
              <Typography variant="h6" fontWeight={800}>{selected.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selected.role ?? "Member"}
              </Typography>
            </Stack>

            <Divider sx={{ my: 2.5 }} />

            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <MailRounded className="text-muted" fontSize="small" />
                <Typography variant="body2" className="truncate">{selected.email}</Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneIphoneRounded className="text-muted" fontSize="small" />
                <Typography variant="body2">{selected.phone}</Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <RoomRounded className="text-muted" fontSize="small" />
                <Typography variant="body2" className="truncate">
                  {selected.address ?? "—"}
                </Typography>
              </Stack>
            </Stack>
          </Card>

          {/* Performance */}
          <Card className="bg-paper shadow-card rounded-2xl p-4">
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography fontWeight={700}>Performance</Typography>
              <IconButton size="small"><MoreHorizRounded /></IconButton>
            </Stack>

            <div className="mt-2">
              <TinyBars series={[8, 23, 18, 19, 14, 16]} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="aspect-square rounded-2xl bg-tile grid place-items-center">
                <div className="relative">
                  <svg width="120" height="120" className="rotate-[-90deg]">
                    <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="12" className="text-gray-200 dark:text-white/10" fill="none" />
                    <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="12"
                            className="text-indigo-500"
                            strokeDasharray={`${(70/100)*2*Math.PI*52} ${2*Math.PI*52}`}
                            strokeLinecap="round" fill="none" />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-sm font-bold">70%</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted">Satisfaction</div>
              </div>

              <div className="aspect-square rounded-2xl bg-tile grid place-items-center">
                <div className="relative">
                  <svg width="120" height="120" className="rotate-[-90deg]">
                    <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="12" className="text-gray-200 dark:text-white/10" fill="none" />
                    <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="12"
                            className="text-blue-500"
                            strokeDasharray={`${(60/100)*2*Math.PI*52} ${2*Math.PI*52}`}
                            strokeLinecap="round" fill="none" />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-sm font-bold">60%</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted">Retention</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
