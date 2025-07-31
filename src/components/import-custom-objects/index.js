import { lazy } from 'react';

const ImportCustomObjects = lazy(() =>
  import('./import-custom-objects' /* webpackChunkName: "import-custom-objects" */)
);

export default ImportCustomObjects;
