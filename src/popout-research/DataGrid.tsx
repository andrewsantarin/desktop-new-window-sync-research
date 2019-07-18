import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import './DataGrid.css';

import React, { Component } from 'react';
import { AgGridReact as AgGrid } from 'ag-grid-react';
import { GridReadyEvent, GridApi, ColumnApi, ColGroupDef, ColDef } from 'ag-grid-community';

export const URL_PATH = '/data-grid';

export interface DataGridProps {
}

export interface DataGridState {
  columnDefs: (ColGroupDef | ColDef)[];
  rowData?: any[];
}

export class DataGrid extends Component<DataGridProps, DataGridState> {
  gridApi!: GridApi;
  columnApi!: ColumnApi;

  state: DataGridState = {
    columnDefs: [
      {
        headerName: 'Athlete',
        field: 'athlete',
        minWidth: 150,
      },
      {
        headerName: 'Age',
        field: 'age',
        minWidth: 90,
      },
      {
        headerName: 'Country',
        field: 'country',
      },
      {
        headerName: 'Year',
        field: 'year',
      },
      {
        headerName: 'Date',
        field: 'date',
      },
      {
        headerName: 'Sport',
        field: 'sport',
      },
      {
        headerName: 'Gold',
        field: 'gold',
      },
      {
        headerName: 'Silver',
        field: 'silver',
      },
      {
        headerName: 'Bronze',
        field: 'bronze',
      },
      {
        headerName: 'Total',
        field: 'total',
      },
    ],
  };

  handleGridReady = (event: GridReadyEvent) => {
    const { api: gridApi, columnApi } = event;

    this.gridApi = gridApi;
    this.columnApi = columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = (data: any[]) => {
      this.setState({ rowData: data });
    };

    httpRequest.open('GET', 'https://www.ag-grid.com/olympicWinners.json');
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  render() {
    return (
      <div className="data-grid-container">
        <div className="ag-theme-balham data-grid">
          <AgGrid
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            onGridReady={this.handleGridReady}
          />
        </div>
      </div>
    );
  }
}
