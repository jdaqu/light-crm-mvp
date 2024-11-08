"use client";
import { List, ListItem, ListItemText, ListItemIcon, Divider, Paper } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

export default function Sidebar() {
  return (
    <Paper sx={{ width: 250, height: "100vh", position: "fixed" }}>
      <List>
        <ListItem component="a" href="/clients">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItem>
        <ListItem component="a" href="/properties">
          <ListItemIcon>
            <ApartmentIcon />
          </ListItemIcon>
          <ListItemText primary="Propiedades" />
        </ListItem>
        <Divider />
        <ListItem component="a" href="/">
          <ListItemIcon>
            <AutoGraphIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </Paper>
  );
}
