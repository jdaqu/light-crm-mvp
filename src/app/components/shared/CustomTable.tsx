"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
}

interface Action {
  label: string;
  onClick: (row: any) => void;
}

interface CustomTableProps {
  columns: Column[];
  rows: any[];
  actions?: Action[];
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, rows, actions }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
            {actions && actions.length > 0 && (
              <TableCell>Acciones</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
              {actions && (
                <TableCell>
                  <IconButton
                    aria-controls="action-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, row)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="action-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedRow === row}
                    onClose={handleMenuClose}
                  >
                    {actions.map((action, actionIndex) => (
                      <MenuItem
                        key={actionIndex}
                        onClick={() => {
                          action.onClick(row);
                          handleMenuClose();
                        }}
                      >
                        {action.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
