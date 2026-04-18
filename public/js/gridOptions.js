const gridOptions = {
  table: 'table',
  /*data: data,*/
  uuidProp: 'id',
  /*storageId: "texts_grid",*/
  /*columns: [
    {
      id: 'content',
      name: "@(#text)",
      maxDisplayLength: 30,
      maxDisplayLength: "@(#readMore)",
    },
    {
      id: 'createdAt',
      name: "@(#creationDate)",
    },
    { 
      id: 'updatedAt',
      name: "@(#modificationDate)",
    },
  ],*/
  listView: {
    id: 'listView',
    tableId: 'tableContainer',
    sortId: 'sortListView',
    nrOfCols: 3,
    nrOfColsId: 'nrOfCols',
    nrOfColsContainer:
      'nrOfColsContainer',
    resetBtnId: 'resetCols',
    buttons: {
      gridMode: 'gridMode',
      listMode: 'listMode',
    },
    transition: true,
  },
  /*keyNav: {
    enterFn: editObjectWithEnterKey,
    deleteFn: deleteObjectWithDeleteKey,
  },*/
  selection: {
    mode: 'multiple',
    clearId: 'clearSelection',
    selectAllId: 'selectAll',
    /*fn: (selection) => {
      selectedObject = selection;
      console.log(selectedObject);
    },*/
  },
  pagination: {
    /*page: @{model.page},
    limitPerPage: @{model.limit},*/
    limitId: 'limitPerPage',
    pagesUlId: 'pagination',
    maxButtonsNextToCurrent: 1,
    /*pagesLabels: {
      page: "@(#page)",
      firstPage: "@(#firstPage)",
      lastPage: "@(#lastPage)",
      previousPage: "@(#previousPage)",
      nextPage: "@(#nextPage)",
    },*/
    firstShowingLineId: 'firstShowingLine',
    lastShowingLineId: 'lastShowingLine',
    totalLinesId: 'totalLines',
    resetBtnId: 'resetPagination',
  },
  search: {
    id: 'gridSearch',
    cancel: 'cancelSearch',
  },
  sort: true,
  hideId: 'hideDD',
  resize: {
    buttonId: 'resizeButton',
    modalId: 'resizeModal',
    modalBodyId: 'resizeModalBody',
  },
  reorder: {
    buttonId: 'reorderButton',
    modalId: 'reorderModal',
    modalBodyId: 'reorderModalBody',
  },
};