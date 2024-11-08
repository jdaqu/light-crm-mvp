
"use client";
import { Grid, Paper, Typography } from "@mui/material";

export default function DashboardContent() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h6">Estadísticas</Typography>
          <Typography variant="body1">Número de clientes: 45</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h6">Propiedades</Typography>
          <Typography variant="body1">Propiedades disponibles: 12</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h6">Ventas</Typography>
          <Typography variant="body1">Ventas este mes: 7</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
