import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

function createData(name, values) {
  return {
    name,
    values,
  };
}

// This needs to be replaced with a real data source (SystemInfo.csv)
const rows = [
    createData('@timestamp', 'Dec 6, 2021 @ 17:06:42.851'),
    createData('_id', '84f_kX0BN3bE3tSp2yU7'),
    createData('_index', '.ds-logs-osquery_manager.result-default-2021.12.03-000001'),
    createData('_score', '-'),
    createData('_type', '_doc'),
    createData('action_data.id', '46792f4c-5a2c-4d16-9a89-78d885c0986f'),
    createData('action_data.query', 'select * from system_info'),
    createData('action_id', '57fdcc16-24e6-408e-85d9-db0c2993b336'),
    createData('agent.ephemeral_id', 'ab358586-09d3-43ac-979b-e63557010c07'),
    createData('agent.hostname', 'five'),
    createData('agent.id', '8ff56901-0e05-42f4-b4a1-09431c6606fb'),
    createData('agent.name', 'five'),
    createData('agent.type', 'osquerybeat'),
    createData('agent.version', '7.15.2'),
    createData('ecs.version', '1.11.0'),
    createData('elastic_agent.id', '8ff56901-0e05-42f4-b4a1-09431c6606fb'),
    createData('elastic_agent.snapshot', 'FALSE'),
    createData('elastic_agent.version', '7.15.2'),
    createData('event.agent_id_status', 'verified'),
    createData('event.ingested', 'Dec 6, 2021 @ 17:06:43.000'),
    createData('event.module', 'osquery_manager'),
    createData('host.architecture', 'x86_64'),
    createData('host.containerized', 'FALSE'),
    createData('host.hostname', 'five'),
    createData('host.id', '79fd3c90af5448ed98bae7fc0ac0b57e'),
    createData('host.ip', '10.190.42.13, fe80::46a8:42ff:fe1d:a464, 172.17.0.1, 192.168.122.1, fe80::fc54:ff:fefc:c520'),
    createData('host.mac', '44:a8:42:1d:a4:64, 44:a8:42:1d:a4:65, 44:a8:42:1d:a4:66, 44:a8:42:1d:a4:67, 02:42:24:cb:62:92, 52:54:00:53:fb:80, 52:54:00:53:fb:80, fe:54:00:fc:c5:20'),
    createData('host.os.codename', 'buster'),
    createData('host.os.family', 'debian'),
    createData('host.os.kernel', '4.19.0-18-amd64'),
    createData('host.os.name', 'Debian GNU/Linux'),
    createData('host.os.platform', 'debian'),
    createData('host.os.type', 'linux'),
    createData('host.os.version', '10 (buster)'),
    createData('osquery.board_model', '0H47HH'),
    createData('osquery.board_model.text', '0H47HH'),
    createData('osquery.board_serial', '..CN747515410281.'),
    createData('osquery.board_serial.text', '..CN747515410281.'),
    createData('osquery.board_vendor', 'Dell Inc.'),
    createData('osquery.board_vendor.text', 'Dell Inc.'),
    createData('osquery.board_version', 'A09'),
    createData('osquery.board_version.text', 'A09'),
    createData('osquery.computer_name', 'five'),
    createData('osquery.computer_name.text', 'five'),
    createData('osquery.cpu_brand', 'Intel(R) Xeon(R) CPU E5-2670 0 @ 2.60GHz'),
    createData('osquery.cpu_brand.text', 'Intel(R) Xeon(R) CPU E5-2670 0 @ 2.60GHz'),
    createData('osquery.cpu_logical_cores', '16'),
    createData('osquery.cpu_logical_cores.number', '16'),
    createData('osquery.cpu_microcode', '0x710'),
    createData('osquery.cpu_microcode.text', '0x710'),
    createData('osquery.cpu_physical_cores', '16'),
    createData('osquery.cpu_physical_cores.number', '16'),
    createData('osquery.cpu_subtype', '45'),
    createData('osquery.cpu_type', 'x86_64'),
    createData('osquery.hardware_model', 'PowerEdge R620'),
    createData('osquery.hardware_model.text', 'PowerEdge R620'),
    createData('osquery.hardware_serial', 'F36BR52'),
    createData('osquery.hardware_serial.text', 'F36BR52'),
    createData('osquery.hardware_vendor', 'Dell Inc.'),
    createData('osquery.hardware_vendor.text', 'Dell Inc.'),
    createData('osquery.hardware_version', '(empty)'),
    createData('osquery.hardware_version.text', '(empty)'),
    createData('osquery.hostname', 'five'),
    createData('osquery.hostname.text', 'five'),
    createData('osquery.local_hostname', 'five'),
    createData('osquery.local_hostname.text', 'five'),
    createData('osquery.physical_memory', '1.35146E+11'),
    createData('osquery.physical_memory.number', '135,145,771,008'),
    createData('osquery.uuid', '4c4c4544-0033-3610-8042-c6c04f523532'),
    createData('osquery.uuid.text', '4c4c4544-0033-3610-8042-c6c04f523532'),
    createData('type', 'five')
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Keys',
  },
  {
    id: 'values',
    numeric: false,
    disablePadding: false,
    label: 'Values',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          System Information
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function SystemInfoChart() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('keys');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '50%', height: '80%' }}>
      <Paper sx={{ width: '100%', height: '100%',mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.values}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8, 16, 24]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
