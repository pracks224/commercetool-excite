import React, { useState } from 'react';
import { useMcMutation } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import FlatButton from '@commercetools-uikit/flat-button';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import { parse } from 'papaparse';
import ImportCustomObjectMutation from '../../hooks/use-imports-connector/import-custom-object.ctp.graphql';

const columns = [
  { key: 'key', label: 'Product Key' },
  { key: 'value', label: 'Click & Collect' },
];

const ImportCustomObjects = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [parsedData, setParsedData] = useState([]); // parsed but not imported
  const [importedData, setImportedData] = useState([]); // store after import
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [createCustomObject] = useMcMutation(ImportCustomObjectMutation);

  const handleFileChange = (event) => {
    setMessage(null);
    setError(null);
    setParsedData([]);
    setImportedData([]);
    setCsvFile(event.target.files[0]);
  };

  const parseCsv = () => {
    if (!csvFile) {
      setError('Please select a CSV file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      const csv = target.result;
      const results = parse(csv, {
        header: true,
        skipEmptyLines: true,
      });

      if (results.errors.length) {
        setError('CSV parse error: ' + results.errors[0].message);
        return;
      }

      const invalidRow = results.data.find(
        (row) => !row.key || !row.value
      );
      if (invalidRow) {
        setError('CSV rows must have both key and value.');
        return;
      }

      setParsedData(results.data); // only store, not showing table yet
    };
    reader.readAsText(csvFile);
  };

  const handleImport = async () => {
    if (!parsedData.length) {
      setError('No data to import.');
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      for (const row of parsedData) {
        await createCustomObject({
          context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
          },
          variables: {
            container: 'Click_n_Collect',
            key: row.key.trim(),
            value: JSON.stringify(row.value.trim()),
          },
        });
      }
      setMessage('Import successful!');
      setImportedData(parsedData); // show table only after import
      setParsedData([]); // clear parsed data
      setCsvFile(null);
    } catch (err) {
      setError(err.message || 'Import failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spacings.Stack scale="m">
      <input type="file" accept=".csv,text/csv" onChange={handleFileChange} />
      <FlatButton
        label="Parse CSV"
        onClick={parseCsv}
        isDisabled={!csvFile}
        tone="primary"
      />

      {error && <Text.Body tone="error">{error}</Text.Body>}
      {message && <Text.Body tone="positive">{message}</Text.Body>}

      {/* Show Import button only after parsing */}
      {parsedData.length > 0 && (
        <FlatButton
          label="Confirm Import"
          onClick={handleImport}
          isDisabled={loading}
          tone="primary"
        />
      )}

      {/* Show table ONLY after successful import */}
      {importedData.length > 0 && (
        <DataTable columns={columns} rows={importedData} isCondensed />
      )}

      {loading && <LoadingSpinner />}
    </Spacings.Stack>
  );
};

export default ImportCustomObjects;
